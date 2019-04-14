/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function Board(bijectionUp) {this.bijectionUp = bijectionUp;}


// Board.prototype.appendLoadFrom = function (figureBank)

Board.prototype.wouldCollideAny = function (theFigure, hypotheticFigureClone)
{
	var collision = false;
	for (let anotherFigure of this.bijectionUp.range()) {
		if (anotherFigure != theFigure && anotherFigure.collides(hypotheticFigureClone)) {
			collision = true;
			break;
		}
	}
	return collision;
	// @TODO: works only for arrays, not for assoc arrays = objects
	//function orCollides (flag, anotherFigure) {return flag || figure.collides(anotherFigure);}
	//return this.figures.reduce(orCollides, false);
}


/*Board.prototype.loopOverFigures = function (callback)
{
	for (var id in this.figures)
		if (this.figures.hasOwnProperty(id))
			callback(id, this.figures[id]);
}*/
