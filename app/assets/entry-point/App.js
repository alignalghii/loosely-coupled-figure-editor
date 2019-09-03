function App(widgetEventPillar, roomStampUI, modeUI, operationUI, keyboardUI, figurePropertyEditorUI)
{
	this.widgetEventPillar = widgetEventPillar;
	this.roomStampUI       = roomStampUI;
	this.modeUI            = modeUI;
	this.operationUI       = operationUI;
	this.keyboardUI        = keyboardUI;
	this.figurePropertyEditorUI = figurePropertyEditorUI;
}

App.prototype.run = function ()
{
	this.populate(0);

	this.widgetEventPillar.pipeToSM(); // subscribe mouse events on SVG raised up to Widget level
	this.roomStampUI      .pipeToSM(); // subsribe also for events listened to by GUI widgets
	this.modeUI           .pipeToSM();
	this.operationUI      .pipeToSM();
	this.keyboardUI       .pipeToSM();
	this.figurePropertyEditorUI.pipeToSM();
};

App.prototype.populate = function (i)
{
	this.roomStampUI.roomBank.namedRooms.map((namedRoom) => this.widgetEventPillar.widgetFactories[i].createWidgetFromDomain1(namedRoom.room));// @TODO Law of Demeter
	var massPoint1Factory = new MassPoint1Factory;
	var massPoint2Factory = new MassPoint2Factory;
	this.widgetEventPillar.widgetFactories[i].createWidgetFromDomain1(massPoint1Factory.testMassPoint1('red' , [ 8,  4]));
	this.widgetEventPillar.widgetFactories[i].createWidgetFromDomain1(massPoint2Factory.testMassPoint2('blue', [10, -6]));
};
