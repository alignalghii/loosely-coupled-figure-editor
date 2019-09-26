function Controller () {} // abstract

Controller.prototype.widgetFactoryForEitherTarget = function (eitherTarget) {return this.widgetFactoryForCanvas(canvasOfEitherTarget(eitherTarget));};
Controller.prototype.widgetFactoryForCanvas       = function (canvas      ) {return selectWidgetFactoryForCanvas(canvas, this.widgetFactories     );};

Controller.prototype.jumpWidgetToIfNeeded = function (targetCanvas, targetBoard, targetBusinessBoard)
{
	const targetWidgetFactory = this.widgetFactoryForCanvas(targetCanvas);
	const targetCoordSysTransfomer = targetWidgetFactory.coordSysTransformer; // @TODO: in the `Widget` class, use widgetfactory as a component/collaborator instead of coordSysTransformer!
	return maybeMap(
		jumpingWidget => {
			const isHostless = jumpingWidget.isHostless();
			if (isHostless) {
				jumpingWidget.jumpTo(targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
				this.statusBarDriver.report('Alakzat átugrasztása vásznak között!');
			} else {
				this.statusBarDriver.report('Gazdaobjektuma nélkül nem ugrasztható át!');
			}
			return isHostless;
		},
		this.maybeJumpingWidget(targetCanvas)
	);
};

Controller.prototype.maybeJumpingWidget = function (targetCanvas)
{
	return this.state.prevWidget && this.state.prevWidget.low.parentNode != targetCanvas
	     ? ['just', this.state.prevWidget]
	     : ['nothing'];
};


Controller.prototype.widgetDirectlyOrViaTitle = function (widget)
{
	return maybe_exec(
		()  => {
			const widgetFactory = this.widgetFactoryForEitherTarget(['right', widget]); // @TODO code smell. Should exist both widgetFactoryForCanvas and widgetFactoryForWidget
			const room = widget.high.host; // @TODO what if host is not a room
			this.statusBarDriver.report(`Szoba címére kattintottál (&bdquo;${room.title.name}&rdquo;), a hozzátartozó szobát veszem. Magát a címet sajnos egyelőre csak a tulajdonság szerkesztáben szerkesztheted át, itt helyben közvetlenül még nem 😞💣🗲🌧💧`);
			return widgetFactory.createFigureWidgetFromMedium(room.figure);
		},
		domainObject => {
			if (!widget.high.vertices || !domainObject.title.name) throw 'Tervezési hiba!'; // @TODO: hogy a legjobb? Lekezelni? Kivételt dobni? Loggolni? Áttervezni? Milyen mély a tervezési probléma?
			this.statusBarDriver.report('Közvetlenül magára a szobára kattintottál, minden világos.');
			return widget;
		},
		widget.maybeDomainObject
	);
};
