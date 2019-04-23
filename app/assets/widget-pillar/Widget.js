// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part

// @TODO common ancestor with `WigetEventPosition`. Note also the formal sameness of the constructors (only the typing differs)
function Widget(coordSysTransformer, bijectionUp, svgLowLevel, high, low)
{
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.svgLowLevel         = svgLowLevel;

	this.high = high;
	this.low  = low;
}

Widget.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

Widget.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};

Widget.prototype.showFocus = function ()
{
	this.high.svgAttributes[FOCUS_ATTR_NAME_1] = FOCUS_VALUE_1; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(FOCUS_ATTR_NAME_1, FOCUS_VALUE_1);
	this.high.svgAttributes[FOCUS_ATTR_NAME_2] = FOCUS_VALUE_2; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(FOCUS_ATTR_NAME_2, FOCUS_VALUE_2);
	this.high.svgAttributes[FOCUS_ATTR_NAME_3] = FOCUS_VALUE_3; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(FOCUS_ATTR_NAME_3, FOCUS_VALUE_3);
	this.high.svgAttributes[FOCUS_ATTR_NAME_4] = FOCUS_VALUE_4; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(FOCUS_ATTR_NAME_4, FOCUS_VALUE_4);
};

Widget.prototype.unshowFocus = function ()
{
	delete this.high.svgAttributes[FOCUS_ATTR_NAME_1]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(FOCUS_ATTR_NAME_1);
	delete this.high.svgAttributes[FOCUS_ATTR_NAME_2]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(FOCUS_ATTR_NAME_2);
	delete this.high.svgAttributes[FOCUS_ATTR_NAME_3]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(FOCUS_ATTR_NAME_3);
	delete this.high.svgAttributes[FOCUS_ATTR_NAME_4]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(FOCUS_ATTR_NAME_4);
};

Widget.prototype.update = function (prevWEPos, currentWEPos)
{
	var geomDisplacement  = fromTo(prevWEPos.high, currentWEPos.high);
	this.high.doTranslation(geomDisplacement);
	this.updateDownward();
};

Widget.prototype.updateDownward = function ()
{
	var svgVertices = this.high.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(this.low, svgVertices);
};

Widget.prototype.delete = function ()
{
	this.bijectionUp.delete(this.low);
	this.svgLowLevel.deletePolygonChild(this.low);
};
