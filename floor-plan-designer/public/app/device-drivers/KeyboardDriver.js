function KeyboardDriver(aDocument) {this.document = aDocument;}

KeyboardDriver.prototype.pipeToSM = function (dispatch)
{
	const keyOperation = keyboardEvent => dispatch('keydown', ['string'], {key: keyboardEvent.key});
	this.document.addEventListener('keydown', keyOperation);
};
