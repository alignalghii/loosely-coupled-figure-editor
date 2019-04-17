function WidgetPillar(coordSysTransformer, bijectionUp, svgLowLevel)
{
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.svgLowLevel         = svgLowLevel;
}

WidgetPillar.prototype.create = function (geomFigure)
{
	var geomNewFigure     = geomFigure.translation([0,0]); // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};

WidgetPillar.prototype.subscribe = function (typeName, emptyCase, widgetCase) // this should send up also the high-level information: bijectionUp, coorsSysTr.lowToHigh, (maybe also colliision?)
{
	var widgetPillar = this;
	function handler(event)
	{
		var target = event.target;
		var svgPosition  = widgetPillar.svgLowLevel.eventPosition(event);   //  \
		var geomPosition = widgetPillar.coordSysTransformer.lowToHigh(svgPosition);  //  > delegate to a small svgLowLevel function
		var isEmpty = target == widgetPillar.svgLowLevel.svgRootElement;    //  /
		var widgetEventPosition = new WidgetEventPosition(widgetPillar, geomPosition, svgPosition);
		if (!isEmpty) {
			var geomFigure = widgetPillar.bijectionUp.get(target);
			var widgetInstance = new WidgetInstance(widgetPillar, geomFigure, target);
			return widgetCase(widgetInstance, widgetEventPosition);
		} else {
			return emptyCase(widgetEventPosition);
		}
	}
	this.svgLowLevel.svgRootElement.addEventListener(typeName, handler);
};
