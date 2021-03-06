function CoordSysTransformer(lowOrigin, scalingFactor_hl, signPreserving)
{
	this.lowOrigin        = lowOrigin;
	this.scalingFactor_hl = scalingFactor_hl;
	this.signPreserving   = signPreserving;
}

CoordSysTransformer.prototype.lowToHigh = function ([lowX, lowY])
{
	var scaleX = this.scalingFactor_hl * (this.signPreserving[0] ? 1 : -1);
	var scaleY = this.scalingFactor_hl * (this.signPreserving[1] ? 1 : -1);
	return [(lowX - this.lowOrigin[0]) / scaleX , (lowY - this.lowOrigin[1]) / scaleY];
};


CoordSysTransformer.prototype.highToLow = function ([highX, highY])
{
	var scaleX = this.scalingFactor_hl * (this.signPreserving[0] ? 1 : -1);
	var scaleY = this.scalingFactor_hl * (this.signPreserving[1] ? 1 : -1);
	return [this.lowOrigin[0] + scaleX * highX, this.lowOrigin[1] + scaleY * highY];
};

CoordSysTransformer.prototype.epsilonDistance = function () {return 1/this.scalingFactor_hl;};

CoordSysTransformer.prototype.epsilonAngle = function () // in radian
{
	var longestPossibleRadius = Math.sqrt(600*600+400*400);
	return this.epsilonDistance() / longestPossibleRadius;
};
