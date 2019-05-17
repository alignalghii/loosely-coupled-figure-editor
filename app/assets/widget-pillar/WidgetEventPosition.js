// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part

// @TODO common ancestor with `WigetInstance`. Note also the formal sameness of the constructors (only the typing differs)
function WidgetEventPosition(coordSysTransformer, bijectionSvgToGeom, svgLowLevel, high, low)
{
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionSvgToGeom         = bijectionSvgToGeom;
	this.svgLowLevel         = svgLowLevel;

	this.high = high;
	this.low  = low;
}

WidgetEventPosition.prototype.create = function (originFigure) // @TODO swap object receiver and argument around method
{
	var geomNewFigure     = originFigure.translation(this.high);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionSvgToGeom.set(svgNewPolygonCild, geomNewFigure);
};
