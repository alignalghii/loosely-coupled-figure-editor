// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection

function WidgetFactory(coordSysTransformer, bijectionUp, svgLowLevel)
{
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.svgLowLevel         = svgLowLevel;
}

WidgetFactory.prototype.create = function (geomFigure)
{
	var geomNewFigure     = geomFigure.translation([0,0]); // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
	return new Widget(this.coordSysTransformer, this.bijectionUp, this.svgLowLevel, geomNewFigure, svgNewPolygonCild);
};

WidgetFactory.prototype.createWidgetFromLow = function (svgPolygon)
{
	var geomFigure = this.bijectionUp.get(svgPolygon);
	return new Widget(this.coordSysTransformer, this.bijectionUp, this.svgLowLevel, geomFigure, svgPolygon);
};

WidgetFactory.prototype.createWidgetEventPositionFromLow = function (svgPosition)
{
	var geomPosition = this.coordSysTransformer.lowToHigh(svgPosition);
	return new WidgetEventPosition(this.coordSysTransformer, this.bijectionUp, this.svgLowLevel, geomPosition, svgPosition);
};
