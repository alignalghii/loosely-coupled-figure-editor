function App(board, figure, audio, widgetFactory)
{
	this.board               = board; // same as widgetFactory.bijectionUp
	this.setOriginFigureFrom(figure);
	this.audio               = audio;
	this.widgetFactory       = widgetFactory;
}

App.prototype.run = function ()
{
	var sm = new StateMachine(this);

	this.widgetFactory.subscribe('mousedown', (               currentWEPos) =>  sm.actionInitAll(),
	                                          (currentWidget, currentWEPos) =>  sm.actionUpdateInputInitFlags(currentWidget, currentWEPos)
	);
	this.widgetFactory.subscribe('mousemove', (               currentWEPos) =>  sm.dragIfAny(currentWEPos), // probably never occurs due to dragging (maybe if very quick)
	                                          (currentWidget, currentWEPos) =>  sm.dragIfAny(currentWEPos)
	);
	this.widgetFactory.subscribe('mouseup'  , (               currentWEPos) =>  sm.endAndCreateIfSo(currentWEPos),
	                                          (currentWidget, currentWEPos) => {sm.deleteIfSo(currentWidget); sm.endAndCreateIfSo(currentWEPos);}
	);
};

App.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();};

App.prototype.checkAndHandleCollision = function (prevWidget, prevWEPos, currentWEPos)
{
	var displacement = fromTo(prevWEPos.high, currentWEPos.high);
	var hypothetical = new Hypothetical(this.board, prevWidget.high, displacement);
	var collisionFlag = hypothetical.wouldCollideAny();
	if (collisionFlag) {
		/*prevFigure =*/ hypothetical.doInterpolateCollision(); // nor needed, as Hypothetical keeps identity of prevFigure, thus effects it by reference @TODO code smell, nasty
		prevWidget.updateDownward();
		prevWidget.unshowGlittering();
		this.audio.bang();
	} else prevWidget.update(prevWEPos, currentWEPos);
	return collisionFlag;
};
