// Using Factory pattern because multiple constructor are appropriate (see the Roomfactory module)
// Thus here, the Room constructor is simply setting possible properties from arguments


function Room(name, figure, openings, generalSizes, furniture)
{
	DomainObject.call(this, figure);

	console.log('New room created!');
	this.title        = new Title(name, figure.titlePosition());
	//this.figure       = figure;
	this.openings     = openings;
	this.generalSizes = generalSizes;
	this.furniture = furniture;
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
		this.furniture.map((piece) => piece.copy())
	);
};

Room.prototype.doTranslation = function (displacement)
{
	console.log('Domain object attempts to translate');
	this.figure.doTranslation(displacement);
	this.title.doTranslation(displacement);
};
