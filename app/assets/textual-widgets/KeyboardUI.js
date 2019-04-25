function KeyboardUI(aDocument, stateMachine)
{
	this.stateMachine = stateMachine;
	this.document = aDocument;
}

KeyboardUI.prototype.pipeToSM = function ()
{
	var keyboardUI = this;
	function keyOperation(keyboardEvent)
	{
		var key = keyboardEvent.key;
		keyboardUI.stateMachine.transition('keydown', ['string'], {key:key});
	}
	this.document.addEventListener('keydown', keyOperation);
};
