const GLITTERING_ATTR_NAME = 'opacity', GLITTERING_VALUE = 0.5;
//const FOCUS = [{name: 'filter', value: 'url(#shadow)'}]; //[{name: 'filter', value: 'url(#shadow)'}];
const   FOCUS = [[{name: 'stroke', value: 'red'  }], []]  // @TODO [[{stroke: 'red'  }], []]
      UNFOCUS = [[{name: 'stroke', value: 'gray'}], []]; // @TODO [[{stroke: 'black'}], []]


// @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible

/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function Figure(vertices, svgAttributes = {}, grasp, referenceAngle)  // @TODO: inherit `Figure` and `Title` from a common `MathematicalLevelObject` ancestor
{
	this.grasp         = grasp || (vertices.length > 0 ? centroid(vertices) : [0,0]); // referencePoint
	this.referenceAngle = referenceAngle || 0;
	this.vertices      = vertices;
	if (!('stroke' in svgAttributes)) svgAttributes['stroke'] = 'gray';
	if (!('stroke-width' in svgAttributes)) svgAttributes['stroke-width'] = 7;
	this.svgAttributes = svgAttributes;
}

Figure.prototype = Object.create(MathematicalObject.prototype);

Figure.prototype.constructor = Figure;

Figure.prototype.exportToSerializableObject = function ()
{
	const ob = JSON.parse(JSON.stringify(this)); // hack a deep copy
	ob.type = this.constructor.name;
	return ob;
};

Figure.prototype.exportToSerializableObjectBy = function (specialKey)
{
	const ob = this.exportToSerializableObject();
	if ('attachmentBackRefing' in this) {
		ob.attachmentBackRefing = this.attachmentBackRefing.exportToSerializableObjectBy(specialKey);
	}
	return ob;
};


Figure.prototype.isCollidable_ = function () {return ['just', function (board, bodiesToBeIgnoredInCollisionDetection) {return mbVectorTransformationForAllowance_(this, board, bodiesToBeIgnoredInCollisionDetection);}];}; // @TODO should be raised to business object level?


//Figure.prototype.mbVectorTransfomationForAllowance = function (board) {return mbVectorTransfomationForAllowance(this, board);}; // @TODO: reconsider

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

Figure.prototype.doTranslation = function (displacement)
{
	function displace(vertex) {doAddVec(vertex, displacement);}
	this.vertices.forEach(displace);
	displace(this.grasp);
}

Figure.prototype.collidesTowards = function (figure) {return collidesTowards(this.vertices, figure.vertices);};
Figure.prototype.collides        = function (figure) {return collides       (this.vertices, figure.vertices);};

Figure.prototype.getSvgProperties = function () {return this.svgProperties;}

Figure.prototype.doCentering = function ()
{
	this.vertices.map(vertex => doSubVec(vertex, this.grasp));
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
Figure.prototype.area      = function () {return getArea(this.vertices);};

// @TODO: put to a spearate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?


Figure.prototype.editEdge = function (i, a) // reuse common part with `editEdge_aux`
{
	const vertices = this.vertices;

	const O = centroid(vertices);  // @TODO works around centroid, does not handle the case when figure's grasp point does not coincide with its centroid
	const edgeVector = vectorOfSegment(tour(vertices)[i]);
	const q = a / vectorLength(edgeVector);
	const phi = signedRotAngleOfVectors([1, 0], edgeVector) * Math.PI / 180;
	const rotate     = makeRotate(-phi, O);
	const rotateBack = makeRotate( phi, O);
	const transformationToBeConjugated = makeScaleX(q, O[0]);
	const edit = p => rotateBack(transformationToBeConjugated(rotate(p)));

	this.vertices = vertices.map(edit);

	this.referenceAngle = signedRotAngleOfVectors(
		[1, 0],
		edit(
			orientUnitVector(
				this.referenceAngle
			)
		)
	) * Math.PI / 180;
};

Figure.prototype.editEdge_areaInvariant = function (i, a) // @TODO works around centroid, does not handle the case when figure's grasp point does not coincide with its centroid
{
	const vertices = this.vertices;

	const O = centroid(vertices);  // @TODO works around centroid, does not handle the case when figure's grasp point does not coincide with its centroid
	const edgeVector = vectorOfSegment(tour(vertices)[i]);
	const q = a / vectorLength(edgeVector);
	const phi = signedRotAngleOfVectors([1, 0], edgeVector) * Math.PI / 180;
	const rotate     = makeRotate(-phi, O);
	const rotateBack = makeRotate( phi, O);
	const transformationToBeConjugated = makeScaleXYArealInvariant(q, O);
	const edit = p => rotateBack(transformationToBeConjugated(rotate(p)));

	this.vertices = vertices.map(edit);

	this.referenceAngle = signedRotAngleOfVectors(
		[1, 0],
		edit(
			orientUnitVector(
				this.referenceAngle
			)
		)
	) * Math.PI / 180;
};

Figure.prototype.titlePosition = function () {return titlePositionFor(this.vertices);};
