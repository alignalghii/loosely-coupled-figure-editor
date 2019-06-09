function PathCollisionBehavior () {}

PathCollisionBehavior.prototype.shouldSectionsTouchOrCross = function ()
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
		 sectionsTouchOrCross(a, b) &&
		 sectionsTouchOrCross(b, c) &&
		!sectionsTouchOrCross(a, c) &&
		 sectionsTouchOrCross(a, g) &&
		 sectionsTouchOrCross(b, g) &&
		!sectionsTouchOrCross(c, d) &&
		 sectionsTouchOrCross(b, d) &&
		 sectionsTouchOrCross(d, e) &&
		 sectionsTouchOrCross(d, h) &&
		!sectionsTouchOrCross(e, h) &&
		 sectionsTouchOrCross(d, i) &&
		 sectionsTouchOrCross(i, j) &&
		!sectionsTouchOrCross(d, j) &&
		true;
};

PathCollisionBehavior.prototype.shouldPolygonPathsTouchOrCross = function ()
{
	return true &&
		 polygonPathsTouchOrCross([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2, 1]]) &&
		!polygonPathsTouchOrCross([[0, 0], [2, 0], [1, 1]], [[7, 0], [9, 0], [8, 1]]) &&
		true;
};

PathCollisionBehavior.prototype.shouldSectionsFiniteTouch = function ()
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
		!sectionsFiniteTouch(a, b) &&
		!sectionsFiniteTouch(b, c) &&
		!sectionsFiniteTouch(a, c) &&
		 sectionsFiniteTouch(a, g) &&
		!sectionsFiniteTouch(b, g) &&
		!sectionsFiniteTouch(c, d) &&
		 sectionsFiniteTouch(b, d) &&
		 sectionsFiniteTouch(d, e) &&
		!sectionsFiniteTouch(d, h) &&
		!sectionsFiniteTouch(e, h) &&
		 sectionsFiniteTouch(d, i) &&
		 sectionsFiniteTouch(i, j) &&
		!sectionsFiniteTouch(d, j) &&
		!sectionsFiniteTouch(j, j) &&
		!sectionsFiniteTouch(j, k) &&
		!sectionsFiniteTouch(k, l) &&
		!sectionsFiniteTouch(l, k) &&
		!sectionsFiniteTouch(k, m) &&
		!sectionsFiniteTouch(m, k) &&
		true;
};

PathCollisionBehavior.prototype.shouldPolygonPathsFiniteTouch = function ()
{
	return true &&
		!polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2,  1]]) && // /X\
		 polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[2, 0], [4, 0], [3,  1]]) && // /\/\
		 polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[0, 1], [2, 1], [1,  2]]) &&
		 polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 1], [3, 1], [2,  0]]) && // /\/
		 polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2, -1]]) &&
		!polygonPathsFiniteTouch([[0, 0], [2, 0], [1, 1]], [[7, 0], [9, 0], [8,  1]]) && // /\     /\
		true;
};

PathCollisionBehavior.prototype.shouldNaturalNormalTo = function ()
{
	return true &&
		vecEq(normalTo([2, -1, 5], [-2, 6]), [ 6, -3]) &&
		vecEq(normalTo([2, -1, 5], [ 0, 5]), [ 4, -2]) &&
		vecEq(normalTo([2, -1, 5], [ 2, 4]), [ 2, -1]) &&
		vecEq(normalTo([2, -1, 5], [ 4, 3]), [ 0,  0]) &&
		vecEq(normalTo([2, -1, 5], [ 6, 2]), [-2,  1]) &&
		vecEq(normalTo([2, -1, 5], [ 8, 1]), [-4,  2]) &&
		vecEq(normalTo([2, -1, 5], [10, 0]), [-6,  3]) &&
		true;
};
PathCollisionBehavior.prototype.shouldDistancedDrag = function ()
{
	return true &&
		vecEq(distancedDrag([3, -4, 3], [-5,  8]), [[3, -4], [1, 0], 10]) &&
		vecEq(distancedDrag([3, -4, 3], [-2,  4]), [[3, -4], [1, 0],  5]) &&
		vecEq(distancedDrag([3, -4, 3], [ 1,  0]), [[3, -4], [1, 0],  0]) &&
		vecEq(distancedDrag([3, -4, 3], [ 4, -4]), [[3, -4], [1, 0],  5]) &&
		vecEq(distancedDrag([3, -4, 3], [ 7, -8]), [[3, -4], [1, 0], 10]) &&
		true;
};

PathCollisionBehavior.prototype.shouldDistancedDrag = function ()
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
PathCollisionBehavior.prototype.shouldSelectDrags = function ()
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

PathCollisionBehavior.prototype.shouldSelectNearestDrags = function ()
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

PathCollisionBehavior.shouldDecompose = function (toDecompose, alongWhat)
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

PathCollisionBehavior.shouldPolygonSlideOnPolygon = function ()
{
	return true &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[ 3, 4], [4, 7], [ 1,  8], [ 1, 6]]), [[-1, -2], [0, -4]]) &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[-1, 4], [0, 7], [-3,  8], [-3, 6]]), [[-3, -6], [0,  0]]) &&
		vecEq(polygonSlideOnPolygon([[5, 7], [7, 8], [5, 10]], [-3, -6], [[ 4, 6], [5, 9], [ 2, 10], [ 2, 8]]), [[ 0,  0], [0, -6]]) &&
		true;
};


PathCollisionBehavior.prototype.shouldVectorFieldTransformationOfPolygon = function ()
{
	return true &&
		true;
};

PathCollisionBehavior.prototype.shouldVectorFieldTransformationOfSection = function ()
{
	return true &&
		true;
};

PathCollisionBehavior.prototype.shouldVectorFieldTransformationOfLine = function ()
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

PathCollisionBehavior.prototype.shouldOrthogonalProjectOnSection = function ()
{
	return true &&
		vecEq(vectorFieldTransformationOfLine([[ 0, -2], [4,  4]], [-4, 5]), [2,  1]) && // internal point
		vecEq(vectorFieldTransformationOfLine([[-2, -5], [2,  1]], [-4, 5]), [2,  1]) && // terminal point
		vecEq(vectorFieldTransformationOfLine([[-2, -5], [0, -2]], [-4, 5]), [0, -2]) && // external point not involved, using terminal point instead
		true;
};

PathCollisionBehavior.prototype.shouldOrthogonalProjectOnLine = function ()
{
	return true &&
		vecEq(vectorFieldTransformationOfLine([3, -2, 4], [12,  3]), [6,  7]) &&
		vecEq(vectorFieldTransformationOfLine([3, -2, 4], [-4,  5]), [2,  1]) &&
		vecEq(vectorFieldTransformationOfLine([3, -2, 4], [ 8, 10]), [8, 10]) &&
		true;
};


PathCollisionBehavior.prototype.shouldFindSolutionSet = function () {};
