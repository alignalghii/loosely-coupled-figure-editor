function Hypothetical(board, prevFigure, displacement)
{
	this.board                   = board;
	this.prevFigure              = prevFigure;
	this.hypotheticalFigureClone = prevFigure.translation(displacement);
}


Hypothetical.prototype.doInterpolateCollision = function () // modifies both to almost the same intermediate location
{
	var displacementNeeded = this.interpolateHypothetic(); // modifies `hypotheticFigureClone` only
	this.prevFigure.doTranslation(displacementNeeded); // modifies `prevFigure` only
	return this.prevFigure;
};

Hypothetical.prototype.interpolateHypothetic = function () // modifies `this.hypotheticFigureClone` only
{
	var [x0, y0] = this.prevFigure.grasp; var [X0, Y0] = this.hypotheticalFigureClone.grasp;
	var [x , y ] = [x0, y0]; var [X, Y] = [X0, Y0];
	var [dx, dy] = [(X-x)/2, (Y-y)/2]; var [mx, my] = [x+dx, y+dy];
	this.hypotheticalFigureClone.doTranslation([-dx, -dy]); // comes to [mx, my]

	for (let i = 0; i < 7; i++) {
		let collFlag = this.wouldCollideAny();
		if (collFlag) [X, Y] = [mx, my];
		else          [x, y] = [mx, my];
		[dx, dy] = [(X-x)/2, (Y-y)/2]; [mx, my] = [x+dx, y+dy];
		this.hypotheticalFigureClone.doTranslation(collFlag ? [-dx, -dy] : [ dx, dy]); // comes to [mx, my]
	}
	return [x-x0, y-y0];
};

Hypothetical.prototype.wouldCollideAny = function ()
{
	var collision = false;
	for (let anotherFigure of this.board.range()) {
		if (anotherFigure != this.prevFigure && anotherFigure.collides(this.hypotheticalFigureClone)) {
			collision = true;
			break;
		}
	}
	return collision;
};
