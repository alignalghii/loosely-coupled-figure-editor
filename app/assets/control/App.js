function App(widgetEventPillar, stampUI, modeUI, operationUI, keyboardUI)
{
	this.widgetEventPillar = widgetEventPillar;
	this.stampUI           = stampUI;
	this.modeUI            = modeUI;
	this.operationUI       = operationUI;
	this.keyboardUI        = keyboardUI;
}

App.prototype.run = function ()
{
	this.populate();

	this.widgetEventPillar.pipeToSM(); // subscribe mouse events on SVG raised up to Widget level
	this.stampUI          .pipeToSM(); // subsribe also for events listened to by GUI widgets
	this.modeUI           .pipeToSM();
	this.operationUI      .pipeToSM();
	this.keyboardUI       .pipeToSM();
};

App.prototype.populate = function () {this.stampUI.bank.namedFigures.map((namedFig) => this.widgetEventPillar.widgetFactory.create(namedFig.figure));}; // @TODO Law of Demeter
