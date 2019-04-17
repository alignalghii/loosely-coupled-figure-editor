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
	var [prevEl, prevPos, virgin, hasCollided] = [null, null, true, false]; // stateMachine.init
	var app = this;

	function actionInitAll()                                   {prevEl = null     ; prevPos = null      ; virgin = true; hasCollided = false;                            }
	function actionUpdateInputInitFlags(currentEl, currentPos) {prevEl = currentEl; prevPos = currentPos; virgin = true; hasCollided = false; currentEl.showGlittering();}
	function dragIfAny(currentPos)
	{
		if (prevEl && !hasCollided) {
			hasCollided = app.checkAndHandleCollision(prevEl, prevPos, currentPos);
			prevPos     = currentPos; virgin = false;
		}
	}
	function putDragDownIfAny(currentPos) {if ( prevEl                                  && !virgin && !hasCollided) {prevEl.update(prevPos, currentPos); prevEl.unshowGlittering(prevEl);}}
	function createIfSo      (currentPos) {if (!prevEl                                                            )  currentPos.create(app.originFigure);}
	function deleteIfSo      (currentEl ) {if ( prevEl && currentEl.high == prevEl.high &&  virgin && !hasCollided)  currentEl .delete(                );}
	function endAndCreateIfSo(currentPos)
	{
		putDragDownIfAny(currentPos); // probably never occurs due to dragging (maybe if very quick)
		if (!prevEl) currentPos.create(app.originFigure); // @TODO swap object receiver and argument around method
		actionInitAll(); // stateMachine.init()
	}

	this.widgetPillar.subscribe('mousedown', (currentPos) => actionInitAll(), actionUpdateInputInitFlags                                                       );
	this.widgetPillar.subscribe('mousemove', dragIfAny                      , (currentEl, currentPos) => dragIfAny(currentPos)                                 );
	this.widgetPillar.subscribe('mouseup'  , endAndCreateIfSo               , (currentEl, currentPos) => {deleteIfSo(currentEl); endAndCreateIfSo(currentPos);});
};
