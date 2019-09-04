function ConfigUI(aDocument, router)
{
	this.router = router;
	this.document = aDocument;

	this.config = this.document.getElementById('config');
}

ConfigUI.prototype.pipeToSM = function ()
{
	const changeInput = event =>
	{
		const target = event.target;
		const type = target.type;
		const [_, optionName] = /config_(.*)/.exec(target.id);
		const typing = {text: 'value', checkbox: 'checked'};
		const valueAccessorName = type in typing ? typing[type] : (() => {throw `Invalid config field type <<${type}>>`;})();
		this.router.dispatch('change', ['string', type], {optionName: optionName, value: target[valueAccessorName]});
	}
	this.config.addEventListener('change', changeInput);
};
