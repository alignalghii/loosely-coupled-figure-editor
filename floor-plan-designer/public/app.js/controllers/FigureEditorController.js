function FigureEditorController(state, canvasPseudoWidgets, statusBarDriver)
{
	this.state           = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver = statusBarDriver;

	this.locker = new RouterFlagBasedLocker(this, ['editorMoveFlag', 'pushEdge_start', 'pushnormalEdge_start', 'spanEdge_start']); // @TODO
}


Object.assign(FigureEditorController.prototype, ControllerMixinCanvasWidgetable );
Object.assign(FigureEditorController.prototype, ControllerMixinHistoryFollowable);

FigureEditorController.prototype.addVertex      = function (point, eitherTarget           ) {this.withProxFig('addVertex'     , point, eitherTarget, 'Hozzáadom'    , 'alakzathoz', this.state.areaInvariance);};
FigureEditorController.prototype.deleteVertex   = function (point, eitherTarget           ) {this.withProxFig('deleteVertex'  , point, eitherTarget, 'Elveszem'     , 'alakzatból', this.state.areaInvariance);};
FigureEditorController.prototype.moveVertex     = function (point, eitherTarget           ) {this.withProxFig('moveVertex'    , point, eitherTarget, 'Megmozdítom'  , 'alakzatnál', this.state.areaInvariance);};

FigureEditorController.prototype.pushEdge       = function (point, eitherTarget           ) {this.withProxFig('pushEdge'      , point, eitherTarget, 'Élt tolok'    , 'alakzatnál', this.state.areaInvariance);};
FigureEditorController.prototype.pushnormalEdge = function (point, eitherTarget           ) {this.withProxFig('pushnormalEdge', point, eitherTarget, 'Élt tolok'    , 'alakzatnál', this.state.areaInvariance);};
FigureEditorController.prototype.spanEdge       = function (point, eitherTarget, mouseDrag) {this.withProxFig('spanEdge'      , point, eitherTarget, 'Élt nyújtok'  , 'alakzatnál', mouseDrag, this.state.areaInvariance);};

FigureEditorController.prototype.withProxFig = function (command, currentWEPos, eitherTarget, template1, template2, optArg, optArg2) // @TODO: reuse: almost the same algorithm exists in `GeomTransforamtionController` (or in its section in `Router`).
{
	this.locker.lockIfNecessary();

	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const editorMessage = maybe(
		'Nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const figureEditor  = new FigureEditorByProximityHeuristic(nearestFigure);
			optArg2 == 'undefined' ? figureEditor.plainExec(command, currentWEPos, optArg)
			                       : figureEditor[command](currentWEPos, optArg, optArg2);
			const widget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(nearestFigure); // @TODO arbitrary
			return widget.updateAndReport(currentWEPos, nearestFigure, template1, template2); // Image's boxing figure should not be allowed to be edited!
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(editorMessage);
};

// @TODO: akármelyik vásznon érvényre jut, nemcsak a munkavásznon! Ez zavaró!
FigureEditorController.prototype.deleteVertex_withConfirmation = function (point, eitherTarget)
{
	event.preventDefault();
	if (confirm('Valóban törölni akarod a legközelebbi szoba legközelebbi sarokpontját?')) {
		this.deleteVertex(point, eitherTarget);
	}
};
