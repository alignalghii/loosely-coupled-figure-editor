// Using Factory pattern because multiple constructor are appropriate (see the Roomfactory module)
// Thus here, the Room constructor is simply setting possible properties from arguments


function Room(name, figure, openings, generalSizes, furniture)
{
	DomainObject.call(this, figure);

	this.name         = name;
	this.openings     = openings;
	this.generalSizes = generalSizes;
	this.furniture = furniture;
}

Room.prototype = Object.create(DomainObject.prototype);

Room.prototype.constructor = Room;

Room.prototype.copy = function ()
{
	return new Room(
		this.name,
		this.figure.translation([0,0]),
		Eq.obListCopy(this.openings),
		Eq.flatObjectCopy(this.generalSizes),
		this.furniture.map((piece) => piece.copy())
	);
};

Room.prototype.vectorTransfomationForAllowance = function (board) {return vectorTransfomationForAllowance(this.figure, board);};
