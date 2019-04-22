function StateMachine(widgetCollision, stampFigure) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.widgetCollision = widgetCollision;
	this.stampFigure = stampFigure; // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
	this.forgetDrag();
	this.mode = 'obsolete';
}

StateMachine.prototype.forgetDrag = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{
	if (this.mode == 'obsolete') {
		switch (eventType) {
			case 'mousedown':
				this.forgetDrag();
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
					ird.currentWEPos.create(this.stampFigure);
				this.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) this.setStampFigureFrom(ird.selectedFigure);
			break;
		}
	}
	if (eventType == 'change' && Eq.eq(inputSignature, ['string', 'string'])) this.mode = ird.mode;
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

StateMachine.prototype.setStampFigureFrom = function (figure) {this.stampFigure = figure.centering();};
