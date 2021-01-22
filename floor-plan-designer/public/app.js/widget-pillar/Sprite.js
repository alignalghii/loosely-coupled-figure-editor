function Sprite (svgLowLevel, coordSysTransformer, pen)  // @TODO too complicated, pass simply canvasPseudoWidget
{
	SituatedCanvas.call(this, svgLowLevel, coordSysTransformer);
	this.coordSysTransformer = coordSysTransformer;
	this.pen                 = pen;
}

Sprite.prototype = Object.create(SituatedCanvas.prototype);
Sprite.prototype.constructor = Sprite;


Sprite.prototype.createDot = function (vertex) {this.mouse('default'); return [this.auxPoint(vertex, 1)];};

Sprite.prototype.createSection = function (edge) {this.mouse('default'); return [this.auxSection(edge)];}

Sprite.prototype.auxSection = function (edge)
{

	const [P, Q] = edge.map(
		P => this.coordSysTransformer.highToLow(P)
	);
	const spine = fromTo(P, Q);
	const halfBreast = slantScale(
		this.pen.size / 2,
		normalizeVector(
			rotVec90CCW(spine)
		)
	);
	const vertices = [pointwiseMinus(P, halfBreast), pointwisePlus(P, halfBreast), pointwisePlus(Q, halfBreast), pointwiseMinus(Q, halfBreast)];
	const elem = this.svgLowLevel.createPolygonChild(vertices, {fill: this.pen.color});
	elem.dataset.event = 'none';
	return elem;
};

Sprite.prototype.createPinboard = function (loc)
{
	this.mouse('default');

	const pinBoard = new PinBoard(loc);
	const compass  = new Compass (loc);
	const pinBoardSVGs = pinBoard.points().map(point => this.auxPoint(point, 7));
	const compassSVGs = compass.sections().map(
		edge => this.auxSection(edge)
	);
	return pinBoardSVGs.concat(compassSVGs);
};

Sprite.prototype.auxPoint = function (vertex, minify)
{
	const [x, y] = this.coordSysTransformer.highToLow(vertex);
	const dot = createElementWithAttributes('circle', {cx:x, cy: y, r: this.pen.size/minify, fill: this.pen.color}, svgNS); //this.document.createElementNS(svgNS, 'polygon');
	this.svgLowLevel.svgRootElement.appendChild(dot); // @TODO: in case of more canvases, an svg-polynomelement should be able to be added to more canvases (drag a furniture to be copied to the  fl
	dot.dataset.event = 'none';
	return dot;
};

Sprite.prototype.log = message => {console.log(message); return [];};

Sprite.prototype.mouse = function (style) {this.svgLowLevel.document.body.style.cursor = style; return [];}; // @TODO: do not use it, it is not too portable
