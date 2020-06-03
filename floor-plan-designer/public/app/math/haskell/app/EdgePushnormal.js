function pushEdgenormal_projectDrag(dragVector, vertices, grabbedEdge)
{
	const {map: vertexMapper, dir: [posDir, negDir]} = skeletonOfPushnormal(treeEq, treeEq, (p, q) => [p, q], vertices, grabbedEdge);
	const proj = projectToDir(posDir, dragVector);
	const vertexTransformation = vertexMapper(vertex => addVec(proj, vertex));
	return vertices.map(vertexTransformation);
}

function skeletonOfPushnormal(vertexEq, edgeEq, pairing, vertices, grabbedEdge)
{
	const edges = tour(vertices);
	const vertexMapper = vertexTranslation => vertex => terminatesWith(vertexEq, grabbedEdge, vertex) ? vertexTranslation(vertex) : vertex;

	const selfVector = vectorOfSegment(grabbedEdge);
	const nVector = rot90Positive(selfVector);
	const normalized = normalizeVector(nVector);
	const direction = [normalized, toNegative(normalized)];

	return {map: vertexMapper, dir: direction};
}
