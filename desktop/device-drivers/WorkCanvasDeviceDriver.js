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
