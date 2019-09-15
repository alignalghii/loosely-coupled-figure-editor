function RoomController(state, roomFactory, statusBarDriver)
{
	this.state           = state;
	this.roomFactory     = roomFactory;
	this.statusBarDriver = statusBarDriver;
}

RoomController.prototype.createSquareByArea = function (area)
{
	if (this.state.spaceFocus) {
		  var squareRoom =   this.roomFactory.createSquareByArea(area, this.state.spaceFocus.position);
		/*var roomWidget =*/ this.state.spaceFocus.widgetFactory.createWidgetFromDomain0(squareRoom);
		this.statusBarDriver.report(`Új négyzetes szoba beszúrva, területe ${area} egység.`);
	} else {
		this.statusBarDriver.report('Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új szobát.');
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
