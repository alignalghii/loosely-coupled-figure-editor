function FigureEditorController(state, canvasPseudoWidgets, statusBarDriver)
{
	this.state           = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver = statusBarDriver;
}

FigureEditorController.prototype = Object.create(Controller.prototype);

FigureEditorController.prototype.constructor = FigureEditorController;

FigureEditorController.prototype.addVertex      = function (point, eitherTarget           ) {this.withProxFig('addVertex'     , point, eitherTarget, 'Hozzáadom'    , 'alakzathoz'           );};
FigureEditorController.prototype.deleteVertex   = function (point, eitherTarget           ) {this.withProxFig('deleteVertex'  , point, eitherTarget, 'Elveszem'     , 'alakzatból'           );};
FigureEditorController.prototype.moveVertex     = function (point, eitherTarget           ) {this.withProxFig('moveVertex'    , point, eitherTarget, 'Megmozdítom'  , 'alakzatnál'           );};

FigureEditorController.prototype.pushEdge       = function (point, eitherTarget           ) {this.withProxFig('pushEdge'      , point, eitherTarget, 'Élt tolok'    , 'alakzatnál'           );};
FigureEditorController.prototype.pushnormalEdge = function (point, eitherTarget           ) {this.withProxFig('pushnormalEdge', point, eitherTarget, 'Élt tolok'    , 'alakzatnál'           );};
FigureEditorController.prototype.spanEdge       = function (point, eitherTarget, mouseDrag) {this.withProxFig('spanEdge'      , point, eitherTarget, 'Élt nyújtok'  , 'alakzatnál', mouseDrag);};

FigureEditorController.prototype.withProxFig = function (command, currentWEPos, eitherTarget, template1, template2, optArg) // @TODO: reuse: almost the same algorithm exists in `GeomTransforamtionController` (or in its section in `Router`).
{
	this.saveHistory();

	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const editorMessage = maybe(
		'Nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const figureEditor  = new FigureEditorByProximityHeuristic(nearestFigure);
			optArg ? figureEditor[command](currentWEPos, optArg) : figureEditor[command](currentWEPos);
			const widget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(nearestFigure); // @TODO arbitrary
			return widget.updateAndReport(currentWEPos, nearestFigure, template1, template2); // Image's boxing figure should not be allowed to be edited!
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(editorMessage);
};

FigureEditorController.prototype.saveHistory = function ()
{
	// @TODO DRY: make a `serialize` method for `CanvasPseudoWidget`. This is a copy from `SaveController`
	const businessPF_work = this.canvasPseudoWidgets[4].arbitrary.partialFunctionGeomToBusiness;
	let businessExports = [];
	for (const [high, business] of businessPF_work) {
		if (business && isNothing(business.maybeHost)) {
			this.hack(business.openings); // @TODO nasty
			businessExports.push(business.exportToSerializableObject());
		}
	}
	const ser = JSON.stringify(businessExports, null, "\t");

	this.state.history.stack.push(ser); // @TODO loss of information: push reports whether shifting is necessary
};

// @TODO DRY: make a `serialize` method for `CanvasPseudoWidget`. This is a copy from `SaveController`
FigureEditorController.prototype.hack = function (openingWidgetsOrNull) // @TODO should contain the high-level parts, not widgets
{
	// const elemBj_work = this.canvasPseudoWidget_work.arbitrary.bijectionSvgToGeom; // @TODO
	if (openingWidgetsOrNull) {
		openingWidgetsOrNull.map(
			({high: high, low: low}) => { // @TODO should be only the high
				// const low = elemBj_work.getInverse(high); // @TODO
				const transform = low.getAttribute('transform');
				if (transform) {
					high.transform = transform;
				}
			}
		);
	}
};
