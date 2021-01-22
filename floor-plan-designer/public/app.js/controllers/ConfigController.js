function ConfigController(state, canvasPseudoWidgets, configDriver, tabSelectorDriver, statusBarDriver)
{
	this.state               = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;

	this.configDriver      = configDriver;
	this.tabSelectorDriver = tabSelectorDriver;
	this.statusBarDriver   = statusBarDriver; // not used yet

	this.configDriver.checkOrUncheckAreaInvarianceCheckbox(this.state.areaInvariance);
	this.configDriver.checkOrUncheckIsRelativeCheckbox    (this.state.isRelative    );

	this.configDriver.checkOrUncheckIsAdmin               (this.state.isAdmin       );
	this.redesignByPrivileges                             (this.state.isAdmin       );

	this.configDriver.checkOrUncheckGrid(this.state.flaggedGrid.a);
	this.maybeSVGs = this.gridSpriteWidget().forceFillIf(this.state.flaggedGrid.a);
}

// Public:

ConfigController.prototype.setAreaInvariance = function (flag) {this.state.areaInvariance = flag;};
ConfigController.prototype.setIsRelative     = function (flag) {this.state.isRelative     = flag;};

ConfigController.prototype.setIsAdmin        = function (flag) {this.state.isAdmin        = flag; this.redesignByPrivileges(flag);};
ConfigController.prototype.redesignByPrivileges = function (flag)
{
	this.tabSelectorDriver.enDisAbleTab('schema', flag);
	if (!this.state.isAdmin)
		this.tabSelectorDriver.switchTo('DB', flag);
};

ConfigController.prototype.setGrid = function (flag)
{
	this.maybeSVGs           = this.gridSpriteWidget()[flag ? 'show' : 'unshow'](this.maybeSVGs);
	this.state.flaggedGrid.a = flag;
};

// Private:

ConfigController.prototype.gridSpriteWidget = function ()
{
	return new GridSpriteWidget(
		this.state.flaggedGrid.b,
		new Sprite(  // @TODO too complicated, pass simply CcanvasPseudoWidget?
			this.canvasPseudoWidgets[4].arbitrary.svgLowLevel,
			this.canvasPseudoWidgets[4].coordSysTransformer(),
			new Pen('blue', 1)
		)
	);
};
