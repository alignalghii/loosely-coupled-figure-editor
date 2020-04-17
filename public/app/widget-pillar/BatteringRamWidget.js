/**
 * @TODO consider
 * Very deep analogy to Title and TitleWidget
 * It has no businessObject
 * it is not a business object in the mind of the users
 * it is just  a visual tool, just like a title.
 */


function BatteringRamWidget (canvasPseudoWidget, low, high) {Widget.call(this, canvasPseudoWidget, low, high);}

BatteringRamWidget.prototype = Object.create(Widget.prototype);

BatteringRamWidget.prototype.constructor = BatteringRamWidget;

BatteringRamWidget.prototype.delete = function () {this.rawDelete();};


BatteringRamWidget.prototype.factory = function () {return this.canvasPseudoWidget.batteringRamWidgetFactory;};

BatteringRamWidget.prototype.translate = function (displacement)
{
	this.high.doTranslation(displacement);
	this.updateDownward();
};

BatteringRamWidget.prototype.updateDownward = function ()
{
	this.high.size = segmentLength([this.high.vertices[0], this.high.vertices[1]]);
	const info = this.factory().calculate([this.high.size, this.high.size], this.high.position);
	this.low.setAttribute('x', info.point_lowcorner[0]);
	this.low.setAttribute('y', info.point_lowcorner[1]);
	this.low.setAttribute('width' , info.sizes_low [0]);
	this.low.setAttribute('height', info.sizes_low [1]);
};

BatteringRamWidget.prototype.isHostless = function () {return true;};

BatteringRamWidget.prototype.jumpTo = function (targetCanvasPseudoWidget)
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);
	this.changeBoardsFor(targetCanvasPseudoWidget);
};


BatteringRamWidget.prototype.collisionActionSpecialty = function (controller, canvasPseudoWidget, minFallTargetFigure, currentWEPos)
{
	const minFallTargetWidget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(minFallTargetFigure);
	minFallTargetWidget.loseWall_(controller, this);
};



BatteringRamWidget.prototype.scale = function (q)
{
	this.high.doScale (q);
	this.updateDownward();
};



BatteringRamWidget.prototype.restoreOn = canvasPseudoWidget => canvasPseudoWidget.batteringRamWidgetFactory.create(2.3, [-1.7,  4]); // @TODO note that this is a class method



BatteringRamWidget.prototype.showGlittering = function ()
{
	//this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

BatteringRamWidget.prototype.unshowGlittering = function ()
{
	//delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.removeAttribute(GLITTERING_ATTR_NAME);
};


BatteringRamWidget.prototype.showFocus = function ()
{
	var widget = this;
	function add (attr) // @TODO make reuseable
	{
		//widget.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	function del (attr) // @TODO make reuseable
	{
		//delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	//IMFOCUS[1].map(del);
	//IMFOCUS[0].map(add);
};

BatteringRamWidget.prototype.unshowFocus = function ()
{
	var widget = this;
	function add (attr) // @TODO make reuseable
	{
		//widget.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	function del (attr) // @TODO make reuseable
	{
		//delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	//IMUNFOCUS[1].map(del);
	//IMUNFOCUS[0].map(add);
};


BatteringRamWidget.prototype.contextMenu = () => new ContextMenu('Falrés-akció 1', [[CMO('Mozgatás', 'Mozgatás és fókusz')], [CMO('Áméretezés', 'Szabad ikonként aránytartóan, vagy nyújtás/zsugorítás kötötten a fal mentén')], [CMO('Űrlap', 'Objektumtulajdonságok űrlapja')]]);
