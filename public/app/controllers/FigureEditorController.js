function FigureEditorController(state, canvasPseudoWidgets, statusBarDriver)
{
	this.state           = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver = statusBarDriver;
}

FigureEditorController.prototype = Object.create(Controller.prototype);

FigureEditorController.prototype.constructor = FigureEditorController;

FigureEditorController.prototype.addVertex    = function (point, eitherTarget) {this.work('addVertex'   , point, eitherTarget, 'Hozzáadom'  , 'alakzathoz');};
FigureEditorController.prototype.deleteVertex = function (point, eitherTarget) {this.work('deleteVertex', point, eitherTarget, 'Elveszem'   , 'alakzatból');};
FigureEditorController.prototype.moveVertex   = function (point, eitherTarget) {this.work('moveVertex'  , point, eitherTarget, 'Megmozdítom', 'alakzatnál');};

FigureEditorController.prototype.work = function (command, currentWEPos, eitherTarget, template1, template2) // @TODO: reuse: almost the same algorithm exists in `GeomTransforamtionController` (or in its section in `Router`).
{
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const editorMessage = maybe(
		'Nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const figureEditor  = new FigureEditorByProximityHeuristic(nearestFigure);
			figureEditor[command](currentWEPos);
			const widget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(nearestFigure); // @TODO arbitrary
			return widget.updateAndReport(currentWEPos, nearestFigure, template1, template2); // Image's boxing figure should not be allowed to be edited!
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(editorMessage);
};
