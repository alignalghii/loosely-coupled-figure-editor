function fallPointOnSegment(projectionDirectionVector, point, segment)
{
	var hit = intersectRayWithSegment(point, projectionDirectionVector, segment);
	switch (hit[0]) {
		case 'inconsistent' : return ['nothing'];
		case 'unconstrained': return ['nothing'];
		case 'segment':
			var [_, begin, end] = hit;
			var theNearestOne = selectNearestPointsToPoint([begin, end], point)[0];
			return ['just', fromTo(point, theNearestOne)];
		case 'degenerate-segment': return ['nothing'];
		case 'external-point': return ['nothing'];
		case 'terminal-point': case 'internal-point':
			var [_, x, y] = hit;
			return ['just', fromTo(point, [x, y])];
	}
}




function fallSegmentOnSegment(dir, segmentProjectile, segmentTarget)
{
	var vecs = segmentProjectile.map((terminalPoint) => fallPointOnSegment(dir, terminalPoint, segmentTarget));
	console.log(JSON.stringify(vecs));
	return ['nothing'];
}
