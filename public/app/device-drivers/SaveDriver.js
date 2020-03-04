function SaveDriver(aDocument) {this.saveButton = aDocument.getElementById('loader-save');}

SaveDriver.prototype.pipeToSM = function (dispatch)
{
	const clickSave = event => dispatch('click', ['void'], {saveAction: 'save'});
	this.saveButton.addEventListener('click', clickSave);
}
