function App(svgLowLevel, coordSysTransformer, bijectionUp, board, figure, audio)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.board               = board;
	this.setOriginFigureFrom(figure);
	this.audio               = audio;
}

App.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();}

App.prototype.run = function ()
{
	var [prevEl, prevPos, virgin, hasCollided] = [null, null, true, false];
	var app = this;
	this.svgLowLevel.subscribe(
		'mousedown',
		function (           currentPos) {prevEl = prevPos = null;                  virgin = true; hasCollided = false;},
		function (currentEl, currentPos) {prevEl = currentEl; prevPos = currentPos; virgin = true; hasCollided = false; app.svgLowLevel.showGlittering(currentEl);}
	);
	this.svgLowLevel.subscribe(
		'mousemove',
		function (           currentPos)
		{
			if (prevEl && !hasCollided) {
				var geomPrevPos      = app.coordSysTransformer.lowToHigh(prevPos);
				var geomCurrentPos   = app.coordSysTransformer.lowToHigh(currentPos);
				var geomDisplacement = fromTo(geomPrevPos, geomCurrentPos);
				var prevFigure = app.bijectionUp.get(prevEl);
				var hypotheticFigureClone = prevFigure.translation(geomDisplacement);
				if (app.board.wouldCollideAny(prevFigure, hypotheticFigureClone)) {
					app.board.doInterpolateCollision(prevFigure, hypotheticFigureClone);
					app.updateWidgetPillarFromHigh(prevFigure);
					hasCollided = true;
					app.svgLowLevel.unshowGlittering(prevEl);
					app.audio.bang();
				}
				else app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos);
				prevPos = currentPos; virgin = false;
			}
		},
		function (currentEl, currentPos)
		{
			if (prevEl && !hasCollided) {
				var geomPrevPos      = app.coordSysTransformer.lowToHigh(prevPos);
				var geomCurrentPos   = app.coordSysTransformer.lowToHigh(currentPos);
				var geomDisplacement = fromTo(geomPrevPos, geomCurrentPos);
				var prevFigure = app.bijectionUp.get(prevEl);
				var hypotheticFigureClone = prevFigure.translation(geomDisplacement);
				if (app.board.wouldCollideAny(prevFigure, hypotheticFigureClone)) {
					app.board.doInterpolateCollision(prevFigure, hypotheticFigureClone);
					app.updateWidgetPillarFromHigh(prevFigure);
					hasCollided = true;
					app.svgLowLevel.unshowGlittering(prevEl);
					app.audio.bang();
				}
				else app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos);
				prevPos = currentPos; virgin = false;
			}
		}
	);
	this.svgLowLevel.subscribe(
		'mouseup',
		function (              currentPos)
		{	if ( prevEl && !hasCollided) app.updateWidgetPillarFromLow(prevEl, prevPos, currentPos);
			if (!prevEl) app.createWidgetPillarFromLow(                 currentPos);
			prevEl = prevPos = null; virgin = true; hasCollided = false;
		},
		function (currentEl, currentPos)
		{
			if ( prevEl                        && !virgin && !hasCollided) {app.updateWidgetPillarFromLow(prevEl   , prevPos, currentPos); app.svgLowLevel.unshowGlittering(prevEl);}
			if ( prevEl && currentEl == prevEl &&  virgin && !hasCollided)  app.deleteWidgetPillarFromLow(currentEl                     );
			if (!prevEl                                                  )  app.createWidgetPillarFromLow(                    currentPos);
			prevEl = prevPos = null; virgin = true; hasCollided = false;
		}
	);
};

App.prototype.createWidgetPillarFromHigh = function (geomFigure)
{
	var geomNewFigure     = geomFigure.translation([0,0]); // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
	this.bijectionUp.set(svgNewPolygonCild, geomNewFigure);
};

App.prototype.updateWidgetPillarFromHigh = function (geomFigure)
{
	var lowEl = this.bijectionUp.getInverse(geomFigure);
	var svgVertices = geomFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	this.svgLowLevel.updatePolygonChild(lowEl, svgVertices);
};

App.prototype.createWidgetPillarFromLow = function (svgPosition) // @TODO reuse `createWidgetPillar`
{
	//console.log('High-level figure: high-level (geometrical) coordinates: <'+highFigure.vertices.join(' | ')+'>');
	var geomPosition      = this.coordSysTransformer.lowToHigh(svgPosition);
	var geomNewFigure     = this.originFigure.translation(geomPosition);
	var svgVertices       = geomNewFigure.vertices.map((p) => this.coordSysTransformer.highToLow(p));//console.log('Origin figure: low-level (SVG) coordinates: {'+svgVertices.join(' | ')+'}');
	var svgNewPolygonCild = this.svgLowLevel.createPolygonChild(svgVertices, geomNewFigure.svgAttributes); // @TODO consider `this.originFigure.svgAttributes`
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
	//return geomFigure; // `lowElem` úgyis elérhető a hívó számára, `geomFigure`-t érdemes visszaadni
};

App.prototype.deleteWidgetPillarFromLow = function (lowElem)
{
	this.bijectionUp.delete(lowElem);
	this.svgLowLevel.deletePolygonChild(lowElem);
};
