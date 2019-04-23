function OperationUI(aDocument, stateMachine)
{
	this.stateMachine = stateMachine;

	this.document = aDocument;
	this.operationItems = this.document.getElementById('operations');

	this.document.getElementById('modeNormal').checked = true;
}

OperationUI.prototype.pipeToSM = function ()
{
	var operationUI = this;
	function clickOperation(event)
	{
		var target = event.target;
		var operation = /operation(.*)/.exec(target.id)[1].toLowerCase();
		operationUI.stateMachine.transition('click', ['string'], {operation:operation});
	}
	this.operationItems.addEventListener('click', clickOperation);
};
