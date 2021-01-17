function ShowScope(canvasPseudoWidget, state)
{
	this.canvasPseudoWidget = canvasPseudoWidget;
	this.state              = state;
}

ShowScope.prototype.show = function (mouseScope)
{
	this.resetSvg();
		const sprite = new Sprite(this.canvasPseudoWidget.arbitrary.svgLowLevel, this.canvasPseudoWidget.coordSysTransformer(), 10);
		const svg = mouseScope.mouseHeuristicsType_exec(
			()     => console.log('interior'),
			vertex => sprite.createDot(vertex), // cannot be variableless: it would interpret as `sprite.createDot.call(this, vertex)`, not `sprite.createDot.call(sprite, vertex)`!
			edge   => sprite.createSection(edge), // --- || ---
			()     => console.log('canvas')
		);
	this.rememberSvg(svg);
};

ShowScope.prototype.resetSvg = function ()
{
	this.state.maybeMouseScopeSvg.map(
		svg => deletePolygonChild(svg)
	);
	this.state.maybeMouseScopeSvg = Maybe.nothing();
};

ShowScope.prototype.rememberSvg = function (svg)
{
	if (svg) {
		this.state.maybeMouseScopeSvg = Maybe.just(svg);
	}
};

//ShowScope.prototype.save      = function (mouseScope  )                                 {this.state.maybeMouseScopeSvg = Maybe.just(scope);};
//ShowScope.prototype.maybeLoad = function (            )/*: Maybe<MouseHeuristicsType>*/ {return this.state.maybeMouseScope;};
//ShowScope.prototype.update

