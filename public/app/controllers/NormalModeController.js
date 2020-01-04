function NormalModeController(state, canvasPseudoWidgets, statusBarDriver, audioDriver) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.canvasPseudoWidgets = canvasPseudoWidgets;
	//this.widgetCollision = widgetCollision;

	this.statusBarDriver = statusBarDriver;
	this.statusBarDriver.greet();

	this.audioDriver = audioDriver;

	this.epsilonDistance = canvasPseudoWidgets[0].arbitrary.coordSysTransformer.epsilonDistance(); // @TODO Demeter priciple // @TODO: this arbitrary choice hides a conceptual smell
	this.epsilonAngle    = canvasPseudoWidgets[0].arbitrary.coordSysTransformer.epsilonAngle();    // @TODO Demeter priciple // @TODO: this arbitrary choice hides a conceptual smell
}

NormalModeController.prototype = Object.create(Controller.prototype);
NormalModeController.prototype.constructor = NormalModeController;

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
NormalModeController.prototype.mouseDown = function (position, eitherTarget)
{
	this.state.forgetDrag();
	either(
		canvas => this.statusBarDriver.report('Üres helyhez vagy helypozícióhoz kötődő művelet várható...'),
		currentWidget => {
			this.rememberWidget(currentWidget);
			this.rememberPosition(position);
			currentWidget.showGlittering();
			this.statusBarDriver.report('Adott alakzaton vagy vonszolás, vagy egyéb művelet várható...');
		},
		eitherTarget
	);
};

NormalModeController.prototype.mouseMove = function (currentWEPos, eitherTarget)
{
	if (this.state.prevWidgetHasNotCollidedYet()) {
		var infinitezimalDisplacement  = fromTo(this.state.prevWEPos, currentWEPos);
		if (vectorLength(infinitezimalDisplacement) > 0) { // drag event provides sometimes also 0-displacements, we filter them out for better clarity's sake
			const targetCanvas = canvasOfEitherTarget(eitherTarget);
			const canvasPseudoWidget = this.canvasPseudoWidgetForCanvas(targetCanvas);
			const maybeAllowJump = this.jumpWidgetToIfNeeded(canvasPseudoWidget); // @TODO: rossz helyen van, szervesen részt kell vennie az ütközésvizgálatban
			const [mbAllowable, minFallTargetFigures] = this.state.prevWidget.allowable_(infinitezimalDisplacement);
			const allowable = fromMaybe_exec(
				() => { // @TODO: an axception should be thrown rather
					this.statusBarDriver.report('<span class="error">Tiltott zóna!</span>');
					this.audioDriver.ouch();
					return infinitezimalDisplacement;
				},
				mbAllowable
			);
			//console.log('maybeAllowJump: ', maybeAllowJump);
			if (!vecEq(maybeAllowJump, ['just', false]) && (this.state.prevWidget.constructor.name != 'WindowWidget' && this.state.prevWidget.constructor.name != 'DoorWidget' || (!this.state.focus || this.state.focus.high != this.state.prevWidget.high))) { // @TODO contract with code hadling window and door actors, and use an OOP polymorphism approach
				this.translatePrevWidgetAndRememberItsNewPosition(allowable);
			}

			//console.log('Allowable: ', allowable);
			if (vectorLength(infinitezimalDisplacement) > 0 && vectorLength(allowable) == 0) {
				//console.log('allowable = 0');
				this.statusBarDriver.report(`Vonszolás &bdquo;kifeszítése&rdquo; ütközőfogásból ${JSON.stringify(infinitezimalDisplacement)} irányban.`);
			}


			// @TODO refactory, huge code smell
			if (!ccVecEq(allowable, infinitezimalDisplacement)) {
				//console.log('allowable = infinitezimalDisplacement');
				if (minFallTargetFigures.length == 1)
					this.state.prevWidget.collisionActionSpecialty(this, canvasPseudoWidget, minFallTargetFigures[0], currentWEPos);
			}

			if (this.state.prevWidget && (this.state.prevWidget.constructor.name == 'PickaxeWidget' || this.state.prevWidget.constructor.name == 'BucketWidget' || this.state.prevWidget.constructor.name == 'WindowWidget' || this.state.prevWidget.constructor.name == 'DoorWidget')) { // @TODO OOP
				const hitsMap = new Bijection, edgesBij = new Bijection;
				for (let figureWidget of canvasPseudoWidget.figureWidgets()) {
					for (let edge of tour(figureWidget.high.vertices)) {
						if (distanceSegmentHence(edge, currentWEPos) < 20 / figureWidget.q()) {
							hitsMap .set(figureWidget.businessObject, {});
							edgesBij.set(edge, {});
						}
					}
				}

				if (!this.state.prevWidget.high.memHitsMap) this.state.prevWidget.high.memHitsMap = new Bijection;
				for (let plusRoom of hitsMap.domain()) {
					if (!this.state.prevWidget.high.memHitsMap.has(plusRoom)) {
						const plusFigureWidget = canvasPseudoWidget.arbitrary.composeFromBusiness(plusRoom);
						const maybeCircularSlit = plusFigureWidget.loseWall_(this, this.state.prevWidget, true);
						maybeMap(
							circularSlit => this.state.prevWidget.high.memHitsMap.set(plusRoom, circularSlit),
							maybeCircularSlit
						);
					}
				}
				for (let memMinusRoom of this.state.prevWidget.high.memHitsMap.domain()) {
					if (!hitsMap.has(memMinusRoom)) {
						const minusFigureWidget = canvasPseudoWidget.arbitrary.composeFromBusiness(memMinusRoom);
						const slit = this.state.prevWidget.high.memHitsMap.get(memMinusRoom);

						deleteItem(slit, minusFigureWidget.businessObject.slitsRepresentationCircular.circularSlits);
						minusFigureWidget.updateSlitStructure();
						minusFigureWidget.updateDasharray();
						minusFigureWidget.updateDownward();

						this.state.prevWidget.high.memHitsMap.delete(memMinusRoom);

						/* @TODO DRY, copypasted from `FigureWidget.prototype.regainWall_` method */
						this.audioDriver.rebuildWall();
					}
				}
				for (let [room, slit] of this.state.prevWidget.high.memHitsMap.mapStraight) {
					/* @TODO DRY: also copypasted to: `GeomTransformationController.prototype.sustainScaleStressSpan` */
					const figureWidget = canvasPseudoWidget.arbitrary.composeFromBusiness(room),
					      actorWidget  = this.state.prevWidget;
					maybeMap(
						till => {
							slit.center = till;
							figureWidget.updateSlitStructure();
							figureWidget.updateDasharray();
							figureWidget.updateDownward();
						},
						figureWidget.maybeTill(actorWidget.high.position)
					);
				}

				const currentWidget = this.state.prevWidget;
				if (currentWidget.high.memHitsMap.size() > 0 && (!this.state.focus || this.state.focus && this.state.focus.high != currentWidget.high)) {
					/* @TODO DRY, copypasted from `mouseDown` method */
					if (this.state.focus && currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
					this.state.focus = currentWidget; this.state.spaceFocus = null;
					currentWidget.unshowGlittering(); // order 1
					this.state.focus.showFocus();     // order 2: unshowglittering must not undo SVG-<image> styling @TODO alternative solution
					this.statusBarDriver.report('Alakzatfókusz automatikusan megjegyezve, üreshelyfókusz levéve.');

					if (currentWidget.constructor.name == 'WindowWidget' || currentWidget.constructor.name == 'DoorWidget') { // @TODO OOP polymorphism
						currentWidget.attachToWall(currentWidget.high.memHitsMap, edgesBij, this.canvasPseudoWidgets);
					}
				}
				if (currentWidget.high.memHitsMap.size() == 0 && this.state.focus && this.state.focus.high == currentWidget.high) {
					/* @TODO DRY, copypasted from `mouseDown` method */
					this.state.focus.unshowFocus();
					this.state.focus = null;
					this.statusBarDriver.report('Automatikus alakzatfókusz levéve.');

					if (currentWidget.constructor.name == 'WindowWidget' || currentWidget.constructor.name == 'DoorWidget') { // @TODO OOP polymorphism
						currentWidget.detachFromWall(this.canvasPseudoWidgets);
					}
				}
			}

			this.state.dragHasAlreadyBegun = true;
		}
	}
};


NormalModeController.prototype.translatePrevWidgetAndRememberItsNewPosition = function (allowableDisplacement)
{
	//console.log('normalModeController.state.prevWidget: ', this.state.prevWidget);
	this.state.prevWidget.translate(allowableDisplacement);
	this.addToRememberedPosition(allowableDisplacement);
};

NormalModeController.prototype.mouseUp = function (currentWEPos, eitherTarget)
{
	either(
		canvas => {
			this.state.spaceFocus = {position: currentWEPos, canvasPseudoWidget: this.canvasPseudoWidgetForEitherTarget(eitherTarget)};
			if (this.state.focus) {
				this.state.focus.unshowFocus();
				this.state.focus = null;
				this.statusBarDriver.report('Helyfókusz megjegyezve, alakzatfókusz levéve.');
			}
			else this.statusBarDriver.report('Helyfókusz megjegyezve, leveendő alakzatfókusz nem volt.');
		},
		currentWidget => {
			if (this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun) {
				if (this.state.focus && currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
				this.state.focus = currentWidget; this.state.spaceFocus = null;
				currentWidget.unshowGlittering(); // order 1
				this.state.focus.showFocus();     // order 2: unshowglittering must not undo SVG-<image> styling @TODO alternative solution
				this.statusBarDriver.report('Alakzatfókusz megjegyezve, üreshelyfókusz levéve.');
			}
		},
		eitherTarget
	);
	if (this.state.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
		this.state.prevWidget.unshowGlittering();
		this.statusBarDriver.report('Vonszolás vége.');
	}
	this.state.forgetDrag();
};

NormalModeController.prototype.changeMode = function (mode)
{
	this.state.mode = mode;
	this.statusBarDriver.report('Módváltozás.');
};

NormalModeController.prototype.changeStamp = function (selectedDomainObject)
{
	this.state.setDomainStampFrom(selectedDomainObject);
	this.statusBarDriver.report('Pecsétváltozás.');
};

// @TODO The GU API should introduce a Focus object/interface (like many APIs introduce a Context obejct)
NormalModeController.prototype.createAtPosFocus = function ()
{
	if (this.state.spaceFocus) {
		this.state.spaceFocus.canvasPseudoWidget.figureWidgetFactory.stampAt(this.state.domainStamp, this.state.spaceFocus.position);  // @TODO: refactor to standalone method? @TODO arbitrariness
		this.state.spaceFocus = null;
		this.statusBarDriver.report('Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.');
	} else this.statusBarDriver.report('Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.');
};

NormalModeController.prototype.deleteFigFocus = function ()
{
	if (this.state.focus) {  // @TODO code reuse, DRY
		this.state.focus.delete();
		if (this.state.focus.constructor.name == 'BucketWidget' || this.state.focus.constructor.name == 'PickaxeWidget'  || this.state.focus.constructor.name == 'WindowWidget'  || this.state.focus.constructor.name == 'DoorWidget') { // @TODO: OOP
			this.state.focus.restoreOn(this.canvasPseudoWidgets[2]);
		}
		this.state.focus = null;
		this.statusBarDriver.report('A fókuszált alakat törlése.');
	} else{
		this.statusBarDriver.report('Nincs kijelölve alakzatfókusz, nincs mit törölni.');
	}
};

NormalModeController.prototype.leaveFigFocus = function ()
{
	if (this.state.focus) {
		this.state.focus.unshowFocus();
		this.state.focus = null;
		this.statusBarDriver.report('Alakzatfókusz levétele.');
	}
	else this.statusBarDriver.report('Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.');
};

NormalModeController.prototype.focusLeft  = function () {if (this.state.focus) {this.state.focus.translate([-this.epsilonDistance,  0]);}};
NormalModeController.prototype.focusRight = function () {if (this.state.focus) {this.state.focus.translate([ this.epsilonDistance,  0]);}};
NormalModeController.prototype.focusUp    = function () {if (this.state.focus) {this.state.focus.translate([ 0,  this.epsilonDistance]);}};
NormalModeController.prototype.focusDown  = function () {if (this.state.focus) {this.state.focus.translate([ 0, -this.epsilonDistance]);}};

NormalModeController.prototype.focusRotateCW      = function () {if (this.state.focus) {this.state.focus.rotate(-this.epsilonAngle);}};
NormalModeController.prototype.focusRotateCCW     = function () {if (this.state.focus) {this.state.focus.rotate( this.epsilonAngle);}};
NormalModeController.prototype.focusRotateCWFast  = function () {if (this.state.focus) {this.state.focus.rotate(-this.epsilonAngle*100);}};
NormalModeController.prototype.focusRotateCCWFast = function () {if (this.state.focus) {this.state.focus.rotate( this.epsilonAngle*100);}};

NormalModeController.prototype.focusReflectVerticallyRef   = function () {if (this.state.focus) {this.state.focus.reflectVerticallyRef  ();}};
NormalModeController.prototype.focusReflectHorizontallyRef = function () {if (this.state.focus) {this.state.focus.reflectHorizontallyRef();}};

NormalModeController.prototype.focusScaleSmaller     = function () {if (this.state.focus) {this.state.focus.scale(1-this.epsilonAngle);}};
NormalModeController.prototype.focusScaleBigger      = function () {if (this.state.focus) {this.state.focus.scale(1+this.epsilonAngle);}};
NormalModeController.prototype.focusScaleSmallerFast = function () {if (this.state.focus) {this.state.focus.scale(1-this.epsilonAngle*100);}};
NormalModeController.prototype.focusScaleBiggerFast  = function () {if (this.state.focus) {this.state.focus.scale(1+this.epsilonAngle*100);}};

NormalModeController.prototype.focusScaleHorizontallySmallerRef     = function () {if (this.state.focus) {this.state.focus.scaleXRef(1-this.epsilonAngle    );}};
NormalModeController.prototype.focusScaleHorizontallyBiggerRef      = function () {if (this.state.focus) {this.state.focus.scaleXRef(1+this.epsilonAngle    );}};
NormalModeController.prototype.focusScaleVerticallySmallerRef       = function () {if (this.state.focus) {this.state.focus.scaleYRef(1-this.epsilonAngle    );}};
NormalModeController.prototype.focusScaleVerticallyBiggerRef        = function () {if (this.state.focus) {this.state.focus.scaleYRef(1+this.epsilonAngle    );}};
NormalModeController.prototype.focusScaleHorizontallySmallerFastRef = function () {if (this.state.focus) {this.state.focus.scaleXRef(1-this.epsilonAngle*100);}};
NormalModeController.prototype.focusScaleHorizontallyBiggerFastRef  = function () {if (this.state.focus) {this.state.focus.scaleXRef(1+this.epsilonAngle*100);}};
NormalModeController.prototype.focusScaleVerticallySmallerFastRef   = function () {if (this.state.focus) {this.state.focus.scaleYRef(1-this.epsilonAngle*100);}};
NormalModeController.prototype.focusScaleVerticallyBiggerFastRef    = function () {if (this.state.focus) {this.state.focus.scaleYRef(1+this.epsilonAngle*100);}};

NormalModeController.prototype.focusScaleXYArealInvariantRef       = function () {if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+this.epsilonAngle);}};
NormalModeController.prototype.focusUnscaleXYArealInvariantRef     = function () {if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+this.epsilonAngle);}};
NormalModeController.prototype.focusScaleXYArealInvariantFastRef   = function () {if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+this.epsilonAngle*100);}};
NormalModeController.prototype.focusUnscaleXYArealInvariantFastRef = function () {if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+this.epsilonAngle*100);}};


/** Actions */

NormalModeController.prototype.rememberWidget            = function (currentWidget) {this.state.prevWidget = currentWidget;};
NormalModeController.prototype.rememberPosition          = function (currentWEPos ) {this.state.prevWEPos  = currentWEPos;};
NormalModeController.prototype.addToRememberedPosition   = function (displacement ) {this.state.prevWEPos  = addVec(this.state.prevWEPos, displacement);};

/** Conditions */

NormalModeController.prototype.samePlaceUpAsDown           = function (currentWidget) {return currentWidget.high == this.state.prevWidget.high;};
//NormalModeController.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
//NormalModeController.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//NormalModeController.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
