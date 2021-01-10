function EdgeNearness(isNear, maybeEdge, maybeFigure)
{
	this.isNear      = isNear;
	this.maybeEdge   = maybeEdge;
	this.maybeFigure = maybeFigure;
};

EdgeNearness.fullNone   = ()                                  => new EdgeNearness(false, nothing, nothing);
EdgeNearness.onlyFigure = (nearestFigure)                     => new EdgeNearness(false, nothing, just(nearestFigure));
EdgeNearness.calculate  = (point, nearestEdge, nearestFigure) => new EdgeNearness(
	distanceSegmentHence(nearestEdge, point) < Math.sqrt(getArea(nearestFigure.vertices)) / 5,
	just(nearestEdge),
	just(nearestFigure)
);

EdgeNearness.prototype.maybeNear = function () {return this.isNear ? this.maybeEdge : nothing;};
