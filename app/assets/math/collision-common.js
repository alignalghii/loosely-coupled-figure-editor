/*function linearEquationSystem(lhsMxCol1, lhsMxCol2, rhsVc)
{
	var detAll  = detProd(lhsMxCol1, lhsMxCol2);
	var detSub1 = detProd(rhsVc, lhsMxCol2);
	var detSub2 = detProd(lhsMxCol1, rhsVc);

	var isSingular = ccEq(detAll, 0);
	var isRegular  = !isSingular;
	if (isRegular) return ['unambiguous', detSub1/detAll, detSub2/detAll];
	if (isSinguar) {
		return ['unconstrained']
		return ['coincident'];
		return ['inconsequent'];
	}
}*/

//function dep(u, v) {return u.length == v.length &&

function selectNearestPointsToPoint(points, point)
{
	if (points.length > 0) {
		var start = points[0];
		function itsDistanceFromPoint (currPoint) {return distance(point, currPoint);}
		var distances = points.map(itsDistanceFromPoint);
		var minimalDistance = Math.min.apply(null, distances);
		function isAmongTheNearestOnesFromPoint(currentPoint) {return distance(point, currentPoint) == minimalDistance;}
		return points.filter(isAmongTheNearestOnesFromPoint);
	} else {
		return [];
	}
}

function betweenness([begin, end], point) {return scalarProduct(fromTo(point, begin), fromTo(point, end));}

function lineOfSection(section)
{
	var dirVec  = vectorOfSection(section);
	return buildDirVecEq(dirVec, section[0]);
}

function buildNormVecEq([A , B ], [x0, y0]) {return [ A,   B, scalarProduct([A, B], [x0, y0])];}
function buildDirVecEq ([v1, v2], [x0, y0]) {return [v2, -v1, detCols([x0, y0], [v1, v2])];}

function vectorOfSection([begin, end]) {return fromTo(begin, end);}

function rotVec90CCW([x, y]) {return [-y,  x];}
function rotVec90CW ([x, y]) {return [ y, -x];}


function eqType([a, b, rhs])
{
	if (cc0(a) && cc0(b)) return cc0(rhs) ? 'unconstrained' : 'inconsistent';
	else return 'line';
}

function solveGeneral([a1, b1, rhs1], [a2, b2, rhs2])
{
	var type1 = eqType([a1, b1, rhs1]);
	var type2 = eqType([a2, b2, rhs2]);
	if (type1 == 'inconsistent' || type2 == 'inconsistent') return ['inconsistent'];
	if (type1 == 'unconstrained') return [type2, a2, b2, rhs2];
	if (type2 == 'unconstrained') return [type1, a1, b1, rhs1];
	if (type1 == 'line' && type2 == 'line') return solveLines([a1, b1, rhs1], [a2, b2, rhs2]);
}

function solveLines([a1, b1, rhs1], [a2, b2, rhs2])
{
	/*if (cc0(a1) && cc0(b2) || cc0(b1) && cc0(a2)) {var [x,y] = intersectionPoint([a1, b1, rhs1], [a2, b2, rhs2]); return ['point', x, y]}
	if (cc0(a1) && cc0(a2)) return ccEq(rhs1*b2/b1, rhs2) ? ['line', 0 , b1, rhs1] : ['inconsistent'];
	if (cc0(b1) && cc0(b2)) return ccEq(rhs1*a2/a1, rhs2) ? ['line', a1, 0 , rhs1] : ['inconsistent'];*/

	var col1 = [a1, a2];
	var col2 = [b1, b2];
	var rhsV = [rhs1, rhs2];
	detAll  = detCols(col1, col2);
	detSub1 = detCols(rhsV, col2);
	detSub2 = detCols(col1, rhsV);
	if (!cc0(detAll)) return ['point', detSub1/detAll, detSub2/detAll];
	if ( cc0(detAll)) return cc0(detSub1) && cc0(detSub2) ? ['line', a1, b1, rhs1] : ['inconsistent'];
}

function detCols([a11, a21], [a12, a22]) {return a11*a22-a21*a12;}
