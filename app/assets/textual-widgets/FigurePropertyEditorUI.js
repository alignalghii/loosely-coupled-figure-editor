function FigurePropertyEditorUI(aDocument, router)
{
	this.router = router;
	this.document = aDocument;

	this.figurePropertyEditor = this.document.getElementById('figurepropertyeditor');
}

FigurePropertyEditorUI.prototype.pipeToSM = function ()
{
	const changeInput = event =>
	{
		const target = event.target;
		const [fullMatch, edgeSubmatch, invarianceSubmatch] = /edge_(.*)|(areainvariance)/.exec(target.id);
		if ( edgeSubmatch && !invarianceSubmatch) this.router.dispatch('change', ['edge', 'number'], {edge: parseInt(edgeSubmatch), value: Number(target.value)});
		if (!edgeSubmatch &&  invarianceSubmatch) this.router.dispatch('change', ['areaInvariance', 'bool'], {areaInvariance: target.checked});
		if ( edgeSubmatch &&  invarianceSubmatch || !edgeSubmatch && !invarianceSubmatch) throw 'Change event piping bug';
	}
	this.figurePropertyEditor.addEventListener('change', changeInput);
};
