const GLITTERING_ATTR_NAME = 'opacity', GLITTERING_VALUE = 0.5;
const FOCUS = [{name: 'filter', value: 'url(#shadow)'}];

// @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible

/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function Figure(vertices, svgAttributes = {}, grasp, referenceAngle)
{
	this.grasp         = grasp || (vertices.length > 0 ? centroid(vertices) : [0,0]); // referencePoint
	this.referenceAngle = referenceAngle || 0;
	this.vertices      = vertices;
	if (!('stroke' in svgAttributes)) svgAttributes['stroke'] = 'black';
	if (!('stroke-width' in svgAttributes)) svgAttributes['stroke-width'] = 5;
	this.svgAttributes = svgAttributes;
}

Figure.prototype.translation = function ([dx, dy])
{
	function displace([x,y]) {return [x+dx, y+dy];}  // @TODO curry(pointwise(bPlus))(displacement)

	var grasp, vertices, svgAttributes = {}; // @TODO make `testTranslation` stricter, it should fail if this implementation returned a naked literal object instead of a Figure instance with methods
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			switch (key) {
				case 'grasp':
					var [x0, y0] = [this.grasp[0], this.grasp[1]];
					grasp = [x0+dx, y0+dy];
					break;
				case 'vertices':
					vertices = this.vertices.map(displace);
					break;
				case 'svgAttributes':
					for (let i in this.svgAttributes) svgAttributes[i] = this.svgAttributes[i];
			}
		}
	}
	return new Figure( vertices, svgAttributes, grasp, this.referenceAngle);
	// @TODO make `testTranslation` stricter, it should fail if this implementation returned a naked literal object instead of a Figure instance with methods
}

Figure.prototype.doTranslation = function ([dx, dy])
{
	function displace(point) {point[0] = point[0]+dx; point[1] = point[1] + dy;}
	this.vertices.forEach(displace);
	this.grasp[0] += dx;
	this.grasp[1] += dy;
}

Figure.prototype.collidesTowards = function (figure) {return collidesTowards(this.vertices, figure.vertices);};
Figure.prototype.collides        = function (figure) {return collides       (this.vertices, figure.vertices);};

Figure.prototype.getSvgProperties = function () {return this.svgProperties;}

Figure.prototype.doCentering = function ()
{
	for (let i = 0; i < this.vertices.length; i++) {
		this.vertices[i][0] -= this.grasp[0];
		this.vertices[i][1] -= this.grasp[1];
	}
	this.grasp[0] = 0; this.grasp[1] = 0;
};

Figure.prototype.centering = function ()
{
	var newFig = new Figure([], {}, [0,0], this.referenceAngle);
	for (let i = 0; i < this.vertices.length; i++) {
		newFig.vertices.push([ this.vertices[i][0]-this.grasp[0], this.vertices[i][1]-this.grasp[1] ]);
	}
	for (let at in this.svgAttributes) if (this.svgAttributes.hasOwnProperty(at)) newFig.svgAttributes[at] = this.svgAttributes[at];
	return newFig;
};

Figure.prototype.doRotation = function (phi)
{
	var rotate = makeRotate(phi, this.grasp);
	this.vertices = this.vertices.map(rotate);
	this.referenceAngle += phi;
};

Figure.prototype.doReflectHorizontally = function ()
{
	var reflect = makeReflectHorizontally(this.grasp[1]);
	this.vertices = this.vertices.map(reflect);
	this.referenceAngle = -this.referenceAngle;
};
Figure.prototype.doReflectVertically = function ()
{
	var reflect = makeReflectVertically(this.grasp[0]);
	this.vertices = this.vertices.map(reflect);
	this.referenceAngle = Math.PI - this.referenceAngle;
};
Figure.prototype.doScale = function (q)
{
	var scale = makeScale(q, this.grasp);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleX = function (q)
{
	var scale = makeScaleX(q, this.grasp[0]);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleY = function (q)
{
	var scale = makeScaleY(q, this.grasp[1]);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleXYArealInvariant = function (q)
{
	var scale = makeScaleXYArealInvariant(q, this.grasp);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doUnscaleXYArealInvariant = function (q)
{
	var scale = makeUnscaleXYArealInvariant(q, this.grasp);
	this.vertices = this.vertices.map(scale);
};

Figure.prototype.doReflectHorizontallyRef = function ()
{
	var reflect = makeReflectHorizontallyRef(this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(reflect);
};
Figure.prototype.doReflectVerticallyRef = function ()
{
	var reflect = makeReflectVerticallyRef(this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(reflect);
};

Figure.prototype.doScaleXRef = function (q)
{
	var scale = makeScaleXRef(q, this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleYRef = function (q)
{
	var scale = makeScaleYRef(q, this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleXYRef = function (q, r)
{
	var scale = makeScaleXYRef(q, r, this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doScaleXYArealInvariantRef = function (q)
{
	var scale = makeScaleXYArealInvariantRef(q, this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(scale);
};
Figure.prototype.doUnscaleXYArealInvariantRef = function (q)
{
	var scale = makeUnscaleXYArealInvariantRef(q, this.grasp, this.referenceAngle);
	this.vertices = this.vertices.map(scale);
};

Figure.prototype.perimeter = function () {return perimeter(this.vertices);};
