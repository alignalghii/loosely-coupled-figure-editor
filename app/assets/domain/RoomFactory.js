// Using Factory pattern because multiple constructor are appropriate

function RoomFactory() {}

RoomFactory.prototype.createGeneral = function (figure)
{
	var roomType = 'living'; // @TODO should come from database

	// @TODO should depend on `roomType`
	var openings = [
		/*0th wall*/ [],
		/*1st wall*/ [{type:'window', wallRatio:0.1}, {type:'door', wallRatio:0.6}],
		/*2nd wall*/ [{type:'hole', wallRatio:0.4}],
		/*3rd wall*/ []
	];

	var generalSizes = {window:0.1, door:0.1, hole:0.1};

	var furniture = [];

	return new Room(roomType, figure, openings, generalSizes, furniture);
};
