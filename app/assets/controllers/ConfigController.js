function ConfigController(state, aDocument, msgConsole)
{
	this.state          = state;
	this.areaInvariance = aDocument.getElementById('config_areainvariance');
	this.msgConsole     = msgConsole;

	this.areaInvariance.checked = this.state.areaInvariance;
}

ConfigController.prototype.setAreaInvariance = function (flag) {this.state.areaInvariance = flag;};
