function Controller () {} // abstract // @TODO should initialize state, statusBarDriver

Controller.prototype.canvasPseudoWidgetForEitherTarget = function (eitherTarget) {return this.canvasPseudoWidgetForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.canvasPseudoWidgetForCanvas       = function (canvas      ) {return selectCanvasPseudoWidgetForCanvas(canvas, this.canvasPseudoWidgets );};

Controller.prototype.widgetDirectlyOrViaTitle = function (widget)
{
	const {widget: widget_, message: message} = widget.directlyOrViaTitle();
	this.statusBarDriver.report(message);
	return widget_;
};
