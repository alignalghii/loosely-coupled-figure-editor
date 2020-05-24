onload = function (event)
{
	//var SUPERGLOBAL = {}; // @TODO !!!!

	document.addEventListener('selectstart', e => {if (e.target.tagName == 'svg' || e.target.parentNode && e.target.parentNode.tagName == 'svg' || e.target.parentNode.parentNode && e.target.parentNode.parentNode.tagName == 'svg') {e.preventDefault(); console.log(`Selection prevented!`);}}); // @TODO: do it in a nicer way
	document.addEventListener('dragstart', e => {if (e.target.tagName == 'image') e.preventDefault(); return false;}); // @LINK https://stackoverflow.com/questions/6259622/dragging-selecting-inside-svg-in-firefox @LINK https://www.redips.net/firefox/disable-image-dragging/


	const svgLowLevel_menuCanvas   = new SvgLowLevel(document, 'svgRoot_menuCanvas'  ), // [250, 374] // [125, 374]
	      svgLowLevel_menuCanvas_2 = new SvgLowLevel(document, 'svgRoot_menuCanvas_2'), // [250, 374] // [125, 374]
	      svgLowLevel_menuCanvas_3 = new SvgLowLevel(document, 'svgRoot_menuCanvas_3'), // [250, 374] // [125, 374]
	      svgLowLevel_menuCanvas_4 = new SvgLowLevel(document, 'svgRoot_menuCanvas_4'); // [250, 374] // [125, 374]
	const svgLowLevel_workCanvas   = new SvgLowLevel(document, 'svgRoot_workCanvas'  ); // [600, 400] // [750, 500] // [900, 500] // [1050, 692] // [1175, 692]
	const svgLowLevels = [
		svgLowLevel_menuCanvas, svgLowLevel_menuCanvas_2, svgLowLevel_menuCanvas_3, svgLowLevel_menuCanvas_4,
		svgLowLevel_workCanvas
	];

	const coordSysTransformer_menuCanvas   = new CoordSysTransformer([ 62, 187],  5, [true, false]), // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])
	      coordSysTransformer_menuCanvas_2 = new CoordSysTransformer([ 62, 187], 10, [true, false]), // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])
	      coordSysTransformer_menuCanvas_3 = new CoordSysTransformer([ 62, 187], 20, [true, false]); // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])
	      coordSysTransformer_menuCanvas_4 = new CoordSysTransformer([ 62, 187],  5, [true, false]); // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])
	const coordSysTransformer_workCanvas   = new CoordSysTransformer([587, 346], 20, [true, false]); // eredeti adat: new CoordSysTransformer([300, 200], 10, [true, false])

	const canvasPseudoWidgetFactory = new CanvasPseudoWidgetFactory;
	const canvasPseudoWidget_menu   = canvasPseudoWidgetFactory.create(svgLowLevel_menuCanvas  , coordSysTransformer_menuCanvas  , new Bijection, new Map),
	      canvasPseudoWidget_menu_2 = canvasPseudoWidgetFactory.create(svgLowLevel_menuCanvas_2, coordSysTransformer_menuCanvas_2, new Bijection, new Map),
	      canvasPseudoWidget_menu_3 = canvasPseudoWidgetFactory.create(svgLowLevel_menuCanvas_3, coordSysTransformer_menuCanvas_3, new Bijection, new Map),
	      canvasPseudoWidget_menu_4 = canvasPseudoWidgetFactory.create(svgLowLevel_menuCanvas_4, coordSysTransformer_menuCanvas_4, new Bijection, new Map),
	      canvasPseudoWidget_work   = canvasPseudoWidgetFactory.create(svgLowLevel_workCanvas  , coordSysTransformer_workCanvas  , new Bijection, new Map);

	var roomFactory           = new RoomFactory();
	// var widgetFactories       = svgLowLevels.map(svgLowLevel => new WidgetFactory(new Map, coordSysTransformer, new Bijection, svgLowLevel)); // Use a PartialMap class, that should yield Nothing's
	// @TODO restore the more generic solutions soon, but now I want micromanage for experimental purpose.
	const canvasPseudoWidgets = [canvasPseudoWidget_menu, canvasPseudoWidget_menu_2, canvasPseudoWidget_menu_3, canvasPseudoWidget_menu_4, canvasPseudoWidget_work];

	const numberHelperAndValidator = new NumberHelperAndValidator(3);
	const quoteHelper              = new QuoteHelper;
	const domHelper                = new DomHelper;

	var roomBank             = roomFactory.sampleRoomBank();
	var domainStamp          = roomBank.namedRooms[roomBank.selected].room.centering();
	// `.copy` (hidden in `centering`) is needed here, because the blue suare rendered during `app.populate` must remain intact
	// `.copy` is needed -- for another reason -- also at `widgetFactory.stampAt` and probably also at `app.populate` (hidden in `createWidgetFromDomain1`),
	// because otherwise, any user transformations on the last stamped object would affect the future stamps (see `spec/last-inserted-room-owns-stamp--clone-error.mp4`).
	var state               = new State(domainStamp);

	const statusBarODriver           = new StatusBarDriver(document);
	var roomStampDriver              = new RoomStampDriver(document, roomBank);
	var modeIODriver                 = new ModeDriver(document);
	var operationDriver              = new OperationDriver(document);
	var keyboardDriver               = new KeyboardDriver(document);
	const figurePropertyEditorIODriver = new FigurePropertyEditorDriver(document, numberHelperAndValidator, quoteHelper);
	const configIODriver             = new ConfigDriver(document);
	const tabSelectorIODriver        = new TabSelectorDriver(document, domHelper);
	const loaderIODriver             = new LoaderDriver(document);
	const saveIODriver               = new SaveDriver(document);
	const nativeLoaderIODriver       = new NativeLoaderDriver(document);
	const audioODriver               = new AudioDriver('sonar.ogg', 'bark.ogg', 'dialog-error.ogg', 'glass.ogg', 'drip.ogg');
	const zoomDriver                 = new ZoomDriver(document);
	const contextMenuDriver          = new ContextMenuDriver(document, state.mode);
	const historyIODriver            = new HistoryDriver(document);

	var widgetCollision = new WidgetCollision(audioODriver);



	var compactModeController            = new CompactModeController(state, canvasPseudoWidgets, widgetCollision, statusBarODriver); // widgetCollision = new WidgetCollision(board, audio) // board: Bijection low->fig as fig set
	var normalModeController             = new NormalModeController (state, canvasPseudoWidgets, statusBarODriver, audioODriver);
	var roomController                   = new RoomController       (state, roomFactory, statusBarODriver);
	var figureEditorController           = new FigureEditorController(state, canvasPseudoWidgets, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	var geomTransformationController     = new GeomTransformationController(state, canvasPseudoWidgets, statusBarODriver);  // @TODO: should not use the same `State` as `NormalModeController`
	const figurePropertyEditorController = new FigurePropertyEditorController(state, canvasPseudoWidgets, figurePropertyEditorIODriver, statusBarODriver);
	const configController               = new ConfigController(state, configIODriver, tabSelectorIODriver, statusBarODriver);
	const figureNestingController        = new FigureNestingController(state, canvasPseudoWidgets, statusBarODriver);
	const tabSelectorController          = new TabSelectorController(tabSelectorIODriver, quoteHelper, statusBarODriver); // @TODO argument order
	const loaderController               = new LoaderController(canvasPseudoWidgets, numberHelperAndValidator, loaderIODriver, tabSelectorIODriver, statusBarODriver, audioODriver);
	const saveController                 = new SaveController(state, canvasPseudoWidgets, saveIODriver, statusBarODriver, audioODriver);
	const nativeLoaderController         = new NativeLoaderController(canvasPseudoWidgets, nativeLoaderIODriver, tabSelectorIODriver, statusBarODriver, audioODriver);
	const zoomController                 = new ZoomController(canvasPseudoWidgets, statusBarODriver);
	const contextMenuController          = new ContextMenuController(state, contextMenuDriver);
	const historyController              = new HistoryController(state, canvasPseudoWidgets, historyIODriver, statusBarODriver);

	var router              = new Router(state, normalModeController, compactModeController, roomController, figureEditorController, geomTransformationController, figurePropertyEditorController, configController, figureNestingController, tabSelectorController, loaderController, saveController, nativeLoaderController, zoomController, contextMenuController, historyController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(canvasPseudoWidgets, router); // @TODO: could it be regarded as a kind of device driver, and renamed + moved appropriately?

	var app                 = new App(router, widgetEventPillar, roomStampDriver, modeIODriver, operationDriver, keyboardDriver, figurePropertyEditorIODriver, configIODriver, tabSelectorIODriver, loaderIODriver, saveIODriver, nativeLoaderIODriver, zoomDriver, contextMenuDriver, historyIODriver); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
