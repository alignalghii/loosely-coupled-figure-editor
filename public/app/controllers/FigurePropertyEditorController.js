function FigurePropertyEditorController(state, canvasPseudoWidgets, figurePropertyEditorDriver, statusBarDriver)
{
	this.state = state;

	this.canvasPseudoWidgets = canvasPseudoWidgets; // @TODO canvasPseudoWidgets has also a drive-like nature
	this.figurePropertyEditorDriver = figurePropertyEditorDriver
	this.statusBarDriver            = statusBarDriver;
}

FigurePropertyEditorController.prototype = Object.create(Controller.prototype);

FigurePropertyEditorController.prototype.constructor = FigurePropertyEditorController;

FigurePropertyEditorController.prototype.editEdge = function (edgeIndex, value)
{
	maybeMap(
		widget => {
			const board = this.canvasPseudoWidgetForEitherTarget(['right', widget]).board(); // @TODO make a `canvasPseudoWidgetForWidget` method in ancestor `Controller`
			const oldValue = getEdgeMeasures(widget.high.vertices)[edgeIndex];
			const areaInvariance = this.state.areaInvariance;
			const [indirect, validValue] = confirm_or_interpolate_realParamOfCommand(
				widget.high,
				board,
				areaInvariance ? (fig, val) => fig.editEdge_areaInvariant(edgeIndex, val)
					       : (fig, val) => fig.editEdge              (edgeIndex, val),
				oldValue,
				value,
				8 + Math.log2(value) // @TODO is this a heuristic?
			);
			if (areaInvariance) {
				widget.editEdge_areaInvariant(edgeIndex, validValue);
			} else {
				widget.editEdge              (edgeIndex, validValue);
			}
			this.open(widget);
			this.statusBarDriver.report(indirect ? `Alakzattulajdonság szöveges szerkesztése közvetlenül sikeres: ${widget.businessObject.queryName()} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}` : `Alakzattulajdonság szöveges szerkesztése a kért ${value} értékkel ütközéshez vezetne, ezért interpolációval közelítünk: ${widget.businessObject.queryName()} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}`);
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
	const widget_ =	this.widgetDirectlyOrViaTitle(widget);
	widget_.beDescribedOnOpeningForm(this);
};

FigurePropertyEditorController.prototype.openDriverWithCalculations = function (name, vertices, furnitureNames, svgAttributes) // @TODO most of its body belong to math or model, not to controller @TODO editable furniture
{
	const n                    = vertices.length;
	const perimeter            = getPerimeter(vertices);
	const area                 = getArea(vertices);
	const edgeAndAngleMeasures = getEdgeAndAngleMeasures(vertices);
	this.figurePropertyEditorDriver.open(name, n, perimeter, area, edgeAndAngleMeasures, furnitureNames, svgAttributes);
};


FigurePropertyEditorController.prototype.close = function ()
{
	this.state.maybeWidgetActualOnFigurePropertyEditor = ['nothing'];
	this.figurePropertyEditorDriver.close();
};

/*FigurePropertyEditorController.prototype.widgetDirectlyOrViaTitle = function (widget)
{
	return maybe_exec(
		()  => {
			const widgetFactory = this.canvasPseudoWidgetForEitherTarget(['right', widget]); // @TODO code smell. Should exist both widgetFactoryForCanvas and widgetFactoryForWidget
			const room = widget.high.host; // @TODO what if host is not a room
			this.statusBarDriver.report(`Szoba címére kattintottál (&bdquo;${room.title.name}&rdquo;), a hozzátartozó szobát veszem. Magát a címet sajnos egyelőre csak a tulajdonság szerkesztáben szerkesztheted át, itt helyben közvetlenül még nem 😞💣🗲🌧💧`);
			return widgetFactory.createFigureWidgetFromMedium(room.figure);
		},
		domainObject => {
			if (!widget.high.vertices || !domainObject.title.name) throw 'Tervezési hiba!'; // @TODO: hogy a legjobb? Lekezelni? Kivételt dobni? Loggolni? Áttervezni? Milyen mély a tervezési probléma?
			this.statusBarDriver.report('Közvetlenül magára a szobára kattintottál, minden világos.');
			return widget;
		},
		widget.maybeDomainObject
	);
};*/

FigurePropertyEditorController.prototype.changeDasharray = function (attrName, attrValue)
{
	maybeMap(
		widget => {
			if (attrValue) {
				widget.addSvgAttribute(attrName, attrValue); // @TODO should appear on an abstracter level of the widget
				this.statusBarDriver.report(`Alkalmaz &mdash; ${attrName}: ${attrValue}`);
			} else {
				delete widget.removeSvgAttribute(attrName); // @TODO should appear on an abstracter level of the widget
				this.statusBarDriver.report(`Visszavon &mdash; ${attrName}`);
			}
			//this.open(widget);
			this.statusBarDriver.report(`Falréstulajdonság szöveges szerkesztése közvetlenül sikeres`);
		},
		this.state.maybeWidgetActualOnFigurePropertyEditor
	);
};
