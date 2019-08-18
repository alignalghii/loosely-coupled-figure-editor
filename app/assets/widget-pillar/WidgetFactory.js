// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

function WidgetFactory(bijectionGeomToDomain, coordSysTransformer, bijectionSvgToGeom, svgLowLevel)
{
	this.bijectionGeomToDomain = bijectionGeomToDomain;
	this.coordSysTransformer   = coordSysTransformer;
	this.bijectionSvgToGeom    = bijectionSvgToGeom;
	this.svgLowLevel           = svgLowLevel;
}

WidgetFactory.prototype.createWidgetFromDomain0 = function (domainObject) {return this.createWidgetFromReplacedGeom(domainObject.figure, domainObject);};


WidgetFactory.prototype.createWidgetFromReplacedGeom = function (geomFigure, domainObject)
{
	domainObject.figure = geomFigure;
	var svgVertices       = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionSvgToGeom.set(svgNewPolygonCild, geomFigure);
	this.bijectionGeomToDomain.set(geomFigure, domainObject);
	return new Widget(this.bijectionGeomToDomain, this.coordSysTransformer, this.bijectionSvgToGeom, this.svgLowLevel, domainObject, geomFigure, svgNewPolygonCild);
};

WidgetFactory.prototype.createWidgetFromDomain1 = function (domainObjectOriginal)
{
	var domainObject = domainObjectOriginal.copy();
	this.createWidgetFromDomain0(domainObject);
};

WidgetFactory.prototype.stampAt = function (domainStamp, geomCoords) // @TODO swap object receiver and argument around method
{
	var domainObject      = domainStamp.copy();
	var geomNewFigure     = domainObject.figure.centering();
	geomNewFigure.doTranslation(geomCoords);
	return this.createWidgetFromReplacedGeom(geomNewFigure, domainObject);
};


WidgetFactory.prototype.createWidgetFromLow = function (svgPolygon)
{
	var geomFigure = this.bijectionSvgToGeom.get(svgPolygon);
	var domainObject = this.bijectionGeomToDomain.get(geomFigure);
	return new Widget(this.bijectionGeomToDomain, this.coordSysTransformer, this.bijectionSvgToGeom, this.svgLowLevel, domainObject, geomFigure, svgPolygon);
};


WidgetFactory.prototype.createWidgetFromMedium = function (geomFigure)
{
	var svgPolygon    = this.bijectionSvgToGeom.getInverse(geomFigure);
	var domainObject = this.bijectionGeomToDomain.get(geomFigure);
	return new Widget(this.bijectionGeomToDomain, this.coordSysTransformer, this.bijectionSvgToGeom, this.svgLowLevel, domainObject, geomFigure, svgPolygon);
};
