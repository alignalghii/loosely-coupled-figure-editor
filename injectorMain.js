onload = function (event)
{
	var svgLowLevel         = new SvgLowLevel(document); // [600, 400]
	var coordSysTransformer = new CoordSysTransformer([300, 200], 10, [true, false]);

	var app                 = new App(svgLowLevel, coordSysTransformer);

	app.run();
};
