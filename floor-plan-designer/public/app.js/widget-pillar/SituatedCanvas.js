function SituatedCanvas (svgLowLevel, coordSysTransformer)  // @TODO too complicated, pass simply canvasPseudoWidget
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
}

SituatedCanvas.prototype.samplingBrick = function () // @TODO DRY see `WidgetFactory`
{
	const lowLevelSpanning = new HomPair(
		new HomPair(0, 0),
		this.svgLowLevel.sizing()
	);
	const highLevelSpanning = lowLevelSpanning.map(
		corner => this.coordSysTransformer.lowToHigh(
			corner.toList()
		).toHomPair()
	);
	const samplingBrick = highLevelSpanning.uncurry(
		(startCorner, endCorner) => new SamplingBrick(
			new SamplingInterval(startCorner.a, endCorner.a),
			new SamplingInterval(endCorner.b, startCorner.b)
		)
	);
	return samplingBrick;
};
