function HistoryDriver (aDocument)
{
	this.undoButton = aDocument.getElementById('loader-new');
}


HistoryDriver.prototype.pipeToSM = function (dispatch)
{
	const clickUndo = event => dispatch('click', ['void'], {historyAction: 'undo'});
	this.undoButton.addEventListener('click', clickUndo);
};
