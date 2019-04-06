function App(aDocument) {this.document = aDocument;}

App.prototype.run = function ()
{
	var svgLowLevel = new SvgLowLevel(this.document); // [600, 400]
	var prevEl = null; var prevPos = null;
	/*svgLowLevel.subscribe(
		'click',
		function (              [x,y]) {this.createPolygonChild(              [[x   ,y   ], [x+10,y   ], [x+10,y+10], [x   ,y+10]]);},
		function (polygonChild, [x,y]) {this.updatePolygonChild(polygonChild, [[x+20,y+20], [x+30,y+20], [x+30,y+30], [x+20,y+30]]);}
	);*/
	svgLowLevel.subscribe(
		'mousedown',
		function (              [x,y]) {prevEl = prevPos = null;},
		function (polygonChild, [x,y]) {prevEl = polygonChild; prevPos = [x, y]}
	);
	svgLowLevel.subscribe(
		'mousemove',
		function (              [x,y]) {if (prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);},
		function (polygonChild, [x,y]) {if (polygonChild == prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);}
	);
	svgLowLevel.subscribe(
		'mouseup',
		function (              [x,y])
		{	if (prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			else        this.createPolygonChild([[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			prevEl=null;
		},
		function (polygonChild, [x,y])
		{
			if (prevEl                 && !Eq.eq([x, y], prevPos)) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			if (polygonChild == prevEl &&  Eq.eq([x, y], prevPos)) deleteElement(polygonChild);
			prevEl=null;
		}
	);
	svgLowLevel.createPolygonChild([[300, 200], [310, 200], [310, 210], [300, 210]]);

	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);
};
