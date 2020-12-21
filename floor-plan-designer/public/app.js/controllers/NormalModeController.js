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

Object.assign(NormalModeController.prototype, ControllerMixinCanvasWidgetable);
Object.assign(NormalModeController.prototype, ControllerMixinHistoryFollowable);

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
NormalModeController.prototype.mouseDown = function (position, eitherTarget)
{
	this.state.forgetDrag();
	this.rememberPosition(position);
	this.state.prevCanvas = canvasOfEitherTarget(eitherTarget);
	this.state.isMouseDown = true;
	either(
		canvas => this.statusBarDriver.report('Üres helyhez vagy helypozícióhoz kötődő művelet várható...'),
		currentWidget => {
			this.rememberWidget(currentWidget);
			currentWidget.showGlittering();
			this.statusBarDriver.report('Adott alakzaton vagy vonszolás, vagy egyéb művelet várható...');
		},
		eitherTarget
	);
};

NormalModeController.prototype.mouseMove = function (currentWEPos, eitherTarget, mouseButton)
{
	if (this.state.prevWidget) {
		if (!this.state.hasCollided) {
			var infinitezimalDisplacement  = fromTo(this.state.prevWEPos, currentWEPos);
			if (vectorLength(infinitezimalDisplacement) > 0) { // drag event provides sometimes also 0-displacements, we filter them out for better clarity's sake
				const targetCanvas = canvasOfEitherTarget(eitherTarget);
				const canvasPseudoWidget = this.canvasPseudoWidgetForCanvas(targetCanvas);

				if (this.state.prevWidget) {
					const jumpStatus = JumpStatus.detect(this.state.prevWidget, canvasPseudoWidget);
					const jumpExecStatus = jumpStatus.executeIfSo(this.canvasPseudoWidgets, [[0, 1, 2], [4]]); // @TODO wrong synergy with collision detecton
					jumpExecStatus.maybeAllow.map(
						allow => this.statusBarDriver.report(allow ? 'Alakzat átugrasztása vásznak között!' : 'Gazdaobjektuma nélkül nem ugrasztható át!')
					);
					if (jumpExecStatus.releaseDrag) {
						this.state.forgetDrag(); // it assigns null to `this.state.prevWidget`, thus it must come here at the end of the upper big if-block!
					} else {
						const [mbAllowable, minFallTargetFigures] = this.state.prevWidget.allowable_(infinitezimalDisplacement);
						const allowable0 = fromMaybe_exec(
							() => { // @TODO: an axception should be thrown rather
								this.statusBarDriver.report('<span class="error">Tiltott zóna!</span>');
								this.audioDriver.ouch();
								return infinitezimalDisplacement;
							},
							mbAllowable
						);
						const {displacement: allowable, maybeAngle: maybeAngle} = this.state.prevWidget.isShapeshifter() ?
							this.state.prevWidget.shapeshifterSlide(allowable0, currentWEPos)                        :
							{displacement: allowable0, maybeAngle: Maybe.nothing()}; // @TODO design a standalone class for it, and delegete tasks to it @TODO use >>= as for a Maybe-monad
							maybeAngle.map(
								angle => angle // TransformRewriter.createAsRerotated_excp(this.state.prevWidget.low, angle-90) @TODO!!!!
							);

						if ( // @TODO seems to be unnecessary: either condition always holds, or the action is not too important
							!jumpStatus.explicitDeny() && // !vecEq(maybeAllowJump, ['just', false])
							(
								this.state.prevWidget.isShapeshifter() ||
								!this.state.focus || this.state.focus.eq(this.state.prevWidget)
							)
						) { // @TODO contract with code hadling window and door actors, and use an OOP polymorphism approach
							this.translatePrevWidgetAndRememberItsNewPosition(allowable);
						}

						if (vectorLength(infinitezimalDisplacement) > 0 && vectorLength(allowable) == 0) {
							this.statusBarDriver.report(`Vonszolás &bdquo;kifeszítése&rdquo; ütközőfogásból ${JSON.stringify(infinitezimalDisplacement)} irányban.`);
						}


						if (!ccVecEq(allowable, infinitezimalDisplacement)) {
							if (minFallTargetFigures.length == 1)
								this.state.prevWidget.collisionActionSpecialty(this, canvasPseudoWidget, minFallTargetFigures[0], currentWEPos);
						}

						if (this.state.prevWidget && this.state.prevWidget.isActor()) { // @TODO OOP @TODO build the condition into `manageAttachments`
							this.state.prevWidget.manageAttachments(this);
						}
					}
				}
				this.state.dragHasAlreadyBegun = true;
			}
		}
	} else {
		// Vászonmozgatás:
		if (this.state.prevWEPos && mouseButton == 1) {
			const v = fromTo(this.state.prevWEPos, currentWEPos);
			const targetCanvas_ = canvasOfEitherTarget(eitherTarget);
			const canvasPseudoWidget_ = this.canvasPseudoWidgetForCanvas(targetCanvas_);
			if (targetCanvas_ == this.state.prevCanvas) {
				canvasPseudoWidget_.hostlessWidgets().map(w => w.translate(v));
				this.state.prevWEPos = currentWEPos;
			}
		}
	}
};


/**
if (!this.state.focus || this.state.focus && this.state.focus.high != currentWidget.high) {
	// @TODO DRY, copypasted from `mouseDown` method
	if (this.state.focus && currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
	this.state.focus = currentWidget; this.state.spaceFocus = null;
	currentWidget.unshowGlittering(); // order 1
	this.state.focus.showFocus();     // order 2: unshowglittering must not undo SVG-<image> styling @TODO alternative solution
	this.statusBarDriver.addReport('Alakzatfókusz automatikusan megjegyezve, üreshelyfókusz levéve.');
}
if (this.state.focus && this.state.focus.high == currentWidget.high) {
	// @TODO DRY, copypasted from `mouseDown` method, and modified somewhat
	//if (this.state.focus) {
		this.state.focus.unshowFocus();
		this.state.focus = null;
		this.statusBarDriver.addReport('Automatikus alakzatfókusz levéve.');
	//}

}
*/
/*NormalModeController.prototype.manageAttachments = function (canvasPseudoWidget) // @TODO use `this.state.prevWidget.centroid` instead of `currentWEPos`
{
	const attachmentsHub = new AttachmentsHub(this.state.prevWidget, canvasPseudoWidget); // @TODO redefine and delegate into `AttachmentsHub`
	attachmentsHub.run(this); // @TODO factor out controller dependent parts + delagate more to AttHub
};*/


NormalModeController.prototype.translatePrevWidgetAndRememberItsNewPosition = function (allowableDisplacement)
{
	//console.log('normalModeController.state.prevWidget: ', this.state.prevWidget);
	this.state.prevWidget.translate(allowableDisplacement);
	this.addToRememberedPosition(allowableDisplacement);
};

NormalModeController.prototype.mouseUp = function (currentWEPos, eitherTarget)
{
	this.state.prevCanvas  = null;
	this.state.isMouseDown = false;
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



NormalModeController.prototype.doubleClick = function (currentWEPos, eitherTarget)
{
	this.statusBarDriver.report(
		'Duplakattintás ' + eitherTarget.either(
			cnv => 'üres vászonfelületen',
			wdg => `${wdg.constructor.name} alakzaton`
		) + '!'
	);
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
