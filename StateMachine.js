function StateMachine(app) {this.app = app; this.actionInitAll();}

StateMachine.prototype.actionInitAll = function ()
{
	this.prevEl      = null; this.prevPos     = null;
	this.virgin      = true; this.hasCollided = false;
};

StateMachine.prototype.actionUpdateInputInitFlags = function (currentEl, currentPos) {
	this.prevEl = currentEl; this.prevPos = currentPos;
	this.virgin = true     ; this.hasCollided = false;
	currentEl.showGlittering();
};

StateMachine.prototype.dragIfAny = function (currentPos)
{
	if (this.prevEl && !this.hasCollided) {
		this.hasCollided = this.app.checkAndHandleCollision(this.prevEl, this.prevPos, currentPos);
		this.prevPos     = currentPos;
		this.virgin      = false;
	}
};

StateMachine.prototype.putDragDownIfAny = function (currentPos)
{
	if (this.prevEl && !this.virgin && !this.hasCollided) {
		this.prevEl.update(this.prevPos, currentPos);
		this.prevEl.unshowGlittering(this.prevEl);
	}
};

StateMachine.prototype.createIfSo = function (currentPos) {if (!this.prevEl) currentPos.create(this.app.originFigure);};
StateMachine.prototype.deleteIfSo = function (currentEl ) {if ( this.prevEl && currentEl.high == this.prevEl.high && this.virgin && !this.hasCollided) currentEl.delete();};

StateMachine.prototype.endAndCreateIfSo = function (currentPos)
{
	this.putDragDownIfAny(currentPos);
	if (!this.prevEl) currentPos.create(this.app.originFigure);
	this.actionInitAll();
};
