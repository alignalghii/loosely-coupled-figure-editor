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

	// @TODO store important data on the high-level instead of hacking directly with low-level
	const Ox = Number(this.low.getAttribute('x')) + Number(this.low.getAttribute('width' )) / 2,
	      Oy = Number(this.low.getAttribute('y')) + Number(this.low.getAttribute('height')) / 2;
	const transformString = this.low.getAttribute('transform');
	if (transformString) {
		const matches = /(.*)rotate\((-?\d+(\.\d+)?) (-?\d+(\.\d+)?) (-?\d+(\.\d+)?)\)(.*)/.exec(transformString);
		if (matches.length >= 9) {
			const [_, before, rotAngle, _a, rotOldX, _x, rotOldY, _y, after] = matches;
			this.low.setAttribute('transform', `${before}rotate(${rotAngle} ${Ox} ${Oy})${after}`);
		}
	}
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

WindowWidget.prototype.isHostless = function () {return this.hasBeenDetached();};

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

WindowWidget.prototype.reflectVerticallyRef   = function () {console.log('Flip window vertically (rel)'  );};
WindowWidget.prototype.reflectHorizontallyRef = function () {console.log('Flip window horizontally (rel)');};
WindowWidget.prototype.reflectVertically      = function () {console.log('Flip window vertically (abs)'  );};
WindowWidget.prototype.reflectHorizontally    = function () {console.log('Flip window horizontally (abs)');};

WindowWidget.prototype.restoreOn  = canvasPseudoWidget => canvasPseudoWidget.windowWidgetFactory.create(2.3, [-1.7, -4]); // @TODO note that this is a class method

WindowWidget.prototype.attachToWall   = function (wallsBackRefSet)
{
	console.log('Attach window to wall', 'attachmentBackRefing', this.high.attachmentBackRefing, 'wallsBackRefSet', wallsBackRefSet);
	const  rooms = [], slits = [];
	for (let [room, slit] of this.high.attachmentBackRefing.mapStraight) {
		console.log('Room:', room, 'Slit:', slit);
		rooms.push(room);
		slits.push(slit);
		console.log('!!!!!!!!!!', room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center, maybeReachEndPoint(room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center));

		/* @TODO DRY */
		maybeMap(
			point => this.translateTo(point),
			maybeReachEndPoint(room.figure.vertices[0], tour(room.figure.vertices).map(edgeVector), slit.center)
		);


	}
	/*if (rooms.length == 1 && slits.length == 1 || rooms.length == 2 && slits.length == 2 && ccEq(slits[0].center, slits[1].center)) {
		const slit = slits[0];
		this.position = slit.center;
		this.updateDownward();

		let edge = null, _ = null;
		for ([edge, _] of wallsBackRefSet.mapStraight);
		if (edge) {
			console.log('Slit0', slit, 'Edge', edge);
		}
	}*/
	/**/
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/window-attached.png'); // @TODO delegate a function to `public/app.js/low-level-system/SvgLowLevel.js`, see line #30 there
	let edge = null, _ = null;
	for ([edge, _] of wallsBackRefSet.mapStraight);
	if (edge) {
		const plumbBob = [[0, 0], [0, 1]];
		const angle = signedRotAngleOfEdges(plumbBob, edge);
		const Ox = Number(this.low.getAttribute('x')) + Number(this.low.getAttribute('width' )) / 2,
		      Oy = Number(this.low.getAttribute('y')) + Number(this.low.getAttribute('height')) / 2;
		this.low.setAttribute('transform', `rotate(${-angle} ${Ox} ${Oy})`); // @TODO delegate a function to `public/app.js/low-level-system/SvgLowLevel.js`, see line #30 there
	}
	//this.restoreOn(canvasPseudoWidgets[2]);
};

WindowWidget.prototype.detachFromWall = function ()
{
	console.log('Detach window from wall');
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/window-detached.png'); // @TODO delegate a function to `public/app.js/low-level-system/SvgLowLevel.js`, see line #30
	this.low.removeAttribute('transform');
	//canvasPseudoWidgets[2].windowWidgets().map(windowWidget => windowWidget.delete());
};

// @TODO DRY the source is the same with `DoorWidget`
WindowWidget.prototype.hasBeenAttached = function ()
{
	const href = this.low.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
	return /attached/.test(href);
};

// @TODO DRY the source is the same with `DoorWidget`
WindowWidget.prototype.hasBeenDetached = function ()
{
	const href = this.low.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
	return /detached/.test(href);
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


WindowWidget.prototype.isActor        = function () {return true;};
WindowWidget.prototype.isShapeshifter = function () {return true;};


WindowWidget.prototype.contextMenu = () => new ContextMenu('Nyílászáró: ablak',  [[CMO('Mozgatás', 'move', 'Mozgatás és fókusz')], [CMO('Átméretezés', 'scale', 'Szabad ikonként aránytartóan, vagy nyújtás/zsugorítás kötötten a fal mentén')], [CMO('Űrlap', 'form', 'Objektumtulajdonságok űrlapja')]]);
