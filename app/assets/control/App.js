function App(widgetEventPillar, menuUI)
{
	this.widgetEventPillar = widgetEventPillar;
	this.menuUI            = menuUI;
}

App.prototype.run = function ()
{
	this.populate();

	this.widgetEventPillar.pipeToSM(); // subscribe mouse events on SVG raised up to Widget level
	this.menuUI           .pipeToSM(); // subsribe also for events listened to by GUI widgets
};

App.prototype.populate = function () {this.menuUI.bank.namedFigures.map((namedFig) => this.widgetEventPillar.widgetFactory.create(namedFig.figure));}; // @TODO Law of Demeter
