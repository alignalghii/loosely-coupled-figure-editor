function VertexNearness(isNear, maybeVertex, maybeFigure)
{
	this.isNear      = isNear;
	this.maybeVertex = maybeVertex;
	this.maybeFigure = maybeFigure;
}

VertexNearness.fullNone   = ()                                  => new VertexNearness(false, nothing, nothing);
VertexNearness.onlyFigure = (nearestFigure)                     => new VertexNearness(false, nothing, just(nearestFigure));
VertexNearness.calculate  = (point, nearestVertex, nearestFigure) => new VertexNearness(
	distance(nearestVertex, point) < Math.sqrt(getArea(nearestFigure.vertices)) / 6,
	just(nearestVertex),
	just(nearestFigure)
);

VertexNearness.prototype.maybeNear = function () {return this.isNear ? this.maybeVertex : nothing;};
