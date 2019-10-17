function Controller () {} // abstract // @TODO should initialize state, statusBarDriver

Controller.prototype.canvasPseudoWidgetForEitherTarget = function (eitherTarget) {return this.canvasPseudoWidgetForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.canvasPseudoWidgetForCanvas       = function (canvas      ) {return selectCanvasPseudoWidgetForCanvas(canvas, this.canvasPseudoWidgets );};

Controller.prototype.jumpWidgetToIfNeeded = function (targetCanvasPseudoWidget)
{
	const targetCoordSysTransfomer = targetCanvasPseudoWidget.coordSysTransformer; // @TODO: in the `Widget` class, use widgetfactory as a component/collaborator instead of coordSysTransformer!
	return maybeMap(
		jumpingWidget => {
			const isHostless = jumpingWidget.isHostless();
			if (isHostless) {
				jumpingWidget.jumpTo(targetCanvasPseudoWidget);
				this.statusBarDriver.report('Alakzat átugrasztása vásznak között!');
			} else {
				this.statusBarDriver.report('Gazdaobjektuma nélkül nem ugrasztható át!');
			}
			return isHostless;
		},
		this.maybeJumpingWidget(targetCanvasPseudoWidget.low())
	);
};

Controller.prototype.maybeJumpingWidget = function (targetCanvas)
{
	return this.state.prevWidget && this.state.prevWidget.low.parentNode != targetCanvas
	     ? ['just', this.state.prevWidget]
	     : ['nothing'];
};


Controller.prototype.widgetDirectlyOrViaTitle = function (widget)
{
	const {widget: widget_, message: message} = widget.directlyOrViaTitle();
	this.statusBarDriver.report(message);
	return widget_;
};
