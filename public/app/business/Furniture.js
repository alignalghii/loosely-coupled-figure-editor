// Using Factory pattern because multiple constructor are appropriate (see the Furniturefactory module)
// Thus here, the Furniture constructor is simply setting possible properties from arguments


function Furniture(name, figure, imageFileName, escorts = [])
{
	BusinessObject.call(this, figure, escorts);
	this.name = name;
	this.imageFileName = imageFileName;
}

Furniture.prototype = Object.create(BusinessObject.prototype);

Furniture.prototype.constructor = Furniture;

Furniture.prototype.copy = function ()
{
	return new Furniture(
		this.name,
		this.figure.translation([0,0]),
		this.imageFileName,
		this.escorts.map(escort => escort.copy()) // @TODO deep copy? Or shallow? or 1-deep?
	);
};

Furniture.prototype.doTranslation = function (displacement)
{
	this.figure.doTranslation(displacement);
};

Furniture.prototype.doRotation = function (phi)
{
	this.figure.doRotation(phi);
	this.goUpdatedByOwnFigure();
};

Furniture.prototype.goUpdatedByOwnFigure = function ()
{
	//this.title.readaptTo(this.figure);
};

Furniture.prototype.queryName = function () {return this.name;};
