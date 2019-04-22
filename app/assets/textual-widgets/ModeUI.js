function ModeUI(aDocument, stateMachine)
{
	this.stateMachine = stateMachine;

	this.document = aDocument;
	this.modeRadios = this.document.getElementById('modes');

	this.document.getElementById('modeObsolete').checked = true;
}

ModeUI.prototype.pipeToSM = function ()
{
	var modeUI = this;
	function changeMode(event)
	{
		var target = event.target;
		modeUI.stateMachine.transition('change', ['string', 'string'], {input:target.name, mode:/mode(.*)/.exec(target.id)[1].toLowerCase()});
	}
	this.modeRadios.addEventListener('change', changeMode);
};
