function CollisionBehavior () {}

CollisionBehavior.prototype.shouldFallPolygonOnPoligon = function ()
{
	var maybeFallVector1 = fallPolygonOnPolygon(
		[-7, -7],
		[[4,  1], [5, 1], [ 4, 2]],
		[[4, -2], [1, 4], [-5, 1]]
	);
	var flag1 = vecEq(maybeFallVector1, ['just', [-1, -1]]);

	var maybeFallVector2 = fallPolygonOnPolygon(
		[7, 7],
		[[4, -2], [1, 4], [-5, 1]],
		[[4,  1], [5, 1], [ 4, 2]]
	);
	var flag2 = vecEq(maybeFallVector2, ['just', [ 1,  1]]);

	return flag1 && flag2;
};

CollisionBehavior.prototype.shouldFallVerticesOnEdges = function ()
{
	var fallVector1 = fallVerticesOnEdges(
		[-1, -1],
		[[1, 4], [3, 5], [3, 3], [5, 4], [7, 5], [8, 5], [5, 1]],
		[[[0, 3], [2, 3]], [[2, 3], [2, 2]], [[2, 2], [4, 2]], [[4, 2], [4, 0]]]
	);
	var flag1 = vecEq(fallVector1, ['just', [-1,-1]]);

	var fallVector2 = fallVerticesOnEdges(
		[-1, -1],
		[[1, 4], [3, 5], [3, 3], [5, 4], [7, 5], [8, 5], [5, 1]],
		[[[0, 3], [2, 3]], [[2, 3], [3, 2]], [[3, 2], [4, 2]], [[4, 2], [4, 0]]]
	);
	var flag2 = vecEq(fallVector2, ['just', [-1/2, -1/2]]);

	return flag1 && flag2;
};

CollisionBehavior.prototype.shouldFallVerticeOnEdges = function ()
{
	var maybeFallVector1 = fallVerticeOnEdges(
		[ -1, -1],
		[  5,  4],
		[[[0, 3], [2, 3]], [[2, 3], [2, 2]], [[2, 2], [4, 2]], [[4, 2], [4, 0]]]
	);
	var flag1 = vecEq(maybeFallVector1, ['just', [-2, -2]]);

	var maybeFallVector2 = fallVerticeOnEdges(
		[ -1, -1],
		[  5,  4],
		[[[0, 3], [2, 3]], [[2, 3], [3, 2]], [[3, 2], [4, 2]], [[4, 2], [4, 0]]]
	);
	var flag2 = vecEq(maybeFallVector2, ['just', [-2, -2]]);

	var maybeFallVector3 = fallVerticeOnEdges(
		[ -4, -3],
		[ 20, 14],
		[[[-2, 8], [5, 1]], [[5, 1], [11, 10]], [[11, 10], [13, 6]]]
	);
	var flag3 = vecEq(maybeFallVector3, ['just', [-8, -6]]);


	var maybeFallVector4 = fallVerticeOnEdges(
		[-18, -8],
		[ 20, 14],
		[[[-2, 8], [5, 1]], [[5, 1], [11, 10]], [[11, 10], [13, 6]]]
	);
	var flag4 = vecEq(maybeFallVector4, ['just', [-9, -4]]);

	var maybeFallVector5 = fallVerticeOnEdges(
		[-1,  0],
		[20, 14],
		[[[-2, 8], [5, 1]], [[5, 1], [11, 10]], [[11, 10], [13, 6]]]
	);
	var flag5 = vecEq(maybeFallVector5, ['nothing']);

	var maybeFallVector6 = fallVerticeOnEdges(
		[-3, -1],
		[20, 14],
		[[[-2, 8], [5, 1]], [[5, 1], [11, 10]], [[11, 10], [13, 6]]]
	);
	var flag6 = vecEq(maybeFallVector6, ['just', [-21, -7]]);

	return flag1 && flag2 && flag3 && flag4 && flag5 && flag6;
};


CollisionBehavior.prototype.shouldDirectProjectFallOnSection = function ()
{
	return true &&
		vecEq(directedProjectFallOnSection([12, 13], [-4, -5], [[0,  9], [6, 0]]), ['just', [-8, -10]]) &&
		vecEq(directedProjectFallOnSection([12, 13], [-4, -5], [[0,  9], [4, 3]]), ['just', [-8, -10]]) &&
		vecEq(directedProjectFallOnSection([12, 13], [-4, -5], [[0,  9], [2, 6]]), ['nothing'      ]) &&
		vecEq(directedProjectFallOnSection([12, 13], [-4, -5], [[0, -2], [4, 3]]), ['just', [-8, -10]]) &&
		vecEq(directedProjectFallOnSection([12, 13], [-4, -5], [[2,  0], [6, 5]]), ['nothing'      ]) &&
		true;
};

CollisionBehavior.prototype.shouldDirectProjectionOnSection = function ()
{
	return true &&
		vecEq(directedProjectOnSection([12, 13], [-4, -5], [[0,  9], [6, 0]]), ['internalpoint', 4      , 3     ]) &&
		vecEq(directedProjectOnSection([12, 13], [-4, -5], [[0,  9], [4, 3]]), ['terminalpoint', 4      , 3     ]) &&
		vecEq(directedProjectOnSection([12, 13], [-4, -5], [[0,  9], [2, 6]]), ['externalpoint', 4      , 3     ]) &&
		vecEq(directedProjectOnSection([12, 13], [-4, -5], [[0, -2], [4, 3]]), ['section'      , [0, -2], [4, 3]]) &&
		vecEq(directedProjectOnSection([12, 13], [-4, -5], [[2,  0], [6, 5]]), ['inconsistent'                  ]) &&
		true;
};

CollisionBehavior.prototype.shouldDirectProjection = function ()
{
	return true &&
		vecEq(directedProject([12, 13], [-4, -5], [3,  2, 18]), ['point', 4, 3]) &&
		vecEq(directedProject([12, 13], [-4, -5], [5, -4,  8]), ['line', -5, 4, -8]) &&
		vecEq(directedProject([12, 13], [-4, -5], [5, -4, 16]), ['inconsistent']) &&
		true;
};

CollisionBehavior.prototype.shouldSolveLines = function ()
{
	return true &&
		vecEq(solveLines([2, 3,  6], [2, 3,  6]), ['line', 2, 3, 6]) &&
		vecEq(solveLines([2, 3,  6], [4, 6, 12]), ['line', 2, 3, 6]) &&
		vecEq(solveLines([2, 3,  0], [4, 6,  0]), ['line', 2, 3, 0]) &&

		vecEq(solveLines([2, 3,  6], [4, 6, 13]), ['inconsistent' ]) &&
		vecEq(solveLines([2, 3,  0], [4, 6,  1]), ['inconsistent' ]) &&
		vecEq(solveLines([0, 1,  5], [1, 0, 10]), ['point', 10,  5]) &&
		true;
};

CollisionBehavior.prototype.shouldDetectBetweenness = function ()
{
	return true &&
		betweenness([[-1, 2], [5, 6]], [ 2, 4]) <  0 &&
		betweenness([[-1, 2], [5, 6]], [-1, 2]) == 0 &&
		betweenness([[-1, 2], [5, 6]], [ 5, 6]) == 0 &&
		betweenness([[-1, 2], [5, 6]], [-4, 0]) >  0 &&
		betweenness([[-1, 2], [5, 6]], [ 8, 8]) >  0 &&
		true;
};

CollisionBehavior.prototype.shouldUnshiftClone = function () {var a = [10, 20]; return vecEq(unshiftClone(2, a), [2, 10, 20]) && vecEq(a, [10, 20]);};
CollisionBehavior.prototype.shouldPushClone    = function () {var a = [10, 20]; return vecEq(   pushClone(2, a), [10, 20, 2]) && vecEq(a, [10, 20]);};
CollisionBehavior.prototype.shouldTailClone    = function () {var a = [10, 20]; return vecEq(   tailClone(   a), [       20]) && vecEq(a, [10, 20]);};

CollisionBehavior.prototype.shouldSelectNearestPointsToPoint = function ()
{
	return true &&
		vecEq(selectNearestPointsToPoint([[1, 2], [4, 4], [6, 9]         ], [1, 8]), [[4, 4]        ]) && // minimal distance: 5, 1 occurrence
		vecEq(selectNearestPointsToPoint([[1, 2], [4, 4], [6, 9], [-4, 8]], [1, 8]), [[4, 4], [-4,8]]) && // minimal distance: 5, 2 occurrences
		vecEq(selectNearestPointsToPoint([                               ], [1, 8]), [              ]) && // no occurrence
		true;
};
