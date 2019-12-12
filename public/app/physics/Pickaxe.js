/**
 * @TODO consider
 * Very deep analogy to Title and TitleWidget
 * It has no businessObject
 * it is not a business object in the mind of the users
 * it is just  a visual tool, just like a title.
 */

function Pickaxe (size, position)
{
	const [x, y] = position;
	Figure.call(this, [[x-size/2, y-size/2], [x+size/2, y-size/2], [x+size/2, y+size/2], [x-size/2, y+size/2]]);
	this.size     = size;
	this.position = position;
}

Pickaxe.prototype = Object.create(Figure.prototype);

Pickaxe.prototype.constructor = Pickaxe;


Pickaxe.prototype.doTranslation = function (displacement)
{
	Figure.prototype.doTranslation.call(this, displacement);
	doAddVec(this.position, displacement);
};

// @TODO consider Title.prototype.readaptTo = function (figure) {this.position = figure.titlePosition();};

// `Pickaxe.prototype.isCollidable_` inherited from `Figure` // @TODO reconsider
