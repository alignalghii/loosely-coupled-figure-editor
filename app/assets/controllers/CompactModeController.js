function CompactModeController(state, widgetFactories, widgetCollision, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetFactories = widgetFactories;
	this.widgetCollision = widgetCollision;

	this.msgConsole      = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
}

CompactModeController.prototype = Object.create(Controller.prototype);

CompactModeController.prototype.constructor = CompactModeController;

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
CompactModeController.prototype.mouseDown = function (position, eitherTarget)
{
	this.state.forgetDrag();
	eitherAMap(
		currentWidget => {
			this.rememberWidget(currentWidget);
			this.rememberPosition(position);
			currentWidget.showGlittering();
		},
		eitherTarget
	);
};

CompactModeController.prototype.mouseMove = function (currentWEPos, eitherTarget)
{
	if (this.state.prevWidgetHasNotCollidedYet()) {
		const targetCanvas = canvasOfEitherTarget(eitherTarget);
		const {bijectionSvgToGeom: targetBoard, bijectionGeomToDomain: targetBusinessBoard} = this.widgetFactoryForEitherTarget(eitherTarget);
		this.jumpWidgetToIfNeeded(targetCanvas, targetBoard, targetBusinessBoard);

		if (this.followWhileCheckCollision(currentWEPos, targetBoard)) this.state.prevWidget.unshowGlittering(); // @TODO
		this.rememberPosition(currentWEPos);
		this.state.dragHasAlreadyBegun = true;
	}
};

CompactModeController.prototype.mouseUp = function (currentWEPos, eitherTarget)
{
	eitherAMap(
		currentWidget => {
			if (this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun)
				currentWidget.delete();
		},
		eitherTarget
	);
	if (!this.state.prevWidget)
		this.widgetFactoryForEitherTarget(eitherTarget).stampAt(this.state.domainStamp, currentWEPos);
	if (this.state.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
		this.state.prevWidget.update(this.state.prevWEPos, currentWEPos);
		this.state.prevWidget.unshowGlittering();
	}
	this.state.forgetDrag();
};


/** Actions */

CompactModeController.prototype.rememberWidget            = function (currentWidget) {this.state.prevWidget = currentWidget;};
CompactModeController.prototype.rememberPosition          = function (currentWEPos ) {this.state.prevWEPos  = currentWEPos;};
CompactModeController.prototype.followWhileCheckCollision = function (currentWEPos, board) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(board, this.state.prevWidget, this.state.prevWEPos, currentWEPos);};

/** Conditions */

CompactModeController.prototype.samePlaceUpAsDown           = function (currentWidget) {return currentWidget.high == this.state.prevWidget.high;};
//CompactModeController.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
//CompactModeController.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//CompactModeController.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
