function StampUI(aDocument, bank, router)
{
	this.router = router;

	this.document = aDocument;
	this.bankSelectList = this.document.getElementById('sampleFigureBank');
	this.bank = bank;

	var bankSelectList = this.bankSelectList;
	function addToMenuItem (namedFigure, i) {createAndAppendChildWithAttrs(bankSelectList, 'option', {value: i}).innerHTML = namedFigure.name;}
	this.bank.namedFigures.map(addToMenuItem);
	bankSelectList.selectedIndex = bank.selected;
}

StampUI.prototype.pipeToSM = function ()
{
	var stampUI = this;
	function changeStamp(event)
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedFigure = stampUI.bank.namedFigures[i].figure;
		stampUI.router.transition('change', ['Figure'], {selectedFigure:selectedFigure});
	}
	this.bankSelectList.addEventListener('change', changeStamp);
};


