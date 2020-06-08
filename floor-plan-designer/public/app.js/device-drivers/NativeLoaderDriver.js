function NativeLoaderDriver (aDocument)
{
	this.viewButton      = aDocument.getElementById('native-loading');
	this.panel           = aDocument.getElementById('native-load-panel');
	this.area            = aDocument.getElementById('native-load-area');
	this.interpretButton = aDocument.getElementById('interpret-native-load');
	this.statusBar       = aDocument.getElementById('native-load-statusbar');
}

NativeLoaderDriver.prototype.pipeToSM = function (dispatch)
{
	const clickViewNativeLoad = event => dispatch('click', ['void'], {loadAction: 'native'});
	this.viewButton.addEventListener('click', clickViewNativeLoad);

	const clickInterpret = event => dispatch('click', ['void'], {loadAction: 'interpret'});
	this.interpretButton.addEventListener('click', clickInterpret);
}

NativeLoaderDriver.prototype.show = function () {this.panel.style.display = 'initial'; this.area.focus();};
NativeLoaderDriver.prototype.hide = function () {this.panel.style.display = 'none'   ;};

NativeLoaderDriver.prototype.content = function () {return this.area.value;};

NativeLoaderDriver.prototype.report = function (message, stylingOb) // @TODO reuse CSS classes `.error` and `.OK`
{
	for (let name in stylingOb) {
		this.statusBar.style[name] = stylingOb[name];
	}
	this.statusBar.innerHTML = message;
};
