function maybeWaistOfPolygon(vertices)
{
	const [minY, maxY] = verticalBounds(vertices), dy = (maxY - minY) / 100;
	const convexPolygonIneqSystems = polygonInequalityStructure('containment', vertices);

	return reduceFor(
		(mbInterval, y) => maybeWaistOfSystemsAt(convexPolygonIneqSystems, y)
		['nothing']
		minY, maxY, dy
		////
	);
}

const maybeWaistOfSystemsAt = (convexPolygonIneqSystems, y) =>
	convexPolygonIneqSystems.reduce(
		(maybeMaxInterval, convexPolygonIneqSystem) => selectMinMaybeInterval(maybeMaxInterval, maybeWaistOfSystemAt(convexPolygonIneqSystem, y)),
		['nothing']
	);

function reduceFor(reducer, accumulator, minY, maxY, dy)
{
	for (let y = minY; y <= maxY; y += dy) {
		accumulator = reducer(accumulator, y);
	}
	return accumulator;
}


	for (let y = minY; y <= maxY; y += dy) {
		convexPolygonIneqSystems.reduce(
			(maxWaist, convexPolygonIneqSystem) => selectWaist(maxWaist, waistAtY(convexPolygonIneqSystem, y)),
			['nothing']
		);
	}

function

convexPolygonIneqSystems.reduce(
			(maxWaist, convexPolygonIneqSystem) => selectWaist(maxWaist, waistAtY(convexPolygonIneqSystem, y)),
			['nothing']
		);
