// Using Factory pattern because multiple constructor are appropriate

function RoomFactory() {}

RoomFactory.prototype.sampleRoomBank = function () { return {
	selected: 1,
	namedRooms: [
		{name: 'Piros háromszög' , room: this.createGeneral((new Figure([[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red'    })).translation([ -6  ,  5  ]))},
		{name: 'Kék négyzet'     , room: this.createGeneral((new Figure([[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'   })).translation([ -8  , -4  ]))},
		{name: 'Bíbor konvex 1'  , room: this.createGeneral((new Figure(poly1_convex_ccw,                         {fill: 'magenta'})).translation([-18  ,  0  ]))},
		{name: 'Zöld konkáv 1'   , room: this.createGeneral((new Figure(poly1_concave_ccw,                        {fill: 'green'  })).translation([  8  , -7  ]))},
		{name: 'Fekete konvex 2' , room: this.createGeneral((new Figure(poly2_convex_ccw,                         {fill: 'black'  })).translation([  0  , -4  ]))},
		{name: 'Szürke elfajult' , room: this.createGeneral((new Figure(poly2_degen_ccw,                          {fill: 'gray'   })).translation([ -2.3, -0.7]))},
		{name: 'Narancs konkáv 2', room: this.createGeneral((new Figure(poly2_concave_ccw,                        {fill: 'orange' })).translation([ -4  ,  2.6]))}
	]
};}


RoomFactory.prototype.createGeneral = function (figure)
{
	var roomType = 'Konyha'; // @TODO should come from database

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
	//console.log(r);
	//return r;
};

RoomFactory.prototype.createSquareByArea = function (area, [x, y])
{
	var a = Math.sqrt(area);
	var square = [[x-a/2, y-a/2], [x+a/2, y-a/2], [x+a/2, y+a/2], [x-a/2, y+a/2]];
	var squareFigure = new Figure(square, {fill:'white'});
	return this.createGeneral(squareFigure);
};
