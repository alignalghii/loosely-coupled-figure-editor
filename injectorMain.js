onload = function (event)
{
	var selectList = document.getElementById('sampleFigureBank');
	var bank = sampleFigureBank();
	function addToMenuItem (namedFigure, i) {createAndAppendChildWithAttrs(selectList, 'option', {value: i}).innerHTML = namedFigure.name;}
	bank.namedFigures.map(addToMenuItem);
	selectList.selectedIndex = bank.selected;

	var svgLowLevel         = new SvgLowLevel(document); // [600, 400]

	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);
	var bijectionUp         = new Bijection();

	var widgetFactory       = new WidgetFactory(coordSysTransformer, bijectionUp, svgLowLevel);

	var board               = bijectionUp; // when using bijectionUp as a set of high-level figures, we call it a board
	var originFigure        = bank.namedFigures[bank.selected].figure;
	var audio               = new MyAudio(new Audio('sonar.ogg'));

	var app                 = new App(board, originFigure, audio, widgetFactory);

	function changeAccu(event)
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedFigure = bank.namedFigures[i].figure;
		app.setOriginFigureFrom(selectedFigure);
	}
	selectList.addEventListener('change', changeAccu);
	bank.namedFigures.map((namedFig) => widgetFactory.create(namedFig.figure));

	console.log('App: Live run')
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
