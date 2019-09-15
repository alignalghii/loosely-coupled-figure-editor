/** Az ,,fókuszált alakzatokhoz kötődő műveletek'' listájában a gombbal is kezdememényezhető műveletek kattintáskezelése */

function OperationDriver(aDocument)
{
	this.operationItems = aDocument.getElementById('operations');
	aDocument.getElementById('modeNormal').checked = true;
}

OperationDriver.prototype.pipeToSM = function (dispatch)
{
	const clickOperation = event =>
	{
		var target = event.target;
		var operation = /operation(.*)/.exec(target.id)[1].toLowerCase();
		dispatch('click', ['string'], {operation:operation});
	}
	this.operationItems.addEventListener('click', clickOperation);
};
