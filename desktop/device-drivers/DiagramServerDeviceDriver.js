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
