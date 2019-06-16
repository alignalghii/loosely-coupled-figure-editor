function uncollideAbs(polygon, polarAngle, polygon) // returns polarLength to escape
{
}

function uncollideRel(polygon, vector, polygon) // returns coefficient to escape
{
}

function fallPolygonOnPolygon(fallDirectionVector, fallingPolygon, groundPolygon)
{
	var maybeFallingVectorFW = fallPolygonOnPolygonForward (fallDirectionVector, fallingPolygon, groundPolygon);
	var maybeFallingVectorBW = fallPolygonOnPolygonBackward(fallDirectionVector, fallingPolygon, groundPolygon);
	return compareLengthForMin(maybeFallingVectorFW, maybeFallingVectorBW);
}

function fallPolygonOnPolygonForward(fallDirectionVector, fallingPolygon, groundPolygon)
{
	var vertices = fallingPolygon;
	var edges = tour(groundPolygon);
	return fallVerticesOnEdges(fallDirectionVector, vertices, edges);
}

function fallPolygonOnPolygonBackward(fallDirectionVector, fallingPolygon, groundPolygon)
{
	var vertices = groundPolygon;
	var edges = tour(fallingPolygon);
	var maybeFallingVector = fallVerticesOnEdges(fallDirectionVector, vertices, edges);
	return maybeMap(toNegative, maybeFallingVector);
}

function fallVerticesOnEdges(fallDirectionVector, vertices, edges)
{
	function byVertice(currentVertice) {return fallVerticeOnEdges(fallDirectionVector, currentVertice, edges);}
	var maybeFallVectors = vertices.map(byVertice);
	return maybeFallVectors.reduce(compareLengthForMin, ['nothing']);
}

function fallVerticeOnEdges(fallDirectionVector, vertice, edges)
{
	function byEdge(currentEdge) {return directedProjectFallOnSegment(vertice, fallDirectionVector, currentEdge);}
	var maybeFallVectors = edges.map(byEdge);
	return maybeFallVectors.reduce(compareLengthForMin, ['nothing']);
}

function directedProjectFallOnSegment(point, projectionDirectionVector, segment)
{
	var hit = intersectRayWithSegment(point, projectionDirectionVector, segment);
	switch (hit[0]) {
		case 'inconsistent' : return ['nothing'];
		case 'unconstrained': return ['nothing'];
		case 'segment':
			var [_, begin, end] = hit;
			var theNearestOne = selectNearestPointsToPoint([begin, end], point)[0];
			return ['just', fromTo(point, theNearestOne)];
		case 'external-point': return ['nothing'];
		case 'terminal-point': case 'internal-point':
			var [_, x, y] = hit;
			return ['just', fromTo(point, [x, y])];
	}
}
