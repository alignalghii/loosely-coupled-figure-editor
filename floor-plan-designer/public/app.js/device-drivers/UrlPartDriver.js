function UrlPartDriver(aWindow)
{
	this.window = aWindow;
	this.maybeToken = this.detectMaybeToken();
}

UrlPartDriver.prototype.detectMaybeToken = function ()
{
	const tokenOrNull = new URLSearchParams(this.window.location.search).get('token');
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
	const urlHistoryPop = event => this.window.console.log('Pop state');
	window.addEventListener('popstate', urlHistoryPop); // @TODO: not working
};
