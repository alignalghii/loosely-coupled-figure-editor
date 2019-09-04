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

	const statusBarODriver           = new StatusBarDriver(document);
	var roomStampDriver              = new RoomStampDriver(document, roomBank);
	var modeIODriver                 = new ModeDriver(document);
	var operationDriver              = new OperationDriver(document);
	var keyboardDriver               = new KeyboardDriver(document);
	const figurePropertyEditorDriver = new FigurePropertyEditorDriver(document);
	const configIODriver             = new ConfigDriver(document);

	var state               = new State(domainStamp);

	var compactModeController            = new CompactModeController(state, widgetFactories, widgetCollision, statusBarODriver); // widgetCollision = new WidgetCollision(board, audio) // board: Bijection low->fig as fig set
	var normalModeController             = new NormalModeController (state, widgetFactories, statusBarODriver);
	var roomController                   = new RoomController       (state, roomFactory, statusBarODriver);
	var figureEditorController           = new FigureEditorController(state, widgetFactories, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	var geomTransformationController     = new GeomTransformationController(state, widgetFactories, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	const figurePropertyEditorController = new FigurePropertyEditorController(state, document, statusBarODriver);
	const configController               = new ConfigController(state, configIODriver, statusBarODriver);

	var router              = new Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController, figurePropertyEditorController, configController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactories, router); // @TODO: could it be regarded as a kind of device driver, and renamed + moved appropriately?

	var app                 = new App(router, widgetEventPillar, roomStampDriver, modeIODriver, operationDriver, keyboardDriver, figurePropertyEditorDriver, configIODriver); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
