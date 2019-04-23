const GLITTERING_ATTR_NAME = 'opacity', GLITTERING_VALUE = 0.5;
const FOCUS = [
	{name: 'stroke'          , value:'black'},
	{name: 'stroke-width'    , value:5      },
	{name: 'stroke-dasharray', value:'5,5'  }
];

/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function sampleFigureBank() { return {
	selected: 1,
	namedFigures: [
		{name: 'Piros háromszög' , figure: (new Figure([[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red'    })).translation([ -6  ,  5  ])},
		{name: 'Kék négyzet'     , figure: (new Figure([[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'   })).translation([ -8  , -4  ])},
		{name: 'Bíbor konvex 1'  , figure: (new Figure(poly1_convex_ccw,                         {fill: 'magenta'})).translation([-18  ,  0  ])},
		{name: 'Zöld konkáv 1'   , figure: (new Figure(poly1_concave_ccw,                        {fill: 'green'  })).translation([  8  , -7  ])},
		{name: 'Fekete konvex 2' , figure: (new Figure(poly2_convex_ccw,                         {fill: 'black'  })).translation([  0  , -4  ])},
		{name: 'Szürke elfajult' , figure: (new Figure(poly2_degen_ccw,                          {fill: 'gray'   })).translation([ -2.3, -0.7])},
		{name: 'Narancs konkáv 2', figure: (new Figure(poly2_concave_ccw,                        {fill: 'orange' })).translation([ -4  ,  2.6])}
	]
};}

function Figure(vertices, svgAttributes = {}, grasp)
{
	this.grasp         = grasp || (vertices.length > 0 ? centroid(vertices) : [0,0]);
	this.vertices      = vertices;
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
	return new Figure( vertices, svgAttributes, grasp);
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
		this.grasp[0] = 0; this.grasp[1] = 1;
	}
};

Figure.prototype.centering = function ()
{
	var newFig = new Figure([], {}, [0,0]);
	for (let i = 0; i < this.vertices.length; i++) {
		newFig.vertices.push([ this.vertices[i][0]-this.grasp[0], this.vertices[i][1]-this.grasp[1] ]);
	}
	for (let at in this.svgAttributes) if (this.svgAttributes.hasOwnProperty(at)) newFig.svgAttributes[at] = this.svgAttributes[at];
	return newFig;
};
