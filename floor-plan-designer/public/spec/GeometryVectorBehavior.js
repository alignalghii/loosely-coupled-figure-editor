function GeometryVectorBehavior() {}


GeometryVectorBehavior.prototype.shouldDecompose = function (baseVector1, baseVector2, toDecompose)
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
		vecEq(
			decompose([1, 1], [1, -1], [2,0]),
			[1, 1]
		) &&
		vecEq(
			decompose([2, 1], [4, -1], [6,0]),
			[1, 1]
		) &&
		vecEq(
			decompose([2, 1], [4, -1], [8,1]),
			[2, 1]
		) &&
		vecEq(
			decompose([2, 1], [4, -1], [10,-1]),
			[1, 2]
		) &&
		true;
};

GeometryVectorBehavior.prototype.shouldProjectNormal = function ()
{
	return true &&
		ccEq(projectNormal([ 0,  -1], [ 7, 1]),  7) &&
		ccEq(projectNormal([ 0,  -1], [14, 2]), 14) &&

		ccEq(projectNormal([ 0, -13], [ 7, 1]),  7) &&
		ccEq(projectNormal([ 0, -13], [14, 2]), 14) &&

		ccEq(projectNormal([-3,  -4], [ 7, 1]),  5) &&
		ccEq(projectNormal([-3,  -4], [14, 2]), 10) &&
		true;
};

GeometryVectorBehavior.prototype.shouldNormalizeVector = function ()
{
	return true &&
		vecEq(normalizeVector([ 3,  4]), [3/5, 4/5]) &&
		vecEq(normalizeVector([ 7,  0]), [1, 0]) &&
		vecEq(normalizeVector([ 0, 13]), [0, 1]) &&
		true;
};
