function Grid(step, representativeNode)
{
	this.step               = step;
	this.representativeNode = representativeNode;
}

Grid.unitAtOrigin = () => new Grid(1, [0, 0]);

Grid.prototype.nodes = function (samplingBrick)
{
	return samplingBrick.product(this).map(
		xAndY => xAndY.toList()
	);
};

Grid.prototype.bars = function (samplingBrick)
{
	const {intervalX, intervalY} = samplingBrick;
	return samplingBrick.sum(this).map(
		xOrY => xOrY.either(
			x => [[x, intervalY.lower], [x, intervalY.upper]],
			y => [[intervalX.lower, y], [intervalX.upper, y]]
		)
	);
};
