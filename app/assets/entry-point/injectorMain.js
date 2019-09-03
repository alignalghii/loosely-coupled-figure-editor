onload = function (event)
{
	var svgLowLevel_mainCanvas       = new SvgLowLevel(document, 'svgRoot' ); // [600, 400]
	var svgLowLevel_experimentCanvas = new SvgLowLevel(document, 'svgRoot2'); // [600, 400]
	var svgLowLevels           = [svgLowLevel_mainCanvas, svgLowLevel_experimentCanvas];

	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);

	var roomFactory           = new RoomFactory();
	var widgetFactories       = svgLowLevels.map(svgLowLevel => new WidgetFactory(new Bijection, coordSysTransformer, new Bijection, svgLowLevel));

	var audio               = new MyAudio(new Audio('assets/sonar.ogg'));
	var widgetCollision = new WidgetCollision(audio);

	var roomBank             = roomFactory.sampleRoomBank();
	var domainStamp          = roomBank.namedRooms[roomBank.selected].room.centering();
	// `.copy` (hidden in `centering`) is needed here, because the blue suare rendered during `app.populate` must remain intact
	// `.copy` is needed -- for another reason -- also at `widgetFactory.stampAt` and probably also at `app.populate` (hidden in `createWidgetFromDomain1`),
	// because otherwise, any user transformations on the last stamped object would affect the future stamps (see `spec/last-inserted-room-owns-stamp--clone-error.mp4`).

	var msgConsole          = document.getElementById('msgConsole');

	var state               = new State(domainStamp);
	var compactModeController = new CompactModeController(state, widgetFactories, widgetCollision, msgConsole); // widgetCollision = new WidgetCollision(board, audio) // board: Bijection low->fig as fig set
	var normalModeController  = new NormalModeController (state, widgetFactories, msgConsole);
	var roomController        = new RoomController       (state, roomFactory, msgConsole);
	var figureEditorController = new FigureEditorController(state, widgetFactories, msgConsole);  // @TODO: should not use the same `State` as `NormalModeController`
	var geomTransformationController = new GeomTransformationController(state, widgetFactories, msgConsole);  // @TODO: should not use the same `State` as `NormalModeController`
	const figurePropertyEditorController = new FigurePropertyEditorController(state, document, msgConsole);

	var router              = new Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController, figurePropertyEditorController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactories, router);
	var roomStampUI         = new RoomStampUI(document, roomBank, router);
	var modeUI              = new ModeUI(document, router);
	var operationUI         = new OperationUI(document, router);
	var keyboardUI          = new KeyboardUI(document, router);
	const figurePropertyEditorUI = new FigurePropertyEditorUI(document, router);

	var app                 = new App(widgetEventPillar, roomStampUI, modeUI, operationUI, keyboardUI, figurePropertyEditorUI); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
