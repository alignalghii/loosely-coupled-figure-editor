function ModeDriver(aDocument)
{
	this.modeRadios = aDocument.getElementById('modes');
	this.opSec = aDocument.getElementById('section-operations');
	this.modeNormal = aDocument.getElementById('modeNormal');

	this.checkNormal();
}

ModeDriver.prototype.pipeToSM = function (dispatch)
{
	const changeMode = event =>
	{
		var target = event.target;
		var mode = /mode(.*)/.exec(target.id)[1].toLowerCase();
		this.opSec.style.visibility = mode == 'compact' ? 'hidden' : 'visible';
		dispatch('change', ['string', 'string'], {input:target.name, mode:mode});
	}
	this.modeRadios.addEventListener('change', changeMode);
};

ModeDriver.prototype.checkNormal = function ()
{
	this.modeNormal.checked = true;
};
