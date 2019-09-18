// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

function WidgetFactory(partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom, svgLowLevel)
{
	this.partialFunctionGeomToBusiness = partialFunctionGeomToBusiness;
	this.coordSysTransformer   = coordSysTransformer;
	this.bijectionSvgToGeom    = bijectionSvgToGeom;
	this.svgLowLevel           = svgLowLevel;
}

WidgetFactory.prototype.createFigureWidgetFromDomain0 = function (domainObject) {return this.createFigureWidgetFromReplacedGeom(domainObject.figure, domainObject);};


WidgetFactory.prototype.createFigureWidgetFromReplacedGeom = function (geomFigure, domainObject) // @TODO: there will be also other businessobjects than rooms with titles
{
	domainObject.figure = geomFigure;
	var svgVertices       = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionSvgToGeom.set(svgNewPolygonCild, geomFigure);
	this.partialFunctionGeomToBusiness.set(geomFigure, domainObject);

	// @TODO: not necessarily all figures have a title
	//const titleName     = domainObject.name;
	//const titlePosition = titlePositionFor(geomFigure.vertices);
	const title = domainObject.title;  // @TODO: there will be also other businessobjects than rooms with titles
	const textElem = this.svgLowLevel.createText(title.name, this.coordSysTransformer.highToLow(title.position));
	//const title    = new Title(titleName, titlePosition);
	this.bijectionSvgToGeom.set(textElem, title);
	console.log(textElem, title);
	const tw = new TitleWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom,    ['nothing'], title, textElem);
	console.log('tw',);

	return new FigureWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, ['just', domainObject], geomFigure, svgNewPolygonCild);
};

WidgetFactory.prototype.createFigureWidgetFromDomain1 = function (domainObjectOriginal)
{
	console.log('Original: ', domainObjectOriginal);
	var domainObject = domainObjectOriginal.copy();
	console.log('Copy: ', domainObject);
	this.createFigureWidgetFromDomain0(domainObject);
};

WidgetFactory.prototype.stampAt = function (domainStamp, geomCoords) // @TODO swap object receiver and argument around method
{
	var domainObject      = domainStamp.copy();
	domainObject.doTranslation(geomCoords);
	return this.createFigureWidgetFromDomain0(domainObject);
};

WidgetFactory.prototype.createWidgetFromLow = function (svgPolygon)
{
	const [maybeDomainObject, geomFigure] = this.prepareWidgetFromLow(svgPolygon);
	switch (svgPolygon.tagName) {
		case 'polygon': return new FigureWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, maybeDomainObject, geomFigure, svgPolygon);
		case 'text'   : return new TitleWidget (this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, maybeDomainObject, geomFigure, svgPolygon);
		default       : throw 'Invalid low-level SVG-subelement, unable to convert upwards to higher-level objects';
	}
};
//WidgetFactory.prototype.createTitleWidgetFromLow = function (svgPolygon) {};

WidgetFactory.prototype.createFigureWidgetFromMedium = function (geomFigure)
{
	const [maybeDomainObject, svgPolygon] = this.prepareWidgetFromMedium(geomFigure);
	return new FigureWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, maybeDomainObject, geomFigure, svgPolygon);
};

WidgetFactory.prototype.createTitleWidgetFromMedium = function (geomFigure)
{
	const [maybeDomainObject, svgPolygon] = this.prepareWidgetFromMedium(geomFigure);
	return new TitleWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, maybeDomainObject, geomFigure, svgPolygon);
};


WidgetFactory.prototype.prepareWidgetFromLow = function (svgPolygon)
{
	console.log(svgPolygon);
	var geomFigure = this.bijectionSvgToGeom.get(svgPolygon);
	console.log(geomFigure);
	const domNull = this.partialFunctionGeomToBusiness.get(geomFigure);
	var maybeDomainObject = domNull ? ['just', domNull] : ['nothing'];
	if (!geomFigure) throw 'Event on orphan (unregistered) SVG-subelement triggers widget creation, but the higher-level component is lacking'
	return [maybeDomainObject, geomFigure];
};


WidgetFactory.prototype.prepareWidgetFromMedium = function (geomFigure)
{
	var svgPolygon    = this.bijectionSvgToGeom.getInverse(geomFigure);
	if (!svgPolygon) throw 'Event on orphan (unregistered) MathematicalObject triggers widget creation, but the low-level component is lacking'
	const domNull = this.partialFunctionGeomToBusiness.get(geomFigure);
	var maybeDomainObject = domNull ? ['just', domNull] : ['nothing'];
	return [maybeDomainObject, svgPolygon];
};

WidgetFactory.prototype.mergelessSubscribe = function (eventTypeName, emptyCase, widgetCase) // @TODO a `return` valószínűleg fölösleges itt is, és a hivatkozott svgLowLevel.subscribe-on is
{
	const svgEmptyCase = (canvas, svgPosition) =>
	{
		var widgetEventPosition  = this.coordSysTransformer.lowToHigh(svgPosition);
		return emptyCase(canvas, widgetEventPosition);
	}
	const svgPolygonCase = (svgPolygon, svgPosition) =>
	{
		var widget               = this.createWidgetFromLow    (svgPolygon );
		var widgetEventPosition  = this.coordSysTransformer.lowToHigh(svgPosition);  // @TODO Demeter principle
		return widgetCase(widget, widgetEventPosition);
	}
	this.svgLowLevel.subscribe(eventTypeName, svgEmptyCase, svgPolygonCase); // @TODO Demeter principle
};
