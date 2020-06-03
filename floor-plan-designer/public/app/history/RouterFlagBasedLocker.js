function RouterFlagBasedLocker (controllerHistoryFollowable, routerFlagNames)
{
	this.controllerHistoryFollowable = controllerHistoryFollowable; // @TODO in fact, an interface should be use to be typeable
	this.routerFlagNames             = routerFlagNames;
};

RouterFlagBasedLocker.prototype.lockIfNecessary = function ()
{
	if (!this.isLocked()) {
		this.controllerHistoryFollowable.saveHistory();
	}
};

RouterFlagBasedLocker.prototype.isLocked = function ()
{
	return this.routerFlagNames.some(
		routerFlagName => this.controllerHistoryFollowable.state[routerFlagName]
	);
}; // @TODO Law of Demeter
