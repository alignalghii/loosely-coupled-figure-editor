function CompactModeController(state, canvasPseudoWidgets, widgetCollision, statusBarDriver) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.widgetCollision = widgetCollision;

	this.statusBarDriver = statusBarDriver;
	this.statusBarDriver.greet();
}

Object.assign(CompactModeController.prototype, ControllerMixinCanvasWidgetable);

// @TODO The GU API should introduce a Mouse object/interface? (like many APIs introduce a Context obejct)
CompactModeController.prototype.mouseDown = function (position, eitherTarget)
{
	this.state.forgetDrag();
	eitherEMap(
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
		const {bijectionSvgToGeom: targetBoard, partialFunctionGeomToBusiness: targetBusinessBoard} = this.canvasPseudoWidgetForEitherTarget(eitherTarget);
		this.jumpWidgetToIfNeeded(targetCanvas, targetBoard, targetBusinessBoard);

		if (this.followWhileCheckCollision(currentWEPos, targetBoard)) this.state.prevWidget.unshowGlittering(); // @TODO
		this.rememberPosition(currentWEPos);
		this.state.dragHasAlreadyBegun = true;
	}
};

CompactModeController.prototype.mouseUp = function (currentWEPos, eitherTarget)
{
	eitherEMap(
		currentWidget => {
			if (this.state.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun)
				currentWidget.delete();
		},
		eitherTarget
	);
	if (!this.state.prevWidget)
		this.canvasPseudoWidgetForEitherTarget(eitherTarget).stampAt(this.state.domainStamp, currentWEPos);
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
