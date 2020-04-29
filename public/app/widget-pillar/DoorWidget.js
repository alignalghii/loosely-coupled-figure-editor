/**
 * @TODO consider
 * Very deep analogy to Title and TitleWidget
 * It has no businessObject
 * it is not a business object in the mind of the users
 * it is just  a visual tool, just like a title.
 */


function DoorWidget (canvasPseudoWidget, low, high) {Widget.call(this, canvasPseudoWidget, low, high);}

DoorWidget.prototype = Object.create(Widget.prototype);

DoorWidget.prototype.constructor = DoorWidget;

DoorWidget.prototype.delete = function () {this.rawDelete();};


DoorWidget.prototype.factory = function () {return this.canvasPseudoWidget.doorWidgetFactory;};

DoorWidget.prototype.translate = function (displacement)
{
	this.high.doTranslation(displacement);
	this.updateDownward();

	// @TODO store important data on the high-level instead of hacking directly with low-level
	const x = Number(this.low.getAttribute('x')),
	      y = Number(this.low.getAttribute('y'));
	const w = Number(this.low.getAttribute('width')),
	      h = Number(this.low.getAttribute('height'));
	const Ox = x + w / 2,
	      Oy = y + h / 2;
	let transformString = this.low.getAttribute('transform');
	if (transformString) {
		const rotationMatches = /(.*)rotate\((-?\d+(\.\d+)?) (-?\d+(\.\d+)?) (-?\d+(\.\d+)?)\)(.*)/.exec(transformString);
		if (rotationMatches && rotationMatches.length > 8) {
			const [_, before, rotAngle, _a, rotOldX, _x, rotOldY, _y, after] = rotationMatches;
			transformString = `${before}rotate(${rotAngle} ${Ox} ${Oy})${after}`;
		}

		const reflectionMatches1 = /(.*)translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*scale\(-1[, ]\s*1\)\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)(.*)/.exec(transformString);
		if (reflectionMatches1 && reflectionMatches1.length > 6) {
			const [_, before, _t1x, _t1y, _t2x, _t2y, after] = reflectionMatches1;
			transformString = `${before}translate(${x+w} ${y}) scale(-1, 1) translate(${-x-w} ${-y})${after}`;
		}

		const reflectionMatches2 = /(.*)translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*scale\(1[, ]\s*-1\)\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)(.*)/.exec(transformString);
		if (reflectionMatches2 && reflectionMatches2.length > 6) {
			const [_, before, _t1x, _t1y, _t2x, _t2y, after] = reflectionMatches2;
			transformString = `${before}translate(${x} ${Oy}) scale(1, -1) translate(${-x} ${-Oy})${after}`;
		}
		this.low.setAttribute('transform', transformString);
	}
};

DoorWidget.prototype.updateDownward = function ()
{
	this.high.size = segmentLength([this.high.vertices[0], this.high.vertices[1]]);
	const info = this.factory().calculate([this.high.size, this.high.size], this.high.position);
	this.low.setAttribute('x', info.point_lowcorner[0]);
	this.low.setAttribute('y', info.point_lowcorner[1]);
	this.low.setAttribute('width' , info.sizes_low [0]);
	this.low.setAttribute('height', info.sizes_low [1]);
};

DoorWidget.prototype.isHostless = function () {return true;};

DoorWidget.prototype.jumpTo = function (targetCanvasPseudoWidget)
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);
	this.changeBoardsFor(targetCanvasPseudoWidget);
};


DoorWidget.prototype.collisionActionSpecialty = function (controller, canvasPseudoWidget, minFallTargetFigure, currentWEPos)
{
	const minFallTargetWidget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(minFallTargetFigure);
	minFallTargetWidget.loseWall_(controller, this);
};


DoorWidget.prototype.scale = function (q)
{
	this.high.doScale (q);
	this.updateDownward();
};

DoorWidget.prototype.reflectVerticallyRef = function ()
{
	console.log('Flip door vertically (ref)');
	const transformRewriter = new TransformRewriter(this.low); // @TODO generalize+parametrize this method further + contract with other methods of this family: `conjoint(Horizont|Vertic)al(Door|Window)Flip(Ref?)`
	transformRewriter.conjointVerticalDoorFlipRef();
};

DoorWidget.prototype.reflectHorizontallyRef = function ()
{
	console.log('Flip door horizontally (ref)');
	// @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30
	const x = Number(this.low.getAttribute('x')),
	      y = Number(this.low.getAttribute('y'));
	const w = Number(this.low.getAttribute('width')),
	      h = Number(this.low.getAttribute('height'));
	let t = this.low.getAttribute('transform');
	if (t) {
		const regexp = /(^|.*[^ ])\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*scale\(1[, ]\s*-1\)\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*$/;
		if (regexp.test(t)) {
			const submatches = regexp.exec(t);
			if (submatches.length > 1) {
				t = submatches[1];
				console.log('Submatch removal');
			} else throw 'Regexp bug';
		} else {
			t = t + ` translate(${x} ${y+h/2}) scale(1, -1) translate(${-x} ${-y-h/2})`;
			console.log('Direct addition');
		}
		//this.low.setAttribute('transform', t); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30
	} else {
		t = `translate(${x} ${y+h/2}) scale(1, -1) translate(${-x} ${-y-h/2})`;
		console.log('Virgin direct addition');
	}
	if (t) {
		this.low.setAttribute('transform', t); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30
	} else {
		this.low.removeAttribute('transform');
	}
};


DoorWidget.prototype.reflectVertically   = function () {console.log('Flip door vertically (abs)'  );};
DoorWidget.prototype.reflectHorizontally = function () {console.log('Flip door horizontally (abs)');};


DoorWidget.prototype.restoreOn = canvasPseudoWidget => canvasPseudoWidget.doorWidgetFactory.create(2.3, [ 1.7, -4]); // @TODO note that this is a class method

DoorWidget.prototype.attachToWall   = function (wallsBackRefSet)
{
	console.log('Attach door to wall');
	const r = this.high.size / 2;
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
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/door-attached2.png'); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30 there. In summary: use a rewriter wrapper, like TransformRewriter
	let edge = null, _ = null;
	for ([edge, _] of wallsBackRefSet.mapStraight);
	if (edge) {
		const plumbBob = [0, 1];
		const [ex, ey] = edgeVector(edge),
		      [nx, ny] = [-ey, ex], // edge normal
		      N        = vectorLength([nx, ny]), // normalizing coefficient
		      [Nx, Ny] = [nx / N, ny / N], /* normalized normal */
		      [rx, ry] = [Nx * r, Ny * r],
		      q = this.q(),
		      [Rx, Ry] = [rx * q, ry * q];
		console.log('Adjustment vector:', [rx, ry]);
		const angle = signedRotAngleOfVectors(plumbBob, [ex, ey]);
		const Ox = Number(this.low.getAttribute('x')) + Number(this.low.getAttribute('width' )) / 2,
		      Oy = Number(this.low.getAttribute('y')) + Number(this.low.getAttribute('height')) / 2;
		this.low.setAttribute('transform', `translate(${-Rx} ${Ry}) rotate(${180-angle} ${Ox} ${Oy})`); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30 there
	}  //  rotate(${-angle} ${Ox} ${Oy})
	//this.restoreOn(canvasPseudoWidgets[2]);
};

DoorWidget.prototype.detachFromWall = function ()
{
	console.log('Detach door from wall');
	this.low.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets-proper/door-detached.png'); // @TODO delegate a function to `public/app/low-level-system/SvgLowLevel.js`, see line #30 there
	this.low.removeAttribute('transform');
	//canvasPseudoWidgets[2].doorWidgets().map(doorWidget => doorWidget.delete());
};

// @TODO DRY the source is the same with `WindowWidget`
DoorWidget.prototype.hasBeenAttached = function () // @TODO use a rewriter wrapper, like TransformRewriter
{
	const href = this.low.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
	return /attached/.test(href);
};

// @TODO DRY the source is the same with `WindowWidget`
DoorWidget.prototype.hasBeenDetached = function () // @TODO use a rewriter wrapper, like TransformRewriter
{
	const href = this.low.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
	return /detached/.test(href);
};


DoorWidget.prototype.showGlittering = function ()
{
	//this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

DoorWidget.prototype.unshowGlittering = function ()
{
	//delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	//this.low.removeAttribute(GLITTERING_ATTR_NAME);
};


DoorWidget.prototype.showFocus = function ()
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

DoorWidget.prototype.unshowFocus = function ()
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


DoorWidget.prototype.isActor        = function () {return true;};
DoorWidget.prototype.isShapeshifter = function () {return true;};


DoorWidget.prototype.contextMenu = () => new ContextMenu('Nyílászáró: ajtó', [[CMO('Mozgatás', 'move', 'Mozgatás és fókusz')], [CMO('Átméretezés', 'scale', 'Szabad ikonként aránytartóan, vagy nyújtás/zsugorítás kötötten a fal mentén'), CMO('Tükrözés 🚶', 'flipY', 'Tükrözés - kfelé vagy befelé nyíljék?'), CMO('Tükrözés ✍️', 'flipX', 'Tükrözés - jobbkezes/balkezes ajtó váltás')], [CMO('Űrlap', 'form', 'Objektumtulajdonságok űrlapja')]]);
