// CakePHP 3.8 Red Velvet Cookbook: ``Components are packages of logic that are shared between controllers'' @link https://book.cakephp.org/3.0/en/controllers/components.html

const selectCanvasPseudoWidgetForCanvas = (canvas, canvasPseudoWidgets) => unsafeFind(factorsOn(canvas), canvasPseudoWidgets),
      factorsOn                         = canvas  =>  canvasPseudoWidget => canvasPseudoWidget.low() == canvas; // @TODO very rude arbitrariness

const canvasOfEitherTarget = eitherTarget =>
	either(
		canvas        => canvas,
		currentWidget => currentWidget.low.parentNode,
		eitherTarget
	);
