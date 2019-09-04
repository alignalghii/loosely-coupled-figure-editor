function FigurePropertyEditorController(state, widgetFactories, figurePropertyEditorDriver, statusBarDriver)
{
	this.state = state;

	this.widgetFactories = widgetFactories; // @TODO widgetFactories has also a drive-like nature
	this.figurePropertyEditorDriver = figurePropertyEditorDriver
	this.statusBarDriver            = statusBarDriver;
}

FigurePropertyEditorController.prototype = Object.create(Controller.prototype);

FigurePropertyEditorController.prototype.constructor = FigurePropertyEditorController;

FigurePropertyEditorController.prototype.editEdge = function (edgeIndex, value)
{
	maybeMap(
		widget => {
			const board = this.widgetFactoryForEitherTarget(['right', widget]).bijectionSvgToGeom;
			const oldValue = getEdgeMeasures(widget.high.vertices)[edgeIndex];
			const areaInvariance = this.state.areaInvariance;
			const [indirect, validValue] = confirm_or_interpolate_realParamOfCommand(
				widget.high,
				board,
				areaInvariance ? (fig, val) => fig.editEdge_areaInvariant(edgeIndex, val)
					       : (fig, val) => fig.editEdge              (edgeIndex, val),
				oldValue,
				value,
				8 + Math.log2(value)
			);
			if (areaInvariance) {
				widget.editEdge_areaInvariant(edgeIndex, validValue);
			} else {
				widget.editEdge              (edgeIndex, validValue);
			}
			this.open(widget);
			this.statusBarDriver.report(indirect ? `Alakzattulajdonság szöveges szerkesztése közvetlenül sikeres: ${widget.domainObject.name} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}` : `Alakzattulajdonság szöveges szerkesztése a kért ${value} értékkel ütközéshez vezetne, ezért interpolációval közelítünk: ${widget.domainObject.name} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}`);
		},
		this.state.maybeWidgetActualOnFigurePropertyEditor
	);
};


FigurePropertyEditorController.prototype.modeOn = function (currentWEPos, eitherTarget)
{
	this.statusBarDriver.report(`Alakzat szerkeszthető tulajdonságai. Kattintási pozíció: ${JSON.stringify(currentWEPos)}. Kattintás ${either(_ => 'üres vászonfelületre', _ => 'widgetre', eitherTarget)}.`);
	either(
		canvas => this.close(),
		widget => this.open(widget),
		eitherTarget
	);
};

FigurePropertyEditorController.prototype.open = function (widget)
{
	this.state.maybeWidgetActualOnFigurePropertyEditor = ['just', widget];

	const vertices = widget.high.vertices;

	const name                 = widget.domainObject.name;
	const n                    = vertices.length;
	const perimeter            = getPerimeter(vertices);
	const area                 = getArea(vertices);
	const edgeAndAngleMeasures = getEdgeAndAngleMeasures(vertices);

	this.figurePropertyEditorDriver.open(name, n, perimeter, area, edgeAndAngleMeasures);
};

FigurePropertyEditorController.prototype.close = function ()
{
	this.state.maybeWidgetActualOnFigurePropertyEditor = ['nothing'];

	const content = this.document.getElementById('figurepropertyeditor_content');
	if (content) content.remove();
};
