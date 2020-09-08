function Gravity (limit = 1e-7, meterInHighLevelUnits = 1, density = 1000, height = 4, G = 6.67e-11)
{
	this.limit = limit;
	this.meterInHighLevelUnits = meterInHighLevelUnits;
	this.density = density;
	this.height = height;
	this.G = G;
}

Gravity.prototype.volume = function (vertices) {return getArea(vertices) * this.height;};

Gravity.prototype.mass = function (vertices) {return this.volume(vertices) * this.density;};

Gravity.prototype.centroidDistance = function (vertices1, vertices2) {return distance(centroid(vertices1), centroid(vertices2));};

Gravity.prototype.force = function (vertices1, vertices2) {return this.G * this.mass(vertices1) * this.mass(vertices2) / this.centroidDistance(vertices1, vertices2) ** 2;};

Gravity.prototype.accelerationPair = function (vertices1, vertices2)
{
	const force = this.force(vertices1, vertices2);
	return new HomPair(vertices1, vertices2).map(
		vertices => force / this.mass(vertices)
	);
};

Gravity.prototype.massEstimation = function (vertices)
{
	const O = centroid(vertices);
	const rays = vertices.map(P => distance(O, P));
	const ray = rays.reduce((a, b) => a + b, 0) / rays.length;
	return ray ** 2;
};

Gravity.prototype.isSensible = function (accelerationPair)
{
	return accelerationPair.filter(
		acceleration => acceleration >= this.limit
	).length > 0;
}
