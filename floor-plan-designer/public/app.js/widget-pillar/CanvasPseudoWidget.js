/** Consider also names: CanvasSemiWidget, CanvasAlmostWidget, CanvasCcWidget
 * A widget contains only a low, a high, possibly a businessObject, and it collaborates with a transformer
 * The bijection is *not* held by a widget. A widget is deleted not by itself, it is deleted by its widgetFactory, which is very similar  to a CanvasPseudoWidget. And the same applies to widget creation.
 * The jumpover between canvasses is done by the affected CanvasPseudoWidgets, and ruled by CanvasMultiverse.
 * A CanvasPseudoWidget is very similar to a WidgetFactory, but it is more neutral, ans stands more above widget subclasses, while widgetfactory is subclassed parallel to widget.
 * It can turn out, that a CanvasPseudoWidget is exactly the ancenstor WidgetFactory class. Thus, a canvasPseudoWidget is an instatiates ancestor Widgetfactory. It is a variable name, not a name of a separate class.
 */

/*function CanvasPseudoWidget (partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom)
{
	this.partialFunctionGeomToBusiness = partialFunctionGeomToBusiness;
	this.coordSysTransformer   = coordSysTransformer;
	this.bijectionSvgToGeom    = bijectionSvgToGeom;
	this.svgLowLevel           = svgLowLevel;
}*/


function CanvasPseudoWidget (figureWidgetFactory, titleWidgetFactory, imageWidgetFactory, batteringRamWidgetFactory, brickWidgetFactory, pickaxeWidgetFactory, bucketWidgetFactory, windowWidgetFactory, doorWidgetFactory)
{
	this.figureWidgetFactory = figureWidgetFactory;
	this.titleWidgetFactory  = titleWidgetFactory;
	this.imageWidgetFactory  = imageWidgetFactory;

	this.batteringRamWidgetFactory = batteringRamWidgetFactory;
	this.brickWidgetFactory        = brickWidgetFactory;
	this.pickaxeWidgetFactory      = pickaxeWidgetFactory;
	this.bucketWidgetFactory       = bucketWidgetFactory;
	this.windowWidgetFactory       = windowWidgetFactory;
	this.doorWidgetFactory         = doorWidgetFactory;

	this.arbitrary = figureWidgetFactory; // @TODO rude arbitrariness
}

CanvasPseudoWidget.prototype.correspondingWidgetFactory = function (foreignWidget) {return this[QuoteHelper.prototype.lcfirst(widget.factory().constructor.name)];};

CanvasPseudoWidget.prototype.createFromBusiness = function (businessObject)
{
};

CanvasPseudoWidget.prototype.low = function () {return this.arbitrary.svgLowLevel.svgRootElement;}; // @TODO: rude arbitrariness

CanvasPseudoWidget.prototype.coordSysTransformer = function () {return this.arbitrary.coordSysTransformer          ;}; // @TODO: rude arbitrariness
CanvasPseudoWidget.prototype.board               = function () {return this.arbitrary.bijectionSvgToGeom           ;}; // @TODO: rude arbitrariness
CanvasPseudoWidget.prototype.businessBoard       = function () {return this.arbitrary.partialFunctionGeomToBusiness;}; // @TODO: rude arbitrariness
CanvasPseudoWidget.prototype.root                = function () {return this.arbitrary.svgLowLevel.svgRootElement   ;}; // @TODO: rude arbitrariness

CanvasPseudoWidget.prototype.clear  = function () {this.arbitrary.clearAll(); }; // @TODO: rude arbitrariness
CanvasPseudoWidget.prototype.clearHostlessWidgets  = function () {this.hostlessWidgets().map(w => w.delete());};
CanvasPseudoWidget.prototype.clearHostlessWidgetsOtherThan  = function (excludedWidget) {this.hostlessWidgets().filter(w => !w.eq(excludedWidget)).map(w => w.delete());};


CanvasPseudoWidget.prototype.hackFoolSafeClear  = function ()
{
	this.arbitrary.svgLowLevel.deleteAllPolygonChildren();
	this.arbitrary.bijectionSvgToGeom.deleteAll();
	this.arbitrary.partialFunctionGeomToBusiness.clear();
};

CanvasPseudoWidget.prototype.update = function () {this.arbitrary.updateAll();}; // @TODO: rude arbitrariness

CanvasPseudoWidget.prototype.widgets = function (predicate)
{
	const board = this.arbitrary.bijectionSvgToGeom;
	const fromHigh = high => this.arbitrary.detectTypeAndComposeFromHigh(high);
	return boardMap_opt(fromHigh, board);
};

CanvasPseudoWidget.prototype.hostlessWidgets = function () {return this.widgets().filter(widget => widget.isHostless());};

// @TODO make them obsolete:
CanvasPseudoWidget.prototype.figureWidgets   = function () {return this.widgets().filter(widget => widget.constructor.name == 'FigureWidget');}; // @TODO
CanvasPseudoWidget.prototype.windowWidgets   = function () {return this.widgets().filter(widget => widget.constructor.name == 'WindowWidget');}; // @TODO
CanvasPseudoWidget.prototype.doorWidgets     = function () {return this.widgets().filter(widget => widget.constructor.name == 'DoorWidget'  );}; // @TODO

CanvasPseudoWidget.prototype.objectSerialize = function ()
{
	const businessPF_work = this.arbitrary.partialFunctionGeomToBusiness;
	let businessExports = [];
	for (const [high, business] of businessPF_work) {
		if (business && isNothing(business.maybeHost)) {
			CanvasPseudoWidget.hack(business.openings); // @TODO nasty
			businessExports.push(business.exportToSerializableObject());
		}
	}
	return businessExports;
};

CanvasPseudoWidget.prototype.stringSerialize = function ()
{
	return JSON.stringify(
		this.objectSerialize(),
		null, "\t"
	);
};

CanvasPseudoWidget.hack = function (openingWidgetsOrNull) // @TODO should contain the high-level parts, not widgets
{
	// const elemBj_work = this.canvasPseudoWidget_work.arbitrary.bijectionSvgToGeom; // @TODO
	if (openingWidgetsOrNull) {
		openingWidgetsOrNull.map(
			({high: high, low: low}) => { // @TODO should be only the high
				// const low = elemBj_work.getInverse(high); // @TODO
				const transform = low.getAttribute('transform');
				if (transform) {
					high.transform = transform;
				}
			}
		);
	}
};
