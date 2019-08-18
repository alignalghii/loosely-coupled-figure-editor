function State(toBeDomainStamp)
{
	this.mode = 'normal';
	this.focus = null;
	this.spaceFocus = null;

	this.setDomainStampFrom(toBeDomainStamp);
	this.forgetDrag();

	this.editorMoveFlag = false;
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
