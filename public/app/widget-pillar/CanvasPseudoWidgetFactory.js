function CanvasPseudoWidgetFactory () {}

CanvasPseudoWidgetFactory.prototype.create = function (svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness)
{
	const figureWidgetFactory = new FigureWidgetFactory(null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness),
	      titleWidgetFactory  = new TitleWidgetFactory (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom                               ),
	      imageWidgetFactory  = new ImageWidgetFactory (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness);

	const canvasPseudoWidget  = new CanvasPseudoWidget(figureWidgetFactory, titleWidgetFactory, imageWidgetFactory);

	figureWidgetFactory.canvasPseudoWidget = canvasPseudoWidget;
	titleWidgetFactory .canvasPseudoWidget = canvasPseudoWidget;
	imageWidgetFactory .canvasPseudoWidget = canvasPseudoWidget;

	return canvasPseudoWidget;
};
