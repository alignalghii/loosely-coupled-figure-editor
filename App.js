function App(svgLowLevel, coordSysTransformer, bijectionUp, originFigure)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.originFigure        = originFigure;
}

App.prototype.run = function ()
{
	var [prevEl, prevPos] = [null, null];
	var app = this;
	this.svgLowLevel.subscribe(
		'mousedown',
		function (              [x,y]) {prevEl = prevPos = null;},
		function (polygonChild, [x,y]) {prevEl = polygonChild; prevPos = [x, y];}
	);
	this.svgLowLevel.subscribe(
		'mousemove',
		function (              [x,y]) {if (prevEl) app.updateWidgetPillarFromLow(prevEl, [x,y]);},
		function (polygonChild, [x,y]) {if (prevEl) app.updateWidgetPillarFromLow(prevEl, [x,y]);}
	);
	this.svgLowLevel.subscribe(
		'mouseup',
		function (              [x,y])
		{	if ( prevEl) app.updateWidgetPillarFromLow(prevEl, [x,y]);
			if (!prevEl) app.createWidgetPillarFromLow(        [x,y]);
			prevEl = prevPos = null;
		},
		function (polygonChild, [x,y])
		{
			if ( prevEl                           && !Eq.eq([x, y], prevPos)) app.updateWidgetPillarFromLow(prevEl      , [x,y]);
			if ( prevEl && polygonChild == prevEl &&  Eq.eq([x, y], prevPos)) app.deleteWidgetPillarFromLow(polygonChild       );
			if (!prevEl                                                     ) app.createWidgetPillarFromLow(              [x,y]);
			prevEl = prevPos = null;
		}
	);

	this.createWidgetPillarFromLow(this.coordSysTransformer.highToLow([0, 0]));
};

App.prototype.createWidgetPillarFromLow = function (svgPosition)
{
	//console.log('High-level figure: high-level (geometrical) coordinates: <'+highFigure.vertices.join(' | ')+'>');
	var geomPosition      = this.coordSysTransformer.lowToHigh(svgPosition);
	var geomNewFigure     = this.originFigure.translation(geomPosition);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices);
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};

App.prototype.updateWidgetPillarFromLow = function (lowElem, svgPosition)
{
	var geomFigure       = this.bijectionUp.get(lowElem);
	var geomDestPosition = this.coordSysTransformer.lowToHigh(svgPosition);
	var geomDisplacement = fromTo(geomFigure.grasp, geomDestPosition);
	geomFigure.doTranslation(geomDisplacement);
	var svgVertices = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(lowElem, svgVertices);
};

App.prototype.deleteWidgetPillarFromLow = function (lowElem)
{
	this.bijectionUp.delete(lowElem);
	this.svgLowLevel.deletePolygonChild(lowElem);
};
