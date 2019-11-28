/**
 * @TODO consider
 * Very deep analogy to Title and TitleWidget
 * It has no businessObject
 * it is not a business object in the mind of the users
 * it is just  a visual tool, just like a title.
 */

function BatteringRam (size, position)
{
	const [x, y] = position;
	Figure.call(this, [[x-size/2, y-size/2], [x+size/2, y-size/2], [x+size/2, y+size/2], [x-size/2, y+size/2]]);
	this.size     = size;
	this.position = position;
}

BatteringRam.prototype = Object.create(Figure.prototype);

BatteringRam.prototype.constructor = BatteringRam;


BatteringRam.prototype.doTranslation = function (displacement)
{
	Figure.prototype.doTranslation.call(this, displacement);
	doAddVec(this.position, displacement);
};

// @TODO consider Title.prototype.readaptTo = function (figure) {this.position = figure.titlePosition();};

//BatteringRam.prototype.isCollidable = function () {return ['just', function (board) {return mbVectorTransformationForAllowance({}, board);}];}; // @TODO should be raised to business object level?
//BatteringRam.prototype.isCollidable = function () {return ['just', function (board) {console.log(board);}];}; // @TODO should be raised to business object level?
BatteringRam.prototype.isCollidable = function () {return ['just', function (board) {return mbVectorTransformationForAllowance(this, board);}];}; // @TODO should be raised to business object level?
