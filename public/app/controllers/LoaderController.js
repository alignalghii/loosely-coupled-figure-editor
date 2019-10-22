function LoaderController (canvasPseudoWidgets, numberHelperAndValidator, loaderDriver, statusBarDriver, audioODriver)
{
	this.canvasPseudoWidgets      = canvasPseudoWidgets;
	this.numberHelperAndValidator = numberHelperAndValidator;
	this.loaderDriver             = loaderDriver;
	this.statusBarDriver          = statusBarDriver;
	this.audioODriver             = audioODriver;
}

LoaderController.prototype = Object.create(Controller.prototype);

LoaderController.prototype.constructor = LoaderController;

LoaderController.prototype.run = function (idStr)
{
	const dummyprettyprint = idStr.trim();
	this.rewrite(dummyprettyprint);
	return maybe_exec(
		()          => this.clearError(),
		eitherRawId => either(
			raw => this.error(),
			id  => this.load(id),
			eitherRawId
		),
		this.numberHelperAndValidator.readToMaybeEitherRawNat(idStr)
	);
};

LoaderController.prototype.load = function (i)
{
	this.clearError();
	switch (i) {
		case 1:
			this.clear();
			this.statusBarDriver.report(`${i}. rekord betöltése`);

			const cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -15  ]);
			const cellarBsn = new Room (
				'Pince', cellarFig, [], [],
				[]
			);
			cellarBsn.title.doTranslation([-1, 4.5]);
			const cellarWdg = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(cellarBsn);

			const lamp0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -13.7]);
			const bed0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -14.1]);

			cellarBsn.escorts.push(bed0Wdg.businessObject, lamp0Wdg.businessObject);
			bed0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO
			lamp0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO

			cellarWdg.translate([0, 15]);
			cellarWdg.updateDownwardAll();

			break;
		case 2:
			this.clear();
			this.statusBarDriver.report(`${i}. rekord betöltése`);


			const transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , -2  ]);
			const transitBsn = new Room (
				'Közlekedő', transitFig, [], [],
				[]
			);
			transitBsn.title.doTranslation([0, -1.5]);
			const transitWdg = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(transitBsn);
			transitWdg.scale(2);

			break;
		case 3:
			this.clear();
			this.statusBarDriver.report(`${i}. rekord betöltése`);


			const diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
			const diningBsn = new Room (
				'Ebédlő', diningFig, [], [],
				[]
			);
			diningBsn.title.doTranslation([0, -2.3]);
			const diningWdg = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(diningBsn);
			diningWdg.scale(2);

			const tableChairs0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [4, 3], [-1, -5.1]);
			const green0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

			diningBsn.escorts.push(tableChairs0Wdg.businessObject, green0Wdg.businessObject);
			tableChairs0Wdg.businessObject.maybeHost = ['just', diningBsn];
			green0Wdg.businessObject.maybeHost = ['just', diningBsn];



			break;
		default:
			this.statusBarDriver.report(`<span class="error">${i}. rekord nem létezik!</span>`); // @TODO a helper for error messages, maybe inside or alongside `QuoteHelper`
			this.audioODriver.error();
			break;
	}
};

LoaderController.prototype.clear = function ()
{
	//this.canvasPseudoWidgets[3].clear(); // @TODO code smell: magic number @TODO does not work! Investigate!
	console.log('Vászontörlés');
	const board         = this.canvasPseudoWidgets[3].arbitrary.bijectionSvgToGeom,
	      businessBoard = this.canvasPseudoWidgets[3].arbitrary.partialFunctionGeomToBusiness,
	      svgLowLevel   = this.canvasPseudoWidgets[3].arbitrary.svgLowLevel; // @TODO svgLowlevel is not a class, it communicates via global functions, not methods
	board.deleteAll();
	businessBoard.clear();
	svgLowLevel.deleteAllPolygonChildren();  // @TODO svgLowlevel is not a class, it communicates via global functions, not methods
};

LoaderController.prototype.error      = function () {this.loaderDriver.message('Nem természetes szám!');};
LoaderController.prototype.clearError = function () {this.loaderDriver.message('');};
LoaderController.prototype.rewrite    = function (str) {this.loaderDriver.loaderIdField.value = str;};
LoaderController.prototype.cancel     = function ()
{
	this.rewrite('');
	this.clearError();
	this.statusBarDriver.report('ID visszavonása');
};
