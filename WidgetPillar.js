function WidgetPillar(coordSysTransformer, bijectionUp, svgLowLevel)
{
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.svgLowLevel         = svgLowLevel;
}

WidgetPillar.prototype.createFromHigh = function (geomFigure)
{
	var geomNewFigure     = geomFigure.translation([0,0]); // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};

WidgetPillar.prototype.updateFromHigh = function (geomFigure)
{
	var lowEl = this.bijectionUp.getInverse(geomFigure);
	var svgVertices = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(lowEl, svgVertices);
};

WidgetPillar.prototype.createFromLow = function (originFigure, svgPosition) // @TODO reuse `createWidgetPillar`
{
	//console.log('High-level figure: high-level (geometrical) coordinates: <'+highFigure.vertices.join(' | ')+'>');
	var geomPosition      = this.coordSysTransformer.lowToHigh(svgPosition);
	var geomNewFigure     = originFigure.translation(geomPosition);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};

WidgetPillar.prototype.updateFromLow = function (lowElem, svgPosition1, svgPosition2)
{
	var geomFigure        = this.bijectionUp.get(lowElem);
	var geomDestPosition1 = this.coordSysTransformer.lowToHigh(svgPosition1);
	var geomDestPosition2 = this.coordSysTransformer.lowToHigh(svgPosition2);
	var geomDisplacement  = fromTo(geomDestPosition1, geomDestPosition2);
	geomFigure.doTranslation(geomDisplacement);
	var svgVertices = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(lowElem, svgVertices);
	//svgPosition1 = svgPosition2;
	//return geomFigure; // `lowElem` úgyis elérhető a hívó számára, `geomFigure`-t érdemes visszaadni
};

WidgetPillar.prototype.deleteFromLow = function (lowElem)
{
	this.bijectionUp.delete(lowElem);
	this.svgLowLevel.deletePolygonChild(lowElem);
};

WidgetPillar.prototype.showGlitteringFromLow = function (lowElem)
{
	lowElem.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
	this.bijectionUp.get(lowElem).svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
};

WidgetPillar.prototype.unshowGlitteringFromLow = function (polygonChild)
{
	polygonChild.removeAttribute(GLITTERING_ATTR_NAME);
	delete this.bijectionUp.get(polygonChild).svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
};

WidgetPillar.prototype.cloneHypotheticFigureFromLow = function (prevEl, prevPos, currentPos)
{
	var geomPrevPos           = this.coordSysTransformer.lowToHigh(prevPos);
	var geomCurrentPos        = this.coordSysTransformer.lowToHigh(currentPos);
	var geomDisplacement      = fromTo(geomPrevPos, geomCurrentPos);
	var prevFigure            = this.bijectionUp.get(prevEl);
	var hypotheticFigureClone = prevFigure.translation(geomDisplacement);
	return [prevFigure, hypotheticFigureClone]; // @TODO introduce a new `Hypothetic` class
};
