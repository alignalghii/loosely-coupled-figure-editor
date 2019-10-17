function TitleWidgetFactory (canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom) {WidgetFactory.call(this, canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom);}

TitleWidgetFactory.prototype = Object.create(WidgetFactory.prototype);

TitleWidgetFactory.prototype.constructor = TitleWidgetFactory;


TitleWidgetFactory.prototype.createFromBusiness = function (businessObject) {throw 'Disabled inheritance';}; // @TODO ,,Néma kacsa'' öröklődési probléma

TitleWidgetFactory.prototype.createFromHigh = function (title) // @TODO: 1) not necessarily all figs have a title 2) there'll be also other businessobs than rooms with titles 3) backref to host
{
	const textElem = this.svgLowLevel.createText(title.name, this.coordSysTransformer.highToLow(title.position));
	this.bijectionSvgToGeom.set(textElem, title);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};


// @TODO back-reference to title host // @TODO this should be an inheritable (also abstract?) method of ancestor `WidgetFactory`. Moreover, ancestor `WidgetFactory` already does have a `createFromLow` method, with excellent type-detection!
TitleWidgetFactory.prototype.composeFromHigh = function (title)
{
	const [textElem] = this.queryFromHigh(title);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};

TitleWidgetFactory.prototype.composeFromLow = function (textElem)
{
	const [title] = this.queryFromLow(textElem);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};

