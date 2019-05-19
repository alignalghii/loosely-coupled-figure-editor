function App(widgetEventPillar, roomStampUI, modeUI, operationUI, keyboardUI)
{
	this.widgetEventPillar = widgetEventPillar;
	this.roomStampUI       = roomStampUI;
	this.modeUI            = modeUI;
	this.operationUI       = operationUI;
	this.keyboardUI        = keyboardUI;
}

App.prototype.run = function ()
{
	this.populate();

	this.widgetEventPillar.pipeToSM(); // subscribe mouse events on SVG raised up to Widget level
	this.roomStampUI      .pipeToSM(); // subsribe also for events listened to by GUI widgets
	this.modeUI           .pipeToSM();
	this.operationUI      .pipeToSM();
	this.keyboardUI       .pipeToSM();
};

App.prototype.populate = function () {this.roomStampUI.roomBank.namedRooms.map((namedRoom) => this.widgetEventPillar.widgetFactory.createWidgetFromDomain1(namedRoom.room));}; // @TODO Law of Demeter
