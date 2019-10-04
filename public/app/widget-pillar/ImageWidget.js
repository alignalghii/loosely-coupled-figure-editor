const   IMFOCUS = [[{name: 'opacity', value: '0.8'  }], [                 ]], // @TODO [[{stroke: 'red'  }], []]
      IMUNFOCUS = [[                                 ], [{name: 'opacity'}]]; // @TODO [[{stroke: 'black'}], []]

function ImageWidget(partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low)
{
	Widget.call(this, partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low);
	this.maybeHost = ['nothing'];
}

ImageWidget.prototype = Object.create(Widget.prototype);

ImageWidget.prototype.constructor = ImageWidget;

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
	this.high.doTranslation(displacement);
	this.updateDownward();
};

ImageWidget.prototype.updateDownward = function ()
{
	const [x, y] = centroid(this.high.vertices);
	const [width, height] = [
		distancePointHence(this.high.vertices[0], this.high.vertices[1]),
		distancePointHence(this.high.vertices[1], this.high.vertices[2])
	];
	// @TODO: reuse, the same algorith has already been written in WidgetFactory::createImageWidget
	const q                          = this.coordSysTransformer.scalingFactor_hl,
	      [x_low      , y_low      ] = this.coordSysTransformer.highToLow([x, y]),
	      [x_corner   , y_corner   ] = [x-width/2, y+height/2],
	      [x_lowcorner, y_lowcorner] = this.coordSysTransformer.highToLow([x_corner, y_corner]);
	this.low.setAttribute('x', x_lowcorner);
	this.low.setAttribute('y', y_lowcorner);
	this.low.setAttribute('width' , q*width );
	this.low.setAttribute('height', q*height);
};
ImageWidget.prototype.isHostless = function () {return isNothing(this.maybeHost);};

ImageWidget.prototype.jumpTo = function (targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer)
{
	targetCanvas.appendChild(this.low);
	this.changeBoardsFor(targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
};

ImageWidget.prototype.changeBoardsFor = function (targetBoard, targetBusinessBoard, targetCoordSysTransfomer) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
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
};
