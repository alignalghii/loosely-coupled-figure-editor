function Sprite (svgLowLevel, coordSysTransformer, penSize)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.penSize             = penSize;
}


Sprite.prototype.createDot = function (vertex)
{
	const [x, y] = this.coordSysTransformer.highToLow(vertex);
	const dot = createElementWithAttributes('circle', {cx:x, cy: y, r: this.penSize, fill: "red"}, svgNS); //this.document.createElementNS(svgNS, 'polygon');
	this.svgLowLevel.svgRootElement.appendChild(dot); // @TODO: in case of more canvases, an svg-polynomelement should be able to be added to more canvases (drag a furniture to be copied to the  fl
	return dot;
};

Sprite.prototype.createSection = function (edge)
{

	const [P, Q] = edge.map(
		P => this.coordSysTransformer.highToLow(P)
	);
	const spine = fromTo(P, Q);
	const halfBreast = slantScale(
		this.penSize / 2,
		normalizeVector(
			rotVec90CCW(spine)
		)
	);
	const vertices = [pointwiseMinus(P, halfBreast), pointwisePlus(P, halfBreast), pointwisePlus(Q, halfBreast), pointwiseMinus(Q, halfBreast)];
	return this.svgLowLevel.createPolygonChild(vertices, {fill: "red"});
};
