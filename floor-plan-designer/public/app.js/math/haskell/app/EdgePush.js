function pushEdge_projectDrag(dragVector, vertices, grabbedEdge)
{
	return maybe(
		vertices,
		({map: vertexMapper, dir: [posDir, negDir]}) => {
			const proj = projectToDir(posDir, dragVector);
			const vertexTransformation = vertexMapper(vertex => addVec(proj, vertex));
			return vertices.map(vertexTransformation);
		},
		skeletonOfPush(treeEq, treeEq, (p, q) => [p, q], edgeParallelity, vertices, grabbedEdge)
	);
}

const projectToDir = (dir, vec) => slantScale(scalarProduct(dir, vec), dir); // @TODO `projectToDir_safe`, which normalizes `dir` internally automatically, use it also in `EdgeSpan` module

function skeletonOfPush(vertexEq, edgeEq, pairing, edgeParallelity, vertices, grabbedEdge)
{
	const edges = tour(vertices);
	const [prevEdge, _, nextEdge] = neighborValues(edgeEq, grabbedEdge, edges);
	if (edgeParallelity(prevEdge, nextEdge)) {
		const vertexMapper = vertexTranslation => vertex => terminatesWith(vertexEq, grabbedEdge, vertex) ? vertexTranslation(vertex) : vertex;
		const parVector = vectorOfSegment(prevEdge);
		const normalized = normalizeVector(parVector);
		const direction = [normalized, toNegative(normalized)];
		return just({map: vertexMapper, dir: direction});
	} else {
		return nothing;
	}
}

const terminatesWith = (vertexEq, edge, vertex) => edge.some(terminal => vertexEq(vertex, terminal));

const neighborValues = (itemEquivalence, grabbedItem, collection) => neighborIndices(itemEquivalence, grabbedItem, collection).map(i => collection[i]);

function neighborIndices(itemEquivalence, grabbedItem, collection)
{
	const n = collection.length;
	if (n < 3) throw 'Neghboring indices stucking error';
	const grabbedIndex = collection.findIndex(collItem => itemEquivalence(grabbedItem, collItem));
	if (grabbedIndex < 0) throw 'Neghboring indices grabbing error';
	const prevIndex = modulo(grabbedIndex-1, n);
	const nextIndex = modulo(grabbedIndex+1, n);
	return [prevIndex, grabbedIndex, nextIndex];
}

const modulo = (a, m) => (a%m + m) % m; // @credit https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm and https://stackoverflow.com/a/4467559

const edgeParallelity = ([[a1, a2], [b1, b2]], [[A1, A2], [B1, B2]]) => ccEq((b1-a1)*(B2-A2), (b2-a2)*(B1-A1));
