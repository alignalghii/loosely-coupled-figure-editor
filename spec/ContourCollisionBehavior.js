function ContourCollisionBehavior () {}

ContourCollisionBehavior.prototype.shouldSegmentsTouchOrCross = function ()
{
	var a = [[-1, 11], [ 1,  7]];
	var b = [[ 0,  9], [ 4,  1]];
	var c = [[ 2,  5], [ 3,  3]];
	var d = [[ 4,  1], [13,  4]];
	var e = [[ 7,  2], [ 6, -2]];
	var f = [[ 5,  3], [ 3, -1]];
	var g = [[ 1,  7], [ 3,  3]];
	var h = [[ 8,  3], [11,  1]];
	var i = [[13,  4], [13,  2]];
	var j = [[12,  2], [14,  2]];

	return true &&
		 segmentsTouchOrCross(a, b) &&
		 segmentsTouchOrCross(b, c) &&
		!segmentsTouchOrCross(a, c) &&
		 segmentsTouchOrCross(a, g) &&
		 segmentsTouchOrCross(b, g) &&
		!segmentsTouchOrCross(c, d) &&
		 segmentsTouchOrCross(b, d) &&
		 segmentsTouchOrCross(d, e) &&
		 segmentsTouchOrCross(d, h) &&
		!segmentsTouchOrCross(e, h) &&
		 segmentsTouchOrCross(d, i) &&
		 segmentsTouchOrCross(i, j) &&
		!segmentsTouchOrCross(d, j) &&
		true;
};

ContourCollisionBehavior.prototype.shouldPolygonContoursTouchOrCross = function ()
{
	return true &&
		 polygonContoursTouchOrCross([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2, 1]]) &&
		!polygonContoursTouchOrCross([[0, 0], [2, 0], [1, 1]], [[7, 0], [9, 0], [8, 1]]) &&
		true;
};

ContourCollisionBehavior.prototype.shouldSegmentsFiniteTouch = function ()
{
	var a = [[-1, 11], [ 1,  7]];
	var b = [[ 0,  9], [ 4,  1]];
	var c = [[ 2,  5], [ 3,  3]];
	var d = [[ 4,  1], [13,  4]];
	var e = [[ 7,  2], [ 6, -2]];
	var f = [[ 5,  3], [ 3, -1]];
	var g = [[ 1,  7], [ 3,  3]];
	var h = [[ 8,  3], [11,  1]];
	var i = [[13,  4], [13,  2]];
	var j = [[12,  2], [14,  2]];
	var k = [[12,  1], [14,  1]];
	var l = [[12,  1], [13,  1]];
	var m = [[13,  1], [14,  1]];

	return true &&
		!segmentsFiniteTouch(a, b) &&
		!segmentsFiniteTouch(b, c) &&
		!segmentsFiniteTouch(a, c) &&
		 segmentsFiniteTouch(a, g) &&
		!segmentsFiniteTouch(b, g) &&
		!segmentsFiniteTouch(c, d) &&
		 segmentsFiniteTouch(b, d) &&
		 segmentsFiniteTouch(d, e) &&
		!segmentsFiniteTouch(d, h) &&
		!segmentsFiniteTouch(e, h) &&
		 segmentsFiniteTouch(d, i) &&
		 segmentsFiniteTouch(i, j) &&
		!segmentsFiniteTouch(d, j) &&
		!segmentsFiniteTouch(j, j) &&
		!segmentsFiniteTouch(j, k) &&
		!segmentsFiniteTouch(k, l) &&
		!segmentsFiniteTouch(l, k) &&
		!segmentsFiniteTouch(k, m) &&
		!segmentsFiniteTouch(m, k) &&
		true;
};

ContourCollisionBehavior.prototype.shouldPolygonContoursFiniteTouch = function ()
{
	return true &&
		!polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2,  1]]) && // /X\
		 polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[2, 0], [4, 0], [3,  1]]) && // /\/\
		 polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[0, 1], [2, 1], [1,  2]]) &&
		 polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 1], [3, 1], [2,  0]]) && // /\/
		 polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2, -1]]) &&
		!polygonContoursFiniteTouch([[0, 0], [2, 0], [1, 1]], [[7, 0], [9, 0], [8,  1]]) && // /\     /\
		true;
};

ContourCollisionBehavior.prototype.shouldDistancedDrag = function ()
{
	return true &&
		vecEq(distancedDrag([3, -4, 3], [-5,  8]), [[3, -4], [1, 0], 10]) &&
		vecEq(distancedDrag([3, -4, 3], [-2,  4]), [[3, -4], [1, 0],  5]) &&
		vecEq(distancedDrag([3, -4, 3], [ 1,  0]), [[3, -4], [1, 0],  0]) &&
		vecEq(distancedDrag([3, -4, 3], [ 4, -4]), [[3, -4], [1, 0],  5]) &&
		vecEq(distancedDrag([3, -4, 3], [ 7, -8]), [[3, -4], [1, 0], 10]) &&
		true;
};

ContourCollisionBehavior.prototype.shouldDistancedDrag = function ()
{
	return true &&
		vecEq(distancedDrag([[-3, -3], [5, 3]], [-5,  8]), ['just', [[3, -4], [1, 0], 10]]) &&
		vecEq(distancedDrag([[-3, -3], [5, 3]], [-2,  4]), ['just', [[3, -4], [1, 0],  5]]) &&
		vecEq(distancedDrag([[-3, -3], [5, 3]], [ 1,  0]), ['just', [[3, -4], [1, 0],  0]]) &&
		vecEq(distancedDrag([[-3, -3], [5, 3]], [ 4, -4]), ['just', [[3, -4], [1, 0],  5]]) &&
		vecEq(distancedDrag([[-3, -3], [5, 3]], [ 7, -8]), ['just', [[3, -4], [1, 0], 10]]) &&

		vecEq(distancedDrag([[ 1,  0], [5, 3]], [-5,  8]), ['nothing']) &&
		vecEq(distancedDrag([[ 1,  0], [5, 3]], [-2,  4]), ['nothing']) &&
		vecEq(distancedDrag([[ 1,  0], [5, 3]], [ 1,  0]), ['nothing']) &&
		vecEq(distancedDrag([[ 1,  0], [5, 3]], [ 4, -4]), ['nothing']) &&
		vecEq(distancedDrag([[ 1,  0], [5, 3]], [ 7, -8]), ['nothing']) &&

		vecEq(distancedDrag([[-3, -3], [1, 0]], [-5,  8]), ['nothing']) &&
		vecEq(distancedDrag([[-3, -3], [1, 0]], [-2,  4]), ['nothing']) &&
		vecEq(distancedDrag([[-3, -3], [1, 0]], [ 1,  0]), ['nothing']) &&
		vecEq(distancedDrag([[-3, -3], [1, 0]], [ 4, -4]), ['nothing']) &&
		vecEq(distancedDrag([[-3, -3], [1, 0]], [ 7, -8]), ['nothing']) &&

		vecEq(distancedDrag([[ 5,  3], [9, 6]], [-5,  8]), ['nothing']) &&
		vecEq(distancedDrag([[ 5,  3], [9, 6]], [-2,  4]), ['nothing']) &&
		vecEq(distancedDrag([[ 5,  3], [9, 6]], [ 1,  0]), ['nothing']) &&
		vecEq(distancedDrag([[ 5,  3], [9, 6]], [ 4, -4]), ['nothing']) &&
		vecEq(distancedDrag([[ 5,  3], [9, 6]], [ 7, -8]), ['nothing']) &&

		true;
};
ContourCollisionBehavior.prototype.shouldSelectDrags = function ()
{
	return true &&
		vecEq(selectDrags([                                        ], [8, 3]), [                                          ]) &&

		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[14, 1], [14, 6]]], [8, 3]), [[[4, -3], [4, 6], 5], [[0, 1], [14, 3], 6]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[13, 1], [13, 6]]], [8, 3]), [[[4, -3], [4, 6], 5], [[0, 1], [13, 3], 5]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[12, 1], [12, 6]]], [8, 3]), [[[4, -3], [4, 6], 5], [[0, 1], [12, 3], 4]]) &&

		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[14, 3], [14, 6]]], [8, 3]), [[[4, -3], [4, 6], 5]                      ]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[13, 2], [13, 6]]], [8, 3]), [[[4, -3], [4, 6], 5]                      ]) &&
		vecEq(selectDrags([[[ 4,  6], [ 7, 10]], [[13, 1], [13, 6]]], [8, 3]), [                      [[0, 1], [12, 3], 4]]) &&
		vecEq(selectDrags([[[ 7, 10], [10, 14]], [[13, 1], [13, 6]]], [8, 3]), [                      [[0, 1], [12, 3], 4]]) &&

		true;
};

ContourCollisionBehavior.prototype.shouldSelectNearestDrags = function ()
{
	return true &&
		vecEq(selectDrags([                                        ], [8, 3]), [['nothing'], [                                    ]]) &&

		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[14, 1], [14, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[13, 1], [13, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]], [[0, 1], [13, 3]]]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[12, 1], [12, 6]]], [8, 3]), [['just', 4], [                   [[0, 1], [12, 3]]]]) &&


		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[14, 3], [14, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[13, 3], [13, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[12, 3], [12, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&

		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[14, 4], [14, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[13, 4], [13, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&
		vecEq(selectDrags([[[ 1,  2], [ 7, 10]], [[12, 4], [12, 6]]], [8, 3]), [['just', 5], [[[4, -3], [4, 6]]                   ]]) &&


		vecEq(selectDrags([[[ 4,  6], [ 7, 10]], [[14, 1], [14, 6]]], [8, 3]), [['just', 6], [                   [[0, 1], [14, 3]]]]) &&
		vecEq(selectDrags([[[ 4,  6], [ 7, 10]], [[13, 1], [13, 6]]], [8, 3]), [['just', 5], [                   [[0, 1], [13, 3]]]]) &&
		vecEq(selectDrags([[[ 4,  6], [ 7, 10]], [[12, 1], [12, 6]]], [8, 3]), [['just', 4], [                   [[0, 1], [12, 3]]]]) &&

		vecEq(selectDrags([[[ 7, 10], [10, 14]], [[14, 1], [14, 6]]], [8, 3]), [['just', 6], [                   [[0, 1], [14, 3]]]]) &&
		vecEq(selectDrags([[[ 7, 10], [10, 14]], [[13, 1], [13, 6]]], [8, 3]), [['just', 5], [                   [[0, 1], [13, 3]]]]) &&
		vecEq(selectDrags([[[ 7, 10], [10, 14]], [[12, 1], [12, 6]]], [8, 3]), [['just', 4], [                   [[0, 1], [12, 3]]]]) &&

		true;
};

ContourCollisionBehavior.shouldDecompose = function (toDecompose, alongWhat)
{
	return true &&
		vecEq(
			decompose([1, 0], [0, 1], [3,2]),
			[3, 2]
		) &&
		ccVecEq(
			decompose(
				[3,  3*Math.sqrt(3)],
				[0, -3*Math.sqrt(3)],
				[3, 0]
			),
			[1, 1]
		) &&
		true;
};

ContourCollisionBehavior.shouldPolygonSlideOnPolygon = function ()
{
	return true &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[ 3, 4], [4, 7], [ 1,  8], [ 1, 6]]), [[-1, -2], [0, -4]]) &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[-1, 4], [0, 7], [-3,  8], [-3, 6]]), [[-3, -6], [0,  0]]) &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[ 4, 6], [5, 9], [ 2, 10], [ 2, 8]]), [[ 0,  0], [0, -6]]) &&
		true;
};


ContourCollisionBehavior.prototype.shouldVectorFieldTransformationOfPolygon = function ()
{
	return true &&
		true;
};

ContourCollisionBehavior.prototype.shouldVectorFieldTransformationOfSegment = function ()
{
	return true &&
		true;
};

ContourCollisionBehavior.prototype.shouldVectorFieldTransformationOfLine = function ()
{
	return true &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [ 2, -1])([1, 3], [5, 0]), [1, 2]) &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [-2,  1])([1, 3], [0, 5]), [0, 5]) &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [ 2, -1])([, ], [, ]), [, ]) &&

		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [-2,  1])([1, 3], [5, 0]), [5, 0]) &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [-2,  1])([1, 3], [0, 5]), [2, 4]) &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [-2,  1])([, ], [, ]), [, ]) &&
		vecEq(vectorFieldTransformationOfLine([2, -1, -1], [-2,  1])([, ], [, ]), [, ]) &&
		true;
};


ContourCollisionBehavior.prototype.shouldFindSolutionSet = function () {};
