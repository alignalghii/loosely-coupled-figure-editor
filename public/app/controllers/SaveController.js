function SaveController(canvasPseudoWidgets, saveIODriver, statusBarODriver, audioODriver)
{
	this.canvasPseudoWidgets = canvasPseudoWidgets;
 	this.saveIODriver        = saveIODriver;
 	this.statusBarODriver    = statusBarODriver;
 	this.audioODriver        = audioODriver;

	this.counter = 0;

	this.canvasPseudoWidget_work = this.canvasPseudoWidgets[4]; // @TODO
}

SaveController.prototype.save = function ()
{
	const businessPF_work = this.canvasPseudoWidget_work.arbitrary.partialFunctionGeomToBusiness;
	let businessExports = [];
	for (const [high, business] of businessPF_work) {
		if (business && isNothing(business.maybeHost)) {
			this.hack(business.openings); // @TODO nasty
			businessExports.push(business.exportToSerializableObject());
		}
	}
	const ser = JSON.stringify(businessExports, null, "\t");
	const tab = open('', '_blank');
	tab.document.write(`<html><head><meta charset="UTF-8"/><title>Save-${++this.counter}</title></head><body><pre>${ser}</pre></body></html>`);
}

SaveController.prototype.hack = function (openingWidgetsOrNull) // @TODO should contain the high-level parts, not widgets
{
	// const elemBj_work = this.canvasPseudoWidget_work.arbitrary.bijectionSvgToGeom; // @TODO
	if (openingWidgetsOrNull) {
		openingWidgetsOrNull.map(
			({high: high, low: low}) => { // @TODO should be only the high
				// const low = elemBj_work.getInverse(high); // @TODO
				const transform = low.getAttribute('transform');
				if (transform) {
					high.transform = transform;
				}
			}
		);
	}
};
