// @TODO common ancestor with `WigetEventPosition`. Note also the formal sameness of the constructors (only the typing differs)
function WidgetInstance(widgetPillar, high, low)
{
	this.widgetPillar = widgetPillar;
	this.high = high;
	this.low  = low;
}

WidgetInstance.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

WidgetInstance.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};

WidgetInstance.prototype.update = function (prevPos, currentPos)
{
	var geomDisplacement  = fromTo(prevPos.high, currentPos.high);
	this.high.doTranslation(geomDisplacement);
	this.updateDownward();
};

WidgetInstance.prototype.updateDownward = function ()
{
	var svgVertices = this.high.vertices.map((p) => this.widgetPillar.coordSysTransformer.highToLow(p));
	this.widgetPillar.svgLowLevel.updatePolygonChild(this.low, svgVertices);
};

WidgetInstance.prototype.delete = function ()
{
	this.widgetPillar.bijectionUp.delete(this.low);
	this.widgetPillar.svgLowLevel.deletePolygonChild(this.low);
};
