function LoaderController (canvasPseudoWidgets, numberHelperAndValidator, loaderDriver, tabSelectorDriver, statusBarDriver, audioODriver)
{
	this.canvasPseudoWidgets      = canvasPseudoWidgets;
	this.numberHelperAndValidator = numberHelperAndValidator;
	this.loaderDriver             = loaderDriver;
	this.tabSelectorDriver        = tabSelectorDriver;
	this.statusBarDriver          = statusBarDriver;
	this.audioODriver             = audioODriver;

	this.focusID();
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
			if (this.clearAndTab()) {
				this.tabSelectorDriver.relabelTab('DB', `#${i}`); // @TODO DRY
				this.statusBarDriver.report(`${i}. rekord betöltése`);

				//nst cellarFig__ = (new Figure(poly1_concave_ccw, {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -7  ]);
				const cellarFig__ = (new Figure(poly1_concave_ccw, {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  4  , -7  ]);
				const cellarBsn__ = new Room (
					'Pince', cellarFig__, [], [],
					[], ['nothing']
				);
				cellarBsn__.title.doTranslation([-1, 4.5]);
				const cellarWdg__ = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(cellarBsn__);

				const lamp0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -5.7]);
				const bed0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -6.1]);

				cellarBsn__.escorts.push(bed0Wdg__.businessObject, lamp0Wdg__.businessObject);
				bed0Wdg__.businessObject.maybeHost = ['just', cellarBsn__]; // @TODO
				lamp0Wdg__.businessObject.maybeHost = ['just', cellarBsn__]; // @TODO

				cellarWdg__.translate([0, 15]);
				cellarWdg__.updateDownwardAll();


				////////

				//nst transitFig__ = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , 3  ]);
				const transitFig__ = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  -3  , 3  ]);
				const transitBsn__ = new Room (
					'Közlekedő', transitFig__, [], [],
					[], ['nothing']
				);
				transitBsn__.title.doTranslation([0, -1.5]);
				const transitWdg__ = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(transitBsn__);
				transitWdg__.scale(2);

				////

				//nst diningFig__ = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
				const diningFig__ = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -7  ]);
				diningFig__.doTranslation([0, -2.5]);
				diningFig__.doScale(2);
				const diningBsn__ = new Room (
					'Ebédlő', diningFig__, [], [],
					[], ['nothing']
				);
				diningBsn__.title.doTranslation([-2, -6.3]);
				const diningWdg__ = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(diningBsn__);
				diningWdg__.scale(2);

				const tableChairs0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [8, 6], [-1, -8.1]);
				const green0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [4, 4], [7, -8.2]);

				diningBsn__.escorts.push(tableChairs0Wdg__.businessObject, green0Wdg__.businessObject);
				tableChairs0Wdg__.businessObject.maybeHost = ['just', diningBsn__];
				green0Wdg__.businessObject.maybeHost = ['just', diningBsn__];

				/////

				/*const bathFig__ = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -15  ]);
				const bathBsn__ = new Room (
					'Fürdő', bathFig__, [], [],
					[]
				);
				bathBsn__.title.doTranslation([0, -4.1]);
				const bathWdg__ = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(bathBsn__);
				bathWdg__.scale(2);

				const tap0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Csap', '/img-vendor/csap_small.png', [2, 2], [3.4, -13.3]);
				const tube0Wdg__ = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Kád', '/img-vendor/kad.png', [5, 4], [-2, -12.5]);
				//const green0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

				bathBsn__.escorts.push(tap0Wdg__.businessObject, tube0Wdg__.businessObject);
				tap0Wdg__.businessObject.maybeHost = ['just', bathBsn__];
				tube0Wdg__.businessObject.maybeHost = ['just', bathBsn__];*/
			}

			break;
		case 2:
			if (this.clearAndTab()) {
				this.tabSelectorDriver.relabelTab('DB', `#${i}`); // @TODO DRY
				this.statusBarDriver.report(`${i}. rekord betöltése`);

				/*const cellarFig__2 = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -7  ]);
				const cellarBsn__2 = new Room (
					'Pince', cellarFig__2, [], [],
					[]
				);
				cellarBsn__2.title.doTranslation([-1, 4.5]);
				const cellarWdg__2 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(cellarBsn__2);

				const lamp0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -5.7]);
				const bed0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -6.1]);

				cellarBsn__2.escorts.push(bed0Wdg__2.businessObject, lamp0Wdg__2.businessObject);
				bed0Wdg__2.businessObject.maybeHost = ['just', cellarBsn__2]; // @TODO
				lamp0Wdg__2.businessObject.maybeHost = ['just', cellarBsn__2]; // @TODO

				cellarWdg__2.translate([0, 15]);
				cellarWdg__2.updateDownwardAll();*/


				////////

				//nst transitFig__2 = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , 3  ]);
				const transitFig__2 = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  -3  , 3  ]);
				transitFig__2.doTranslation([0, 2]);
				transitFig__2.doScale(1.7);
				const transitBsn__2 = new Room (
					'Közlekedő', transitFig__2, [], [],
					[], ['nothing']
				);
				transitBsn__2.title.doTranslation([0, -1.5]);
				const transitWdg__2 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(transitBsn__2);
				transitWdg__2.scale(2);

				////

				//nst diningFig__2 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
				const diningFig__2 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -7  ]);
				const diningBsn__2 = new Room (
					'Ebédlő', diningFig__2, [], [],
					[], ['nothing']
				);
				diningBsn__2.title.doTranslation([0, -2.3]);
				const diningWdg__2 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(diningBsn__2);
				diningWdg__2.scale(2);

				const tableChairs0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [4, 3], [-1, -5.1]);
				const green0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

				diningBsn__2.escorts.push(tableChairs0Wdg__2.businessObject, green0Wdg__2.businessObject);
				tableChairs0Wdg__2.businessObject.maybeHost = ['just', diningBsn__2];
				green0Wdg__2.businessObject.maybeHost = ['just', diningBsn__2];

				/////

				//nst bathFig__2 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -15  ]);
				const bathFig__2 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -15  ]);
				const bathBsn__2 = new Room (
					'Fürdő', bathFig__2, [], [],
					[], ['nothing']
				);
				bathBsn__2.title.doTranslation([0, -4.1]);
				const bathWdg__2 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(bathBsn__2);
				bathWdg__2.scale(2);

				const tap0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Csap', '/img-vendor/csap_small.png', [2, 2], [3.4, -13.3]);
				const tube0Wdg__2 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Kád', '/img-vendor/kad.png', [5, 4], [-2, -12.5]);
				//const green0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

				bathBsn__2.escorts.push(tap0Wdg__2.businessObject, tube0Wdg__2.businessObject);
				tap0Wdg__2.businessObject.maybeHost = ['just', bathBsn__2];
				tube0Wdg__2.businessObject.maybeHost = ['just', bathBsn__2];
			}

			break;
		case 3:
			if (this.clearAndTab()) {
				this.tabSelectorDriver.relabelTab('DB', `#${i}`); // @TODO DRY
				this.statusBarDriver.report(`${i}. rekord betöltése`);

				//nst cellarFig__3 = (new Figure(poly1_concave_ccw, {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  4  , -7  ]);
				const cellarFig__3 = (new Figure(poly1_concave_ccw, {fill: 'url(#padlo1_dark)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  4  , -7  ]);
				const cellarBsn__3 = new Room (
					'Pince', cellarFig__3, [], [],
					[], ['nothing']
				);
				cellarBsn__3.title.doTranslation([-1, 4.5]);
				const cellarWdg__3 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(cellarBsn__3);

				const lamp0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -5.7]);
				const bed0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -6.1]);

				cellarBsn__3.escorts.push(bed0Wdg__3.businessObject, lamp0Wdg__3.businessObject);
				bed0Wdg__3.businessObject.maybeHost = ['just', cellarBsn__3]; // @TODO
				lamp0Wdg__3.businessObject.maybeHost = ['just', cellarBsn__3]; // @TODO

				cellarWdg__3.translate([0, 15]);
				cellarWdg__3.updateDownwardAll();


				////////

				/*const transitFig__3 = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , 3  ]);
				const transitBsn__3 = new Room (
					'Közlekedő', transitFig__3, [], [],
					[]
				);
				transitBsn__3.title.doTranslation([0, -1.5]);
				const transitWdg__3 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(transitBsn__3);
				transitWdg__3.scale(2);*/

				////

				//nst diningFig__3 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
				const diningFig__3 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -7  ]);
				diningFig__3.doTranslation([0, 6]);
				const diningBsn__3 = new Room (
					'Ebédlő', diningFig__3, [], [],
					[], ['nothing']
				);
				diningBsn__3.title.doTranslation([0, -2.3]);
				const diningWdg__3 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(diningBsn__3);
				diningWdg__3.scale(2);

				const tableChairs0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [4, 3], [-1, 1.1]);
				const green0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, 1.2]);

				diningBsn__3.escorts.push(tableChairs0Wdg__3.businessObject, green0Wdg__3.businessObject);
				tableChairs0Wdg__3.businessObject.maybeHost = ['just', diningBsn__3];
				green0Wdg__3.businessObject.maybeHost = ['just', diningBsn__3];

				/////

				//nst bathFig__3 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([-3, -15]);
				const bathFig__3 = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([-3, -15]);
				bathFig__3.doTranslation([0, 2.8]);
				bathFig__3.doScale(2);
				const bathBsn__3 = new Room (
					'Fürdő', bathFig__3, [], [],
					[], ['nothing']
				);
				bathBsn__3.title.doTranslation([-2, -6.8]);
				const bathWdg__3 = this.canvasPseudoWidgets[3].figureWidgetFactory.createFromBusiness0(bathBsn__3);
				bathWdg__3.scale(2);

				const tap0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Csap', '/img-vendor/csap_small.png', [4, 4], [7, -13.3]);
				const tube0Wdg__3 = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Kád', '/img-vendor/kad.png', [10, 8], [-2, -12.5]);
				//const green0Wdg = this.canvasPseudoWidgets[3].imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

				bathBsn__3.escorts.push(tap0Wdg__3.businessObject, tube0Wdg__3.businessObject);
				tap0Wdg__3.businessObject.maybeHost = ['just', bathBsn__3];
				tube0Wdg__3.businessObject.maybeHost = ['just', bathBsn__3];
			}

			break;
		default:
			this.statusBarDriver.report(`<span class="error">${i}. rekord nem létezik!</span>`); // @TODO a helper for error messages, maybe inside or alongside `QuoteHelper`
			this.audioODriver.error();
			break;
	}
};

LoaderController.prototype.prepareAndConfirm = function ()
{
	const loaderCanvasPsWdg = this.canvasPseudoWidgets[3];
	const hostlessWidgets = loaderCanvasPsWdg.hostlessWidgets();
	const flag = hostlessWidgets.length == 0 || confirm('Elveszhetik meglévő munkád?');
	return flag ? just(hostlessWidgets) : nothing;
};

LoaderController.prototype.clearAndTab = function ()
{
	return maybe(
		false,
		hostlessWidgets => {
			hostlessWidgets.map(widget => widget.delete());
			this.tabSelectorDriver.switchTo('DB');
			return true;
		},
		this.prepareAndConfirm()
	);
};

/*LoaderController.prototype.clear = function (hostlessWidgets)
{
	//this.canvasPseudoWidgets[3].clear(); // @TODO code smell: magic number @TODO does not work! Investigate!
	console.log('Vászontörlés');
	const board         = this.canvasPseudoWidgets[3].arbitrary.bijectionSvgToGeom,
	      businessBoard = this.canvasPseudoWidgets[3].arbitrary.partialFunctionGeomToBusiness,
	      svgLowLevel   = this.canvasPseudoWidgets[3].arbitrary.svgLowLevel; // @TODO svgLowlevel is not a class, it communicates via global functions, not methods

	board.deleteAll();
	businessBoard.clear();
	svgLowLevel.deleteAllPolygonChildren();  // @TODO svgLowlevel is not a class, it communicates via global functions, not methods
};*/

LoaderController.prototype.error      = function () {this.loaderDriver.message('Nem természetes szám!');};
LoaderController.prototype.clearError = function () {this.loaderDriver.message('');};
LoaderController.prototype.rewrite    = function (str) {this.loaderDriver.loaderIdField.value = str;};
LoaderController.prototype.cancel     = function ()
{
	this.rewrite('');
	this.clearError();
	this.statusBarDriver.report('ID visszavonása');
	this.focusID();
};

LoaderController.prototype.focusID = function () {this.loaderDriver.focus('loaderIdField');};
