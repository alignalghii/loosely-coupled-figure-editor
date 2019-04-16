function App(svgLowLevel, board, figure, audio, widgetPillar) // should take only `widgetPillar`, `board` and `audio`
{
	this.svgLowLevel         = svgLowLevel;
	this.board               = board;
	this.setOriginFigureFrom(figure);
	this.audio               = audio;
	this.widgetPillar        = widgetPillar;
}

App.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();}

App.prototype.checkAndHandleCollision = function (prevEl, prevPos, currentPos)
{
	var [prevFigure, displacement] = this.widgetPillar.figurePotentialFromLow(prevEl, prevPos, currentPos);
	var hypothetical = new Hypothetical(this.board, prevFigure, displacement);
	var collisionFlag = hypothetical.wouldCollideAny();
	if (collisionFlag) {
		var prevFigure = hypothetical.doInterpolateCollision();
		this.widgetPillar.updateFromHigh(prevFigure);
		hasCollided = true;
		this.widgetPillar.unshowGlitteringFromLow(prevEl);
		this.audio.bang();
		return true;
	} else this.widgetPillar.updateFromLow(prevEl, prevPos, currentPos);
	return collisionFlag;
};

App.prototype.run = function () // @TODO move into `WidgetPillar`, then try to factor out a `StateMachine` class from it
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
				hasCollided = app.checkAndHandleCollision(prevEl, prevPos, currentPos);
				prevPos = currentPos; virgin = false;
			}
		},
		function (currentEl, currentPos)
		{
			if (prevEl && !hasCollided) {
				hasCollided = app.checkAndHandleCollision(prevEl, prevPos, currentPos);
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
