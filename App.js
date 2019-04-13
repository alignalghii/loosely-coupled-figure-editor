function App(svgLowLevel, coordSysTransformer, bijectionUp, figure)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.setOriginFigureFrom(figure);
}

App.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();}

App.prototype.run = function ()
{
	var [prevEl, prevPos, virgin] = [null, null, true];
	var app = this;
	this.svgLowLevel.subscribe(
		'mousedown',
		function (           currentPos) {prevEl = prevPos = null;                  virgin = true;},
		function (currentEl, currentPos) {prevEl = currentEl; prevPos = currentPos; virgin = true;}
	);
	this.svgLowLevel.subscribe(
		'mousemove',
		function (           currentPos) {if (prevEl) {app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos); prevPos = currentPos; virgin = false;}},
		function (currentEl, currentPos) {if (prevEl) {app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos); prevPos = currentPos; virgin = false;}}
	);
	this.svgLowLevel.subscribe(
		'mouseup',
		function (              currentPos)
		{	if ( prevEl) app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos);
			if (!prevEl) app.createWidgetPillarFromLow(                 currentPos);
			prevEl = prevPos = null; virgin = true;
		},
		function (currentEl, currentPos)
		{
			if ( prevEl                        && !virgin) app.updateWidgetPillarFromLow(prevEl   , prevPos, currentPos);
			if ( prevEl && currentEl == prevEl &&  virgin) app.deleteWidgetPillarFromLow(currentEl                     );
			if (!prevEl                                  ) app.createWidgetPillarFromLow(                    currentPos);
			prevEl = prevPos = null; virgin = true;
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

App.prototype.updateWidgetPillarFromLow = function (lowElem, svgPosition1, svgPosition2)
{
	var geomFigure        = this.bijectionUp.get(lowElem);
	var geomDestPosition1 = this.coordSysTransformer.lowToHigh(svgPosition1);
	var geomDestPosition2 = this.coordSysTransformer.lowToHigh(svgPosition2);
	var geomDisplacement  = fromTo(geomDestPosition1, geomDestPosition2);
	geomFigure.doTranslation(geomDisplacement);
	var svgVertices = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(lowElem, svgVertices);
	//svgPosition1 = svgPosition2;
};

App.prototype.deleteWidgetPillarFromLow = function (lowElem)
{
	this.bijectionUp.delete(lowElem);
	this.svgLowLevel.deletePolygonChild(lowElem);
};
