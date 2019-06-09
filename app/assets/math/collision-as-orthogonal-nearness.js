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


function nearestPointOnSection(section, point)
{
	var line = lineOfSection(section);
	var hit = nearestPointOnLine(line, point);
	return betweenness(section, hit) <= 0 ? hit : selectNearestPointsToPoint(section, hit)[0];
}

function vectorToNearestPointOnSection(section, point)
{
	var hit = nearestPointOnSection(section, point);
	return fromTo(point, hit);
}
