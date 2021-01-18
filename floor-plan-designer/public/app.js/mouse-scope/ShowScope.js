function ShowScope(canvasPseudoWidget, state)
{
	this.canvasPseudoWidget = canvasPseudoWidget;
	this.state              = state;
}

ShowScope.prototype.show = function (mouseScope)
{
	this.resetSVGs();
		const sprite = new Sprite(this.canvasPseudoWidget.arbitrary.svgLowLevel, this.canvasPseudoWidget.coordSysTransformer(), 10);
		const SVGs = mouseScope.mouseHeuristicsType_exec(
			widget => widget.emphasizeForMouseScopeOn(sprite),
			vertex => sprite.createDot(vertex), // cannot be variableless: it would interpret as `sprite.createDot.call(this, vertex)`, not `sprite.createDot.call(sprite, vertex)`!
			edge   => sprite.createSection(edge), // --- || ---
			loc    => sprite.createPinboard(loc)//sprite.mouse('wait')//this.log('canvas')
		);
	this.rememberSVGs(SVGs);
};

ShowScope.prototype.resetSVGs = function ()
{
	this.state.mouseScopeSVGs.map(
		svg => svg.tagName == 'text' ? (() => {svg.style = null;})() : deletePolygonChild(svg)
	);
	this.state.mouseScopeSVGs = [];
};

ShowScope.prototype.rememberSVGs = function (SVGs) {this.state.mouseScopeSVGs = SVGs;};

//ShowScope.prototype.save      = function (mouseScope  )                                 {this.state.maybeMouseScopeSvg = Maybe.just(scope);};
//ShowScope.prototype.maybeLoad = function (            )/*: Maybe<MouseHeuristicsType>*/ {return this.state.maybeMouseScope;};
//ShowScope.prototype.update

