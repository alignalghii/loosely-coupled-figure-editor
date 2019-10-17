// Using Factory pattern because multiple constructor are appropriate (see the Roomfactory module)
// Thus here, the Room constructor is simply setting possible properties from arguments


function Room(name, figure, openings, generalSizes, escorts = [])
{
	DomainObject.call(this, figure, escorts);

	console.log('New room created!');
	this.title        = new Title(this, name, figure.titlePosition());
	//this.figure       = figure; // @TODO lehet hogy jó lenne helyreállítani, és az absztrakt DomainObject osztályból meg kivenni. Nem feltétlen minden üzletiolbektum kötődik alakzathoz. Pl. van cím is, igaz, az nem köthető üzleti objektumhoz. Lehet, hogy a Furniture sem fog alakzathoz kötődni (ez még bizonytalan, hisz a bútornak azért bennfoglaló téglalapdoboza azért biztos van, aszerint ütközik is. Mindenesetre a Furniture képhez is kötődik.
	this.openings     = openings;
	this.generalSizes = generalSizes;
}

Room.prototype = Object.create(DomainObject.prototype);

Room.prototype.constructor = Room;

Room.prototype.copy = function ()
{
	return new Room(
		this.title.name, // @TODO by value or by reference? Now, no sharing (copy is not fully shallow)! Consider!
		this.figure.translation([0,0]),
		Eq.obListCopy(this.openings),
		Eq.flatObjectCopy(this.generalSizes),
		this.escorts.map(escort => escort.copy())
	);
};

Room.prototype.doTranslation = function (displacement)
{
	this.figure.doTranslation(displacement);
	this.title.doTranslation(displacement);
	this.escorts.map(
		escort => escort.doTranslation(displacement)
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
