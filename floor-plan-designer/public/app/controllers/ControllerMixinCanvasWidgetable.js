// @TODO Not all controllers use this, let it be a mixin, not an ancestor? Think of controllers like `ConfigController` that do not need it.
const ControllerMixinCanvasWidgetable =
{
	canvasPseudoWidgetForEitherTarget: function (eitherTarget) {return this.canvasPseudoWidgetForCanvas(canvasOfEitherTarget(eitherTarget));},
	canvasPseudoWidgetForCanvas      : function (canvas      ) {return selectCanvasPseudoWidgetForCanvas(canvas, this.canvasPseudoWidgets );},

	widgetDirectlyOrViaTitle: function (widget)
	{
		const {widget: widget_, message: message} = widget.directlyOrViaTitle();
		this.statusBarDriver.report(message);
		return widget_;
	}
};

// `CanvasMultiplicityComponent` merged into `ControllerMixingCanvasWidgetable` // @TODO
// CakePHP 3.8 Red Velvet Cookbook: ``Components are packages of logic that are shared between controllers'' @link https://book.cakephp.org/3.0/en/controllers/components.html
const selectCanvasPseudoWidgetForCanvas = (canvas, canvasPseudoWidgets) => unsafeFind(factorsOn(canvas), canvasPseudoWidgets),
      factorsOn                         = canvas  =>  canvasPseudoWidget => canvasPseudoWidget.low() == canvas; // @TODO very rude arbitrariness

const canvasOfEitherTarget = eitherTarget =>
	either(
		canvas        => canvas,
		currentWidget => currentWidget.low.parentNode,
		eitherTarget
	);
