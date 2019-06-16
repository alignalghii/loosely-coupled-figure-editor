function FallVectorBehavior() {}


FallVectorBehavior.prototype.shouldFallPointOnSegment = function ()
{
	return true &&
		vecEq(fallPointOnSegment([-4, -5], [12, 13], [[0,  9], [6, 0]]), ['just', [-8, -10]]) && // dissects and internal
		vecEq(fallPointOnSegment([-4, -5], [12, 13], [[0,  9], [4, 3]]), ['just', [-8, -10]]) && // dissects and terminal
		vecEq(fallPointOnSegment([-4, -5], [12, 13], [[0,  9], [2, 6]]), ['nothing'        ]) && // dissects and external

		vecEq(fallPointOnSegment([-4, -5], [12, 13], [[0, -2], [4, 3]]), ['just', [-8, -10]]) && // parallel+coincides and non-degenerate section from external
		vecEq(fallPointOnSegment([-4, -5], [ 4,  3], [[0, -2], [4, 3]]), ['just', [ 0,   0]]) && // parallel+coincides and non-degenerate section from terminal 1
		vecEq(fallPointOnSegment([-4, -5], [ 4,  3], [[0, -2], [8, 8]]), ['just', [ 0,   0]]) && // parallel+coincides and non-degenerate section from internal
		vecEq(fallPointOnSegment([-4, -5], [ 0, -2], [[0, -2], [4, 3]]), ['nothing'        ]) && // parallel+coincides and     degenerate section from terminal 2

		vecEq(fallPointOnSegment([-4, -5], [12, 13], [[2,  0], [6, 5]]), ['nothing'        ]) && // parallel+inconsistent
		true;
};

FallVectorBehavior.prototype.shouldFallSegmentOnSegment = function ()
{
	return true &&
		vecEq(fallSegmentOnSegment([0, -1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegment([0, -2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegment([0, -3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegment([0,  1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegment([0,  2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegment([0,  3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&

		vecEq(fallSegmentOnSegment([2, -6], [[ 1,  5], [5, 7]], [[3, 1], [4, 3]]), ['just', [1, -3]]) &&
		vecEq(fallSegmentOnSegment([2, -6], [[ 1,  5], [5, 7]], [[2, 2], [4, 3]]), ['just', [1, -3]]) &&

		vecEq(fallSegmentOnSegment([1, -2], [[ 1,  6], [2, 4]], [[3, 2], [5, 3]]), ['nothing'      ]) &&
		true;
};

FallVectorBehavior.prototype.shouldFallSegmentOnSegmentForward = function ()
{
	return true &&
		vecEq(fallSegmentOnSegmentForward([0, -1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([0, -2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([0, -3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([0,  1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([0,  2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([0,  3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&

		vecEq(fallSegmentOnSegmentForward([2, -6], [[ 1,  5], [5, 7]], [[3, 1], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentForward([2, -6], [[ 1,  5], [5, 7]], [[2, 2], [4, 3]]), ['just', [1, -3]]) &&

		vecEq(fallSegmentOnSegmentForward([1, -2], [[ 1,  6], [2, 4]], [[3, 2], [5, 3]]), ['just', [1, -2]]) &&
		true;
};

FallVectorBehavior.prototype.shouldFallSegmentOnSegmentBackward = function ()
{
	return true &&
		vecEq(fallSegmentOnSegmentBackward([0, -1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegmentBackward([0, -2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegmentBackward([0, -3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['just', [0, -2]]) &&
		vecEq(fallSegmentOnSegmentBackward([0,  1], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentBackward([0,  2], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&
		vecEq(fallSegmentOnSegmentBackward([0,  3], [[-1, 15], [5, 3]], [[1, 2], [4, 3]]), ['nothing'      ]) &&

		vecEq(fallSegmentOnSegmentBackward([2, -6], [[ 1,  5], [5, 7]], [[3, 1], [4, 3]]), ['just', [1, -3]]) &&
		vecEq(fallSegmentOnSegmentBackward([2, -6], [[ 1,  5], [5, 7]], [[2, 2], [4, 3]]), ['just', [1, -3]]) &&

		vecEq(fallSegmentOnSegmentBackward([1, -2], [[ 1,  6], [2, 4]], [[3, 2], [5, 3]]), ['just', [1, -2]]) &&
		true;
};
