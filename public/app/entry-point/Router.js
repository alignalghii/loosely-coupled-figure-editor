function Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController, figurePropertyEditorController, configController, figureNestingController, tabSelectorController, loaderController, saveController, nativeLoaderController, zoomController, contextMenuController, historyController) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.normalModeController  = normalModeController;
	this.compactModeController = compactModeController;
	this.roomController        = roomController;
	this.figureEditorController = figureEditorController;
	this.geomTransformationController = geomTransformationController;
	this.figurePropertyEditorController = figurePropertyEditorController;
	this.configController = configController;
	this.figureNestingController = figureNestingController;
	this.tabSelectorController = tabSelectorController;
	this.loaderController = loaderController;
	this.saveController   = saveController;
	this.nativeLoaderController = nativeLoaderController;
	this.zoomController = zoomController;
	this.contextMenuController = contextMenuController;
	this.historyController = historyController;
}

Router.prototype.dispatch = function (eventType, inputSignature, ird, event) // ird: inputRoledData
{
	if (ird.mouseButton !== 2) {
		if (eventType == 'change') {
			if (Eq.eq(inputSignature, ['string', 'string']) && 'mode' in ird) this.normalModeController.changeMode(ird.mode); // @TODO common
			if (Eq.eq(inputSignature, ['edge'  , 'number'])) {
				this.figureEditorController.saveHistory(); // @TODO
				this.figurePropertyEditorController.editEdge  (ird.edge, ird.value);
			}
			if (Eq.eq(inputSignature, ['string', 'checkbox']) && ('optionName' in ird)) {
				switch (ird.optionName) {
					case 'areainvariance'           : this.configController.setAreaInvariance(ird.value); break;
					case 'relativeinsteadofabsolute': this.configController.setIsRelative    (ird.value); break;
					case 'admin'                    : this.configController.setIsAdmin       (ird.value); break;
					case 'jpeg'                     : this.configController.setIsJPEG        (ird.value); break;
					default                         : throw 'Invalid option name'                       ; break;
				}
			}
			if (Eq.eq(inputSignature, ['Room'            ])) this.normalModeController.changeStamp(ird.selectedRoom); // @TODO common
		}
		if ((eventType == 'change' || eventType == 'input') && Eq.eq(inputSignature, ['string', 'string']) && 'dasharrayAttribute' in ird) this.figurePropertyEditorController.changeDasharray(ird.dasharrayAttribute, ird.value);

		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'tabName'      in ird) this.tabSelectorController.select(ird.tabName);
		if (eventType == 'submit' && Eq.eq(inputSignature, ['IdString']) && 'loaderIdStr'  in ird) this.loaderController.run(ird.loaderIdStr); // @TODO better name, loaderid is rather eitherEId
		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'loaderAction' in ird && ird.loaderAction == 'cancel') this.loaderController.cancel();
		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'saveAction'   in ird && ird.saveAction   == 'save'  ) this.saveController  .save  ();
		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'loadAction' in ird && ird.loadAction == 'native')     this.nativeLoaderController.view();
		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'loadAction' in ird && ird.loadAction == 'interpret')  this.nativeLoaderController.interpret();
		if (eventType == 'click'  && Eq.eq(inputSignature, ['void'    ]) && 'zoomAction' in ird) {
			switch (ird.zoomAction) {
				case 'up'     : this.zoomController.up     (); break;
				case 'down'   : this.zoomController.down   (); break;
				case 'default': this.zoomController.default(); break;
				default       : throw 'Invalid zoom action'  ; break;
			}
		}
		if (eventType == 'click' && Eq.eq(inputSignature ['void']) && 'contextAction' in ird) {
			return this.contextMenuController.select(ird.contextAction); // `return` not needed really: no other condition will match afterwards
		}
		if (eventType == 'click' && Eq.eq(inputSignature, ['void']) && 'historyAction' in ird) {
			switch (ird.historyAction) {
				case 'undo': return this.historyController.undo();
				default    : throw 'Invalid history action';
			}
		}

		if (this.state.mode == 'compact') {
			switch (eventType) {
				case 'mousedown': this.figureEditorController.saveHistory(); /* @TODO */ this.compactModeController.mouseDown(ird.currentWEPos, ird.eitherTarget); break;
				case 'mousemove': this.compactModeController.mouseMove(ird.currentWEPos, ird.eitherTarget); break;
				case 'mouseup'  : this.compactModeController.mouseUp  (ird.currentWEPos, ird.eitherTarget); break;
			}
		}
		if (this.state.mode == 'normal') {
			const isGraphicalEvent = !('tabName' in ird); // @TODO refactor this condition jungle below:
			switch (eventType) {
					case 'mousedown':
						if (this.normalModeController.canvasPseudoWidgets[4].arbitrary.svgLowLevel.svgRootElement, canvasOfEitherTarget(ird.eitherTarget) == this.normalModeController.canvasPseudoWidgets[4].arbitrary.svgLowLevel.svgRootElement) {
							this.figureEditorController.saveHistory(); // @TODO
						}
						if (isGraphicalEvent) this.normalModeController.mouseDown(ird.currentWEPos, ird.eitherTarget);
						break;
					case 'mousemove':
						if (isGraphicalEvent) this.normalModeController.mouseMove(ird.currentWEPos, ird.eitherTarget);
						break;
					case 'mouseup'  :
						if (isGraphicalEvent) this.normalModeController.mouseUp  (ird.currentWEPos, ird.eitherTarget);
						break;
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
					if (Eq.eq(inputSignature, ['string']) && 'key' in ird) {
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

							//case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9': this.roomController.createSquareByArea(parseFloat(ird.key)); break; // @TODO kerveredik azzal az eseménnyel, amikor a loader ID-mezőbe írok 1..9 ig terjeső számjegyet

							case 'o': case 'O': this.roomController.focusOpenHole() ; break;
							case 'c': case 'C': this.roomController.focusCloseHole(); break;
							default: console.log(`Ismeretlen billentyűparancs: ${ird.key}`); // @TODO statussorba
						}
					}
				break;
			}
		}
		if (this.state.mode == 'figureeditoradd') {
			switch (eventType) {
				case 'mouseup':
					this.figureEditorController.addVertex(ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}
		if (this.state.mode == 'figureeditordelete') {
			switch (eventType) {
				case 'mouseup':
					this.figureEditorController.deleteVertex(ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}
		if (this.state.mode == 'figureeditormove') { // @TODO: delegate more responsibility from the router to the controller. @TODO: should not use the same `State` as `NormalModeController`
			switch (eventType) {
				case 'mousedown':
					this.figureEditorController.moveVertex(ird.currentWEPos, ird.eitherTarget); // Implies `this.figureEditorController.saveHistory()` automatically
					this.figureEditorController.state.editorMoveFlag = true;
					break;
				case 'mousemove':
					if (this.figureEditorController.state.editorMoveFlag)
						this.figureEditorController.moveVertex(ird.currentWEPos, ird.eitherTarget);
					break;
				case 'mouseup':
					this.figureEditorController.moveVertex(ird.currentWEPos, ird.eitherTarget);
					this.figureEditorController.state.editorMoveFlag = false; // @TODO: should not use the same `State` as `NormalModeController`
					break;
			}
		}
		if (this.state.mode == 'figureeditorpush') {
			switch (eventType) {
				case 'mousedown':
					this.figureEditorController.saveHistory(); // @TODO
					this.figureEditorController.state.pushEdge_start = ird.currentWEPos;
					break;
				case 'mousemove':
					if (this.figureEditorController.state.pushEdge_start) {
						//const mouseDrag = fromTo(this.figureEditorController.state.pushEdge_start, ird.currentWEPos); // @TODO: consider for future
						this.figureEditorController.pushEdge(ird.currentWEPos, ird.eitherTarget);
						this.figureEditorController.state.pushEdge_start = ird.currentWEPos;
					}
					break;
				case 'mouseup':
					delete this.figureEditorController.state.pushEdge_start;
					break;
			}
		}
		if (this.state.mode == 'figureeditorpushnormal') {
			switch (eventType) {
				case 'mousedown':
					this.figureEditorController.saveHistory(); // @TODO
					this.figureEditorController.state.pushnormalEdge_start = ird.currentWEPos;
					break;
				case 'mousemove':
					if (this.figureEditorController.state.pushnormalEdge_start) {
						//const mouseDrag = fromTo(this.figureEditorController.state.pushnormalEdge_start, ird.currentWEPos); // @TODO: consider for future
						this.figureEditorController.pushnormalEdge(ird.currentWEPos, ird.eitherTarget);
						this.figureEditorController.state.pushnormalEdge_start = ird.currentWEPos;
					}
					break;
				case 'mouseup':
					delete this.figureEditorController.state.pushnormalEdge_start;
					break;
			}
		}
		if (this.state.mode == 'figureeditorspan') {
			switch (eventType) {
				case 'mousedown':
					this.figureEditorController.saveHistory(); // @TODO
					this.figureEditorController.state.spanEdge_start = ird.currentWEPos;
					break;
				case 'mousemove':
					if (this.figureEditorController.state.spanEdge_start) {
						const mouseDrag = fromTo(this.figureEditorController.state.spanEdge_start, ird.currentWEPos); // @TODO: consider for future
						this.figureEditorController.spanEdge(ird.currentWEPos, ird.eitherTarget, mouseDrag);
						this.figureEditorController.state.spanEdge_start = ird.currentWEPos;
					}
					break;
				case 'mouseup':
					delete this.figureEditorController.state.spanEdge_start;
					break;
			}
		}
		if (this.state.mode == 'geomtransformationrotation') { // @TODO: should not use the same `State` as `NormalModeController`
			switch (eventType) {
				case 'mousedown': // @TODO: reuse: almost the same algorithm exists in `FigureEditorController`.
					this.figureEditorController.saveHistory(); // @TODO
					this.geomTransformationController.openRotationArcSpan(ird.currentWEPos, ird.eitherTarget);
					break;
				case 'mousemove': // @TODO: reuse: almost the same algorithm exists in `FigureEditorController`. @TODO: Ha a vásznan belül lenyomott egérgombot vásznonkívül engedem fel: dragbanragad
					this.geomTransformationController.sustainRotationArcSpan(ird.currentWEPos);
					break;
				case 'mouseup':
					this.geomTransformationController.closeRotationArcSpan();
					break;
			}
		}

		{// @TODO: even more DRY
			const scaleCases = {
				geomtransformationscale         : ['doScale'                     , 'scale'                     ],

				geomtransformationscalex        : ['doScaleX'                    , 'scaleX'                    ],
				geomtransformationscaley        : ['doScaleY'                    , 'scaleY'                    ],
			};
			if (this.state.mode in scaleCases) {
				if (eventType == 'mousedown') this.figureEditorController.saveHistory(); // @TODO
				const commands = scaleCases[this.state.mode];
				this.routeDragCasesOpen3Sustain1Close0ScaleStressSpan(commands, eventType, ird.currentWEPos, ird.eitherTarget);
			}
		}


		if (this.state.mode == 'geomtransformationreflectionhorizontally') { // @TODO: should not use the same `State` as `NormalModeController`
			switch (eventType) {
				case 'mouseup':
					this.figureEditorController.saveHistory(); // @TODO
					this.geomTransformationController.reflectionFlip(['doReflectHorizontally', 'reflectHorizontally'], ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}
		if (this.state.mode == 'geomtransformationreflectionvertically') { // @TODO: should not use the same `State` as `NormalModeController`
			switch (eventType) {
				case 'mouseup':
					this.figureEditorController.saveHistory(); // @TODO
					this.geomTransformationController.reflectionFlip(['doReflectVertically', 'reflectVertically'], ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}

		if (this.state.mode == 'figurepropertyeditor') {
			switch (eventType) {
				case 'mouseup':
					this.figurePropertyEditorController.modeOn(ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}
		if (this.state.mode == 'figurenesting') {
			switch (eventType) {
				case 'mouseup':
					this.figureEditorController.saveHistory(); // @TODO
					this.figureNestingController.onOrOff(ird.currentWEPos, ird.eitherTarget);
					break;
			}
		}
	}
	if (eventType == 'contextmenu') { // @TODO consider why it is sometimes different condition: `mouseButton == 2`
		return this.contextMenuController.rightClick(event, ird.eitherTarget);
	}

	this.historyController.updateDisablings();
};

/** A compound route method: */
Router.prototype.routeCasesWithOptParamAndArgs = function (aritiesTuple, eventNamesTuple, methodNamesTuple, optParameter, eventType, arg1, arg2)
{
	const cases = zip3(aritiesTuple, eventNamesTuple, methodNamesTuple);
	for (let [arity, eventName, methodName] of cases) {
		if (eventType == eventName) {
			console.log([arity, eventName, methodName]);
			switch (arity) {
				case 0: this.geomTransformationController[methodName](                        ); break;
				case 1: this.geomTransformationController[methodName](              arg1      ); break;
				case 3: this.geomTransformationController[methodName](optParameter, arg1, arg2); break;
				default: throw 'Invalid arity given in Router::routeCasesWithParamAndArgs)';
			}
		}
	}
};

Router.prototype.routeDragCases310 = function (methodNamesTuple, optParameter, eventType, arg1, arg2) {this.routeCasesWithOptParamAndArgs([3, 1, 0], ['mousedown', 'mousemove', 'mouseup'], methodNamesTuple, optParameter, eventType, arg1, arg2);};

Router.prototype.routeDragCasesOpen3Sustain1Close0ScaleStressSpan = function (optParameter, eventType, arg1, arg2) {this.routeDragCases310(['openScaleStressSpan', 'sustainScaleStressSpan', 'closeScaleStressSpan'], optParameter, eventType, arg1, arg2);};

/** Actions */

Router.prototype.rememberWidget            = function (ird) {this.state.prevWidget = ird.currentWidget;};
Router.prototype.rememberPosition          = function (ird) {this.state.prevWEPos = ird.currentWEPos;};

/** Conditions */

Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
Router.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
Router.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//Router.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
