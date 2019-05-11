function State(toBeStampFigure)
{
	this.mode = 'normal';
	this.focus = null;
	this.spaceFocus = null;

	this.setStampFigureFrom(toBeStampFigure);
	this.forgetDrag();
}

State.prototype.setStampFigureFrom = function (figure) {this.stampFigure = figure.centering();}; /** MenuUI */

State.prototype.forgetDrag = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

State.prototype.prevWidgetHasNotCollidedYet = function () {return this.prevWidget && !this.hasCollided;};
