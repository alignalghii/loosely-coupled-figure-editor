function CollisionAsVectorTransformationBehavior () {}

CollisionAsVectorTransformationBehavior.prototype.shouldTestCollisionAsVectorTransformationBehavior = function () {return this.shouldCouldTeleport();};

CollisionAsVectorTransformationBehavior.prototype.shouldCouldTeleport = function ()
{
	const board = new Bijection();
	const srcFigure = new Figure([[0,0], [2,0], [1,1]]);
	const tgtFigure = new Figure([[2,0], [4,0], [3,1]]);
	board.set(null, srcFigure);
	board.set(null, tgtFigure);
	return true &&
		!couldTeleport(srcFigure, board, [1, 0]) &&
		 couldTeleport(srcFigure, board, [2, 0]) &&
		!couldTeleport(srcFigure, board, [3, 0]) &&
		 couldTeleport(srcFigure, board, [4, 0]) &&
		 couldTeleport(srcFigure, board, [5, 0]) &&
		 couldTeleport(srcFigure, board, [6, 0]) &&
		true;
}
