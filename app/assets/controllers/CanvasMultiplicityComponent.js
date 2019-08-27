// CakePHP 3.8 Red Velvet Cookbook: ``Components are packages of logic that are shared between controllers'' @link https://book.cakephp.org/3.0/en/controllers/components.html

const selectWidgetFactoryForCanvas = (canvas, widgetFactories) => unsafeFind(factorsOn(canvas), widgetFactories),
      factorsOn                    = canvas  =>  widgetFactory => widgetFactory.svgLowLevel.svgRootElement == canvas;

const canvasOfEitherTarget = eitherTarget =>
	either(
		canvas        => canvas,
		currentWidget => currentWidget.low.parentNode,
		eitherTarget
	);
