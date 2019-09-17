onload = function (event)
{
	var svgLowLevel_menuCanvas = new SvgLowLevel(document, 'svgRoot_menuCanvas'); // [250, 374]
	var svgLowLevel_workCanvas = new SvgLowLevel(document, 'svgRoot_workCanvas'); // [600, 400]
	var svgLowLevels           = [svgLowLevel_menuCanvas, svgLowLevel_workCanvas];

	const coordSysTransformer_menuCanvas = new CoordSysTransformer([125, 187], 10, [true, false]), // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])
	      coordSysTransformer_workCanvas = new CoordSysTransformer([300, 200], 20, [true, false]); // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])

	var roomFactory           = new RoomFactory();
	// var widgetFactories       = svgLowLevels.map(svgLowLevel => new WidgetFactory(new Map, coordSysTransformer, new Bijection, svgLowLevel)); // Use a PartialMap class, that should yield Nothing's
	// @TODO restore the more generic solutions soon, but now I want micromanage for experimental purpose.
	const widgetFactories = [
		new WidgetFactory(new Map, coordSysTransformer_menuCanvas, new Bijection, svgLowLevel_menuCanvas),
		new WidgetFactory(new Map, coordSysTransformer_workCanvas, new Bijection, svgLowLevel_workCanvas)
	];

	var audio               = new MyAudio(new Audio('assets-proper/sonar.ogg'));
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
	const figurePropertyEditorIODriver = new FigurePropertyEditorDriver(document);
	const configIODriver             = new ConfigDriver(document);

	var state               = new State(domainStamp);

	var compactModeController            = new CompactModeController(state, widgetFactories, widgetCollision, statusBarODriver); // widgetCollision = new WidgetCollision(board, audio) // board: Bijection low->fig as fig set
	var normalModeController             = new NormalModeController (state, widgetFactories, statusBarODriver);
	var roomController                   = new RoomController       (state, roomFactory, statusBarODriver);
	var figureEditorController           = new FigureEditorController(state, widgetFactories, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	var geomTransformationController     = new GeomTransformationController(state, widgetFactories, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	const figurePropertyEditorController = new FigurePropertyEditorController(state, widgetFactories, figurePropertyEditorIODriver, statusBarODriver);
	const configController               = new ConfigController(state, configIODriver, statusBarODriver);

	var router              = new Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController, figurePropertyEditorController, configController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactories, router); // @TODO: could it be regarded as a kind of device driver, and renamed + moved appropriately?

	var app                 = new App(router, widgetEventPillar, roomStampDriver, modeIODriver, operationDriver, keyboardDriver, figurePropertyEditorIODriver, configIODriver); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
