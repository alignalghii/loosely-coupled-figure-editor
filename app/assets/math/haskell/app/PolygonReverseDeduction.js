const titlePositionFor = vertices => centroid(widestConvexSubpolygonOf(vertices));

const widestConvexSubpolygonOf = vertices =>
	convexSubpolygonsOf(vertices).reduce(
		(widestSubpolygon, subpolygon) => polygonWidth(subpolygon) >= polygonWidth(widestSubpolygon) ? subpolygon : widestSubpolygon,
		[[0, 0], [0, 0]] // @TODO: empty case
	);

const polygonWidth = vertices => directedLengthOfInterval(polygonWidthInterval(vertices));

const directedLengthOfInterval = ([low, high]) => high - low;

const polygonWidthInterval = vertices => // @TODO: empty case
	[
		vertices.reduce((acc, [x, y]) => Math.min(acc, x),  Infinity),
		vertices.reduce((acc, [x, y]) => Math.max(acc, x), -Infinity),
	];

const convexSubpolygonsOf = vertices => polygonInequalityStructure('containment', vertices).map(extremalPointsOf);

const extremalPointsOf = ineqSystem =>
	mapMaybe(
		([ineq1, ineq2]) => maybeSolveIneqPair(ineq1, ineq2),
		lowerTrianglePairing(ineqSystem)
	).filter(point => anyPointOf(ineqSystem, point));

function maybeSolveIneqPair(ineq1, ineq2)
{
	const [tag, x, y] = solveLines(ineq1, ineq2);
	return tag == 'point' ? ['just', [x, y]] : ['nothing'];
}

function lowerTrianglePairing(as) // @TODO: move to ListX module, or to some combinatorics module
{
	const pairings = [];
	for (let i in as)
		for (let j in as)
			if (i < j)
				pairings.push([as[i], as[j]]);
	return pairings;
}

const anyPointOf = (ineqSystem, [x, y]) => ineqSystem.every(([a, b, c]) => ccLeq(a*x+b*y, c));
