function polygonContoursTouchOrCross(verticesA, verticesB)
{
	var edgesA = tour(verticesA);
	var edgesB = tour(verticesB);
	for (let i = 0; i < edgesA.length; i++)
		for (let j = 0; j < edgesB.length; j++)
			if (segmentsTouchOrCross(edgesA[i], edgesB[j]))
				return true;
	return false;
}

function segmentsTouchOrCross(segmentA, segmentB)
{
	var a = lineOfSegment(segmentA);
	var b = lineOfSegment(segmentB);
	var solution = solveLines(a, b);
	return isTouchOrCrossInBetweenness(segmentA, segmentB, solution);
}

function isTouchOrCrossInBetweenness(segmentA, segmentB, solution)
{
	switch (solution[0]) {
		case 'point'       : return betweenness(segmentA, [solution[1], solution[2]]) <= 0 && betweenness(segmentB, [solution[1], solution[2]]) <= 0;
		case 'line'        : return betweenness(segmentA, segmentB[0]) <= 0 || betweenness(segmentA, segmentB[1]) <= 0 || betweenness(segmentB, segmentA[0]) <= 0 || betweenness(segmentB, segmentA[0]) <= 0;
		case 'inconsistent': return false;
	}
}



function polygonContoursFiniteTouch(verticesA, verticesB)
{
	var edgesA = tour(verticesA);
	var edgesB = tour(verticesB);
	for (let i = 0; i < edgesA.length; i++)
		for (let j = 0; j < edgesB.length; j++)
			if (segmentsFiniteTouch(edgesA[i], edgesB[j]))
				return true;
	return false;
}

function segmentsFiniteTouch(segmentA, segmentB)
{
	var a = lineOfSegment(segmentA);
	var b = lineOfSegment(segmentB);
	var solution = solveLines(a, b);
	return isFiniteTouchInBetweenness(segmentA, segmentB, solution);
}

function isFiniteTouchInBetweenness(segmentA, segmentB, solution)
{
	switch (solution[0]) {
		case 'point'       : return betweenness(segmentA, [solution[1], solution[2]]) == 0 && betweenness(segmentB, [solution[1], solution[2]]) <= 0 || betweenness(segmentB, [solution[1], solution[2]]) == 0 && betweenness(segmentA, [solution[1], solution[2]]) <= 0;
		case 'line'        : return false ||
			vecEq(segmentA[1], segmentB[0]) && betweenness([segmentA[0], segmentB[1]], segmentA[1]) <= 0 || // A+ -- B+
			vecEq(segmentA[1], segmentB[1]) && betweenness([segmentA[0], segmentB[0]], segmentA[1]) <= 0 || // A+ -- B-

			vecEq(segmentA[0], segmentB[0]) && betweenness([segmentA[1], segmentB[1]], segmentA[0]) <= 0 || // A- -- B+
			vecEq(segmentA[0], segmentB[1]) && betweenness([segmentA[1], segmentB[0]], segmentA[0]) <= 0 || // A- -- B-
			false;
		case 'inconsistent': return false;
	}
}
