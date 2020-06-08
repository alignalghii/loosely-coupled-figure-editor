function collidesSegmentWithSegment_signAndMagnitudeIndependent(fallDirection, projectileSegment, targetSegment)
{
	function proj(point) {return projectNormal(fallDirection, point);}
	var projectileInterval = projectileSegment.map(proj);
	var targetInterval     = targetSegment.map(proj);
	sortInterval(projectileInterval);
	sortInterval(targetInterval);
	return infiniteIntersection(projectileInterval, targetInterval) || isPointDegenerateAndInternalIn(projectileInterval, targetInterval) || isPointDegenerateAndInternalIn(targetInterval, projectileInterval);
}

function sortInterval(interval) {var a = Math.min.apply(null, interval); var b = Math.max.apply(null, interval); interval[0] = a; interval[1] = b;}

function infiniteIntersection([a, b], [c, d]) {return c < b - ccEpsilon && a < d - ccEpsilon && a < b - ccEpsilon && c < d - ccEpsilon;}

function isPointDegenerateAndInternalIn([a, b], [c, d]) {return ccEq(a, b) && c + ccEpsilon < Math.min(a, b) && Math.max(a, b) < d - ccEpsilon;}
