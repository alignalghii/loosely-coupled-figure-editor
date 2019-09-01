const getPerimeter = vertices => sum(getEdgeMeasures(vertices));

const getArea = getArea_imperative;
/*const getArea = vertices => vertices.length > 0 ? recurseAreaAjustedWithWithTriangle.apply(null, splitATriangleOff(vertices)) : 0;

const recurseAreaAjustedWithWithTriangle = (triangle, shortcutVertices, toungeOrBay) => interpretAreaCombination(toungeOrBay)(triangleArea(triangle), area(shortcutVertices));

function interpretAreaCombination(toungeOrBay)
{
	switch (toungeOrBay) {
		case 'tongue': return (a, b) => a + b;
		case 'bay'   : return (a, b) => a - b;
		default      : throw 'Invalid label in `interpretAreaCombination`';
	}
}

function splitATriangleOff(vertices)
{
	const [[A, B, C], furtherVertices] = take(3, vertices);
}*/

function getArea_imperative(vertices)
{
	const vertices_clone = vertices.map(([x, y]) => [x, y]);
	const rotDir = tourRotDir(vertices_clone);
	let area = 0;
	while (vertices_clone.length > 2) {
		const [A, B, C] = vertices_clone;
		vertices_clone.splice(1, 1);
		const signum = internalAngle(rotDir, fromTo(A, B), fromTo(B, C)) <= 180 ? 1 : -1;
		area += signum * areaOfTriangle(A, B, C);
	}
	return area;
}

const areaOfTriangle = (A, B, C) =>
	Math.abs(
		detCols(
			fromTo(A, B),
			fromTo(A, C)
		)
	) / 2;

const getEdgeMeasures         = vertices => tour(vertices).map(segmentLength);
const getAngleMeasures        = vertices => tour(tour(rotListRight1(vertices)).map(vectorOfSegment)).map(([ev, fv]) => internalAngle(tourRotDir(vertices), ev, fv));
const getEdgeAndAngleMeasures = vertices => zip(getEdgeMeasures(vertices), getAngleMeasures(vertices));

const externalAngle = (rotDir, ev, fv) =>
	mod_0_360(
		rotationDirectionInterpretation(rotDir)(
			signedRotAngleOfVectors(ev, fv)
		)
	);

const internalAngle = (rotDir, ev, fv) =>
	mod_0_360(
		rotationDirectionInterpretation(rotDir)(
			180 - signedRotAngleOfVectors(ev, fv)
		)
	);

function editEdge_aux(makeTransformationToBeConjugated, vertices, i, a)
{
	if (i < 0 || i >= vertices.length || i != Math.floor(i)) throw '`editEdge`: invalid edge index';
	const O = centroid(vertices);
	const edgeVector = vectorOfSegment(tour(vertices)[i]);
	const q = a / vectorLength(edgeVector);
	const phi = signedRotAngleOfVectors([1, 0], edgeVector) * Math.PI / 180;
	const rotate     = makeRotate(-phi, O);
	const rotateBack = makeRotate( phi, O);
	const transformationToBeConjugated = makeTransformationToBeConjugated(q, O);
	const edit = p => rotateBack(transformationToBeConjugated(rotate(p)));
	return vertices.map(edit);
}

const editEdge               = (vertices, i, a) => editEdge_aux((q, O) => makeScaleX(q, O[0]), vertices, i, a);
      editEdge_areaInvariant = (vertices, i, a) => editEdge_aux(makeScaleXYArealInvariant    , vertices, i, a);

//const editAngle               = (vertices, i, alpha) => [];
//const editAngle_areaInvariant = (vertices, i, alpha) => [];
