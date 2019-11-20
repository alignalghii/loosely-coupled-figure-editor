function ConfigController(state, configDriver, tabSelectorDriver, statusBarDriver)
{
	this.state           = state;

	this.configDriver    = configDriver;
	this.tabSelectorDriver = tabSelectorDriver;
	this.statusBarDriver = statusBarDriver; // not used yet

	this.configDriver.checkOrUncheckAreaInvarianceCheckbox(this.state.areaInvariance);
	this.configDriver.checkOrUncheckIsRelativeCheckbox    (this.state.isRelative    );

	this.configDriver.checkOrUncheckIsAdmin               (this.state.isAdmin       );
	this.redesignByPrivileges(this.state.isAdmin);
}

ConfigController.prototype.setAreaInvariance = function (flag) {this.state.areaInvariance = flag;};
ConfigController.prototype.setIsRelative     = function (flag) {this.state.isRelative     = flag;};

ConfigController.prototype.setIsAdmin        = function (flag) {this.state.isAdmin        = flag; this.redesignByPrivileges(flag);};
ConfigController.prototype.redesignByPrivileges = function (flag)
{
	this.tabSelectorDriver.enDisAbleTab('schema', flag);
	if (!this.state.isAdmin)
		this.tabSelectorDriver.switchTo('DB', flag);
};
