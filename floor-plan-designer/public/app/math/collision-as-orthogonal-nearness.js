function nearestPointOnLine([A, B, C], [p1, p2])
{
	var nquad = A*A + B*B;
	var x_ =  B*B*p1 - A*B*p2 + A*C;
	var y_ = -A*B*p1 + A*A*p2 + B*C;
	return [x_/nquad, y_/nquad];
}

function vectorToNearestPointOnLine(line, point)
{
	var hit = nearestPointOnLine(line, point);
	return fromTo(point, hit);
}


function nearestPointOnSegment(segment, point)
{
	var line = lineOfSegment(segment);
	var hit = nearestPointOnLine(line, point);
	return betweenness(segment, hit) <= 0 ? hit : selectNearestPointsToPoint(segment, hit)[0];
}

function vectorToNearestPointOnSegment(segment, point)
{
	var hit = nearestPointOnSegment(segment, point);
	return fromTo(point, hit);
}

function vectorFromNearestPointOnSegment(segment, point)
{
	var hit = nearestPointOnSegment(segment, point);
	return fromTo(hit, point);
}
