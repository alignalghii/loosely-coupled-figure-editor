function TitleWidget(canvasPseudoWidget,    low, high)
{
	Widget.call(this, canvasPseudoWidget,    low, high);
}

TitleWidget.prototype = Object.create(Widget.prototype);

TitleWidget.prototype.constructor = TitleWidget;

TitleWidget.prototype.delete = function () {throw 'Debated thing due to reciprocal obligate dependency with its host';};
TitleWidget.prototype.delete_unsafe = function () {this.rawDelete();};

TitleWidget.prototype.factory = function () {return this.canvasPseudoWidget.titleWidgetFactory;};

// @TODO: consider - this function alone justifies inheriting
TitleWidget.prototype.updateDownward = function ()
{
	//var svgVertices = this.high.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	//updatePolygonChild(this.low, svgVertices);
	const svgPosition = this.factory().coordSysTransformer.highToLow(this.high.position);
	updateTextPosition(this.low, svgPosition);
};
TitleWidget.prototype.updateDownwardAll = function () {this.updateDownward();}

TitleWidget.prototype.jumpTo = function (targetCanvasPseudoWidget)
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);
	this.changeBoardsFor(targetCanvasPseudoWidget);
};


TitleWidget.prototype.isHostless   = () => false; //function () {console.log(this.high.host.figure); return Boolean(this.bijectionSvgToGeom.getInverse(this.high.host./*@TODO*/figure));};

// Focus handling:

TitleWidget.prototype.showGlittering = function () {};

TitleWidget.prototype.unshowGlittering = function () {};

TitleWidget.prototype.showFocus = function () {};

TitleWidget.prototype.unshowFocus = function () {};


// Geometrical transforamtions

TitleWidget.prototype.translate = function (displacement)
{
	this.high.doTranslation(displacement);
	this.updateDownward();
};

TitleWidget.prototype.rotate    = function (phi) {};
TitleWidget.prototype.reflectHorizontally = function () {};
TitleWidget.prototype.reflectVertically   = function () {};
TitleWidget.prototype.scale  = function (q, O)
{
	this.high.doScale(q, O);
	this.updateDownward();
};
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

TitleWidget.prototype.directlyOrViaTitle = function ()
{
	const room = this.high.host; // @TODO what if host is not a room
	return {
		widget : this.canvasPseudoWidget.figureWidgetFactory.composeFromBusiness(room),
		message: `Szoba címére kattintottál (&bdquo;${room.title.name}&rdquo;), a hozzátartozó szobát veszem. Magát a címet sajnos egyelőre csak a tulajdonság szerkesztáben szerkesztheted át, itt helyben közvetlenül még nem 😞💣🗲🌧💧`
	};
};

TitleWidget.prototype.beDescribedOnOpeningForm = function (FigPropEdcontroller) {throw 'Inconsistence';};


TitleWidget.prototype.contextMenu = () => new ContextMenu('Cím', [[CMO('Mozgatás')], [CMO('Átméretezés')]]);

TitleWidget.prototype.emphasizeForMouseScopeOn = function (sprite)
{
	sprite.mouse('pointer');
	this.low.style.fill = 'red';
	this.low.style['font-weight'] = 'bold';
	return [this.low];
};
