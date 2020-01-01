/**
 * @TODO consider
 * Very deep analogy to Title and TitleWidget
 * It has no businessObject
 * it is not a business object in the mind of the users
 * it is just  a visual tool, just like a title.
 */


function WindowWidget (canvasPseudoWidget, low, high) {Widget.call(this, canvasPseudoWidget, low, high);}

WindowWidget.prototype = Object.create(Widget.prototype);

WindowWidget.prototype.constructor = WindowWidget;

WindowWidget.prototype.delete = function () {this.rawDelete();};


WindowWidget.prototype.factory = function () {return this.canvasPseudoWidget.windowWidgetFactory;};

WindowWidget.prototype.translate = function (displacement)
{
	this.high.doTranslation(displacement);
	this.updateDownward();
};

WindowWidget.prototype.updateDownward = function ()
{
	this.high.size = segmentLength([this.high.vertices[0], this.high.vertices[1]]);
	const info = this.factory().calculate([this.high.size, this.high.size], this.high.position);
	this.low.setAttribute('x', info.point_lowcorner[0]);
	this.low.setAttribute('y', info.point_lowcorner[1]);
	this.low.setAttribute('width' , info.sizes_low [0]);
	this.low.setAttribute('height', info.sizes_low [1]);
};

WindowWidget.prototype.isHostless = function () {return true;};

WindowWidget.prototype.jumpTo = function (targetCanvasPseudoWidget)
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);
	this.changeBoardsFor(targetCanvasPseudoWidget);
};


WindowWidget.prototype.collisionActionSpecialty = function (controller, canvasPseudoWidget, minFallTargetFigure, currentWEPos)
{
	const minFallTargetWidget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(minFallTargetFigure);
	minFallTargetWidget.loseWall_(controller, this);
};


WindowWidget.prototype.scale = function (q)
{
	this.high.doScale (q);
	this.updateDownward();
};


WindowWidget.prototype.restoreOn = canvasPseudoWidget => canvasPseudoWidget.windowWidgetFactory.create(2.3, [-1.7, -4]); // @TODO note that this is a class method

WindowWidget.prototype.attachToWall   = function (memHitsMap, edgesBij, canvasPseudoWidgets)
{
	console.log('Attach window to wall', 'memHitsMap', memHitsMap, 'edgesBij', edgesBij);
	const  rooms = [], slits = [];
	for (let [room, slit] of memHitsMap.mapStraight) {
		console.log('Room:', room, 'Slit:', slit);
		rooms.push(room);
		slits.push(slit);
		console.log('!!!!!!!!!!', room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center, maybeReachEndPoint(room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center));

		/* @TODO DRY */
		maybeMap(
			point => {
				console.log('Old pos', this.position, 'new pos', point);
				this.high.position = point;
				this.updateDownward();
			},
			maybeReachEndPoint(room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center)
		);


	}
	/*if (rooms.length == 1 && slits.length == 1 || rooms.length == 2 && slits.length == 2 && ccEq(slits[0].center, slits[1].center)) {
		const slit = slits[0];
		this.position = slit.center;
		this.updateDownward();

		let edge = null, _ = null;
		for ([edge, _] of edgesBij.mapStraight);
		if (edge) {
			console.log('Slit0', slit, 'Edge', edge);
		}
	}*/
	/**/
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/window-attached.png'); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30 there
	let edge = null, _ = null;
	for ([edge, _] of edgesBij.mapStraight);
	if (edge) {
		const plumbBob = [[0, 0], [0, 1]];
		const angle = signedRotAngleOfEdges(plumbBob, edge);
		const Ox = Number(this.low.getAttribute('x')) + Number(this.low.getAttribute('width' )) / 2,
		      Oy = Number(this.low.getAttribute('y')) + Number(this.low.getAttribute('height')) / 2;
		this.low.setAttribute('transform', `rotate(${-angle} ${Ox} ${Oy})`); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30 there
	}
	this.restoreOn(canvasPseudoWidgets[2]);
};

WindowWidget.prototype.detachFromWall = function (canvasPseudoWidgets)
{
	console.log('Detach window from wall');
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/window-detached.png'); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30
	this.low.removeAttribute('transform');
	canvasPseudoWidgets[2].windowWidgets().map(windowWidget => windowWidget.delete());
};


WindowWidget.prototype.showGlittering = function ()
{
	//this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

WindowWidget.prototype.unshowGlittering = function ()
{
	//delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.removeAttribute(GLITTERING_ATTR_NAME);
};


WindowWidget.prototype.showFocus = function ()
{
	this.low.style.outline = '2px dashed red'; // @TODO
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

WindowWidget.prototype.unshowFocus = function ()
{
	this.low.style.outline = '1px dotted black'; // @TODO DRY
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
