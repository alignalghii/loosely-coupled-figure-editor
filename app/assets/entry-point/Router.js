function Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.normalModeController  = normalModeController;
	this.compactModeController = compactModeController;
	this.roomController        = roomController;
	this.figureEditorController = figureEditorController;
	this.geomTransformationController = geomTransformationController;
}

Router.prototype.dispatch = function (eventType, inputSignature, ird) // ird: inputRoledData
{
	if (eventType == 'change') {
		if (Eq.eq(inputSignature, ['string', 'string'])) this.normalModeController.changeMode (ird.mode        ); // @TODO common
		if (Eq.eq(inputSignature, ['Room'            ])) this.normalModeController.changeStamp(ird.selectedRoom); // @TODO common
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

						case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9': this.roomController.createSquareByArea(parseFloat(ird.key)); break;

						case 'o': case 'O': this.roomController.focusOpenHole() ; break;
						case 'c': case 'C': this.roomController.focusCloseHole(); break;
					}
				}
			break;
		}
	}
	if (this.state.mode == 'figureeditoradd') {
		switch (eventType) {
			case 'mouseup':
				this.figureEditorController.addVertex(ird.currentWEPos);
				break;
		}
	}
	if (this.state.mode == 'figureeditordelete') {
		switch (eventType) {
			case 'mouseup':
				this.figureEditorController.deleteVertex(ird.currentWEPos);
				break;
		}
	}
	if (this.state.mode == 'figureeditormove') { // @TODO: delegate more responsibility from the router to the controller. @TODO: should not use the same `State` as `NormalModeController`
		switch (eventType) {
			case 'mousedown':
				this.figureEditorController.moveVertex(ird.currentWEPos);
				this.figureEditorController.state.editorMoveFlag = true;
				break;
			case 'mousemove':
				if (this.figureEditorController.state.editorMoveFlag)
					this.figureEditorController.moveVertex(ird.currentWEPos);
				break;
			case 'mouseup':
				this.figureEditorController.moveVertex(ird.currentWEPos);
				this.figureEditorController.state.editorMoveFlag = false; // @TODO: should not use the same `State` as `NormalModeController`
				break;
		}
	}
	if (this.state.mode == 'geomtransformationrotation') { // @TODO: should not use the same `State` as `NormalModeController`
		switch (eventType) {
			case 'mousedown': // @TODO: reuse: almost the same algorithm exists in `FigureEditorController`.
				this.geomTransformationController.openRotationArcSpan(ird.currentWEPos);
				break;
			case 'mousemove': // @TODO: reuse: almost the same algorithm exists in `FigureEditorController`. @TODO: Ha a vásznan belül lenyomott egérgombot vásznonkívül engedem fel: dragbanragad
				this.geomTransformationController.sustainRotationArcSpan(ird.currentWEPos);
				break;
			case 'mouseup':
				this.geomTransformationController.closeRotationArcSpan();
				break;
		}
	}
};

/** Actions */

Router.prototype.rememberWidget            = function (ird) {this.state.prevWidget = ird.currentWidget;};
Router.prototype.rememberPosition          = function (ird) {this.state.prevWEPos = ird.currentWEPos;};

/** Conditions */

Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
Router.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
Router.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
