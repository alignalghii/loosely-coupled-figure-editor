function SaveController(canvasPseudoWidgets, saveIODriver, statusBarODriver, audioODriver)
{
	this.canvasPseudoWidgets = canvasPseudoWidgets;
 	this.saveIODriver        = saveIODriver;
 	this.statusBarODriver    = statusBarODriver;
 	this.audioODriver        = audioODriver;

	this.counter = 0;
}

SaveController.prototype.save = function ()
{
	const canvasPseudoWidget_work = this.canvasPseudoWidgets[4];
	const businessPF_work = canvasPseudoWidget_work.arbitrary.partialFunctionGeomToBusiness;
	let businessExports = [];
	for (const [high, business] of businessPF_work) {
		if (business && isNothing(business.maybeHost)) {
			businessExports.push(business.exportToSerializableObject());
		}
	}
	const ser = JSON.stringify(businessExports, null, "\t");
	const tab = open('', '_blank');
	tab.document.write(`<html><head><meta charset="UTF-8"/><title>Save-${++this.counter}</title></head><body><pre>${ser}</pre></body></html>`);
}
