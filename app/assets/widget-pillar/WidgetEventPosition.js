// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part

// @TODO common ancestor with `WigetInstance`. Note also the formal sameness of the constructors (only the typing differs)
function WidgetEventPosition(widgetFactory, high, low)
{
	this.widgetFactory = widgetFactory;
	this.high = high;
	this.low  = low;
}

WidgetEventPosition.prototype.create = function (originFigure) // @TODO swap object receiver and argument around method
{
	var geomNewFigure     = originFigure.translation(this.high);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.widgetFactory.coordSysTransformer.highToLow(p));
	var svgNewPolygonCild = this.widgetFactory.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.widgetFactory.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};
