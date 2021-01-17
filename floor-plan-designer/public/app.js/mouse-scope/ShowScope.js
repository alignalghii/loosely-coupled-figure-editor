function ShowScope(canvasPseudoWidget, state)
{
	this.canvasPseudoWidget = canvasPseudoWidget;
	this.state              = state;
}

ShowScope.prototype.show = function (mouseScope)
{
	this.state.maybeMouseScopeSvg.map(
		svg => deletePolygonChild(svg)
	);
	this.state.maybeMouseScopeSvg = Maybe.nothing();
	const svg = mouseScope.mouseHeuristicsType_exec(
		()     => console.log('interior'),
		vertex => {
			const K = this.canvasPseudoWidget.coordSysTransformer().highToLow(vertex)
			const dot = this.canvasPseudoWidget.arbitrary.svgLowLevel.createDot(K, 10);
			return dot;
		},
		edge   => {
			const [P, Q] = edge.map(
				P => this.canvasPseudoWidget.coordSysTransformer().highToLow(P)
			);
			return section = this.canvasPseudoWidget.arbitrary.svgLowLevel.createSection(P, Q, 10);
		},
		()     => console.log('canvas')
	);
	if (svg) this.state.maybeMouseScopeSvg = Maybe.just(svg);
};

//ShowScope.prototype.save      = function (mouseScope  )                                 {this.state.maybeMouseScopeSvg = Maybe.just(scope);};
//ShowScope.prototype.maybeLoad = function (            )/*: Maybe<MouseHeuristicsType>*/ {return this.state.maybeMouseScope;};
//ShowScope.prototype.update

