function Locker (controllerHistoryFollowable, continuousCommandNames)
{
	this.controllerHistoryFollowable = controllerHistoryFollowable; // @TODO in fact, an interface should be use to be typeable
	this.continuousCommandNames      = continuousCommandNames;
};

Locker.prototype.lockCommandIfNecessary = function (command)
{
	if (!this.isLocked(command)) {
		this.controllerHistoryFollowable.saveHistory();
	}
};

Locker.prototype.log      = function (command) {this.controllerHistoryFollowable.state.previousCommand = command;};

Locker.prototype.isLocked = function (command) {return command == this.controllerHistoryFollowable.state.previousCommand && this.continuousCommandNames.indexOf(command) >= 0;}; // @TODO Law of Demeter
