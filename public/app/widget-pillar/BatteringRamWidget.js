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
	const svgPosition = this.factory().coordSysTransformer.highToLow(this.high.position);
	console.log(svgPosition);
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


BatteringRamWidget.prototype.collisionActionSpecialty = function (controller, canvasPseudoWidget, currentWEPos)
{
	console.log('Special collision: battering ram in action');
	this.delete();

	const board = canvasPseudoWidget.board();
	maybeMap(
		figure => {
			const nearestWidget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(figure);
			nearestWidget.looseWall(this.high.size, this.high.position);
		},
		maybeNearestFigureHence(board, currentWEPos)
	);

	controller.state.forgetDrag(); // `this.state.prevWidget = null` is not enough, the drag (mouseMove) state must be quitted in the state machine. An alternative solution: `this.state.prevWidget = eitherTarget = null`.
	controller.statusBarDriver.report(`Falbontás: faltörő kos munkában!`);
	controller.audioDriver.breakWall();
};




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
