function StateMachine(state, widgetCollision, stampFigure, coordSysTransformer, msgConsole, compactModeGUIAPI, normalModeGUIAPI) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetCollision = widgetCollision;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();

	this.compactModeGUIAPI = compactModeGUIAPI;
	this.normalModeGUIAPI  = normalModeGUIAPI;
}

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{

	if (eventType == 'change') {
		if (Eq.eq(inputSignature, ['string', 'string'])) this.normalModeGUIAPI.changeMode (ird.mode          ); // @TODO common
		if (Eq.eq(inputSignature, ['Figure'          ])) this.normalModeGUIAPI.changeStamp(ird.selectedFigure); // @TODO common
	}
	if (this.state.mode == 'compact') {
		switch (eventType) {
			case 'mousedown': this.compactModeGUIAPI.mouseDown(ird.currentWEPos, ird.currentWidget); break;
			case 'mousemove': this.compactModeGUIAPI.mouseMove(ird.currentWEPos                   ); break;
			case 'mouseup'  : this.compactModeGUIAPI.mouseUp  (ird.currentWEPos, ird.currentWidget); break;
		}
	}
	if (this.state.mode == 'normal') {
		switch (eventType) {
			case 'mousedown': this.normalModeGUIAPI.mouseDown(ird.currentWEPos, ird.currentWidget); break;
			case 'mousemove': this.normalModeGUIAPI.mouseMove(ird.currentWEPos                   ); break;
			case 'mouseup'  : this.normalModeGUIAPI.mouseUp  (ird.currentWEPos, ird.currentWidget); break;
			case 'click':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.operation) {
						case 'create'    : this.normalModeGUIAPI.createAtPosFocus(); break;
						case 'delete'    : this.normalModeGUIAPI.deleteFigFocus  (); break;
						case 'unfigfocus': this.normalModeGUIAPI.leaveFigFocus   (); break;
					}
				}
			break;
			case 'keydown':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.key) {
						case '+':                this.normalModeGUIAPI.createAtPosFocus(); break;
						case 'Delete': case '-': this.normalModeGUIAPI.deleteFigFocus  (); break;
						case 'Escape':           this.normalModeGUIAPI.leaveFigFocus   (); break;

						case 'ArrowLeft' : this.normalModeGUIAPI.focusLeft     (); break;
						case 'ArrowRight': this.normalModeGUIAPI.focusRight    (); break;
						case 'ArrowUp'   : this.normalModeGUIAPI.focusUp       (); break;
						case 'ArrowDown' : this.normalModeGUIAPI.focusDown     (); break;

						case '('         : this.normalModeGUIAPI.focusRotateCCW    (); break;
						case ')'         : this.normalModeGUIAPI.focusRotateCW     (); break;
						case '{'         : this.normalModeGUIAPI.focusRotateCCWFast(); break;
						case '}'         : this.normalModeGUIAPI.focusRotateCWFast (); break;

						case '|': this.normalModeGUIAPI.focusReflectVerticallyRef  (); break;
						case '=': this.normalModeGUIAPI.focusReflectHorizontallyRef(); break;

						case '<': this.normalModeGUIAPI.focusScaleSmaller    (); break;
						case '>': this.normalModeGUIAPI.focusScaleBigger     (); break;
						case '[': this.normalModeGUIAPI.focusScaleSmallerFast(); break;
						case ']': this.normalModeGUIAPI.focusScaleBiggerFast (); break;

						case '.': this.normalModeGUIAPI.focusScaleVerticallySmallerRef  (); break;
						case ':': this.normalModeGUIAPI.focusScaleVerticallyBiggerRef   (); break;
						case "'": this.normalModeGUIAPI.focusScaleHorizontallySmallerRef(); break;
						case '"': this.normalModeGUIAPI.focusScaleHorizontallyBiggerRef (); break;

						case 'L': case 'l': this.normalModeGUIAPI.focusScaleVerticallySmallerFastRef  (); break;
						case 'Z': case 'z': this.normalModeGUIAPI.focusScaleVerticallyBiggerFastRef   (); break;
						case "I": case "i": this.normalModeGUIAPI.focusScaleHorizontallySmallerFastRef(); break;
						case 'H': case 'h': this.normalModeGUIAPI.focusScaleHorizontallyBiggerFastRef (); break;

						case "~":                     this.normalModeGUIAPI.focusScaleXYArealInvariantRef      (); break;
						case '$':                     this.normalModeGUIAPI.focusUnscaleXYArealInvariantRef    (); break;
						case "÷": case 'W': case 'w': this.normalModeGUIAPI.focusScaleXYArealInvariantFastRef  (); break;
						case '§': case 'S': case 's': this.normalModeGUIAPI.focusUnscaleXYArealInvariantFastRef(); break;
					}
				}
			break;
		}
	}
};

/** Actions */

StateMachine.prototype.rememberWidget            = function (ird) {this.state.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition          = function (ird) {this.state.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.followWhileCheckCollision = function (ird) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(this.state.prevWidget, this.state.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
