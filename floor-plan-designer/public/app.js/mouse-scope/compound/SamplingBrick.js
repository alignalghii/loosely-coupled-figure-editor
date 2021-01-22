function SamplingBrick (intervalX, intervalY)
{
	this.intervalX = intervalX;
	this.intervalY = intervalY;
}

// public:

SamplingBrick.prototype.product = function (grid)
{
	return this.samplingPair(grid).uncurry(
		(samplingX, samplingY) => samplingX.directProduct(samplingY)
	);
};

SamplingBrick.prototype.sum = function (grid)
{
	return this.samplingPair(grid).uncurry(
		(samplingX, samplingY) => samplingX.directSum(samplingY)
	);
};

// possibly public, but here not used directly, so de facto private:

SamplingBrick.prototype.samplingPair = function (grid)
{
	return grid.representativeNode.toHomPair().uncurry(
		(repX, repY) => new HomPair(
			this.intervalX.sampling(grid.step, repX),
			this.intervalY.sampling(grid.step, repY)
		)
	);
};


