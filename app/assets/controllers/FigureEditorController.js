function FigureEditorController(state, widgetFactories, statusBarDriver)
{
	this.state           = state;
	this.widgetFactories = widgetFactories;
	this.statusBarDriver = statusBarDriver;
}

FigureEditorController.prototype = Object.create(Controller.prototype);

FigureEditorController.prototype.constructor = FigureEditorController;

FigureEditorController.prototype.addVertex    = function (point, eitherTarget) {this.work('addVertex'   , point, eitherTarget, 'Hozzáadom'  , 'alakzathoz');};
FigureEditorController.prototype.deleteVertex = function (point, eitherTarget) {this.work('deleteVertex', point, eitherTarget, 'Elveszem'   , 'alakzatból');};
FigureEditorController.prototype.moveVertex   = function (point, eitherTarget) {this.work('moveVertex'  , point, eitherTarget, 'Megmozdítom', 'alakzatnál');};

FigureEditorController.prototype.work = function (command, currentWEPos, eitherTarget, template1, template2) // @TODO: reuse: almost the same algorithm exists in `GeomTransforamtionController` (or in its section in `Router`).
{
	const widgetFactory = this.widgetFactoryForEitherTarget(eitherTarget),
	      board         = widgetFactory.bijectionSvgToGeom;
	const editorMessage = maybe(
		'Nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const oldVertices = JSON.stringify(nearestFigure.vertices);
			const figureEditor  = new FigureEditorByProximityHeuristic(nearestFigure);
			figureEditor[command](currentWEPos);
			const widget = widgetFactory.createFigureWidgetFromMedium(nearestFigure);
			widget.updateUpAndDownward();
			return 'Alakzatszerkesztő. ' + template1 + ' a ' + JSON.stringify(currentWEPos) + ' pontot a legközelebbi ' + template2 + '. Ennek változása: ' + oldVertices + ' --> ' + JSON.stringify(nearestFigure.vertices) + '.';
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(editorMessage);
};
