// Using Factory pattern because multiple constructor are appropriate (see the Furniturefactory module)
// Thus here, the Furniture constructor is simply setting possible properties from arguments


function Furniture(figure, imageFilePath)
{
	DomainObject.call(this, figure);
	this.imageFilepath = imageFilePath;
}

Furniture.prototype = Object.create(DomainObject.prototype);

Furniture.prototype.constructor = Furniture;

Furniture.prototype.copy = function ()
{
	return new Furniture(
		this.figure.translation([0,0]), this.imageFilePath
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
