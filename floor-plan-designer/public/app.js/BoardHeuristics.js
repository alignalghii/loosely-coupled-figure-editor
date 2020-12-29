function BoardHeuristics (board) {this.board = board;}

BoardHeuristics.prototype.isForVertex = function (point) {return this.isNearestFiguresNearestVertexNear(point);}; // @TODO Note: Alternatively, a direct assignment must be after definition

BoardHeuristics.prototype.isNearestFiguresNearestVertexNear = function (point)
{
	return maybe(
		{isNear: false, maybeVertex: nothing, maybeFigure: nothing},
		nearestFigure => maybe(
			{
				isNear: false,
				maybeVertex: nothing,
				maybeFigure: just(nearestFigure)
			},
			nearestVertex => ({
				isNear: distance(nearestVertex, point) < Math.sqrt(getArea(nearestFigure.vertices)) / 3,
				maybeVertex: just(nearestVertex),
				maybeFigure: just(nearestFigure)
			}),
			maybeNearestVertexHence(nearestFigure.vertices, point)
		),
		maybeNearestFigureHence(this.board, point)
	);
};


BoardHeuristics.prototype.maybeEitherFigVertexOrEdgeIsNear = function (point) {};
