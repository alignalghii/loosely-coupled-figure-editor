function RoomController(state, roomWidgetFactory, msgConsole)
{
	this.state             = state;
	this.roomWidgetFactory = roomWidgetFactory;
	this.msgConsole        = msgConsole;
}

RoomController.prototype.createSquareByArea = function (area)
{
	if (this.state.spaceFocus) {
		var roomWidget = this.roomWidgetFactory.createSquareByArea(area, this.state.spaceFocus.high);
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
