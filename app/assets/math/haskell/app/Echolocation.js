const boardMinimalEcholocationHence = (board, point) => reshapeEchosForMinimalDistanceIfAny(boardEcholocationHence(board, point));

const boardEcholocationHence = (board, point) => boardMap_opt(figure => figureEchoHence(figure, point), board);

const figureEchoHence = (figure, point) => ({
	figure        : figure,
	reverberations: tour(figure.vertices).map(edge => edgeReverberationHence(edge, point))
});

const edgeReverberationHence = (edge, point) => ({
	edge    : edge,
	distance: distanceSegmentHence(edge, point)
});

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
