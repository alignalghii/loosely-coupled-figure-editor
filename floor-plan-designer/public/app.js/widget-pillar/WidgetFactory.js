// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

/** The ancestor WidgetFactory (unlike Widget) is **not** an abstract class! An instantiated ancestor WidgetFactory object is named as canvasPseudoWidget. It represents a canvas in all its sthree vertical layers.*/

/** Lifetimes methods: */

function WidgetFactory(canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom)
{
	this.canvasPseudoWidget  = canvasPseudoWidget;

	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionSvgToGeom  = bijectionSvgToGeom;
}

WidgetFactory.prototype.rawDelete = function (widget)
{
	//if (this.partialFunctionGeomToBusiness) this.partialFunctionGeomToBusiness.get(this.high) ? this.partialFunctionGeomToBusiness.delete(this.high) : (() => {throw 'Inconsistence';})(); // @TODO Also high+business detached from partialFunction - a debatable OOP-smelly solution here! Should be done at the level of the subclasses?
	if (this.partialFunctionGeomToBusiness) this.partialFunctionGeomToBusiness.get(widget.high) ? this.partialFunctionGeomToBusiness.delete(widget.high) : (() => {throw 'Inconsistence';})(); // @TODO Also high+business detached from partialFunction - a debatable OOP-smelly solution here! Should be done at the level of the subclasses?
	this.bijectionSvgToGeom.delete(widget.low); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	deletePolygonChild(widget.low);             // @TODO: why do we not delete the high-level connection as well (the business object)?
};

/** Type-autodetecting compositors: */

WidgetFactory.prototype.detectTypeAndComposeFromLow = function (low)
{
	const [high, businessObject/*OrNull*/] = this.queryFromLow(low);
	switch (low.tagName) { // @TODO pure polymorphism, or reflection metaprogramming
		case 'polygon': if (!businessObject) throw 'Inconsistence'; return new FigureWidget(this.canvasPseudoWidget,   low, high, businessObject);
		case 'text'   : if ( businessObject) throw 'Inconsistence'; return new TitleWidget (this.canvasPseudoWidget,   low, high                );
		case 'image'  :
			if (/battering-ram/.test(low.getAttribute('href'))) return new BatteringRamWidget(this.canvasPseudoWidget, low, high);
			if (/brick/        .test(low.getAttribute('href'))) return new BrickWidget       (this.canvasPseudoWidget, low, high);
			if (/pickaxe/      .test(low.getAttribute('href'))) return new PickaxeWidget     (this.canvasPseudoWidget, low, high);
			if (/bucket/       .test(low.getAttribute('href'))) return new BucketWidget      (this.canvasPseudoWidget, low, high);
			if (/window/       .test(low.getAttribute('href'))) return new WindowWidget      (this.canvasPseudoWidget, low, high);
			if (/door/         .test(low.getAttribute('href'))) return new DoorWidget        (this.canvasPseudoWidget, low, high);
			if (!businessObject) throw 'Inconsistence';
			return new ImageWidget (this.canvasPseudoWidget,   low, high, businessObject);
		default       : throw 'Invalid low-level SVG-subelement, unable to convert upwards to higher-level objects';
	}
};


WidgetFactory.prototype.detectTypeAndComposeFromHigh = function (high)
{
	const [low] = this.queryFromHigh(high);
	if (!low) throw 'Event on orphan (unregistered) high (geom) level object triggers widget composition, but the lower-level component is lacking';
	return this.detectTypeAndComposeFromLow(low);
};

WidgetFactory.prototype.detectTypeAndComposeFromBusiness = function (businessObject)
{
	if (!businessObject.figure) throw 'Titles do not have a business object'; // @TODO, good solution, but nasty. What if we have more object types, there business does not hold a fig backref?
	return this.detectTypeAndComposeFromHigh(businessObject.figure);
};

/** Queries: */

WidgetFactory.prototype.queryFromLow = function (low)
{
	const high           = this.bijectionSvgToGeom.get(low);
	if (!high) {console.log('LOW', low, 'WOL'); throw 'Event on orphan (unregistered) SVG-subelement triggers widget composition, but the higher-level component is lacking.';}
	const businessObject/*OrNull*/ = this.partialFunctionGeomToBusiness.get(high);
	return businessObject ? [high, businessObject] : [high];
};


WidgetFactory.prototype.queryFromHigh = function (high)
{
	const low    = this.bijectionSvgToGeom.getInverse(high);
	if (!low) throw 'Event on orphan (unregistered) MathematicalObject triggers widget creation, but the low-level component is lacking';
	//const business/*OrNull*/ = this.partialFunctionGeomToBusiness ? (this.partialFunctionGeomToBusiness.get(high) || (() => {console.log(high, low); throw 'Inconsistence';})()) : null;
	const business/*OrNull*/ = this.partialFunctionGeomToBusiness ? (this.partialFunctionGeomToBusiness.get(high) || null) : null;
	return business ? [low, business] : [low]; // @TODO Not nice OOP
};

WidgetFactory.prototype.queryFromBusiness = function (businessObject)
{
	if (!businessObject) throw 'Inconsistence';
	if (!businessObject.figure) throw 'Inconsistence';
	const low = this.bijectionSvgToGeom.getInverse(businessObject.figure);
	return [low, businessObject.figure, businessObject];
}

/** This is somewhat similar to device driver modules @TODO: reconsider */

WidgetFactory.prototype.mergelessSubscribe = function (eventTypeName, emptyCase, widgetCase) // @TODO a `return` valószínűleg fölösleges itt is, és a hivatkozott svgLowLevel.subscribe-on is
{
	const svgEmptyCase = (canvas, svgPosition, mouseButton, event) =>
	{
		var widgetEventPosition  = this.coordSysTransformer.lowToHigh(svgPosition);
		return emptyCase(canvas, widgetEventPosition, mouseButton, event);
	}
	const svgPolygonCase = (svgSubelem, svgPosition, mouseButton, event) =>
	{
		var widget               = this.detectTypeAndComposeFromLow(svgSubelem);
		var widgetEventPosition  = this.coordSysTransformer.lowToHigh(svgPosition);  // @TODO Demeter principle
		return widgetCase(widget, widgetEventPosition, mouseButton, event);
	}
	this.svgLowLevel.subscribe(eventTypeName, svgEmptyCase, svgPolygonCase); // @TODO Demeter principle
};


WidgetFactory.prototype.clearAll = function ()
{
	const rootElem = this.svgLowLevel.svgRootElement;
	for (let childElem of rootElem.children) {
		if (childElem.tagName == 'polygon' || childElem.tagName == 'text' || childElem.tagName == 'image') { // @TODO
			const widget = this.detectTypeAndComposeFromLow(childElem);
			widget.delete();
		}
	}
}; // @TODO reuse, factoring out with  `withAll`?

WidgetFactory.prototype.updateAll = function () {this.withAll(widget => widget.updateDownwardAll());};

WidgetFactory.prototype.withAll = function (command)
{
	const rootElem = this.svgLowLevel.svgRootElement;
	for (let childElem of rootElem.children) {
		if (childElem.tagName == 'polygon' || childElem.tagName == 'text' || childElem.tagName == 'image') { // @TODO
			const widget = this.detectTypeAndComposeFromLow(childElem);
			command(widget);
		}
	}
};
