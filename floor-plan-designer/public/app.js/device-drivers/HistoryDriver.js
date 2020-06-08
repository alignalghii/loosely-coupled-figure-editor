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

HistoryDriver.prototype.disableUndo  = function (flag) {this.disable(this.undoButton, flag);};
HistoryDriver.prototype.disableRedo  = function (flag) {this.disable(this.redoButton, flag);};

HistoryDriver.prototype.disable  = function (button, flag)
{
	button.disabled = flag;
	button.style['background-color'] = flag ? 'blue' : 'pink';
};
