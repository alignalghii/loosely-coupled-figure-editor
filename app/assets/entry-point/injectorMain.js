onload = function (event)
{
	var svgLowLevel         = new SvgLowLevel(document); // [600, 400]

	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);
	var bijectionSvgToGeom  = new Bijection();

	var roomFactory           = new RoomFactory();
	var bijectionGeomToDomain = new Bijection();
	var widgetFactory         = new WidgetFactory(bijectionGeomToDomain, coordSysTransformer, bijectionSvgToGeom, svgLowLevel);

	var board               = bijectionSvgToGeom; // when using bijectionSvgToGeom as a set of high-level figures, we call it a board

	var audio               = new MyAudio(new Audio('assets/sonar.ogg'));

	var roomBank             = roomFactory.sampleRoomBank();
	var domainStamp          = roomBank.namedRooms[roomBank.selected].room.copy(); // `.copy` is needed also at widgetFactory.stampAt` and probably also at `app.populate`
	domainStamp.figure.doCentering(); // The blue suare rendered during `app.populate` remains intact

	var msgConsole          = document.getElementById('msgConsole');

	var widgetCollision     = new WidgetCollision(board, audio);

	var state               = new State(domainStamp);
	var compactModeController = new CompactModeController(state, widgetFactory, widgetCollision, msgConsole);
	var normalModeController  = new NormalModeController (state, widgetFactory, widgetCollision, msgConsole);
	var roomController        = new RoomController       (state, roomFactory, widgetFactory, msgConsole);
	var router              = new Router(state, normalModeController, compactModeController, roomController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactory, router);
	var roomStampUI         = new RoomStampUI(document, roomBank, router);
	var modeUI              = new ModeUI(document, router);
	var operationUI         = new OperationUI(document, router);
	var keyboardUI          = new KeyboardUI(document, router);
	var app                 = new App(widgetEventPillar, roomStampUI, modeUI, operationUI, keyboardUI); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
