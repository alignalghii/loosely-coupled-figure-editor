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
	var displacement = fromTo(prevPos.high, currentPos.high);
	var hypothetical = new Hypothetical(this.board, prevEl.high, displacement);
	var collisionFlag = hypothetical.wouldCollideAny();
	if (collisionFlag) {
		/*prevFigure =*/ hypothetical.doInterpolateCollision(); // nor needed, as Hypothetical keeps identity of prevFigure, thus effects it by reference @TODO code smell, nasty
		prevEl.updateDownward();
		prevEl.unshowGlittering();
		this.audio.bang();
	} else prevEl.update(prevPos, currentPos);
	return collisionFlag;
};

App.prototype.run = function () // @TODO move into `WidgetPillar`, then try to factor out a `StateMachine` class from it
{
	var [prevEl, prevPos, virgin, hasCollided] = [null, null, true, false]; // init
	var app = this;
	this.widgetPillar.subscribe(
		'mousedown',
		function (           currentPos) {prevEl = prevPos = null;                  virgin = true; hasCollided = false;}, // init
		function (currentEl, currentPos) {prevEl = currentEl; prevPos = currentPos; virgin = true; hasCollided = false; currentEl.showGlittering();}
	);
	this.widgetPillar.subscribe(
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
	this.widgetPillar.subscribe(
		'mouseup',
		function (              currentPos)
		{	if ( prevEl && !virgin && !hasCollided) {prevEl.update(prevPos, currentPos); prevEl.unshowGlittering(prevEl);} // probably never occurs due to dragging (maybe if very quick)
			if (!prevEl)                 currentPos.create(app.originFigure); // @TODO swap object receiver and argument around method
			prevEl = prevPos = null; virgin = true; hasCollided = false; // stateMachine.init()
		},
		function (currentEl, currentPos)
		{
			if ( prevEl                        && !virgin && !hasCollided) {prevEl.update(prevPos, currentPos); prevEl.unshowGlittering(prevEl);}
			if ( prevEl && currentEl.high == prevEl.high &&  virgin && !hasCollided)  currentEl.delete();
			if (!prevEl                                                  )  currentPos.create(app.originFigure); // @TODO swap object receiver and argument around method
			prevEl = prevPos = null; virgin = true; hasCollided = false; // statemachine.init()
		}
	);
};
