function Controller () {} // abstract

Controller.prototype.widgetFactoryForEitherTarget = function (eitherTarget) {return this.widgetFactoryForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.widgetFactoryForCanvas       = function (canvas      ) {return selectWidgetFactoryForCanvas(canvas, this.widgetFactories     );};

Controller.prototype.jumpWidgetToIfNeeded = function (targetCanvas, targetBoard, targetBusinessBoard)
{
	maybeMap(
		jumpingWidget => {
			jumpingWidget.jumpTo(targetCanvas, targetBoard, targetBusinessBoard);
			this.msgConsole.innerHTML = 'Alakzat átugrasztása vásznak között!';
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
