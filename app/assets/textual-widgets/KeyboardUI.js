function KeyboardUI(aDocument, router)
{
	this.router = router;
	this.document = aDocument;
}

KeyboardUI.prototype.pipeToSM = function ()
{
	var keyboardUI = this;
	function keyOperation(keyboardEvent)
	{
		var key = keyboardEvent.key;
		keyboardUI.router.dispatch('keydown', ['string'], {key:key});
	}
	this.document.addEventListener('keydown', keyOperation);
};
