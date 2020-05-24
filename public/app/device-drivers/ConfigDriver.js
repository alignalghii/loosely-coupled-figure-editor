function ConfigDriver(aDocument)
{
	this.config         = aDocument.getElementById('config');
	this.areaInvariance = aDocument.getElementById('config_areainvariance');
	this.isRelative     = aDocument.getElementById('config_relativeinsteadofabsolute');
	this.isAdmin        = aDocument.getElementById('config_admin');
	this.isJPEG         = aDocument.getElementById('config_jpeg');
}

ConfigDriver.prototype.pipeToSM = function (dispatch)
{
	const changeInput = event =>
	{
		const target = event.target;
		const type = target.type;
		const [_, optionName] = /config_(.*)/.exec(target.id);
		const typing = {text: 'value', checkbox: 'checked'};
		const valueAccessorName = type in typing ? typing[type] : (() => {throw `Invalid config field type <<${type}>>`;})();
		dispatch('change', ['string', type], {optionName: optionName, value: target[valueAccessorName]});
	}
	this.config.addEventListener('change', changeInput);
};

ConfigDriver.prototype.checkOrUncheckAreaInvarianceCheckbox = function (flag) {this.areaInvariance.checked = flag;};
ConfigDriver.prototype.checkOrUncheckIsRelativeCheckbox     = function (flag) {this.isRelative    .checked = flag;};

ConfigDriver.prototype.checkOrUncheckIsAdmin                = function (flag) {this.isAdmin       .checked = flag;};
ConfigDriver.prototype.checkOrUncheckIsJPEG                 = function (flag) {this.isJPEG        .checked = flag;};
