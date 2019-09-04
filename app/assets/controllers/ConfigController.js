function ConfigController(state, configDriver, statusBarDriver)
{
	this.state           = state;

	this.configDriver    = configDriver;
	this.statusBarDriver = statusBarDriver; // not used yet

	this.configDriver.checkOrUncheckAreaInvarianceCheckbox(this.state.areaInvariance);
}

ConfigController.prototype.setAreaInvariance = function (flag) {this.state.areaInvariance = flag;};
