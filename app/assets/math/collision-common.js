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

function lineOfSegment(segment)
{
	var dirVec  = vectorOfSegment(segment);
	return buildDirVecEq(dirVec, segment[0]);
}

function buildNormVecEq([A , B ], [x0, y0]) {return [ A,   B, scalarProduct([A, B], [x0, y0])];}
function buildDirVecEq ([v1, v2], [x0, y0]) {return [v2, -v1, detCols([x0, y0], [v1, v2])];}

function vectorOfSegment([begin, end]) {return fromTo(begin, end);}
