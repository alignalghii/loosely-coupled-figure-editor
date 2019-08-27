function Controller () {} // abstract

Controller.prototype.widgetFactoryForEitherTarget = function (eitherTarget) {return this.widgetFactoryForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.widgetFactoryForCanvas       = function (canvas      ) {return selectWidgetFactoryForCanvas(canvas, this.widgetFactories     );};
