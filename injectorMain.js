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
	var originFigure        = bank.namedFigures[bank.selected].figure;

	var app                 = new App(svgLowLevel, coordSysTransformer, bijectionUp, originFigure);

	function changeAccu(event)
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedFigure = bank.namedFigures[i].figure;
		app.setOriginFigureFrom(selectedFigure);
	}
	selectList.addEventListener('change', changeAccu);

	console.log('App: Live run')
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
