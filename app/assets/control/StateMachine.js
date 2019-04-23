function StateMachine(widgetCollision, stampFigure) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.widgetCollision = widgetCollision;
	this.stampFigure = stampFigure; // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
	this.forgetDrag();
	this.mode = 'normal';
	this.focus = null;
	this.spaceFocus = null;
}

StateMachine.prototype.forgetDrag = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{

	if (eventType == 'change' && Eq.eq(inputSignature, ['string', 'string'])) this.mode = ird.mode;
	if (this.mode == 'compact') {
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
					if (this.followWhileCheckCollision(ird)) this.prevWidget.unshowGlittering(); // @TODO
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
	if (this.mode == 'normal') {
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
					if (this.followWhileCheckCollision(ird)) this.prevWidget.unshowGlittering(); // @TODO
					this.rememberPosition(ird);
					this.dragHasAlreadyBegun = true;
				}
			break;
			case 'mouseup':
				if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.dragHasAlreadyBegun) {
					if (this.focus && ird.currentWidget.high != this.focus.high) this.focus.unshowFocus();
					this.focus = ird.currentWidget; this.spaceFocus = null;
					this.focus.showFocus();
					ird.currentWidget.unshowGlittering();
				}
				if (this.prevWidgetHasNotCollidedYet() && this.dragHasAlreadyBegun) {
					this.prevWidget.update(this.prevWEPos, ird.currentWEPos);
					this.prevWidget.unshowGlittering(this.prevWidget);
				}
				if (this.onEmptySpace(inputSignature)) {
					console.log(ird);
					this.spaceFocus = ird.currentWEPos;
					if (this.focus) {
						this.focus.unshowFocus();
						this.focus = null;
					}
				}
				this.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) this.setStampFigureFrom(ird.selectedFigure);
			break;
			case 'click':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.operation) {
						case 'create':
							console.log(this.spaceFocus);
							if (this.spaceFocus) this.spaceFocus.create(this.stampFigure);
						break;
						case 'delete':
							if (this.focus) {this.focus.delete(); this.focus = null;}
						break;
					}
				}
			break;
		}
	}
};

/** Actions */

StateMachine.prototype.rememberWidget            = function (ird) {this.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition          = function (ird) {this.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.followWhileCheckCollision = function (ird) {return this.hasCollided = this.widgetCollision.checkAndHandleCollision(this.prevWidget, this.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};
StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};

/** MenuUI */

StateMachine.prototype.setStampFigureFrom = function (figure) {this.stampFigure = figure.centering();};
