function ZoomController (canvasPseudoWidgets, statusBarODriver) {this.workCanvasPseudoWidget = canvasPseudoWidgets[4];}

ZoomController.prototype.up      = function () {this.modifyScalingFactorAndUpdate(scale => scale*1.1);};
ZoomController.prototype.down    = function () {this.modifyScalingFactorAndUpdate(scale => scale*0.9);};
ZoomController.prototype.default = function () {this.modifyScalingFactorAndUpdate(scale => 20       );}; // @TODO magic number as code smell


ZoomController.prototype.modifyScalingFactorAndUpdate = function (scaleFun)
{
	const coordSysTransformer = this.workCanvasPseudoWidget.coordSysTransformer();
	const q = scaleFun(coordSysTransformer.scalingFactor_hl) / coordSysTransformer.scalingFactor_hl;
	coordSysTransformer.scalingFactor_hl = scaleFun(coordSysTransformer.scalingFactor_hl);
	this.workCanvasPseudoWidget.reproportionateDashAttributes(q);
	this.workCanvasPseudoWidget.update();
};
