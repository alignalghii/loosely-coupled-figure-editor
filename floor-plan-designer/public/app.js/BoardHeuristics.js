function BoardHeuristics (board) {this.board = board;}


BoardHeuristics.prototype.isForVertex = function (point) {return this.isNearestFiguresNearestVertexNear(point);}; // @TODO Note: Alternatively, a direct assignment must be after definition
BoardHeuristics.prototype.isForEdge   = function (point) {return this.isNearestFiguresNearestEdgeNear  (point);};


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
				isNear: distance(nearestVertex, point) < Math.sqrt(getArea(nearestFigure.vertices)) / 6,
				maybeVertex: just(nearestVertex),
				maybeFigure: just(nearestFigure)
			}),
			maybeNearestVertexHence(nearestFigure.vertices, point)
		),
		maybeNearestFigureHence(this.board, point)
	);
};


BoardHeuristics.prototype.isNearestFiguresNearestEdgeNear = function (point)
{
	return maybe(
		{isNear: false, maybeEdge: nothing, maybeFigure: nothing},
		nearestFigure => maybe(
			{
				isNear: false,
				maybeEdge: nothing,
				maybeFigure: just(nearestFigure)
			},
			nearestEdge => ({
				isNear: distanceSegmentHence(nearestEdge, point) < Math.sqrt(getArea(nearestFigure.vertices)) / 5,
				maybeEdge: just(nearestEdge),
				maybeFigure: just(nearestFigure)
			}),
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
				MouseHeuristicsType.Canvas,
				MouseHeuristicsType.Edge,
				heurMaybeNearEdge(this.isNearestFiguresNearestEdgeNear(point)) // @TODO: OOP
			),
			MouseHeuristicsType.Vertex,
			heurMaybeNearVertex(this.isNearestFiguresNearestVertexNear(point)) // @TODO: OOP
		),
		wdg => MouseHeuristicsType.Interior(),
		eitherTarget
	);
};
/*{
	return either(
		cnv => fromMaybe(
			MouseHeuristicsType.Canvas(),
			maybeBind(
				maybeNearestFigureHence(this.board, point),
				nearestFigure => maybeBind(
					maybeNearestVertexHence(nearestFigure.vertices, point),
					nearestVertex => maybeBind(
						maybeNearestEdgeHence  (nearestFigure.vertices, point),
						nearestEdge => distance(nearesPoint, point) < distance(, point) ? MouseHeuristicsType.Canvas() : MouseHeuristicsType.Canvas()
					)
				)
			)
		),
		wdg => MouseHeuristicsType.Interior()
	);
};*/

const heurMaybeNearVertex = ({isNear, maybeVertex}) => isNear ? maybeVertex : nothing; // @TODO: OOP
const heurMaybeNearEdge   = ({isNear, maybeEdge  }) => isNear ? maybeEdge   : nothing; // @TODO: OOP
