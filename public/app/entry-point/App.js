function App(router, widgetEventPillar, roomStampDriver, modeDriver, operationDriver, keyboardDriver, figurePropertyEditorDriver, configDriver, tabSelectorDriver, loaderDriver, zoomDriver)
{
	this.router = router;

	this.widgetEventPillar          = widgetEventPillar;
	this.roomStampDriver            = roomStampDriver;
	this.modeDriver                 = modeDriver;
	this.operationDriver            = operationDriver;
	this.keyboardDriver             = keyboardDriver;
	this.figurePropertyEditorDriver = figurePropertyEditorDriver;
	this.configDriver               = configDriver;
	this.tabSelectorDriver          = tabSelectorDriver;
	this.loaderDriver               = loaderDriver;
	this.zoomDriver                 = zoomDriver;
}

App.prototype.run = function ()
{
	this.populate();

	const dispatch = (eventType, signature, ird) => this.router.dispatch(eventType, signature, ird); // @TODO depends too much on Router interface
	this.widgetEventPillar         .pipeToSM(dispatch); // subscribe mouse events on SVG raised up to Widget level
	this.roomStampDriver           .pipeToSM(dispatch); // subsribe also for events listened to by GUI widgets
	this.modeDriver                .pipeToSM(dispatch);
	this.operationDriver           .pipeToSM(dispatch);
	this.keyboardDriver            .pipeToSM(dispatch);
	this.figurePropertyEditorDriver.pipeToSM(dispatch);
	this.configDriver              .pipeToSM(dispatch);
	this.tabSelectorDriver         .pipeToSM(dispatch);
	this.loaderDriver              .pipeToSM(dispatch);
	this.zoomDriver                .pipeToSM(dispatch);
};

App.prototype.populate = function ()
{
	/*this.roomStampDriver.roomBank.namedRooms.map(
		namedRoom => {
			const i = this.tabOrder(namedRoom.tab);
			return this.widgetEventPillar.canvasPseudoWidgets[i].figureWidgetFactory.createFromBusiness1(namedRoom.room); // @TODO Law of Demeter @TODO arbitrariness
		}
	);*/

	/** @TODO A rejtélyes ,,ugrálás'' tanulmányozásához: közvetlen munkavászonra kitett alak
	const cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'green', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -7  ]);
	const cellarBsn = new Room (
		'Pince', cellarFig, [], [],
		[]
	);
	cellarBsn.title.doTranslation([-1.5, 1.5]);
	const cellarWdg = this.widgetEventPillar.canvasPseudoWidgets[0].figureWidgetFactory.createFromBusiness0(cellarBsn);

	const bed0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [6.4, -5.2]);
	const bed1Wdg = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [4, -8]);

	cellarBsn.escorts.push(bed0Wdg.businessObject);
	bed0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO
	cellarWdg.jumpTo(this.widgetEventPillar.canvasPseudoWidgets[3]);
	cellarWdg.scale(0.6);
	cellarWdg.translate([0, 10]);
	cellarWdg.updateDownwardAll();**/

	const fotelWdg        = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Fotel'        , '/img-vendor/fotel.png'                , [3, 3], [-3,  5  ]);
	const bed1Wdg         = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Ágy'          , '/img-vendor/agy.png'                  , [3, 3], [-3,  1.5]);
	const carpet11Wdg     = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Szőnyeg 1'    , '/img-vendor/szonyeg1_normal_small.png', [3, 3], [-3, -3  ]);
	const carpet12Wdg     = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Szőnyeg 2'    , '/img-vendor/szonyeg1_dark.png'        , [3, 3], [ 1, -3  ]);
	const tableChairs1Wdg = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png'         , [4, 3], [-3,  9  ]);
	const green1Wdg       = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Zöldség'      , '/img-vendor/zoldseg.png'              , [2, 2], [ 1,  9  ]);

	//const bed1Wdg   = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [3, 3], [4, -8]);
	//const bed1Wdg   = this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [3, 3], [4, -8]);

	////

	//nst cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -7  ]);
	//const cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  4  , -7  ]);
	const cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)'})).translation([  4  , -7  ]);
	const cellarBsn = new Room (
		'Pince', cellarFig,
		[], ['nothing'],
		[new CircularSlit(10, 0.5), new CircularSlit(17, 0.8), new CircularSlit(24.6, 0.7), new CircularSlit(38.5, 1)]
	);
	cellarBsn.title.doTranslation([-1, 4.5]);
	const cellarWdg = this.widgetEventPillar.canvasPseudoWidgets[0].figureWidgetFactory.createFromBusiness0(cellarBsn);

	const lamp0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -5.7]);
	const bed0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -6.1]);

	cellarBsn.escorts.push(bed0Wdg.businessObject, lamp0Wdg.businessObject);
	bed0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO
	lamp0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO

	cellarWdg.translate([0, 15]);

	cellarWdg.updateSlitStructure();
	cellarWdg.updateDasharray();

	cellarWdg.updateDownwardAll();


	////////

	//nst transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , 3  ]);
	//const transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  -3  , 3  ]);
	const transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)'})).translation([  -3  , 3  ]);
	const transitBsn = new Room (
		'Közlekedő', transitFig,
		[], ['nothing'],
		[new CircularSlit(5.5, 0.5), new CircularSlit(12, 0.4), new CircularSlit(14.5, 0.5), new CircularSlit(17, 0.4)]
	);
	transitBsn.title.doTranslation([0, -1.5]);
	const transitWdg = this.widgetEventPillar.canvasPseudoWidgets[0].figureWidgetFactory.createFromBusiness0(transitBsn);
	transitWdg.scale(2); // infers transitWdg.updateSlitStructure(); transitWdg.updateDasharray();

	////

	//nst diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
	//const diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -7  ]);
	const diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)'})).translation([  -3  , -7  ]);
	const diningBsn = new Room (
		'Ebédlő', diningFig,
		[], ['nothing'],
		[new CircularSlit(1, 0.35), new CircularSlit(3.5, 0.7), new CircularSlit(10.5, 1)]
	);
	diningBsn.title.doTranslation([0, -2.3]);
	const diningWdg = this.widgetEventPillar.canvasPseudoWidgets[0].figureWidgetFactory.createFromBusiness0(diningBsn);
	diningWdg.scale(2); // infers diningWdg.updateSlitStructure(); diningWdg.updateDasharray();

	const tableChairs0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [4, 3], [-1, -5.1]);
	const green0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

	diningBsn.escorts.push(tableChairs0Wdg.businessObject, green0Wdg.businessObject);
	tableChairs0Wdg.businessObject.maybeHost = ['just', diningBsn];
	green0Wdg.businessObject.maybeHost = ['just', diningBsn];

	/////

	//nst bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -15  ]);
	//nst bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -15  ]);
	const bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)'})).translation([  -3  , -15  ]);
	const bathBsn = new Room (
		'Fürdő', bathFig,
		[], ['nothing'],
		[new CircularSlit(1, 0.35), new CircularSlit(3.5, 0.7), new CircularSlit(10.5, 1)]
	);
	bathBsn.title.doTranslation([0, -4.1]);
	const bathWdg = this.widgetEventPillar.canvasPseudoWidgets[0].figureWidgetFactory.createFromBusiness0(bathBsn);
	bathWdg.scale(2); // infers bathWdg.updateSlitStructure(); bathWdg.updateDasharray();

	const tap0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Csap', '/img-vendor/csap_small.png', [2, 2], [3.4, -13.3]);
	const tube0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Kád', '/img-vendor/kad.png', [5, 4], [-2, -12.5]);
	//const green0Wdg = this.widgetEventPillar.canvasPseudoWidgets[0].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

	bathBsn.escorts.push(tap0Wdg.businessObject, tube0Wdg.businessObject);
	tap0Wdg.businessObject.maybeHost = ['just', bathBsn];
	tube0Wdg.businessObject.maybeHost = ['just', bathBsn];

	const batteringRamWidget1 = BatteringRamWidget.prototype.restoreOn(this.widgetEventPillar.canvasPseudoWidgets[2]);
	const brickWidget1        = BrickWidget       .prototype.restoreOn(this.widgetEventPillar.canvasPseudoWidgets[2]);
	const pickaxeWidget1      = PickaxeWidget     .prototype.restoreOn(this.widgetEventPillar.canvasPseudoWidgets[2]);
	const bucketWidget1       = BucketWidget      .prototype.restoreOn(this.widgetEventPillar.canvasPseudoWidgets[2]);


	//this.widgetEventPillar.canvasPseudoWidgets[1].imageWidgetFactory.create('Vécé', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Toilet-pictogram.png', [10, 10], [4, -8]);

	// @TODO: title-less business objects make the app fail!
	/*var massPoint1Factory = new MassPoint1Factory;
	var massPoint2Factory = new MassPoint2Factory;
	this.widgetEventPillar.canvasPseudoWidgets[i].createFigureWidgetFromDomain1(massPoint1Factory.testMassPoint1('red' , [ 8,  4]));
	this.widgetEventPillar.canvasPseudoWidgets[i].createFigureWidgetFromDomain1(massPoint2Factory.testMassPoint2('blue', [10, -6]));*/
};

App.prototype.tabOrder = function (tabName)
{
	const i = this.tabSelectorDriver.names.indexOf(tabName);
	if (i >= 0) {
		return i;
	} else {
		throw `Invalid tabName [${tabName}] in populating pool`;
	}
};
