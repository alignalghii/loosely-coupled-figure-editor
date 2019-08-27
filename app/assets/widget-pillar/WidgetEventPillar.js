function WidgetEventPillar (widgetFactories, routerInterface)
{
	this.widgetFactories = widgetFactories;
	this.router = routerInterface;
}

WidgetEventPillar.prototype.pipeToSM = function ()
{
	['mousedown', 'mousemove', 'mouseup'].map((eventType) => this.mergeAndPipeSubsribe(eventType));
};

// In case of moucemove, the emptyCase probably never occurs due to dragging (maybe if very quick)

WidgetEventPillar.prototype.mergeAndPipeSubsribe = function (eventType)
{
	this.mergelessSubscribe(eventType,
		(canvas       , currentWEPos) => this.router.dispatch(eventType, ['Canvas', 'WEPos'], {eitherTarget: ['left' , canvas       ], currentWEPos: currentWEPos}), // @TODO: use `Either`
		(currentWidget, currentWEPos) => this.router.dispatch(eventType, ['Widget', 'WEPos'], {eitherTarget: ['right', currentWidget], currentWEPos: currentWEPos})  // @TODO: use `Either`
	);
};

WidgetEventPillar.prototype.mergelessSubscribe = function (eventTypeName, emptyCase, widgetCase)
{
	for (let widgetFactory of this.widgetFactories) {
		widgetFactory.mergelessSubscribe(eventTypeName, emptyCase, widgetCase);
	}
};
