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
	this.reportOK('Natív betöltés sikeres!');
	this.statusBarDriver.report('Natív betöltés');
};
