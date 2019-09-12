function TitleWidget(partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low)
{
	Widget.call(this, partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low);
	console.log('?????', coordSysTransformer, this.coordSysTransformer, '~~~~~~~~~');
}

TitleWidget.prototype = Object.create(Widget.prototype);

TitleWidget.prototype.constructor = TitleWidget;

// @TODO: consider - this function alone justifies inheriting
TitleWidget.prototype.updateDownward = function ()
{
	//var svgVertices = this.high.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	//updatePolygonChild(this.low, svgVertices);
	const svgPosition = this.coordSysTransformer.highToLow(this.high.position);
	updateTextPosition(this.low, svgPosition);
};




TitleWidget.prototype.showGlittering = function () {};

TitleWidget.prototype.unshowGlittering = function () {};

TitleWidget.prototype.showFocus = function () {};

TitleWidget.prototype.unshowFocus = function () {};


// Geometrical transforamtions

TitleWidget.prototype.translate = function (displacement)
{
	console.log('Title widget is translated');
	this.high.doTranslation(displacement);
	this.updateDownward();
};

TitleWidget.prototype.rotate    = function (phi) {};
TitleWidget.prototype.reflectHorizontally = function () {};
TitleWidget.prototype.reflectVertically   = function () {};
TitleWidget.prototype.scale  = function (q) {};
TitleWidget.prototype.scaleX = function (q) {};
TitleWidget.prototype.scaleY = function (q) {};
TitleWidget.prototype.scaleXYArealInvariant = function (q) {};
TitleWidget.prototype.unscaleXYArealInvariant = function (q) {};

TitleWidget.prototype.reflectHorizontallyRef = function () {};
TitleWidget.prototype.reflectVerticallyRef   = function () {};

TitleWidget.prototype.scaleXRef = function (q) {};
TitleWidget.prototype.scaleYRef = function (q) {};
TitleWidget.prototype.scaleXYArealInvariantRef = function (q) {};
TitleWidget.prototype.unscaleXYArealInvariantRef = function (q) {};

// Figure property editor

TitleWidget.prototype.editEdge               = function (i, a) {};
TitleWidget.prototype.editEdge_areaInvariant = function (i, a) {};
