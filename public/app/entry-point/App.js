function App(router, widgetEventPillar, roomStampDriver, modeDriver, operationDriver, keyboardDriver, figurePropertyEditorDriver, configDriver, tabSelectorDriver)
{
	this.router = router;

	this.widgetEventPillar          = widgetEventPillar;
	this.roomStampDriver            = roomStampDriver;
	this.modeDriver                 = modeDriver;
	this.operationDriver            = operationDriver;
	this.keyboardDriver             = keyboardDriver;
	this.figurePropertyEditorDriver = figurePropertyEditorDriver;
	this.configDriver               = configDriver;
	this.tabSelectorDriver          = tabSelectorDriver;
}

App.prototype.run = function ()
{
	this.populate();

	const dispatch = (eventType, signature, ird) => this.router.dispatch(eventType, signature, ird); // @TODO depends too much on Router interface
	this.widgetEventPillar         .pipeToSM(dispatch); // subscribe mouse events on SVG raised up to Widget level
	this.roomStampDriver           .pipeToSM(dispatch); // subsribe also for events listened to by GUI widgets
	this.modeDriver                .pipeToSM(dispatch);
	this.operationDriver           .pipeToSM(dispatch);
	this.keyboardDriver            .pipeToSM(dispatch);
	this.figurePropertyEditorDriver.pipeToSM(dispatch);
	this.configDriver              .pipeToSM(dispatch);
	this.tabSelectorDriver         .pipeToSM(dispatch);
};

App.prototype.populate = function ()
{
	this.roomStampDriver.roomBank.namedRooms.map(
		namedRoom => {
			const i = this.tabOrder(namedRoom.tab);
			return this.widgetEventPillar.canvasPseudoWidgets[i].figureWidgetFactory.createFromBusiness1(namedRoom.room); // @TODO Law of Demeter @TODO arbitrariness
		}
	);

	//this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Vécé', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Toilet-pictogram.png', [10, 10], [4, -8]);

	// @TODO: title-less domain objects make the app fail!
	/*var massPoint1Factory = new MassPoint1Factory;
	var massPoint2Factory = new MassPoint2Factory;
	this.widgetEventPillar.canvasPseudoWidgets[i].createFigureWidgetFromDomain1(massPoint1Factory.testMassPoint1('red' , [ 8,  4]));
	this.widgetEventPillar.canvasPseudoWidgets[i].createFigureWidgetFromDomain1(massPoint2Factory.testMassPoint2('blue', [10, -6]));*/
};

App.prototype.tabOrder = function (tabName)
{
	const i = this.tabSelectorDriver.names.indexOf(tabName);
	if (i >= 0) {
		return i;
	} else {
		throw `Invalid tabName [${tabName}] in populating pool`;
	}
};
