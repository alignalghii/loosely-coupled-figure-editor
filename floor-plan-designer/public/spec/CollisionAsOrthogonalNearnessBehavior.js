function CollisionAsOrthogonalNearnessBehavior () {}


CollisionAsOrthogonalNearnessBehavior.prototype.shouldNearestPointOnLine = function ()
{
	return true &&
		vecEq(nearestPointOnLine([3, -2, 4], [12,  3]), [6,  7]) &&
		vecEq(nearestPointOnLine([3, -2, 4], [-4,  5]), [2,  1]) &&
		vecEq(nearestPointOnLine([3, -2, 4], [ 8, 10]), [8, 10]) &&
		true;
};

CollisionAsOrthogonalNearnessBehavior.prototype.shouldVectorToNearestPointOnLine = function ()
{
	return true &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [-2, 6]), [ 6, -3]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [ 0, 5]), [ 4, -2]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [ 2, 4]), [ 2, -1]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [ 4, 3]), [ 0,  0]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [ 6, 2]), [-2,  1]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [ 8, 1]), [-4,  2]) &&
		vecEq(vectorToNearestPointOnLine([2, -1, 5], [10, 0]), [-6,  3]) &&
		true;
};


CollisionAsOrthogonalNearnessBehavior.prototype.shouldNearestPointOnSegment = function ()
{
	return true &&
		vecEq(nearestPointOnSegment([[ 0, -2], [4,  4]], [-4, 5]), [2,  1]) && // internal point
		vecEq(nearestPointOnSegment([[-2, -5], [2,  1]], [-4, 5]), [2,  1]) && // terminal point
		vecEq(nearestPointOnSegment([[-2, -5], [0, -2]], [-4, 5]), [0, -2]) && // external point not involved, using terminal point instead
		true;
};

CollisionAsOrthogonalNearnessBehavior.prototype.shouldVectorToNearestPointOnSegment = function ()
{
	return true &&
		vecEq(nearestPointOnSegment([[ 0, -2], [4,  4]], [-4, 5]), [3, -4]) && // internal point
		vecEq(nearestPointOnSegment([[-2, -5], [2,  1]], [-4, 5]), [3, -4]) && // terminal point
		vecEq(nearestPointOnSegment([[-2, -5], [0, -2]], [-4, 5]), [4, -7]) && // external point not involved, using terminal point instead
		true;
};
