window.addEventListener('load',  injectDependencies);

function injectDependencies(e)
{
	const workCanvas = document.getElementById('work-svg'); // @TODO DRY

	const workCanvasDeviceDriver    = new WorkCanvasDeviceDriver(workCanvas);
	const diagramServerDeviceDriver = new DiagramServerDeviceDriver(); // @TODO let it be local?

	const diagramController = new DiagramController(workCanvasDeviceDriver, diagramServerDeviceDriver);

	const router = new Router(diagramController);
	workCanvasDeviceDriver.attach(router);
	diagramServerDeviceDriver.attach(router);
}




function WorkCanvasDeviceDriver(workCanvas)
{
	this.workCanvas = workCanvas;
}

WorkCanvasDeviceDriver.prototype.attach = function (router)
{
	this.workCanvas.addEventListener(
		'click',
		event => router.clickWorkCanvas(event.clientX, event.clientY)
	);
};

WorkCanvasDeviceDriver.prototype.updateDOM = function (name)
{
	this.workCanvas.setAttribute('src', `work.svg?case=${name}`); // @credit to https://instructobit.com/tutorial/119/Force-an-image-to-reload-and-refresh-using-Javascript
};



function DiagramServerDeviceDriver()
{
	this.maybeRouter = Maybe.nothing();
}

DiagramServerDeviceDriver.prototype.attach = function (router)
{
	this.maybeRouter = Maybe.just(router);
};


DiagramServerDeviceDriver.prototype.send = function (x, y)
{
	const xhr = new XMLHttpRequest(); // @credit reconsoder https://stackoverflow.com/questions/11502244/reuse-xmlhttprequest-object-or-create-a-new-one
	//xhr.responseType = 'json';
	this.maybeRouter.map(
		router => xhr.addEventListener('load', e => router.loadDiagramUpdater(e.target.responseText))
	);
	xhr.open('POST', '/');
	xhr.send(
		JSON.stringify({x, y})
	);
};


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
