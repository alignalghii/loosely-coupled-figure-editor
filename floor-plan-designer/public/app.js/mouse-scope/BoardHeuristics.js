function BoardHeuristics (board) {this.board = board;}


BoardHeuristics.prototype.isForVertex = function (point) {return this.isNearestFiguresNearestVertexNear(point);}; // @TODO Note: Alternatively, a direct assignment must be after definition
BoardHeuristics.prototype.isForEdge   = function (point) {return this.isNearestFiguresNearestEdgeNear  (point);};


BoardHeuristics.prototype.isNearestFiguresNearestVertexNear = function (point)
{
	return maybe_exec(
		VertexNearness.fullNone,
		nearestFigure => maybe(
			VertexNearness.onlyFigure(nearestFigure),
			nearestVertex => VertexNearness.calculate(point, nearestVertex, nearestFigure),
			maybeNearestVertexHence(nearestFigure.vertices, point)
		),
		maybeNearestFigureHence(this.board, point)
	);
};


BoardHeuristics.prototype.isNearestFiguresNearestEdgeNear = function (point)
{
	return maybe_exec(
		EdgeNearness.fullNone,
		nearestFigure => maybe(
			EdgeNearness.onlyFigure(nearestFigure),
			nearestEdge => EdgeNearness.calculate(point, nearestEdge, nearestFigure),
			maybeNearestEdgeHence(nearestFigure.vertices, point)
		),
		maybeNearestFigureHence(this.board, point)
	);
};


BoardHeuristics.prototype.maybeEitherFigVertexOrEdgeIsNear = function (point) {};


BoardHeuristics.prototype.scope = function (point, eitherTarget)
{
	return either(
		cvn => maybe_exec(
			() => maybe_exec(
				() => MouseHeuristicsType.Canvas(point),
				MouseHeuristicsType.Edge,
				this.isNearestFiguresNearestEdgeNear(point).maybeNear()
			),
			MouseHeuristicsType.Vertex,
			this.isNearestFiguresNearestVertexNear(point).maybeNear()
		),
		wdg => MouseHeuristicsType.Interior(),
		eitherTarget
	);
};
