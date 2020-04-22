function ContextMenuController(state, contextMenuDriver)
{
	this.state             = state;
	this.contextMenuDriver = contextMenuDriver;
	this.modeLegacy        = state.mode; // @TODO reconsider: would `maybeModeLegacy` be better in constructor? But `modeLegacy = state.mode` can be justfied in constructor if an open context menu is default somehow
}

// Interface (API) methods:

ContextMenuController.prototype.rightClick= function (event, eitherTarget)
{
	event.preventDefault(); // @TODO consider: usually ContextMnuDriver should do this, thus, a low-level code part. But we want to leave open the possibility to selectively allow default for e.g.empty canvas rightclicks. Thus we raise this code part to the rather high level: we raise it to the level of the controller!
	either( // @TODO use the more modern Either class
		canvas => this.close(),
		widget => this.reopen(event, widget),
		eitherTarget
	);
};

ContextMenuController.prototype.select = function (contextAction) {this.state.mode = ContextMenu.associatedStateMode(this.state.isRelative)(contextAction);};


// Auxiliary (inner) methods:

ContextMenuController.prototype.reopen = function (event, widget)
{
	this.contextMenuDriver.adaptTo(event);
	this.contextMenuDriver.refillContent(widget.contextMenu());
	this.modeLegacy = this.state.mode;
};

ContextMenuController.prototype.close = function ()
{
	this.contextMenuDriver.toggleMenu('hide');
	this.state.mode = this.modeLegacy;
};
