function Controller () {} // abstract

Controller.prototype.widgetFactoryForEitherTarget = function (eitherTarget) {return this.widgetFactoryForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.widgetFactoryForCanvas       = function (canvas      ) {return selectWidgetFactoryForCanvas(canvas, this.widgetFactories     );};

Controller.prototype.jumpWidgetToIfNeeded = function (targetCanvas, targetBoard, targetBusinessBoard)
{
	const targetWidgetFactory = this.widgetFactoryForCanvas(targetCanvas);
	const targetCoordSysTransfomer = targetWidgetFactory.coordSysTransformer; // @TODO: in the `Widget` class, use widgetfactory as a component/collaborator instead of coordSysTransformer!
	maybeMap(
		jumpingWidget => {
			jumpingWidget.jumpTo(targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
			this.statusBarDriver.report('Alakzat átugrasztása vásznak között!');
		},
		this.maybeJumpingWidget(targetCanvas)
	);
};

Controller.prototype.maybeJumpingWidget = function (targetCanvas)
{
	return this.state.prevWidget && this.state.prevWidget.low.parentNode != targetCanvas
	     ? ['just', this.state.prevWidget]
	     : ['nothing'];
};
