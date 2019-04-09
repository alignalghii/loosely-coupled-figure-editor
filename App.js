function App(svgLowLevel, coordSysTransformer)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
}

App.prototype.run = function ()
{
	var [prevEl, prevPos] = [null, null];
	this.svgLowLevel.subscribe(
		'mousedown',
		function (              [x,y]) {prevEl = prevPos = null;},
		function (polygonChild, [x,y]) {prevEl = polygonChild; prevPos = [x, y];}
	);
	this.svgLowLevel.subscribe(
		'mousemove',
		function (              [x,y]) {if (prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);},
		function (polygonChild, [x,y]) {if (prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);}
	);
	this.svgLowLevel.subscribe(
		'mouseup',
		function (              [x,y])
		{	if (prevEl) this.updatePolygonChild(prevEl, [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			else        this.createPolygonChild([[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			prevEl = prevPos = null;
		},
		function (polygonChild, [x,y])
		{
			if ( prevEl                           && !Eq.eq([x, y], prevPos)) this.updatePolygonChild(prevEl      , [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			if ( prevEl && polygonChild == prevEl &&  Eq.eq([x, y], prevPos)) this.deletePolygonChild(polygonChild                                          );
			if (!prevEl                                                     ) this.createPolygonChild(              [[x,y], [x+10,y], [x+10,y+10], [x,y+10]]);
			prevEl = prevPos = null;
		}
	);
	this.svgLowLevel.createPolygonChild([[300, 200], [310, 200], [310, 210], [300, 210]]);
};
