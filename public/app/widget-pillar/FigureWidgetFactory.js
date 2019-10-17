function FigureWidgetFactory(canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness)
{
	WidgetFactory.call(this, canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom);
	this.partialFunctionGeomToBusiness = partialFunctionGeomToBusiness;
}

FigureWidgetFactory.prototype = Object.create(WidgetFactory.prototype);

FigureWidgetFactory.prototype.constructor = FigureWidgetFactory;

FigureWidgetFactory.prototype.composeFromHigh = function (geomFigure)
{
	const [svgPolygon, room] = this.queryFromHigh(geomFigure);
	return new FigureWidget(this.canvasPseudoWidget, svgPolygon, geomFigure, room);
};

FigureWidgetFactory.prototype.composeFromBusiness = function (room) {return this.composeFromHigh(room.figure);};

FigureWidgetFactory.prototype.createFromBusiness0 = function (businessObject) {return this.createFromReplacedGeom(businessObject.figure, businessObject);};


FigureWidgetFactory.prototype.createFromReplacedGeom = function (geomFigure, businessObject) // @TODO: there will be also other businessobjects than rooms with titles
{
	businessObject.figure = geomFigure;
	const svgVertices       = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	const svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionSvgToGeom.set(svgNewPolygonCild, geomFigure);
	this.partialFunctionGeomToBusiness.set(geomFigure, businessObject);

	this.canvasPseudoWidget.titleWidgetFactory.createFromHigh(businessObject.title); // @TODO: 1) not necessarily all figs have a title 2) there'll be also other businessobs than rooms with titles

	return new FigureWidget(this.canvasPseudoWidget, svgNewPolygonCild, geomFigure, businessObject);
};

FigureWidgetFactory.prototype.createFromBusiness1 = function (businessObjectOriginal)
{
	console.log('Original: ', businessObjectOriginal);
	const businessObject = businessObjectOriginal.copy();
	console.log('Copy: ', businessObject);
	this.createFromBusiness0(businessObject);
};

FigureWidgetFactory.prototype.stampAt = function (businessStamp, geomCoords) // @TODO swap object receiver and argument around method
{
	const businessObject      = businessStamp.copy();
	businessObject.doTranslation(geomCoords);
	return this.createFromBusiness0(businessObject);
};
