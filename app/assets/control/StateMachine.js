function StateMachine(widgetCollision, originFigure) // make it obsolete
{
	this.widgetCollision = widgetCollision;
	this.originFigure = originFigure;  // make it obsolete
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
			this.forgetAll();
			if (this.onAWidget(inputSignature)) {
				this.rememberWidget(ird);
				this.rememberPosition(ird);
				ird.currentWidget.showGlittering();
			}
		break;
		case 'mousemove':
			if (this.prevWidgetHasNotCollidedYet()) {
				this.followWhileCheckCollision(ird); // @TODO
				this.rememberPosition(ird);
				this.dragHasAlreadyBegun = true;
			}
		break;
		case 'mouseup':
			if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.dragHasAlreadyBegun)
				ird.currentWidget.delete();
			if (this.prevWidgetHasNotCollidedYet() && this.dragHasAlreadyBegun) {
				this.prevWidget.update(this.prevWEPos, ird.currentWEPos);
				this.prevWidget.unshowGlittering(this.prevWidget);
			}
			if (!this.prevWidget)
				ird.currentWEPos.create(this.originFigure);
			this.forgetAll();
		break;

		case 'change':
			if (Eq.eq(inputSignature, ['Figure'])) this.setOriginFigureFrom(ird.selectedFigure);
		break;
	}
};

/** Actions */

StateMachine.prototype.rememberWidget            = function (ird) {this.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition          = function (ird) {this.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.followWhileCheckCollision = function (ird) {this.hasCollided = this.widgetCollision.checkAndHandleCollision(this.prevWidget, this.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};
StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};

/** Not needed */

//StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};
//StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** MenuUI */

StateMachine.prototype.setOriginFigureFrom = function (figure) {this.originFigure = figure.centering();};
