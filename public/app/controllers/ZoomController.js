function ZoomController (canvasPseudoWidgets, statusBarODriver) {this.workCanvasPseudoWidget = canvasPseudoWidgets[4];}

ZoomController.prototype.up      = function () {this.modifyScalingFactorAndUpdate(scale => scale*1.1);};
ZoomController.prototype.down    = function () {this.modifyScalingFactorAndUpdate(scale => scale*0.9);};
ZoomController.prototype.default = function () {this.modifyScalingFactorAndUpdate(scale => 10       );};


ZoomController.prototype.modifyScalingFactorAndUpdate = function (scaleFun)
{
	const coordSysTransformer = this.workCanvasPseudoWidget.coordSysTransformer();
	coordSysTransformer.scalingFactor_hl = scaleFun(coordSysTransformer.scalingFactor_hl);
	this.workCanvasPseudoWidget.update();
};
