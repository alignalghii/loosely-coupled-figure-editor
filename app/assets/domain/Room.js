// Using Factory pattern because multiple constructor are appropriate (see the Roomfactory module)
// Thus here, the Room constructor is simply setting possible properties from arguments


function Room(name, figure, openings, generalSizes, furniture)
{
	this.name         = name;
	this.figure       = figure;
	this.openings     = openings;
	this.generalSizes = generalSizes;
	this.furniture = furniture;
}

Room.prototype.perimeter = function () {return this.figure.perimeter();};
