function Controller () {} // abstract

Controller.prototype.widgetFactoryForCanvas = function (canvas) {return selectWidgetFactoryForCanvas(canvas, this.widgetFactories);};
