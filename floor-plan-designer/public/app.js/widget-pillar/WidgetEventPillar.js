/** @TODO: This is something very similar to what the `devices/*Device.js` (`textual-widgets/*UI.js`) modules do.
 * Should be renamed and moved to `devices/Canvas(ses)Device`?
 */

function WidgetEventPillar (canvasPseudoWidgets, routerInterface)
{
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.router = routerInterface;
}

WidgetEventPillar.prototype.pipeToSM = function ()
{
	['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'dblclick'].map(eventType => this.mergeAndPipeSubsribe(eventType));
};

// In case of moucemove, the emptyCase probably never occurs due to dragging (maybe if very quick)

WidgetEventPillar.prototype.mergeAndPipeSubsribe = function (eventType)
{
	this.mergelessSubscribe(eventType,
		(canvas       , currentWEPos, mouseButton, event) => this.router.dispatch(eventType, ['Canvas', 'WEPos'], {eitherTarget: ['left' , canvas       ], currentWEPos: currentWEPos, mouseButton: mouseButton}, event), // @TODO: use `Either`
		(currentWidget, currentWEPos, mouseButton, event) => this.router.dispatch(eventType, ['Widget', 'WEPos'], {eitherTarget: ['right', currentWidget], currentWEPos: currentWEPos, mouseButton: mouseButton}, event)  // @TODO: use `Either`
	);
};

WidgetEventPillar.prototype.mergelessSubscribe = function (eventTypeName, emptyCase, widgetCase)
{
	for (let canvasPseudoWidget of this.canvasPseudoWidgets) {
		canvasPseudoWidget.arbitrary.mergelessSubscribe(eventTypeName, emptyCase, widgetCase); // @TODO very rude arbitrarinesss. The abstract ancestor's method is called!
	}
};
