function RoomController(state, roomFactory, widgetFactory, msgConsole)
{
	this.state             = state;
	this.roomFactory       = roomFactory;
	this.widgetFactory     = widgetFactory;
	this.msgConsole        = msgConsole;
}

RoomController.prototype.createSquareByArea = function (area)
{
	if (this.state.spaceFocus) {
		  var squareRoom =   this.roomFactory.createSquareByArea(area, this.state.spaceFocus);
		/*var roomWidget =*/ this.widgetFactory.createWidgetFromDomain0(squareRoom);
		this.msgConsole.innerHTML = 'Új négyzetes szoba beszúrva, területe ' + area + ' egység.';
	} else {
		this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új szobát.';
	}
};

RoomController.prototype.focusOpenHole = function()
{
	var widget = this.state.focus;
	if (widget) {
	}
};
RoomController.prototype.focusCloseHole = function()
{
	if (this.state.focus) {
	}
};
