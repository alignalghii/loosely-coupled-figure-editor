// @TODO common ancestor with `WigetInstance`. Note also the formal sameness of the constructors (only the typing differs)
function WidgetEventPosition(widgetPillar, high, low)
{
	this.widgetPillar = widgetPillar;
	this.high = high;
	this.low  = low;
}

WidgetEventPosition.prototype.create = function (originFigure) // @TODO swap object receiver and argument around method
{
	var geomNewFigure     = originFigure.translation(this.high);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.widgetPillar.coordSysTransformer.highToLow(p));
	var svgNewPolygonCild = this.widgetPillar.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.widgetPillar.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};
