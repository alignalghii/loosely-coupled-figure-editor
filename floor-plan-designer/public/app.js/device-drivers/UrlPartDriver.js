function UrlPartDriver(windowLocation, window, windowConsole)
{
	// Basic:
	this.windowLocation = windowLocation;
	this.window         = window;
	this.windowConsole  = windowConsole;

	// Derived:
	this.maybeToken  = this.detectMaybeToken();
}

UrlPartDriver.prototype.detectMaybeToken = function ()
{
	const tokenOrNull = new URLSearchParams(this.windowLocation.search).get('token');
	return Maybe.asTruey(tokenOrNull);
};

UrlPartDriver.prototype.addMaybeToken = function (url)
{
	return this.maybeToken.maybe_val(
		url,
		token => `${url}?token=${token}`
	);
};

UrlPartDriver.prototype.pipeToSM = function (dispatch)
{
	const urlHistoryPop = event => this.windowConsole.log('Pop state');
	this.window.addEventListener('popstate', urlHistoryPop); // @TODO: not working
};
