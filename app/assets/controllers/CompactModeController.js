function CompactModeController(state, widgetCollision, coordSysTransformer, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetCollision = widgetCollision;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();
}

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
CompactModeController.prototype.mouseDown = function (position, widget = null)
{
	this.state.forgetDrag();
	if (widget) {
		this.rememberWidget(widget);
		this.rememberPosition(position);
		widget.showGlittering();
	}
};

CompactModeController.prototype.mouseMove = function (currentWEPos)
{
	if (this.state.prevWidgetHasNotCollidedYet()) {
		if (this.followWhileCheckCollision(currentWEPos)) this.state.prevWidget.unshowGlittering(); // @TODO
		this.rememberPosition(currentWEPos);
		this.state.dragHasAlreadyBegun = true;
	}
};

CompactModeController.prototype.mouseUp = function (currentWEPos, currentWidget = null)
{
	if (currentWidget && this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun)
		currentWidget.delete();
	if (this.state.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
		this.state.prevWidget.update(this.state.prevWEPos, currentWEPos);
		this.state.prevWidget.unshowGlittering();
	}
	if (!this.state.prevWidget)
		currentWEPos.create(this.state.stampFigure);
	this.state.forgetDrag();
};


/** Actions */

CompactModeController.prototype.rememberWidget            = function (currentWidget) {this.state.prevWidget = currentWidget;};
CompactModeController.prototype.rememberPosition          = function (currentWEPos ) {this.state.prevWEPos  = currentWEPos;};
CompactModeController.prototype.followWhileCheckCollision = function (currentWEPos ) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(this.state.prevWidget, this.state.prevWEPos, currentWEPos);};

/** Conditions */

CompactModeController.prototype.samePlaceUpAsDown           = function (currentWidget) {return currentWidget.high == this.state.prevWidget.high;};
//CompactModeController.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
//CompactModeController.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//CompactModeController.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
