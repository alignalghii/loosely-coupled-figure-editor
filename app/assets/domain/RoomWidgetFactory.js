// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection

function RoomWidgetFactory(roomFactory, widgetFactory, injectionRoomToGeom)
{
	this.roomFactory   = roomFactory;
	this.widgetFactory = widgetFactory;
	this.injectionRoomToGeom = injectionRoomToGeom;
	// room ...
}

RoomWidgetFactory.prototype.createWidgetForRoom = function (room)
{
	var high = highTemplate.translation([0, 0]);
	var low  = this.widgetFactory.create();
	return new RoomWidget(high2, high.produceLow());
};

RoomWidgetFactory.prototype.createSquareByArea = function (area, [x, y])
{
	var a = Math.sqrt(area);
	var square = [[x-a/2, y-a/2], [x+a/2, y-a/2], [x+a/2, y+a/2], [x-a/2, y+a/2]];
	var templateFigure = new Figure(square, {fill:'white'});
	var widget = this.widgetFactory.create(templateFigure); // @TODO `widgetFactory.create` does not return anything yet
	// @TODO also `room` should be bijectioned, not only widget high and low
	var room = this.roomFactory.createGeneral(widget.high);
	this.injectionRoomToGeom.set(room, widget.high);
	return new RoomWidget(room, widget);
};
