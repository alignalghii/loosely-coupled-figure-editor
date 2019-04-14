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
};

Board.prototype.doInterpolateCollision = function (prevFigure, hypotheticFigureClone) // modifies both to same intermediate location
{
	var displacementNeeded = this.interpolateHypothetic(prevFigure, hypotheticFigureClone); // modifies `hypotheticFigureClone` only
	prevFigure.doTranslation(displacementNeeded); // modifies `prevFigure` only
};

Board.prototype.interpolateHypothetic = function (prevFigure, hypotheticFigureClone) // modifies `hypotheticFigureClone` only
{
	var [x0, y0] = prevFigure.grasp; var [X0, Y0] = hypotheticFigureClone.grasp;
	var [x, y] = [x0, y0]; var [X, Y] = [X0, Y0];
	var [dx, dy] = [(X-x)/2, (Y-y)/2]; var [mx, my] = [x+dx, y+dy];
	hypotheticFigureClone.doTranslation([-dx, -dy]); // comes to [mx, my]

	for (let i = 0; i < 7; i++) {
		let collFlag = this.wouldCollideAny(prevFigure, hypotheticFigureClone);
		if (collFlag) [X, Y] = [mx, my];
		else          [x, y] = [mx, my];
		[dx, dy] = [(X-x)/2, (Y-y)/2]; [mx, my] = [x+dx, y+dy];
		hypotheticFigureClone.doTranslation(collFlag ? [-dx, -dy] : [ dx, dy]); // comes to [mx, my]
	}
	return [x-x0, y-y0];
};


/*Board.prototype.loopOverFigures = function (callback)
{
	for (var id in this.figures)
		if (this.figures.hasOwnProperty(id))
			callback(id, this.figures[id]);
}*/
