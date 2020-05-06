/** A mixin, because snapshot-based history is not applicable to e.g. `SaveController` (but it may be applicable also to `LoadController`s and `ConfigController`) */

const ControllerMixinHistoryFollowable =
{
	saveHistory: function ()
	{
		const workSerial = this.canvasPseudoWidgets[4].stringSerialize();
		this.state.history.stack.push(workSerial); // @TODO loss of information: push reports whether shifting is necessary
	}
};
