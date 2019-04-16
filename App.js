function App(svgLowLevel, coordSysTransformer, bijectionUp, board, figure, audio, widgetPillar)
{
	this.svgLowLevel         = svgLowLevel;
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionUp         = bijectionUp;
	this.board               = board;
	this.setOriginFigureFrom(figure);
	this.audio               = audio;
	this.widgetPillar        = widgetPillar;
}

App.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();}

App.prototype.run = function ()
{
	var [prevEl, prevPos, virgin, hasCollided] = [null, null, true, false];
	var app = this;
	this.svgLowLevel.subscribe(
		'mousedown',
		function (           currentPos) {prevEl = prevPos = null;                  virgin = true; hasCollided = false;},
		function (currentEl, currentPos) {prevEl = currentEl; prevPos = currentPos; virgin = true; hasCollided = false; app.widgetPillar.showGlitteringFromLow(currentEl);}
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
					app.widgetPillar.updateFromHigh(prevFigure);
					hasCollided = true;
					app.widgetPillar.unshowGlitteringFromLow(prevEl);
					app.audio.bang();
				}
				else app.widgetPillar.updateFromLow(prevEl, prevPos, currentPos);
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
					app.widgetPillar.updateFromHigh(prevFigure);
					hasCollided = true;
					app.widgetPillar.unshowGlitteringFromLow(prevEl);
					app.audio.bang();
				}
				else app.widgetPillar.updateFromLow(prevEl, prevPos, currentPos);
				prevPos = currentPos; virgin = false;
			}
		}
	);
	this.svgLowLevel.subscribe(
		'mouseup',
		function (              currentPos)
		{	if ( prevEl && !hasCollided) app.widgetPillar.updateFromLow(prevEl, prevPos, currentPos);
			if (!prevEl) app.widgetPillar.createFromLow(app.originFigure, currentPos);
			prevEl = prevPos = null; virgin = true; hasCollided = false;
		},
		function (currentEl, currentPos)
		{
			if ( prevEl                        && !virgin && !hasCollided) {app.widgetPillar.updateFromLow(prevEl   , prevPos, currentPos); app.widgetPillar.unshowGlitteringFromLow(prevEl);}
			if ( prevEl && currentEl == prevEl &&  virgin && !hasCollided)  app.widgetPillar.deleteFromLow(currentEl                     );
			if (!prevEl                                                  )  app.widgetPillar.createFromLow(app.originFigure, currentPos);
			prevEl = prevPos = null; virgin = true; hasCollided = false;
		}
	);
};
