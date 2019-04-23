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

	var widgetCollision     = new WidgetCollision(board, audio);
	var stateMachine        = new StateMachine(widgetCollision, originFigure); // @TODO make globalOriginFigure obsolete
	var widgetEventPillar   = new WidgetEventPillar(widgetFactory, stateMachine);
	var stampUI             = new StampUI(document, bank, stateMachine);
	var modeUI              = new ModeUI(document, stateMachine);
	var operationUI         = new OperationUI(document, stateMachine);
	var app                 = new App(widgetEventPillar, stampUI, modeUI, operationUI); // @TODO Law of Demeter, see inside

	//console.log('App: live run');
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
