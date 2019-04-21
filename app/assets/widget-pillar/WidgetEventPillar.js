function WidgetEventPillar (widgetFactory, stateMachineInterface)
{
	this.widgetFactory = widgetFactory;
	this.stateMachine = stateMachineInterface;
}

WidgetEventPillar.prototype.pipeToSM = function ()
{
	['mousedown', 'mousemove', 'mouseup'].map((eventType) => this.mergeAndPipeSubsribe(eventType));
};

// In case of moucemove, the emptyCase probably never occurs due to dragging (maybe if very quick)

WidgetEventPillar.prototype.mergeAndPipeSubsribe = function (eventType)
{
	this.mergelessSubscribe(eventType,
		(currentWEPos)                => this.stateMachine.transition(eventType, [          'WEPos'], {                             currentWEPos:currentWEPos}),
		(currentWidget, currentWEPos) => this.stateMachine.transition(eventType, ['Widget', 'WEPos'], {currentWidget:currentWidget, currentWEPos:currentWEPos})
	);
};

WidgetEventPillar.prototype.mergelessSubscribe = function (eventTypeName, emptyCase, widgetCase) // @TODO a `return` valószínűleg fölösleges itt is, és a hivatkozott svgLowLevel.subscribe-on is
{
	var widgetFactory = this.widgetFactory;
	function svgEmptyCase(svgPosition)
	{
		var widgetEventPosition  = widgetFactory.createWidgetEventPositionFromLow(svgPosition);
		return emptyCase(widgetEventPosition);
	}
	function svgPolygonCase(svgPolygon, svgPosition)
	{
		var widget               = widgetFactory.createWidgetFromLow             (svgPolygon );
		var widgetEventPosition  = widgetFactory.createWidgetEventPositionFromLow(svgPosition);
		return widgetCase(widget, widgetEventPosition);
	}
	this.widgetFactory.svgLowLevel.subscribe(eventTypeName, svgEmptyCase, svgPolygonCase); // @TODO Demeter principle
};