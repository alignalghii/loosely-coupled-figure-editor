window.addEventListener('load',  injectDependencies);

function injectDependencies(e)
{
	const workCanvas = document.getElementById('work-image'); // @TODO DRY

	const workCanvasDeviceDriver    = new WorkCanvasDeviceDriver(workCanvas);
	const diagramServerDeviceDriver = new DiagramServerDeviceDriver(); // @TODO let it be local?

	const diagramController = new DiagramController(workCanvasDeviceDriver, diagramServerDeviceDriver);

	const router = new Router(diagramController);
	workCanvasDeviceDriver.attach(router);
	diagramServerDeviceDriver.attach(router);
}
