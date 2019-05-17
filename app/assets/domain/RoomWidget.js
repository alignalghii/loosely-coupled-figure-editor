// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection

function RoomWidget(room, widget) // `room.figure` and `widget` must be already registered in `bijectionUp`, `RoomWidget` does not register them
{
	this.room   = room;
	this.widget = widget;
}

RoomWidget.updateDownward = function()
{
};
