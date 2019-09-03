function State(toBeDomainStamp)
{
	this.mode = 'normal';
	this.focus = null;
	this.spaceFocus = null;

	this.setDomainStampFrom(toBeDomainStamp);
	this.forgetDrag();

	// @TODO: should not use this same `State` as `NormalModeController`, move them from here into separate in future:
	this.editorMoveFlag       = false      ; // FigureEditorController
	this.maybeRotationArcSpan = ['nothing']; // GeomTransformationController
	this.maybeScaleStressSpan = ['nothing']; // GeomTransformationController

	this.mbFigurePropertyEditorForm = ['nothing']; // FigurePropertyEditorController // @TODO: rename to ...widget
	this.areaInvariance = true;
}

State.prototype.setDomainStampFrom = function (domainObject) /** MenuUI */
{
	var domainStamp = domainObject.copy();
	domainStamp.figure.doCentering();
	this.domainStamp = domainStamp;
};

State.prototype.forgetDrag = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

State.prototype.prevWidgetHasNotCollidedYet = function () {return this.prevWidget && !this.hasCollided;};
