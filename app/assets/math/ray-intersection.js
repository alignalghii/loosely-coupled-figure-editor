function intersectRayWithSegment(point, projectionDirectionVector, segment)
{
	var line = lineOfSegment(segment);
	var typedResult  = intersectRayWithLine(point, projectionDirectionVector, line);

	switch (typedResult[0]) {
		case 'ray':
			if (ccVecEq(point, segment[0])) return scalarProduct(projectionDirectionVector, fromTo(point, segment[1])) > 0 ? unshiftClone('segment', segment) : unshiftClone('degenerate-segment', point);
			if (ccVecEq(point, segment[1])) return scalarProduct(projectionDirectionVector, fromTo(point, segment[0])) > 0 ? unshiftClone('segment', segment) : unshiftClone('degenerate-segment', point);
			if (betweenness(segment, point) < 0) return scalarProduct(projectionDirectionVector, fromTo(point, segment[1])) > 0 ? ['segment', point, segment[1]] : ['segment', segment[0], point];
			if (scalarProduct(projectionDirectionVector, fromTo(point, segment[0])) > 0 && scalarProduct(projectionDirectionVector, fromTo(point, segment[1])) > 0) return  unshiftClone('segment', segment);
			if (scalarProduct(projectionDirectionVector, fromTo(point, segment[0])) < 0 && scalarProduct(projectionDirectionVector, fromTo(point, segment[1])) < 0) return ['inconsistent'];
			//return unshiftClone('segment', segment); // fromTo(typedResult[1]), typedResult[2]
		case 'point':
			var point = tailClone(typedResult);
			var embrace = betweenness(segment, point);
			if (embrace >  0) return unshiftClone('external-point', point);
			if (embrace == 0) return unshiftClone('terminal-point', point);
			if (embrace <  0) return unshiftClone('internal-point', point);
		default: return typedResult; // inconsistent, unconstrained
	}
}


function intersectRayWithLine(point, projectionDirectionVector, lineAsNormalVectorEquation)
{
	var [p1, p2] = point;
	var [pdv1, pdv2] = projectionDirectionVector;
	var [lnv1, lnv2, lineRhs] = lineAsNormalVectorEquation;

	var projectionLineRhs = detCols(point, projectionDirectionVector);

	var generalSolution = solveGeneral([pdv2, -pdv1, projectionLineRhs], lineAsNormalVectorEquation);
	switch (generalSolution[0]) {
		case 'point': return scalarProduct(projectionDirectionVector, fromTo(point, [generalSolution[1], generalSolution[2]])) >= 0 ? generalSolution : ['inconsistent'];
		case 'line': return ['ray', point, projectionDirectionVector];
		default: return generalSolution; // inconsistent, unconstrained
	}
	return generalSolution;

	/*var equatrionSystemRhsVector = [projectionLineRhs, lineRhs]; var eqSysRhsVec = equatrionSystemRhsVector;
	var col1 = [ pdv2, lnv1];
	var col2 = [-pdv1, lnv2];

	var eqSysMatrix = [col1, col2];
	var sub1Matrix  = [eqSysRhsVec, col2];
	var sub2Matrix  = [col1, eqSysRhsVec];*/
}
