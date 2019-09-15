function addVertex(vertices, point)
{
	const maybeEcho = verticePathReshapedMinimalEchoHence(vertices, point);
	return maybe(
		[point],
		({distance: _, selectedEdges: [selectedEdge]}) => tour(vertices).flatMap(([beg, end]) => treeEq([beg, end], selectedEdge) ? [beg, point] : [beg]),
		maybeEcho
	);
}

function deleteVertex(vertices, point)
{
	const differsFromTheNearestOne = maybe(
		vertex => true,
		nearestVertex => vertex => !ccVecEq(nearestVertex, vertex),
		maybeNearestVertexHence(vertices, point)
	);
	return vertices.filter(differsFromTheNearestOne);
}

function moveVertex(vertices, point)
{
	const move = maybe(
		vertex => vertex,
		nearestVertex => vertex => ccVecEq(vertex, nearestVertex) ? point : vertex,
		maybeNearestVertexHence(vertices, point)
	);
	return vertices.map(move);
}


