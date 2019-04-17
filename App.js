function App(board, figure, audio, widgetPillar)
{
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

App.prototype.run = function ()
{
	var sm = new StateMachine(this);

	this.widgetPillar.subscribe('mousedown', (           currentPos) =>  sm.actionInitAll(),
	                                         (currentEl, currentPos) =>  sm.actionUpdateInputInitFlags(currentEl, currentPos)
	);
	this.widgetPillar.subscribe('mousemove', (           currentPos) =>  sm.dragIfAny(currentPos), // probably never occurs due to dragging (maybe if very quick)
	                                         (currentEl, currentPos) =>  sm.dragIfAny(currentPos)
	);
	this.widgetPillar.subscribe('mouseup'  , (           currentPos) =>  sm.endAndCreateIfSo(currentPos),
	                                         (currentEl, currentPos) => {sm.deleteIfSo(currentEl); sm.endAndCreateIfSo(currentPos);}
	);
};
