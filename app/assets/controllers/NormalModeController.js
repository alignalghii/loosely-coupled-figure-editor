function NormalModeController(state, widgetFactories, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetFactories   = widgetFactories;
	//this.widgetCollision = widgetCollision;

	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';

	this.epsilonDistance = widgetFactories[0].coordSysTransformer.epsilonDistance(); // @TODO Demeter priciple // @TODO: this arbitrary choice hides a conceptual smell
	this.epsilonAngle    = widgetFactories[0].coordSysTransformer.epsilonAngle();    // @TODO Demeter priciple // @TODO: this arbitrary choice hides a conceptual smell
}

NormalModeController.prototype = Object.create(Controller.prototype);
NormalModeController.prototype.constructor = NormalModeController;

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
NormalModeController.prototype.mouseDown = function (position, eitherTarget)
{
	this.state.forgetDrag();
	either(
		canvas => {
			this.msgConsole.innerHTML = 'Üres helyhez vagy helypozícióhoz kötődő művelet várható...';
		},
		currentWidget => {
			this.rememberWidget(currentWidget);
			this.rememberPosition(position);
			currentWidget.showGlittering();
			this.msgConsole.innerHTML = 'Adott alakzaton vagy vonszolás, vagy egyéb művelet várható...';
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
			const {bijectionSvgToGeom: targetBoard, bijectionGeomToDomain: targetBusinessBoard} = this.widgetFactoryForCanvas(targetCanvas);
			this.jumpWidgetToIfNeeded(targetCanvas, targetBoard, targetBusinessBoard);
			const mbAllowable = this.state.prevWidget.domainObject.mbVectorTransfomationForAllowance(targetBoard)(infinitezimalDisplacement);
			const allowable = fromMaybe_exec(
				() => {this.msgConsole.innerHTML = 'Tiltott zóna!'; return [0, 0];},
				mbAllowable
			);
			this.translatePrevWidgetAndRememberItsNewPosition(allowable);
			if (vectorLength(infinitezimalDisplacement) > 0 && vectorLength(allowable) == 0) this.msgConsole.innerHTML = 'Vonszolás &bdquo;kifeszítése&rdquo; ütközőfogásból ' + JSON.stringify(infinitezimalDisplacement) + ' irányban.';
			this.state.dragHasAlreadyBegun = true;
		}
	}
};

NormalModeController.prototype.jumpWidgetToIfNeeded = function (targetCanvas, targetBoard, targetBusinessBoard)
{
	maybeMap(
		jumpingWidget => {
			jumpingWidget.jumpTo(targetCanvas, targetBoard, targetBusinessBoard);
			this.msgConsole.innerHTML = 'Alakzat átugrasztása vásznak között!';
		},
		this.maybeJumpingWidget(targetCanvas)
	);
};

NormalModeController.prototype.maybeJumpingWidget = function (targetCanvas)
{
	return this.state.prevWidget && this.state.prevWidget.low.parentNode != targetCanvas
	     ? ['just', this.state.prevWidget]
	     : ['nothing'];
};

NormalModeController.prototype.translatePrevWidgetAndRememberItsNewPosition = function (allowableDisplacement)
{
	this.state.prevWidget.translate(allowableDisplacement);
	this.addToRememberedPosition(allowableDisplacement);
};

NormalModeController.prototype.mouseUp = function (currentWEPos, eitherTarget)
{
	either(
		canvas => {
			this.state.spaceFocus = currentWEPos;
			if (this.state.focus) {
				this.state.focus.unshowFocus();
				this.state.focus = null;
				this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, alakzatfókusz levéve.';
			}
			else this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, leveendő alakzatfókusz nem volt.';
		},
		currentWidget => {
			if (this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun) {
				if (this.state.focus && currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
				this.state.focus = currentWidget; this.state.spaceFocus = null;
				this.state.focus.showFocus();
				currentWidget.unshowGlittering();
				this.msgConsole.innerHTML = 'Alakzatfókusz megjegyezve, üreshelyfókusz levéve.';
			}
		},
		eitherTarget
	);
	if (this.state.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
		this.state.prevWidget.unshowGlittering();
		this.msgConsole.innerHTML = 'Vonszolás vége.';
	}
	this.state.forgetDrag();
};

NormalModeController.prototype.changeMode = function (mode)
{
	this.state.mode = mode;
	this.msgConsole.innerHTML = 'Módváltozás.';
};

NormalModeController.prototype.changeStamp = function (selectedDomainObject)
{
	this.state.setDomainStampFrom(selectedDomainObject);
	this.msgConsole.innerHTML = 'Pecsétváltozás.';
};

// @TODO The GU API should introduce a Focus object/interface (like many APIs introduce a Context obejct)
NormalModeController.prototype.createAtPosFocus = function ()
{
	if (this.state.spaceFocus) {
		this.widgetFactories[0].stampAt(this.state.domainStamp, this.state.spaceFocus);  // @TODO: parent-child autodetect, or explicit arg passing
		this.state.spaceFocus = null;
		this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
	} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
};

NormalModeController.prototype.deleteFigFocus = function ()
{
	if (this.state.focus) {this.state.focus.delete(); this.state.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
	else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
};

NormalModeController.prototype.leaveFigFocus = function ()
{
	if (this.state.focus) {
		this.state.focus.unshowFocus();
		this.state.focus = null;
		this.msgConsole.innerHTML = 'Alakzatfókusz levétele.';
	}
	else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.';
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
