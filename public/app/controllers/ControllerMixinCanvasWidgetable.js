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
