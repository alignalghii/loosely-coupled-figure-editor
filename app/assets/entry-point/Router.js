function Router(state, widgetCollision, stampFigure, coordSysTransformer, msgConsole, compactModeController, normalModeController) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetCollision = widgetCollision;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();

	this.compactModeController = compactModeController;
	this.normalModeController  = normalModeController;
}

Router.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{

	if (eventType == 'change') {
		if (Eq.eq(inputSignature, ['string', 'string'])) this.normalModeController.changeMode (ird.mode          ); // @TODO common
		if (Eq.eq(inputSignature, ['Figure'          ])) this.normalModeController.changeStamp(ird.selectedFigure); // @TODO common
	}
	if (this.state.mode == 'compact') {
		switch (eventType) {
			case 'mousedown': this.compactModeController.mouseDown(ird.currentWEPos, ird.currentWidget); break;
			case 'mousemove': this.compactModeController.mouseMove(ird.currentWEPos                   ); break;
			case 'mouseup'  : this.compactModeController.mouseUp  (ird.currentWEPos, ird.currentWidget); break;
		}
	}
	if (this.state.mode == 'normal') {
		switch (eventType) {
			case 'mousedown': this.normalModeController.mouseDown(ird.currentWEPos, ird.currentWidget); break;
			case 'mousemove': this.normalModeController.mouseMove(ird.currentWEPos                   ); break;
			case 'mouseup'  : this.normalModeController.mouseUp  (ird.currentWEPos, ird.currentWidget); break;
			case 'click':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.operation) {
						case 'create'    : this.normalModeController.createAtPosFocus(); break;
						case 'delete'    : this.normalModeController.deleteFigFocus  (); break;
						case 'unfigfocus': this.normalModeController.leaveFigFocus   (); break;
					}
				}
			break;
			case 'keydown':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.key) {
						case '+':                this.normalModeController.createAtPosFocus(); break;
						case 'Delete': case '-': this.normalModeController.deleteFigFocus  (); break;
						case 'Escape':           this.normalModeController.leaveFigFocus   (); break;

						case 'ArrowLeft' : this.normalModeController.focusLeft     (); break;
						case 'ArrowRight': this.normalModeController.focusRight    (); break;
						case 'ArrowUp'   : this.normalModeController.focusUp       (); break;
						case 'ArrowDown' : this.normalModeController.focusDown     (); break;

						case '('         : this.normalModeController.focusRotateCCW    (); break;
						case ')'         : this.normalModeController.focusRotateCW     (); break;
						case '{'         : this.normalModeController.focusRotateCCWFast(); break;
						case '}'         : this.normalModeController.focusRotateCWFast (); break;

						case '|': this.normalModeController.focusReflectVerticallyRef  (); break;
						case '=': this.normalModeController.focusReflectHorizontallyRef(); break;

						case '<': this.normalModeController.focusScaleSmaller    (); break;
						case '>': this.normalModeController.focusScaleBigger     (); break;
						case '[': this.normalModeController.focusScaleSmallerFast(); break;
						case ']': this.normalModeController.focusScaleBiggerFast (); break;

						case '.': this.normalModeController.focusScaleVerticallySmallerRef  (); break;
						case ':': this.normalModeController.focusScaleVerticallyBiggerRef   (); break;
						case "'": this.normalModeController.focusScaleHorizontallySmallerRef(); break;
						case '"': this.normalModeController.focusScaleHorizontallyBiggerRef (); break;

						case 'L': case 'l': this.normalModeController.focusScaleVerticallySmallerFastRef  (); break;
						case 'Z': case 'z': this.normalModeController.focusScaleVerticallyBiggerFastRef   (); break;
						case "I": case "i": this.normalModeController.focusScaleHorizontallySmallerFastRef(); break;
						case 'H': case 'h': this.normalModeController.focusScaleHorizontallyBiggerFastRef (); break;

						case "~":                     this.normalModeController.focusScaleXYArealInvariantRef      (); break;
						case '$':                     this.normalModeController.focusUnscaleXYArealInvariantRef    (); break;
						case "÷": case 'W': case 'w': this.normalModeController.focusScaleXYArealInvariantFastRef  (); break;
						case '§': case 'S': case 's': this.normalModeController.focusUnscaleXYArealInvariantFastRef(); break;
					}
				}
			break;
		}
	}
};

/** Actions */

Router.prototype.rememberWidget            = function (ird) {this.state.prevWidget = ird.currentWidget;};
Router.prototype.rememberPosition          = function (ird) {this.state.prevWEPos = ird.currentWEPos;};
Router.prototype.followWhileCheckCollision = function (ird) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(this.state.prevWidget, this.state.prevWEPos, ird.currentWEPos);};

/** Conditions */

Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
Router.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
Router.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
