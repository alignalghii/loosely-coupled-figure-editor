/*function addVertex(vertices, point) // head-preferring (no type conditions) // @TODO consider
{
	const maybeEcho = verticePathReshapedMinimalEchoHence(vertices, point);
	return maybe(
		[point],
		({distance: _, selectedEdges: [selectedEdge]}) => tour(vertices).flatMap(([beg, end]) => treeEq([beg, end], selectedEdge) ? [beg, point] : [beg]),
		maybeEcho
	);
}*/

const addVertex = (vertices, point) =>
	maybe(
		vertices, // @TODO: consider `[point]` instead, it is logical for empty vertices, but illogical for tye condition (two or more nearest edges)
		nearestEdge => tour(vertices).flatMap(([beg, end]) => treeEq([beg, end], nearestEdge) ? [beg, point] : [beg]),
		maybeNearestEdgeHence(vertices, point)
	);

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



const pushEdge = (vertices, point) =>
	maybe(
		vertices, // @TODO consider
		nearestEdge => {
			const dragVector  = vectorFromNearestPointOnSegment(nearestEdge, point);
			return pushEdge_projectDrag(dragVector, vertices, nearestEdge);
		},
		maybeNearestEdgeHence(vertices, point)
	);
