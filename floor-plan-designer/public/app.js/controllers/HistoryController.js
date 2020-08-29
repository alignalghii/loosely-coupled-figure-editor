/** @TODO
 * - Egy amúgy elviselhető intenzionalitásátmentési hiányosság:
 *   Ha nyitva az űrlap, csak padlóháttért módosítunk, majd visszamengyünk a munkatörténetben, akkor bezárja az űrlapot, pedig a padlómint-változást elvileg felismeri.
 *   Fel is ismeri amúgy, de az első alakalommal még sem ismeri fel (a többinél már igen, nyitva hagyja az űrlapot, így a padlóminta-visszavonás kényelmes, nem kell újranyitni)
 * - Valószínűleg a `this.status.focus` esetében ugyanolyen ,,intenzionális átmentést'' kell végezni az undo-zás konzisztenciája érdekében, mint a `this.status.maybeWidgetActualOnFigurePropertyEditor`-ra.
 * - Csúnya a `HistoryController` függősége a `FigurePropertyEditorDriver`-től. Érdemes lenne kihasználni a `ControllerMixinIntensionalityTransducible` nyújtotta lazacsatolást:
 *   az ott most elavultnak nyilvánított `transduceActualFormWidgetIntensionality` megoldást kellene visszahozni korszerűsített formában.
 */
function HistoryController (state, canvasPseudoWidgets, historyDriver, /*@TODO*/figurePropertyEditorDriver, statusBarDriver)
{
	this.state = state;

	this.stack = state.history.stack; // @TODO
	this.canvasPseudoWidget_work = canvasPseudoWidgets[4]; // @TODO

	this.historyDriver              = historyDriver;
	this.figurePropertyEditorDriver = figurePropertyEditorDriver; // @TODO: reconsider
	this.statusBarDriver            = statusBarDriver;

	this.updateDisablings();
}

Object.assign(HistoryController.prototype, ControllerMixinIntensionalityTransducible);


HistoryController.prototype.updateDisablings = function ()
{
	this.historyDriver.disableUndo(this.stack.isEmpty());
	this.historyDriver.disableRedo(true);
};

HistoryController.prototype.undo = function ()
{
	this.stack.pop().maybe_exec(
		()  => this.statusBarDriver.report('Üres history'), // @TODO statusbarDriver // @TODO should blanche out the history buttons at the terminal points of history
		lastSavedWidgetsRepStr => {
			const maybeActualWidgetOnFormRepStr = this.extensionalizeActualWidgetOnForm();

			this.canvasPseudoWidget_work.clearHostlessWidgets(); // clear: title bug, hackFoolSafeClear: lost floor patterns
			this.load(lastSavedWidgetsRepStr);

			maybeActualWidgetOnFormRepStr.map(
				actualWidgetOnFormRepStr => {
					const maybeLastSavedCorrespondentOfActualWidgetOnForm = this.canvasPseudoWidget_work.hostlessWidgets().maybeFindFirst(
						lastSavedWidget => lastSavedWidget.businessObject && lastSavedWidget.businessObject.serialize && this.versions(
							lastSavedWidget.businessObject.serialize(),
							actualWidgetOnFormRepStr
						)
					);
					maybeLastSavedCorrespondentOfActualWidgetOnForm.maybe_exec(
						() => {
							this.statusBarDriver.report('A visszavonás ellentmondásmentessége érdekében a tulajdonságok űrlapja bezárul');
							this.state.maybeWidgetActualOnFigurePropertyEditor = Maybe.nothing(); // @TODO is it more DRY if we contract it with the .driver.close() ?
							this.figurePropertyEditorDriver.close();
						},
						lastSavedCorrespondentOfActualWidgetOnForm => {
							this.statusBarDriver.report('A visszavonás során a tulajdonságok űrlapját nyitva hagyjuk, mert detektálható az űrlapi alakzat előtörténete');
							this.state.maybeWidgetActualOnFigurePropertyEditor = Maybe.just(lastSavedCorrespondentOfActualWidgetOnForm);
						}
					);
				}
			);
			// @TODO make a similar intensional save/redetect also with `this.state.focus`!
		}
	);
	this.updateDisablings();
};


// @TODO DRY

HistoryController.prototype.load = function (ser)
{
	const interpretationObject = JSON.parse(ser);

	// @TODO DRY OOP
	interpretationObject.map(
		businessSerialization => this.loadBusiness(businessSerialization, nothing)
	);
	//this.reportOK('Natív betöltés sikeres!');
	this.statusBarDriver.report('Natív betöltés');
};


HistoryController.prototype.loadBusiness = function (businessSerialization, maybeHost = nothing)
{
	const business = this.deserialize(businessSerialization, maybeHost);
	business.executeOn(this.canvasPseudoWidget_work);
};

HistoryController.prototype.deserialize = function (businessSerialization, maybeHost)
{
	switch (businessSerialization.type) {
		case 'Room':
			const {title: titleSerialization, figure: roomFigureSerialization, circularSlits: circularSlitsSerialization, escorts: roomEscortsSerialization, openings: openingsSerialization} = businessSerialization;
			const roomFigure = new Figure(roomFigureSerialization.vertices, roomFigureSerialization.svgAttributes);
			const circularSlits = circularSlitsSerialization.map(({center: center, radius: radius}) => new CircularSlit(center, radius)); // @TODO delegate to CircularSlit

			// @TODO define a high-order function for circular object creation. `title` host and `escort` host are circular. `openings` are not circular (as of now)

			const title = new Title(null, titleSerialization.name, titleSerialization.position);
			const room = new Room(title, roomFigure, [], maybeHost, circularSlits, []); // `escorts` and `openings` are temporarily `[]`
			const openings = openingsSerialization.map(openingSerialization => this.deserializeOpeningBy(openingSerialization, room));
			room.title = title;
			room.openings = openings;

			const roomEscorts = roomEscortsSerialization.map(
				escortSerialization => this.deserialize(escortSerialization, just(room))
			);
			room.escorts = roomEscorts;
			return room;
		case 'Furniture':
			const {figure: furnitureFigureSerialization, name: furnitureName, imageFileName: imageFileName} = businessSerialization;
			const furnitureFigure = new Figure(furnitureFigureSerialization.vertices, furnitureFigureSerialization.svgAttributes);
			return new Furniture(furnitureName, furnitureFigure, imageFileName, [], maybeHost); // @TODO a furniture be able to have further escorts, here shortcut to []
		default: throw 'Error';
	}
};

HistoryController.prototype.deserializeOpeningBy = function (openingSerialization, room)
{
	const {size: size, position: position, attachmentBackRefing: attachmentBackRefing, transform: transform} = openingSerialization;
	let opening;
	switch (openingSerialization.type) {
		case 'Window': opening = new Window(openingSerialization.size, openingSerialization.position); break;
		case 'Door'  : opening = new Door  (openingSerialization.size, openingSerialization.position); break;
		default      : throw `Unknow opening type ${openingSerialization.type}`;
	}

	if (attachmentBackRefing && attachmentBackRefing.own) {
		const {center: center, radius: radius} = attachmentBackRefing.own;
		const newSlit = new CircularSlit(center, radius);
		const oldSlit = room.slitsRepresentationCircular.circularSlits.find(
			slit => slit.ccEq(newSlit)
		);
		if (!oldSlit) throw 'Error';
		opening.attachmentBackRefing = new Bijection;
		opening.attachmentBackRefing.set(room, oldSlit);
	}

	if (transform) {
		opening.transform = transform;
	}

	return opening;
};
