/*********************** @TODO: Concrete Widget-subclasses? **************************************/

function FigureWidget(partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low)
{
	Widget.call(this, partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low);
}

FigureWidget.prototype = Object.create(Widget.prototype);

FigureWidget.prototype.constructor = FigureWidget;

// @TODO: consider - this function alone justifies inheriting
FigureWidget.prototype.updateDownward = function ()
{
	var svgVertices = this.high.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	updatePolygonChild(this.low, svgVertices);
};




FigureWidget.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

FigureWidget.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};

FigureWidget.prototype.showFocus = function ()
{
	var widget = this;
	function loop (attr)
	{
		widget.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	FOCUS.map(loop);
};

FigureWidget.prototype.unshowFocus = function ()
{
	var widget = this;
	function loop (attr)
	{
		delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	FOCUS.map(loop);
};


// Geometrical transforamtions

FigureWidget.prototype.translate = function (displacement)
{
	console.log('ffff', this);
	maybeMap(
		domainObject => {
			domainObject.doTranslation(displacement); // domainobject will update `figure` and `title` mathobjects silently
			const title = domainObject.title; // @TODO: not every domainobject has a title
			const textElem = this.bijectionSvgToGeom.getInverse(title); // @TODO: bug: textelem is undefined!
			console.log('textelem:', textElem);
			const titleWidget = new TitleWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom,   ['nothing'], title, textElem); // @TODO bug
			console.log('titlewidget:', titleWidget);
			titleWidget.updateDownward();
		},
		this.maybeDomainObject
	);
	this.updateDownward(); // it relates to figure only
};

FigureWidget.prototype.rotate    = function (phi) {this.high.doRotation(phi); this.updateDownward();};
FigureWidget.prototype.reflectHorizontally = function () {this.high.doReflectHorizontally(); this.updateDownward();};
FigureWidget.prototype.reflectVertically   = function () {this.high.doReflectVertically();   this.updateDownward();};
FigureWidget.prototype.scale  = function (q) {this.high.doScale (q); this.updateDownward();};
FigureWidget.prototype.scaleX = function (q) {this.high.doScaleX(q); this.updateDownward();};
FigureWidget.prototype.scaleY = function (q) {this.high.doScaleY(q); this.updateDownward();};
FigureWidget.prototype.scaleXYArealInvariant = function (q) {this.high.doScaleXYArealInvariant(q); this.updateDownward();};
FigureWidget.prototype.unscaleXYArealInvariant = function (q) {this.high.doUnscaleXYArealInvariant(q); this.updateDownward();};

FigureWidget.prototype.reflectHorizontallyRef = function () {this.high.doReflectHorizontallyRef(); this.updateDownward();};
FigureWidget.prototype.reflectVerticallyRef   = function () {this.high.doReflectVerticallyRef  (); this.updateDownward();};

FigureWidget.prototype.scaleXRef = function (q) {this.high.doScaleXRef(q); this.updateDownward();};
FigureWidget.prototype.scaleYRef = function (q) {this.high.doScaleYRef(q); this.updateDownward();};
FigureWidget.prototype.scaleXYArealInvariantRef = function (q) {this.high.doScaleXYArealInvariantRef(q); this.updateDownward();};
FigureWidget.prototype.unscaleXYArealInvariantRef = function (q) {this.high.doUnscaleXYArealInvariantRef(q); this.updateDownward();};

// Figure property editor

FigureWidget.prototype.editEdge               = function (i, a) {this.high.editEdge              (i, a); this.updateDownward();};
FigureWidget.prototype.editEdge_areaInvariant = function (i, a) {this.high.editEdge_areaInvariant(i, a); this.updateDownward();};
