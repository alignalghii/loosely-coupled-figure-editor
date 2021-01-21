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

	this.initGrid();
	this.configDriver.checkOrUncheckGrid(
		this.state.maybeGridSpriteWidget.maybe_val(
			false,
			gridSpriteWidget => gridSpriteWidget.isShown()
		)
	);
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

ConfigController.prototype.initGrid = function ()
{
	this.state.maybeGridSpriteWidget.maybe_exec(
		() => {
			const grid             = new Grid(75, 55, 1);
			const sprite           = new Sprite(this.canvasPseudoWidgets[4].arbitrary.svgLowLevel, this.canvasPseudoWidgets[4].coordSysTransformer(), 1);
			const gridSpriteWidget = new GridSpriteWidget(grid, sprite);
			this.state.maybeGridSpriteWidget = Maybe.just(gridSpriteWidget);
		},
		_ => Logger.write('Grid has not been yet initiated')
	);
};

ConfigController.prototype.setGrid = function (flag)
{
	this.state.maybeGridSpriteWidget.maybe_exec(
		() => Logger.write('Grid has not been yet initiated'),
		gridSpriteWidget => gridSpriteWidget[flag ? 'show' : 'unshow']()
	);
};
