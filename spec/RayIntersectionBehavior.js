function RayIntersectionBehavior() {}



RayIntersectionBehavior.prototype.shouldIntersectRayWithSegment = function ()
{
	return true &&

		vecEq(intersectRayWithSegment([12, 13], [-4, -5], [[ 0,  9], [6, 0]]), ['internal-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([12, 13], [-4, -5], [[ 0,  9], [4, 3]]), ['terminal-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([12, 13], [-4, -5], [[ 0,  9], [2, 6]]), ['external-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([12, 13], [-4, -5], [[ 2,  0], [6, 5]]), ['inconsistent'                   ]) &&

		vecEq(intersectRayWithSegment([ 4,  3], [-4, -5], [[ 0,  9], [6, 0]]), ['internal-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([ 4,  3], [-4, -5], [[ 0,  9], [4, 3]]), ['terminal-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([ 4,  3], [-4, -5], [[ 0,  9], [2, 6]]), ['external-point', 4      , 3     ]) &&
		vecEq(intersectRayWithSegment([ 4,  3], [-4, -5], [[ 2,  0], [6, 5]]), ['inconsistent'                   ]) &&

		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 0,  9], [6, 0]]), ['inconsistent'                 ]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 0,  9], [4, 3]]), ['inconsistent'                 ]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 0,  9], [2, 6]]), ['inconsistent'                 ]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 2,  0], [6, 5]]), ['inconsistent'                 ]) &&

		vecEq(intersectRayWithSegment([12, 13], [-4, -5], [[ 0, -2], [4, 3]]), ['segment'           , [ 0, -2], [4,  3]]) &&
		vecEq(intersectRayWithSegment([ 4,  3], [-4, -5], [[ 0, -2], [4, 3]]), ['segment'           , [ 0, -2], [4,  3]]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 0, -2], [4, 3]]), ['degenerate-segment',   0, -2          ]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[-4, -7], [4, 3]]), ['segment'           , [-4, -7], [0, -2]]) &&
		vecEq(intersectRayWithSegment([ 0, -2], [-4, -5], [[ 4,  3], [8, 8]]), ['inconsistent'                         ]) &&

		true;
};


RayIntersectionBehavior.prototype.shouldIntersectRayWithLine = function ()
{
	return true &&
		vecEq(intersectRayWithLine([12, 13], [-4, -5], [3,  2, 18]), ['point', 4, 3]) &&
		vecEq(intersectRayWithLine([ 8,  8], [-4, -5], [3,  2, 18]), ['point', 4, 3]) &&
		vecEq(intersectRayWithLine([ 4,  3], [-4, -5], [3,  2, 18]), ['point', 4, 3]) &&
		vecEq(intersectRayWithLine([ 0, -2], [-4, -5], [3,  2, 18]), ['inconsistent']) &&

		vecEq(intersectRayWithLine([12, 13], [-4, -5], [5, -4,  8]), ['ray', [12, 13], [-4, -5]]) && // ['ray', [12, 13], [-4, -5]]
		vecEq(intersectRayWithLine([12, 13], [-4, -5], [5, -4, 16]), ['inconsistent']) &&
		true;
};
