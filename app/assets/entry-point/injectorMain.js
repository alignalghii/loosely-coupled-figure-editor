onload = function (event)
{
	var svgLowLevel         = new SvgLowLevel(document); // [600, 400]

	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);
	var bijectionUp         = new Bijection();

	var widgetFactory       = new WidgetFactory(coordSysTransformer, bijectionUp, svgLowLevel);

	var board               = bijectionUp; // when using bijectionUp as a set of high-level figures, we call it a board

	var audio               = new MyAudio(new Audio('assets/sonar.ogg'));

	var bank                = sampleFigureBank();
	var originFigure        = bank.namedFigures[bank.selected].figure.centering();
	var msgConsole          = document.getElementById('msgConsole');

	var widgetCollision     = new WidgetCollision(board, audio);

	var state               = new State(originFigure);
	var compactModeController   = new CompactModeController(state, widgetCollision, coordSysTransformer, msgConsole);
	var normalModeController    = new NormalModeController (state, widgetCollision, coordSysTransformer, msgConsole);
	var router        = new Router(state, widgetCollision, originFigure, coordSysTransformer, msgConsole, compactModeController, normalModeController); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactory, router);
	var stampUI             = new StampUI(document, bank, router);
	var modeUI              = new ModeUI(document, router);
	var operationUI         = new OperationUI(document, router);
	var keyboardUI          = new KeyboardUI(document, router);
	var app                 = new App(widgetEventPillar, stampUI, modeUI, operationUI, keyboardUI); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};