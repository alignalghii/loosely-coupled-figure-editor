const spanEdge_projectDrag = (index, dragVector, vertices, grabbedEdge) => {
	switch (index) {
		case 0 :
			return tour(vertices).map(
				edge => treeEq(edge, grabbedEdge)
					? spanAlong(vectorOfSegment(edge), dragVector, edge[0])
					: edge[0]
			);
		case 1 :
			return rotListRight1(
				tour(vertices).map(
					edge => treeEq(edge, grabbedEdge)
						? spanAlong(vectorOfSegment(edge), dragVector, edge[1])
						: edge[1]
				)
			);
		default: throw '`spanEdge_projectDrag` index error';
	}
};

const spanAlong = (edgeVector, dragVector, vertex) => {
	// @TODO `projectToDir_safe`, which normalizes `dir` internally automatically, use it also in `EdgePush` module
	const dir = normalizeVector(edgeVector);
	const proj = projectToDir(dir, dragVector);

	return addVec(proj, vertex);
};
