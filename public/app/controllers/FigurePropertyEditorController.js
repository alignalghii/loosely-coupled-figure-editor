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
			this.statusBarDriver.report(indirect ? `Alakzattulajdonság szöveges szerkesztése közvetlenül sikeres: ${fromJust(widget.maybeDomainObject).title.name} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}` : `Alakzattulajdonság szöveges szerkesztése a kért ${value} értékkel ütközéshez vezetne, ezért interpolációval közelítünk: ${fromJust(widget.maybeDomainObject).title.name} alakzat ${this.figurePropertyEditorDriver.edgeNames[edgeIndex]} éle ${oldValue} -> ${validValue}`);
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

	const vertices = widget_.high.vertices;
	const [name, furnitureNames] = maybe(
		'<<<Bútor>>>',  // @TODO a bútor esetét le kell kezelni
		domainObject => [domainObject.title.name, domainObject.furniture.map(chair => chair.title.name)], // @TODO bútornak a végső változatban nincs címe (kivétel: galéria)
		widget_.maybeDomainObject
	);
	this.openDriverWithCalculations(name, vertices, furnitureNames); // @TODO furniture shouldbe partly editable from the form directly

	this.state.maybeWidgetActualOnFigurePropertyEditor = ['just', widget_];
};

FigurePropertyEditorController.prototype.openDriverWithCalculations = function (name, vertices, furnitureNames) // @TODO most of its body belong to math or model, not to controller @TODO editable furniture
{
	const n                    = vertices.length;
	const perimeter            = getPerimeter(vertices);
	const area                 = getArea(vertices);
	const edgeAndAngleMeasures = getEdgeAndAngleMeasures(vertices);
	this.figurePropertyEditorDriver.open(name, n, perimeter, area, edgeAndAngleMeasures, furnitureNames);
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
			const widgetFactory = this.widgetFactoryForEitherTarget(['right', widget]); // @TODO code smell. Should exist both widgetFactoryForCanvas and widgetFactoryForWidget
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
