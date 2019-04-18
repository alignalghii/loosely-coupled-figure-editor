function StateMachine(app)
{
	this.app = app;
	this.forgetAll();
}

StateMachine.prototype.forgetAll = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{
	switch (eventType) {
		case 'mousedown':
			if (this.onEmptySpace(inputSignature))
				this.forgetAll();
			if (this.onAWidget(inputSignature)) {
				this.rememberWidget(ird); this.rememberPosition(ird);
				this.dragHasAlreadyBegun  = false;
				this.hasCollided = false;
				ird.currentWidget.showGlittering();
			}
		break;
		case 'mousemove':
			if (this.prevWidgetHasNotCollidedYet()) {
				this.checkCollision(ird);
				this.rememberPosition(ird);
				this.dragHasAlreadyBegun = true;
			}
		break;
		case 'mouseup':
			if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && this.samePlaceUpAsDown(ird) && !this.dragHasAlreadyBegun)
				ird.currentWidget.delete();
			if (this.prevWidgetHasNotCollidedYet() && this.dragHasAlreadyBegun) {
				this.prevWidget.update(this.prevWEPos, ird.currentWEPos);
				this.prevWidget.unshowGlittering(this.prevWidget);
			}
			if (!this.prevWidget)
				ird.currentWEPos.create(this.app.originFigure);
			this.forgetAll();
		break;
	}
};

/** Actions */

StateMachine.prototype.rememberWidget   = function (ird) {this.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition = function (ird) {this.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.checkCollision   = function (ird) {this.hasCollided = this.app.checkAndHandleCollision(this.prevWidget, this.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.prevWidgetHasNotCollidedYet = function () {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};
StateMachine.prototype.prevWidgetHasNotCollidedYet = function () {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};

StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
