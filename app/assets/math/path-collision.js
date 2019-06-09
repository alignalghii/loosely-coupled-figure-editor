function polygonPathsTouchOrCross(verticesA, verticesB)
{
	var edgesA = tour(verticesA);
	var edgesB = tour(verticesB);
	for (let i = 0; i < edgesA.length; i++)
		for (let j = 0; j < edgesB.length; j++)
			if (sectionsTouchOrCross(edgesA[i], edgesB[j]))
				return true;
	return false;
}

function sectionsTouchOrCross(sectionA, sectionB)
{
	var a = lineOfSection(sectionA);
	var b = lineOfSection(sectionB);
	var solution = solveLines(a, b);
	return isTouchOrCrossInBetweenness(sectionA, sectionB, solution);
}

function isTouchOrCrossInBetweenness(sectionA, sectionB, solution)
{
	switch (solution[0]) {
		case 'point'       : return betweenness(sectionA, [solution[1], solution[2]]) <= 0 && betweenness(sectionB, [solution[1], solution[2]]) <= 0;
		case 'line'        : return betweenness(sectionA, sectionB[0]) <= 0 || betweenness(sectionA, sectionB[1]) <= 0 || betweenness(sectionB, sectionA[0]) <= 0 || betweenness(sectionB, sectionA[0]) <= 0;
		case 'inconsistent': return false;
	}
}



function polygonPathsFiniteTouch(verticesA, verticesB)
{
	var edgesA = tour(verticesA);
	var edgesB = tour(verticesB);
	for (let i = 0; i < edgesA.length; i++)
		for (let j = 0; j < edgesB.length; j++)
			if (sectionsFiniteTouch(edgesA[i], edgesB[j]))
				return true;
	return false;
}

function sectionsFiniteTouch(sectionA, sectionB)
{
	var a = lineOfSection(sectionA);
	var b = lineOfSection(sectionB);
	var solution = solveLines(a, b);
	return isFiniteTouchInBetweenness(sectionA, sectionB, solution);
}

function isFiniteTouchInBetweenness(sectionA, sectionB, solution)
{
	switch (solution[0]) {
		case 'point'       : return betweenness(sectionA, [solution[1], solution[2]]) == 0 && betweenness(sectionB, [solution[1], solution[2]]) <= 0 || betweenness(sectionB, [solution[1], solution[2]]) == 0 && betweenness(sectionA, [solution[1], solution[2]]) <= 0;
		case 'line'        : return false ||
			vecEq(sectionA[1], sectionB[0]) && betweenness([sectionA[0], sectionB[1]], sectionA[1]) <= 0 || // A+ -- B+
			vecEq(sectionA[1], sectionB[1]) && betweenness([sectionA[0], sectionB[0]], sectionA[1]) <= 0 || // A+ -- B-

			vecEq(sectionA[0], sectionB[0]) && betweenness([sectionA[1], sectionB[1]], sectionA[0]) <= 0 || // A- -- B+
			vecEq(sectionA[0], sectionB[1]) && betweenness([sectionA[1], sectionB[0]], sectionA[0]) <= 0 || // A- -- B-
			false;
		case 'inconsistent': return false;
	}
}
