function FigurePropertyEditorDriver(aDocument)
{
	this.figurePropertyEditor = aDocument.getElementById('figurepropertyeditor');
}

FigurePropertyEditorDriver.prototype.pipeToSM = function (dispatch)
{
	const changeInput = event =>
	{
		const target = event.target;
		const [fullMatch, edgeSubmatch, invarianceSubmatch] = /edge_(.*)|(areainvariance)/.exec(target.id);
		if ( edgeSubmatch && !invarianceSubmatch) dispatch('change', ['edge', 'number'], {edge: parseInt(edgeSubmatch), value: Number(target.value)});
		if (!edgeSubmatch &&  invarianceSubmatch) dispatch('change', ['areaInvariance', 'bool'], {areaInvariance: target.checked});
		if ( edgeSubmatch &&  invarianceSubmatch || !edgeSubmatch && !invarianceSubmatch) throw 'Change event piping bug';
	}
	this.figurePropertyEditor.addEventListener('change', changeInput);
};
