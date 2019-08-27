function RoomController(state, roomFactory, msgConsole)
{
	this.state             = state;
	this.roomFactory       = roomFactory;
	this.msgConsole        = msgConsole;
}

RoomController.prototype.createSquareByArea = function (area)
{
	if (this.state.spaceFocus) {
		  var squareRoom =   this.roomFactory.createSquareByArea(area, this.state.spaceFocus.position);
		/*var roomWidget =*/ this.state.spaceFocus.widgetFactory.createWidgetFromDomain0(squareRoom);
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
