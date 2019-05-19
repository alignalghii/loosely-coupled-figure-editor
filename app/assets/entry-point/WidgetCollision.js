function WidgetCollision (board, audio) {this.board = board; this.audio = audio;}

// @TODO Comes to a CollisionEventDecorator/Fassade: move to a lower level instead of app, possibly `WidgetCollision`
WidgetCollision.prototype.checkAndHandleCollision = function (prevWidget, prevWEPos, currentWEPos)
{
	var displacement = fromTo(prevWEPos, currentWEPos);
	var hypothetical = new Hypothetical(this.board, prevWidget.high, displacement); //@TODO dependency injection?
	var collisionFlag = hypothetical.wouldCollideAny();
	if (collisionFlag) {
		/*prevFigure =*/ hypothetical.doInterpolateCollision(); // nor needed, as Hypothetical keeps identity of prevFigure, thus effects it by reference @TODO code smell, nasty
		prevWidget.updateDownward();
		this.audio.bang();
	} else prevWidget.update(prevWEPos, currentWEPos);
	return collisionFlag;
};
