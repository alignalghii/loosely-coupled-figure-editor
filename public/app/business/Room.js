// Using Factory pattern because multiple constructor are appropriate (see the Roomfactory module)
// Thus here, the Room constructor is simply setting possible properties from arguments


function Room(name, figure, escorts, maybeHost, circularSlits = [], openings, generalSizes) // @TODO consider: escorts = [], maybeHost = ['nothing']
{
	BusinessObject.call(this, figure, escorts, maybeHost);

	switch (typeof name) { // @TODO
		case 'string': this.title = new Title(this, name, figure.titlePosition()); break;
		case 'object': this.title = name; break;
		default: throw 'Type error';
	}
	//this.figure       = figure; // @TODO lehet hogy jó lenne helyreállítani, és az absztrakt BusinessObject osztályból meg kivenni. Nem feltétlen minden üzletiolbektum kötődik alakzathoz. Pl. van cím is, igaz, az nem köthető üzleti objektumhoz. Lehet, hogy a Furniture sem fog alakzathoz kötődni (ez még bizonytalan, hisz a bútornak azért bennfoglaló téglalapdoboza azért biztos van, aszerint ütközik is. Mindenesetre a Furniture képhez is kötődik.
	this.slitsRepresentationCircular = new SlitsRepresentationCircular(figure.perimeter(), circularSlits);
	this.openings     = openings;
	this.generalSizes = generalSizes;
}

Room.prototype = Object.create(BusinessObject.prototype);

Room.prototype.constructor = Room;

Room.prototype.copy = function ()
{
	return new Room(
		this.title.name, // @TODO by value or by reference? Now, no sharing (copy is not fully shallow)! Consider!
		this.figure.translation([0,0]),
		this.escorts.map(escort => escort.copy()),
		this.maybeHost,
		this.slitsRepresentationCircular.circularSlits.map(circularSlit => circularSlit.copy()),
		Eq.obListCopy(this.openings),
		Eq.flatObjectCopy(this.generalSizes)
	);
};

Room.prototype.doTranslation = function (displacement)
{
	this.figure.doTranslation(displacement);
	this.title.doTranslation(displacement);
	this.escorts.map(
		escort => escort.doTranslation(displacement)
	);
	touchProp(this, 'openings', []);
	this.openings.map(
		widget => widget.translate(displacement)
	);
};

Room.prototype.doRotation = function (phi)
{
	console.log('Domain object attempts to rotate');
	this.figure.doRotation(phi);
	this.goUpdatedByOwnFigure();
};

Room.prototype.goUpdatedByOwnFigure = function () {this.title.readaptTo(this.figure);};

Room.prototype.queryName = function () {return this.title.name;};


Room.prototype.doScale = function (q) {if (this.slitsRepresentationCircular) this.slitsRepresentationCircular.doScale(q);};

Room.prototype.addCircularSlit = function (cs) {this.slitsRepresentationCircular.addCircularSlit(cs);};

Room.prototype.exportToSerializableObject = function ()
{
	return {
		type: this.constructor.name,
		title: this.title.exportToSerializableObject(),
		figure: this.figure,
		circularSlits: this.slitsRepresentationCircular.circularSlits, // @TODO consider but only in late future: other properties of slitsRepresentationCircular are not used yet
		escorts: this.escorts.map(
			escort => escort.exportToSerializableObject()
		)
	}
};

Room.prototype.executeOn = function (canvasPseudoWidget)
{
	const figureWidgetFactory = canvasPseudoWidget.figureWidgetFactory;
	const roomFigure = this.figure;

	const svgVertices       = roomFigure.vertices.map((p) => figureWidgetFactory.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	const svgNewPolygonCild = figureWidgetFactory.svgLowLevel.createPolygonChild(svgVertices, roomFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`

	figureWidgetFactory.bijectionSvgToGeom.set(svgNewPolygonCild, roomFigure);
	figureWidgetFactory.partialFunctionGeomToBusiness.set(roomFigure, this);

	this.escorts.map(
		escort => escort.executeOn(canvasPseudoWidget)
	);

	canvasPseudoWidget.titleWidgetFactory.createFromHigh(this.title); // @TODO: 1) not necessarily all figs have a title 2) there'll be also other businessobs than rooms with titles

	return new FigureWidget(canvasPseudoWidget, svgNewPolygonCild, roomFigure, this);
};
