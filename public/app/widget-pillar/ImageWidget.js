const   IMFOCUS = [[{name: 'opacity', value: '0.8'  }], [                 ]], // @TODO [[{stroke: 'red'  }], []]
      IMUNFOCUS = [[                                 ], [{name: 'opacity'}]]; // @TODO [[{stroke: 'black'}], []]

function ImageWidget(canvasPseudoWidget,    low, high, businessObject)
{
	if (high != businessObject.figure) throw 'Inconsistent';
	Widget.call(this, canvasPseudoWidget,    low, high);
	this.businessObject = businessObject;
}

ImageWidget.prototype = Object.create(Widget.prototype);

ImageWidget.prototype.constructor = ImageWidget;

ImageWidget.prototype.factory = function () {return this.canvasPseudoWidget.imageWidgetFactory;};

ImageWidget.prototype.whileExistEscortWidgets = function (doWith) // @TODO factor out to Set/Array module
{
	while (this.businessObject.escorts.length > 0) {
		console.log(this.businessObject.escorts);
		const widget = this.factory().detectTypeAndComposeFromBusiness(this.businessObject.escorts.pop());
		console.log(widget);
		doWith(widget);
	}
};

ImageWidget.prototype.delete = function ()
{
	this.businessObject.liberate();
	this.whileExistEscortWidgets(widget => widget.delete());
	this.rawDelete(); // low+high detached from bijection + low removed from SVG-DOM. Also high+business detached from partialFunction (OOP-smelly solution! @TODO debate)
};

ImageWidget.prototype.withEscortWidgets = function (doWith)
{
	return this.businessObject.escorts.map(
		escort => doWith(this.factory().detectTypeAndComposeFromBusiness(escort)) // @TODO factory() select well, but it is rather arbitrary, works but is smelly architecture
	);
};

ImageWidget.prototype.updateDownward = function ()
{
	const vertices = this.high.vertices;
	const [x, y] = centroid(vertices);
	const [width, height] = [
		distancePointHence(vertices[0], vertices[1]),
		distancePointHence(vertices[1], vertices[2])
	];
	const info = this.factory().calculate([width, height], [x, y]);
	this.low.setAttribute('x', info.point_lowcorner[0]);
	this.low.setAttribute('y', info.point_lowcorner[1]);
	this.low.setAttribute('width' , info.sizes_low [0]);
	this.low.setAttribute('height', info.sizes_low [1]);
};

ImageWidget.prototype.updateDownwardAll = function ()
{
	this.withEscortWidgets(widget => widget.updateDownwardAll());
	this.updateDownward();
};

ImageWidget.prototype.isHostless = function () {return isNothing(this.businessObject.maybeHost);};

ImageWidget.prototype.jumpTo = function (targetCanvasPseudoWidget)
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);
	this.withEscortWidgets(widget => widget.jumpTo(targetCanvasPseudoWidget));
	this.changeBoardsFor(targetCanvasPseudoWidget);
};

/*ImageWidget.prototype.changeBoardsFor = function (targetBoard, targetBusinessBoard, targetCoordSysTransfomer) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
{
	// Subscribe for new boards:
	targetBoard.set(this.low, this.high);

	// Unsubscribe from own (collaborator) boards:
	this.bijectionSvgToGeom.delete(this.low); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	if (this.partialFunctionGeomToBusiness.get(this.high)) this.partialFunctionGeomToBusiness.delete(this.high); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	// Update collaborators:
	this.coordSysTransformer           = targetCoordSysTransfomer; // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
	this.bijectionSvgToGeom            = targetBoard;              // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.partialFunctionGeomToBusiness = targetBusinessBoard;      // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
};*/



ImageWidget.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

ImageWidget.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};


ImageWidget.prototype.showFocus = function ()
{
	var widget = this;
	function add (attr) // @TODO make reuseable
	{
		widget.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	function del (attr) // @TODO make reuseable
	{
		delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	IMFOCUS[1].map(del);
	IMFOCUS[0].map(add);
};

ImageWidget.prototype.unshowFocus = function ()
{
	var widget = this;
	function add (attr) // @TODO make reuseable
	{
		widget.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	function del (attr) // @TODO make reuseable
	{
		delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	IMUNFOCUS[1].map(del);
	IMUNFOCUS[0].map(add);
};

ImageWidget.prototype.translate = function (displacement)
{
	this.businessObject.doTranslation(displacement);
	this.updateDownwardAll();
};

ImageWidget.prototype.directlyOrViaTitle = function ()
{
	return {
		widget : this,
		message: 'Közvetlenül magára a bútorra kattintottál, minden világos.'
	};
};

ImageWidget.prototype.beDescribedOnOpeningForm = figPropEdController => figPropEdController.statusBarDriver.report('Bútor szöveges szerkeszthetőségét még nem valósítottam meg'); // Image's boxing figure should not be allowed to be edited!

ImageWidget.prototype.scale = function (q)
{
	this.high.doScale (q);
	this.updateDownward();
};
