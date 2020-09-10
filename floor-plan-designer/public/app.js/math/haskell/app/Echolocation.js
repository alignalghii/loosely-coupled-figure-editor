const boardMinimalEcholocationHence = (board, point) => reshapeEchosForMinimalDistanceIfAny(boardEcholocationHence(board, point));

const boardEcholocationHence = (board, point) => boardMapFigural_opt(figure => figureEchoHence(figure, point), board);

const figureEchoHence = (figure, point) => ({
	figure        : figure,
	reverberations: verticePathEchoHence(figure.vertices, point)
});

const verticePathEchoHence                = (vertices, point) => tour(vertices).map(edge => edgeReverberationHence(edge, point)),
      verticePathReshapedMinimalEchoHence = (vertices, point) => verticePathEchoHence(vertices, point).reduce(
          (acc, {distance: distance, edge: edge}) => maybe(
              ['just', {distance: distance, selectedEdges: [edge]}],
              ({distance: minDistTillNow, selectedEdges: selectedEdges}) => ccCompareCases(
                  distance, minDistTillNow,
                  ['just', {distance: distance      , selectedEdges: [edge]                      }],
                  ['just', {distance: minDistTillNow, selectedEdges: selectedEdges.concat([edge])}],
                  ['just', {distance: minDistTillNow, selectedEdges: selectedEdges               }]
              ),
              acc
          ),
          ['nothing']
      );


const nearestFiguresHence = (board, point) => maybe(
	[],
	({distance: _, fronts: fronts}) => fronts.map(({figure: figure, selectedEdges: _}) => figure),
	boardMinimalEcholocationHence(board, point)
);

const maybeNearestFigureHence = (board, point) => maybeUnambiguityByEq((a, b) => a == b, nearestFiguresHence(board, point));

const edgeReverberationHence = (edge, point) => ({
	edge    : edge,
	distance: distanceSegmentHence(edge, point)
});

const nearestVerticesHence = (vertices, point) =>
	vertices.reduce(
		({minimalDistance: minimalDistance, nearestVertices: nearestVertices}, vertex) =>
		{
			const distance = distancePointHence(vertex, point);
			return val_ccCompareCases_pIVal(
				distance, minimalDistance,
				{minimalDistance: ['just', distance], nearestVertices: [vertex]                        },
				{minimalDistance: minimalDistance   , nearestVertices: nearestVertices.concat([vertex])},
				{minimalDistance: minimalDistance   , nearestVertices: nearestVertices                 }
			);
		},
		{minimalDistance: ['nothing'], nearestVertices: []}
	).nearestVertices;

const maybeNearestVertexHence = (vertices, point) => maybeUnambiguityByEq(ccVecEq, nearestVerticesHence(vertices, point));


const nearestEdgesHence = (vertices, point) => maybe(
	[],
	({distance: minDistTillNow, selectedEdges: selectedEdges}) => selectedEdges,
	verticePathReshapedMinimalEchoHence(vertices, point)
);

/** @TODO: `maybeNearestEdge` is a much simpler implementation than this: */
const maybeNearestEdgeHence = (vertices, point) => maybeUnambiguityByEq(ccTreeEq, nearestEdgesHence(vertices, point));

/** @TODO: this function is a much simpler implementation for `nearestVerticesHence`: */
const maybeNearestEdgeOfFrom = (polygon, currentWEPos) =>
	tour(
		polygon
	).maybeFindOnMeasureMin(
		edge => distanceSegmentHence(edge, currentWEPos)
	);


const maybeMinimalDistanceOfEchos = figureEchos =>
	safeMin(
		figureEchos.flatMap(reverberationsOfEcho).map(distanceOfReverberation) // flatMap: listBind, see >>= in Haskell
	);

function reshapeEchosForMinimalDistanceIfAny(figureEchos)
{
	const maybeMinimalDistance = maybeMinimalDistanceOfEchos(figureEchos);
	return maybeMap(
		minimalDistance => reshapeEchosForDistance(minimalDistance, figureEchos),
		maybeMinimalDistance
	);
}

const reshapeEchosForDistance = (distance, figureEchos) =>
	({
		distance: distance,
		fronts: reshapeEchosDroppingDistances(
			selectEchosForDistance(distance, figureEchos)
		)
	});

function reshapeEchosDroppingDistances(figureEchos)
{
	const  renameAndTweak = figureEcho => ({figure: figureEcho.figure, selectedEdges: figureEcho.reverberations.map(edgeOfReverberation)});
	return figureEchos.map(renameAndTweak);
}

const reverberationsOfEcho    = echo          => echo.reverberations   ,
      edgeOfReverberation     = reverberation => reverberation.edge    ,
      distanceOfReverberation = reverberation => reverberation.distance;

const selectEchosForDistance = (distance, figureEchos) => figureEchos.map(trimReverberations(distance)).filter(nonEmptyEchos),
      trimReverberations = distance => figureEcho => ({figure: figureEcho.figure, reverberations: figureEcho.reverberations.filter(rev => rev.distance == distance)}),
      nonEmptyEchos = figureEcho => figureEcho.reverberations.length > 0;
