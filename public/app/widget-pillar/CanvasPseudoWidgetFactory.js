function CanvasPseudoWidgetFactory () {}

CanvasPseudoWidgetFactory.prototype.create = function (svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness)
{
	const figureWidgetFactory = new FigureWidgetFactory(null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness),
	      titleWidgetFactory  = new TitleWidgetFactory (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom                               ),
	      imageWidgetFactory  = new ImageWidgetFactory (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness),

	      batteringRamWidgetFactory = new BatteringRamWidgetFactory(null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom), // some analogy to title and titleWidget @TODO
	      brickWidgetFactory        = new BrickWidgetFactory       (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom); // some analogy to title and titleWidget @TODO
	      pickaxeWidgetFactory      = new PickaxeWidgetFactory     (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom), // some analogy to title and titleWidget @TODO
	      bucketWidgetFactory       = new BucketWidgetFactory      (null, svgLowLevel, coordSysTransformer, bijectionSvgToGeom); // some analogy to title and titleWidget @TODO

	const canvasPseudoWidget  = new CanvasPseudoWidget(figureWidgetFactory, titleWidgetFactory, imageWidgetFactory, batteringRamWidgetFactory, brickWidgetFactory, pickaxeWidgetFactory, bucketWidgetFactory);

	figureWidgetFactory.canvasPseudoWidget = canvasPseudoWidget;
	titleWidgetFactory .canvasPseudoWidget = canvasPseudoWidget;
	imageWidgetFactory .canvasPseudoWidget = canvasPseudoWidget;

	batteringRamWidgetFactory.canvasPseudoWidget = canvasPseudoWidget;
	brickWidgetFactory       .canvasPseudoWidget = canvasPseudoWidget;
	pickaxeWidgetFactory     .canvasPseudoWidget = canvasPseudoWidget;
	bucketWidgetFactory      .canvasPseudoWidget = canvasPseudoWidget;

	return canvasPseudoWidget;
};
