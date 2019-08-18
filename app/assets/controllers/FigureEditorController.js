function FigureEditorController(state, widgetFactory, msgConsole)
{
	this.state         = state;
	this.widgetFactory = widgetFactory;
	this.msgConsole    = msgConsole;
}

FigureEditorController.prototype.addVertex    = function (point) {this.work('addVertex'   , point, 'Hozzáadom'  , 'alakzathoz');};
FigureEditorController.prototype.deleteVertex = function (point) {this.work('deleteVertex', point, 'Elveszem'   , 'alakzatból');};
FigureEditorController.prototype.moveVertex   = function (point) {this.work('moveVertex'  , point, 'Megmozdítom', 'alakzatnál');};

FigureEditorController.prototype.work = function (command, currentWEPos, template1, template2)
{
	const board = this.widgetFactory.bijectionSvgToGeom;
	const editorMessage = maybe(
		'Nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const oldVertices = JSON.stringify(nearestFigure.vertices);
			const figureEditor  = new FigureEditorByProximityHeuristic(nearestFigure);
			figureEditor[command](currentWEPos);
			const widget = this.widgetFactory.createWidgetFromMedium(nearestFigure);
			widget.updateDownward();
			return 'Alakzatszerkesztő. ' + template1 + ' a ' + JSON.stringify(currentWEPos) + ' pontot a legközelebbi ' + template2 + '. Ennek változása: ' + oldVertices + ' --> ' + JSON.stringify(nearestFigure.vertices) + '.';
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.msgConsole.innerHTML = editorMessage;
};
