function ModeUI(aDocument, stateMachine)
{
	this.stateMachine = stateMachine;

	this.document = aDocument;
	this.modeRadios = this.document.getElementById('modes');

	this.document.getElementById('modeNormal').checked = true;

	this.opSec = this.document.getElementById('section-operations');
}

ModeUI.prototype.pipeToSM = function ()
{
	var modeUI = this;
	function changeMode(event)
	{
		var target = event.target;
		var mode = /mode(.*)/.exec(target.id)[1].toLowerCase();
		modeUI.opSec.style.visibility = mode == 'compact' ? 'hidden' : 'visible'; 
		modeUI.stateMachine.transition('change', ['string', 'string'], {input:target.name, mode:mode});
	}
	this.modeRadios.addEventListener('change', changeMode);
};
