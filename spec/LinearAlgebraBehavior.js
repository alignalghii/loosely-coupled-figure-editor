function LinearAlgebraBehavior() {}


LinearAlgebraBehavior.prototype.shouldSolveLines = function ()
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
