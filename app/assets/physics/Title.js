function Title(name, position) // @TODO: inherit `Figure` and `Title` from a common `MathematicalLevelObject` ancestor
{
	this.name = name;
	this.position = position;
}

Title.prototype = Object.create(MathematicalObject.prototype);

Title.prototype.constructor = Title;

Title.prototype.doTranslation = function (displacement)
{
	const [dx, dy] = displacement;
	this.position[0] += dx; this.position[1] += dy;
}

Title.prototype.readaptTo = function (figure) {this.position = figure.titlePosition();};
