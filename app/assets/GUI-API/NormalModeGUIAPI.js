function NormalModeGUIAPI(state, widgetCollision, coordSysTransformer, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetCollision = widgetCollision;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();
}

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
NormalModeGUIAPI.prototype.mouseDown = function (position, widget = null)
{
	this.state.forgetDrag();
	if (widget) {
		this.rememberWidget(widget);
		this.rememberPosition(position);
		widget.showGlittering();
		this.msgConsole.innerHTML = 'Adott alakzaton vagy vonszolás, vagy egyéb művelet várható...';
	} else this.msgConsole.innerHTML = 'Üres helyhez vagy helypozícióhoz kötődő művelet várható...';
};

NormalModeGUIAPI.prototype.mouseMove = function (currentWEPos)
{
	if (this.state.prevWidgetHasNotCollidedYet()) {
		if (this.followWhileCheckCollision(currentWEPos)) {
			this.state.prevWidget.unshowGlittering(); // @TODO
			this.msgConsole.innerHTML = 'Ütközés!';
		}
		this.rememberPosition(currentWEPos);
		this.state.dragHasAlreadyBegun = true;
	}
};

NormalModeGUIAPI.prototype.mouseUp = function (currentWEPos, currentWidget = null)
{
	if (currentWidget && this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun) {
		if (this.state.focus && currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
		this.state.focus = currentWidget; this.state.spaceFocus = null;
		this.state.focus.showFocus();
		currentWidget.unshowGlittering();
		this.msgConsole.innerHTML = 'Alakzatfókusz megjegyezve, üreshelyfókusz levéve.';
	}
	if (this.state.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
		this.state.prevWidget.update(this.state.prevWEPos, currentWEPos);
		this.state.prevWidget.unshowGlittering();
		this.msgConsole.innerHTML = 'Vonszolás vége.';
	}
	if (!currentWidget) {
		this.state.spaceFocus = currentWEPos;
		if (this.state.focus) {
			this.state.focus.unshowFocus();
			this.state.focus = null;
			this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, alakzatfókusz levéve.';
		}
		else this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, leveendő alakzatfókusz nem volt.';
	}
	this.state.forgetDrag();
};

NormalModeGUIAPI.prototype.changeMode = function (mode)
{
	this.state.mode = mode;
	this.msgConsole.innerHTML = 'Módváltozás.';
};

NormalModeGUIAPI.prototype.changeStamp = function (selectedFigure)
{
	this.state.setStampFigureFrom(selectedFigure);
	this.msgConsole.innerHTML = 'Pecsétváltozás.';
};

// @TODO The GU API should introduce a Focus object/interface (like many APIs introduce a Context obejct)
NormalModeGUIAPI.prototype.createAtPosFocus = function ()
{
	if (this.state.spaceFocus) {
		this.state.spaceFocus.create(this.state.stampFigure);
		this.state.spaceFocus = null;
		this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
	} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
};

NormalModeGUIAPI.prototype.deleteFigFocus = function ()
{
	if (this.state.focus) {this.state.focus.delete(); this.state.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
	else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
};

NormalModeGUIAPI.prototype.leaveFigFocus = function ()
{
	if (this.state.focus) {
		this.state.focus.unshowFocus();
		this.state.focus = null;
		this.msgConsole.innerHTML = 'Alakzatfókusz levétele.';
	}
	else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.';
};

NormalModeGUIAPI.prototype.focusLeft  = function () {if (this.state.focus) {this.state.focus.translate([-this.epsilonDistance,  0]);}};
NormalModeGUIAPI.prototype.focusRight = function () {if (this.state.focus) {this.state.focus.translate([ this.epsilonDistance,  0]);}};
NormalModeGUIAPI.prototype.focusUp    = function () {if (this.state.focus) {this.state.focus.translate([ 0,  this.epsilonDistance]);}};
NormalModeGUIAPI.prototype.focusDown  = function () {if (this.state.focus) {this.state.focus.translate([ 0, -this.epsilonDistance]);}};

NormalModeGUIAPI.prototype.focusRotateCW      = function () {if (this.state.focus) {this.state.focus.rotate(-this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusRotateCCW     = function () {if (this.state.focus) {this.state.focus.rotate( this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusRotateCWFast  = function () {if (this.state.focus) {this.state.focus.rotate(-this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusRotateCCWFast = function () {if (this.state.focus) {this.state.focus.rotate( this.epsilonAngle*100);}};

NormalModeGUIAPI.prototype.focusReflectVerticallyRef   = function () {if (this.state.focus) {this.state.focus.reflectVerticallyRef  ();}};
NormalModeGUIAPI.prototype.focusReflectHorizontallyRef = function () {if (this.state.focus) {this.state.focus.reflectHorizontallyRef();}};

NormalModeGUIAPI.prototype.focusScaleSmaller     = function () {if (this.state.focus) {this.state.focus.scale(1-this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusScaleBigger      = function () {if (this.state.focus) {this.state.focus.scale(1+this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusScaleSmallerFast = function () {if (this.state.focus) {this.state.focus.scale(1-this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusScaleBiggerFast  = function () {if (this.state.focus) {this.state.focus.scale(1+this.epsilonAngle*100);}};

NormalModeGUIAPI.prototype.focusScaleHorizontallySmallerRef     = function () {if (this.state.focus) {this.state.focus.scaleXRef(1-this.epsilonAngle    );}};
NormalModeGUIAPI.prototype.focusScaleHorizontallyBiggerRef      = function () {if (this.state.focus) {this.state.focus.scaleXRef(1+this.epsilonAngle    );}};
NormalModeGUIAPI.prototype.focusScaleVerticallySmallerRef       = function () {if (this.state.focus) {this.state.focus.scaleYRef(1-this.epsilonAngle    );}};
NormalModeGUIAPI.prototype.focusScaleVerticallyBiggerRef        = function () {if (this.state.focus) {this.state.focus.scaleYRef(1+this.epsilonAngle    );}};
NormalModeGUIAPI.prototype.focusScaleHorizontallySmallerFastRef = function () {if (this.state.focus) {this.state.focus.scaleXRef(1-this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusScaleHorizontallyBiggerFastRef  = function () {if (this.state.focus) {this.state.focus.scaleXRef(1+this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusScaleVerticallySmallerFastRef   = function () {if (this.state.focus) {this.state.focus.scaleYRef(1-this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusScaleVerticallyBiggerFastRef    = function () {if (this.state.focus) {this.state.focus.scaleYRef(1+this.epsilonAngle*100);}};

NormalModeGUIAPI.prototype.focusScaleXYArealInvariantRef       = function () {if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusUnscaleXYArealInvariantRef     = function () {if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+this.epsilonAngle);}};
NormalModeGUIAPI.prototype.focusScaleXYArealInvariantFastRef   = function () {if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+this.epsilonAngle*100);}};
NormalModeGUIAPI.prototype.focusUnscaleXYArealInvariantFastRef = function () {if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+this.epsilonAngle*100);}};


/** Actions */

NormalModeGUIAPI.prototype.rememberWidget            = function (currentWidget) {this.state.prevWidget = currentWidget;};
NormalModeGUIAPI.prototype.rememberPosition          = function (currentWEPos ) {this.state.prevWEPos  = currentWEPos;};
NormalModeGUIAPI.prototype.followWhileCheckCollision = function (currentWEPos ) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(this.state.prevWidget, this.state.prevWEPos, currentWEPos);};

/** Conditions */

NormalModeGUIAPI.prototype.samePlaceUpAsDown           = function (currentWidget) {return currentWidget.high == this.state.prevWidget.high;};
//NormalModeGUIAPI.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
//NormalModeGUIAPI.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//NormalModeGUIAPI.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
