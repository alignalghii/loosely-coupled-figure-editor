function NativeLoaderController (canvasPseudoWidgets, nativeLoaderDriver, tabSelectorDriver, statusBarDriver, audioDriver)
{
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.nativeLoaderDriver  = nativeLoaderDriver;
	this.tabSelectorDriver   = tabSelectorDriver;
	this.statusBarDriver     = statusBarDriver;
	this.audioDriver         = audioDriver;

	this.flag = false;
}

NativeLoaderController.prototype.view = function ()
{
	this.flag = !this.flag;
	this.nativeLoaderDriver[this.flag ? 'show' : 'hide']();
};

NativeLoaderController.prototype.interpret = function ()
{
	try {
		const interpretationObject = JSON.parse(this.nativeLoaderDriver.content());
		this.reportOK('Értelmezhető kód!');
		if (this.clearAndTab()) {
			this.flag = false; // @TODO toggling should belong rather to `NativeLoaderDriver`
			this.nativeLoaderDriver.hide();
			this.tabSelectorDriver.relabelTab('DB', 'Natív betöltés');
			this.load(interpretationObject);
		}
	} catch (e) {
		if (/JSON/.test(e)) {
			this.reportError('Sérült kód!'); // @TODO use `NativeLoaderDriver.prototype.error`
		} else {
			throw e;
		}
	};
}

// @TODO DRY with `LoaderController`: factor out to a `LoaderComponent`
NativeLoaderController.prototype.prepareAndConfirm = function ()
{
	const loaderCanvasPsWdg = this.canvasPseudoWidgets[3];
	const hostlessWidgets = loaderCanvasPsWdg.hostlessWidgets();
	const flag = hostlessWidgets.length == 0 || confirm('Elveszhetik meglévő munkád?');
	return flag ? just(hostlessWidgets) : nothing;
};

// @TODO DRY with `LoaderController`: factor out to a `LoaderComponent`. !!! If it turns out that there must be a little difference, parametrize it out!
NativeLoaderController.prototype.clearAndTab = function ()
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



NativeLoaderController.prototype.reportOK    = function (msg) {this.report(just(true ), msg);};
NativeLoaderController.prototype.reportError = function (msg) {this.report(just(false), msg);};
NativeLoaderController.prototype.reportInfo  = function (msg) {this.report(nothing    , msg);};
NativeLoaderController.prototype.report      = function (maybeStatus, message)
{
	this.nativeLoaderDriver.report(
		message,
		maybe(
			{color: 'initial'},
			status => ({color: status ? 'green' : 'red'}),
			maybeStatus
		)
	);
};

NativeLoaderController.prototype.load = function (interpretationObject)
{
	console.log('Interpretation object:', interpretationObject);

	// @TODO DRY OOP
	interpretationObject.map(
		businessSerialization => this.loadBusiness_fix1(businessSerialization)
	);
	this.reportOK('Natív betöltés sikeres!');
	this.statusBarDriver.report('Natív betöltés');
};

NativeLoaderController.prototype.loadBusiness = function (businessSerialization)
{
	switch (businessSerialization.type) {
		case 'Room':
			const {name: roomName, figure: figureSerialization, circularSlits: circularSlitsSerialization, escorts: roomEscortsSerialization} = businessSerialization;
			const figure = new Figure(figureSerialization.vertices, figureSerialization.svgAttributes);
			const circularSlits = circularSlitsSerialization.map(({center: center, radius: radius}) => new CircularSlit(center, radius)); // @TODO delegate to CircularSlit
			const roomEscorts = roomEscortsSerialization.map(
				escortSerialization => this.loadBusiness(escortSerialization)
			);
			const room = new Room(roomName, figure, roomEscorts, nothing, circularSlits); // `escorts` is temporarily `[]`
			const roomWidget = this.canvasPseudoWidgets[4].figureWidgetFactory.createFromBusiness0(room);
			return room;
		case 'Furniture':
			const {grasp: grasp, sizing: sizing, name: furnitureName, imageFileName: imageFileName} = businessSerialization;
			const furnitureWidget = this.canvasPseudoWidgets[4].imageWidgetFactory.create(furnitureName, imageFileName, sizing, grasp);
			return furnitureWidget.businessObject; // @TODO a furniture be able to have further escorts, here shortcut
		default: throw 'Error';
	}
}

NativeLoaderController.prototype.loadBusiness_fix1 = function (businessSerialization)
{
	switch (businessSerialization.type) {
		case 'Room':
			const {name: roomName, figure: figureSerialization, circularSlits: circularSlitsSerialization, escorts: roomEscortsSerialization} = businessSerialization;
			const figure = new Figure(figureSerialization.vertices, figureSerialization.svgAttributes);
			const circularSlits = circularSlitsSerialization.map(({center: center, radius: radius}) => new CircularSlit(center, radius)); // @TODO delegate to CircularSlit
			const room = new Room(roomName, figure, [], nothing, circularSlits); // `escorts` is temporarily `[]`
			const roomWidget = this.canvasPseudoWidgets[4].figureWidgetFactory.createFromBusiness0(room);
			const roomEscorts = roomEscortsSerialization.map(
				escortSerialization => this.loadBusiness_fix1(escortSerialization)
			);
			room.escorts = roomEscorts;
			return room;
		case 'Furniture':
			const {grasp: grasp, sizing: sizing, name: furnitureName, imageFileName: imageFileName} = businessSerialization;
			const furnitureWidget = this.canvasPseudoWidgets[4].imageWidgetFactory.create(furnitureName, imageFileName, sizing, grasp);
			return furnitureWidget.businessObject; // @TODO a furniture be able to have further escorts, here shortcut
		default: throw 'Error';
	}
}


NativeLoaderController.prototype.loadBusiness_fix2 = function (businessSerialization, maybeHost)
{
	const business = this.loadBusiness_fix2_plan(businessSerialization, maybeHost);
	this.loadBusiness_fix2_execute(business);
}


NativeLoaderController.prototype.loadBusiness_fix2_plan = function (businessSerialization, maybeHost)
{
	switch (businessSerialization.type) {
		case 'Room':
			const {name: roomName, figure: figureSerialization, circularSlits: circularSlitsSerialization, escorts: roomEscortsSerialization} = businessSerialization;
			const figure = new Figure(figureSerialization.vertices, figureSerialization.svgAttributes);
			const circularSlits = circularSlitsSerialization.map(({center: center, radius: radius}) => new CircularSlit(center, radius)); // @TODO delegate to CircularSlit
			const room = new Room(roomName, figure, [], maybeHost, circularSlits); // `escorts` is temporarily `[]`
			const roomEscorts = roomEscortsSerialization.map(
				escortSerialization => this.loadBusiness_fix2_plan(escortSerialization, just(room))
			);
			room.escorts = roomEscorts;
			return room;
		case 'Furniture':
			const {figure: furnitureFigure, name: furnitureName, imageFileName: imageFileName} = businessSerialization;
			return new Furniture(furnitureName, furnitureFigure, imageFileName, [], maybeHost); // @TODO a furniture be able to have further escorts, here shortcut to []
		default: throw 'Error';
	}
}

NativeLoaderController.prototype.loadBusiness_fix2_execute = function (business) // @TODO OOP polymorphism
{
	switch (business.constructor.name) {
		case 'Room':
			const roomWidget = this.canvasPseudoWidgets[4].figureWidgetFactory.createFromBusiness0(business);
			business.escorts.map(
				escort => this.loadBusiness_fix2_execute(escort)
			);
			break;
		case 'Furniture':
			const furnitureWidget = this.canvasPseudoWidgets[4].imageWidgetFactory.createFromBusiness(business);
			// @TODO a furniture be able to have further escorts, here shortcut
			break;
		default: throw `Error: [${business.constructor.name}](${business.constructor.name == 'Furniture'})`;
	}
}
