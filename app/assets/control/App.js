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

	this.widgetFactory.subscribe('mousedown', (               currentWEPos) => sm.transition('mousedown', [          'WEPos'], {                             currentWEPos:currentWEPos}),
	                                          (currentWidget, currentWEPos) => sm.transition('mousedown', ['Widget', 'WEPos'], {currentWidget:currentWidget, currentWEPos:currentWEPos})
	);

	// probably never occurs due to dragging (maybe if very quick):
	this.widgetFactory.subscribe('mousemove', (               currentWEPos) => sm.transition('mousemove', [          'WEPos'], {                             currentWEPos:currentWEPos}),
	                                          (currentWidget, currentWEPos) => sm.transition('mousemove', ['Widget', 'WEPos'], {currentWidget:currentWidget, currentWEPos:currentWEPos})
	);
	this.widgetFactory.subscribe('mouseup'  , (               currentWEPos) => sm.transition('mouseup'  , [          'WEPos'], {                             currentWEPos:currentWEPos}),
	                                          (currentWidget, currentWEPos) => sm.transition('mouseup'  , ['Widget', 'WEPos'], {currentWidget:currentWidget, currentWEPos:currentWEPos})
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
