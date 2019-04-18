function StateMachine(app) {this.app = app; this.actionInitAll();}

StateMachine.prototype.actionInitAll = function ()
{
	this.prevWidget = null; this.prevWEPos   = null;
	this.virgin     = true; this.hasCollided = false;
};

StateMachine.prototype.actionUpdateInputInitFlags = function (currentWidget, currentWEPos)
{
	this.prevWidget = currentWidget; this.prevWEPos   = currentWEPos;
	this.virgin     = true         ; this.hasCollided = false;
	currentWidget.showGlittering();
};

StateMachine.prototype.dragIfAny = function (currentWEPos)
{
	if (this.prevWidget && !this.hasCollided) {
		this.hasCollided = this.app.checkAndHandleCollision(this.prevWidget, this.prevWEPos, currentWEPos);
		this.prevWEPos   = currentWEPos;
		this.virgin      = false;
	}
};

StateMachine.prototype.putDragDownIfAny = function (currentWEPos)
{
	if (this.prevWidget && !this.virgin && !this.hasCollided) {
		this.prevWidget.update(this.prevWEPos, currentWEPos);
		this.prevWidget.unshowGlittering(this.prevWidget);
	}
};

StateMachine.prototype.createIfSo = function (currentWEPos ) {if (!this.prevWidget) currentWEPos.create(this.app.originFigure);};
StateMachine.prototype.deleteIfSo = function (currentWidget) {if ( this.prevWidget && currentWidget.high == this.prevWidget.high && this.virgin && !this.hasCollided) currentWidget.delete();};

StateMachine.prototype.endAndCreateIfSo = function (currentWEPos)
{
	this.putDragDownIfAny(currentWEPos);
	if (!this.prevWidget) currentWEPos.create(this.app.originFigure);
	this.actionInitAll();
};
