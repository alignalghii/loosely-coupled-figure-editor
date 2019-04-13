onload = function (event)
{
	var svgLowLevel         = new SvgLowLevel(document); // [600, 400]
	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);
	var bijectionUp         = new Bijection();
	var originFigure        = new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'});

	var app                 = new App(svgLowLevel, coordSysTransformer, bijectionUp, originFigure);

	console.log('App: Live run')
	app.run();

	//console.log('App: mocked-out run');
	//var behaviorRunner = new BehaviorRunner([{id: 'base',  modules: [AppBehavior, BijectionBehavior, FigureBehavior]}]);
	//behaviorRunner.run();
};
