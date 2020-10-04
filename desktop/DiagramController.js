function DiagramController(workCanvasDeviceDriver, diagramServerDeviceDriver)
{
	this.workCanvasDeviceDriver    = workCanvasDeviceDriver;
	this.diagramServerDeviceDriver = diagramServerDeviceDriver;
}

DiagramController.prototype.sendToCalculate = function (x, y)
{
	this.diagramServerDeviceDriver.send(x, y);
};

DiagramController.prototype.receiveToRefresh = function (updaterName)
{
	this.workCanvasDeviceDriver.updateDOM(updaterName);
};
