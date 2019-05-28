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
	function byEdge(currentEdge) {return directedProjectPathOnSection(vertice, fallDirectionVector, currentEdge);}
	var maybeFallVectors = edges.map(byEdge);
	return maybeFallVectors.reduce(compareLengthForMin, ['nothing']);
}

function directedProjectPathOnSection(point, projectionDirectionVector, section)
{
	var hit = directedProjectOnSection(point, projectionDirectionVector, section);
	switch (hit[0]) {
		case 'inconsistent' : return ['nothing'];
		case 'unconstrained': return ['nothing'];
		case 'section':
			var [_, begin, end] = hit;
			var theNearestOne = selectNearestPointsToPoint([begin, end], point)[0];
			return ['just', fromTo(point, theNearestOne)];
		case 'externalpoint': return ['nothing'];
		case 'terminalpoint': case 'internalpoint':
			var [_, x, y] = hit;
			return ['just', fromTo(point, [x, y])];
	}
}


function directedProjectOnSection(point, projectionDirectionVector, section)
{
	var line = lineOfSection(section);
	var typedResult  = directedProject(point, projectionDirectionVector, line);

	switch (typedResult[0]) {
		case 'inconsistent' : return typedResult;
		case 'unconstrained': return typedResult;
		case 'line'         : return unshiftClone('section', section);
		case 'point':
			var point = tailClone(typedResult);
			var embrace = betweenness(section, point);
			if (embrace >  0) return unshiftClone('externalpoint', point);
			if (embrace == 0) return unshiftClone('terminalpoint', point);
			if (embrace <  0) return unshiftClone('internalpoint', point);
	}
}

function directedProject(point, projectionDirectionVector, lineAsNormalVectorEquation)
{
	var [p1, p2] = point;
	var [pdv1, pdv2] = projectionDirectionVector;
	var [lnv1, lnv2, lineRhs] = lineAsNormalVectorEquation;

	var projectionLineRhs = detCols(point, projectionDirectionVector);

	return solveGeneral([pdv2, -pdv1, projectionLineRhs], lineAsNormalVectorEquation);

	/*var equatrionSystemRhsVector = [projectionLineRhs, lineRhs]; var eqSysRhsVec = equatrionSystemRhsVector;
	var col1 = [ pdv2, lnv1];
	var col2 = [-pdv1, lnv2];

	var eqSysMatrix = [col1, col2];
	var sub1Matrix  = [eqSysRhsVec, col2];
	var sub2Matrix  = [col1, eqSysRhsVec];*/
}
