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
	if (collidesSegmentWithSegment_signAndMagnitudeIndependent(dir, segmentProjectile, segmentTarget)) {
		var fallForward  = fallSegmentOnSegmentForward (dir, segmentProjectile, segmentTarget);
		var fallBackward = fallSegmentOnSegmentBackward(dir, segmentProjectile, segmentTarget);
		return maybeVectorByMinLength2(fallForward, fallBackward);
	} else {
		return ['nothing'];
	}
}

function fallSegmentOnSegmentForward(dir, segmentProjectile, segmentTarget)
{
	var maybeFallVectors = segmentProjectile.map((terminalPoint) => fallPointOnSegment(dir, terminalPoint, segmentTarget));
	return maybeVectorByMinLengths(maybeFallVectors);
}

function fallSegmentOnSegmentBackward(dir, segmentProjectile, segmentTarget)
{
	var backDir  = toNegative(dir);
	var backFall = fallSegmentOnSegmentForward(backDir, segmentTarget, segmentProjectile);
	return maybeMap(toNegative, backFall);
}


function maybeVectorByMinLength2(mbVec1, mbVec2)
{
	if (mbVec1[0] == 'nothing') return mbVec2;
	if (mbVec2[0] == 'nothing') return mbVec1;
	if (mbVec1[0] == 'just' && mbVec2[0] == 'just') return vectorLength(mbVec1[1]) < vectorLength(mbVec2[1]) ? mbVec1 : mbVec2;
}

function maybeVectorByMinLengths(mbVecs) {return mbVecs.reduce(maybeVectorByMinLength2, ['nothing']);}
