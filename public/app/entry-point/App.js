function App(router, widgetEventPillar, roomStampDriver, modeDriver, operationDriver, keyboardDriver, figurePropertyEditorDriver, configDriver)
{
	this.router = router;

	this.widgetEventPillar          = widgetEventPillar;
	this.roomStampDriver            = roomStampDriver;
	this.modeDriver                 = modeDriver;
	this.operationDriver            = operationDriver;
	this.keyboardDriver             = keyboardDriver;
	this.figurePropertyEditorDriver = figurePropertyEditorDriver;
	this.configDriver               = configDriver;
}

App.prototype.run = function ()
{
	this.populate(0);

	const dispatch = (eventType, signature, ird) => this.router.dispatch(eventType, signature, ird); // @TODO depends too much on Router interface
	this.widgetEventPillar         .pipeToSM(dispatch); // subscribe mouse events on SVG raised up to Widget level
	this.roomStampDriver           .pipeToSM(dispatch); // subsribe also for events listened to by GUI widgets
	this.modeDriver                .pipeToSM(dispatch);
	this.operationDriver           .pipeToSM(dispatch);
	this.keyboardDriver            .pipeToSM(dispatch);
	this.figurePropertyEditorDriver.pipeToSM(dispatch);
	this.configDriver              .pipeToSM(dispatch);
};

App.prototype.populate = function (i)
{
	this.roomStampDriver.roomBank.namedRooms.map((namedRoom) => this.widgetEventPillar.widgetFactories[i].createFigureWidgetFromDomain1(namedRoom.room));// @TODO Law of Demeter

	// @TODO: title-less domain objects make the app fail!
	/*var massPoint1Factory = new MassPoint1Factory;
	var massPoint2Factory = new MassPoint2Factory;
	this.widgetEventPillar.widgetFactories[i].createFigureWidgetFromDomain1(massPoint1Factory.testMassPoint1('red' , [ 8,  4]));
	this.widgetEventPillar.widgetFactories[i].createFigureWidgetFromDomain1(massPoint2Factory.testMassPoint2('blue', [10, -6]));*/
};
