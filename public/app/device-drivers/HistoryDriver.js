function HistoryDriver (aDocument)
{
	this.undoButton = aDocument.getElementById('undo');
	this.redoButton = aDocument.getElementById('redo');
}


HistoryDriver.prototype.pipeToSM = function (dispatch)
{
	const clickUndo = event => dispatch('click', ['void'], {historyAction: 'undo'});
	this.undoButton.addEventListener('click', clickUndo);
};
