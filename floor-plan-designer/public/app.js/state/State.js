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

	this.maybeWidgetActualOnFigurePropertyEditor = Maybe.nothing(); // FigurePropertyEditorController

	this.areaInvariance = true;
	this.isRelative     = true;

	this.isAdmin        = false;
	this.isJPEG         = false;

	this.maybeGridSpriteWidget = Maybe.nothing(); // Nasty solution from a type-theorist perspective: `State` module depends typologically on `Grid` and `Sprite` module

	this.history = new History(50);

	this.mouseScopeSVGs = [];
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
