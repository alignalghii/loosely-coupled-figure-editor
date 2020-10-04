function Router(diagramController)
{
	this.diagramController = diagramController;
}



Router.prototype.clickWorkCanvas = function (x, y)
{
	this.diagramController.sendToCalculate(x, y);
};

Router.prototype.loadDiagramUpdater = function (updaterName)
{
	this.diagramController.receiveToRefresh(updaterName);
};
