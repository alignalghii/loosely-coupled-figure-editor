function MenuUI(aDocument, bank, stateMachine)
{
	this.stateMachine = stateMachine;

	this.document = aDocument;
	this.bankSelectList = this.document.getElementById('sampleFigureBank');
	this.bank = bank;

	var bankSelectList = this.bankSelectList;
	function addToMenuItem (namedFigure, i) {createAndAppendChildWithAttrs(bankSelectList, 'option', {value: i}).innerHTML = namedFigure.name;}
	this.bank.namedFigures.map(addToMenuItem);
	bankSelectList.selectedIndex = bank.selected;
}

MenuUI.prototype.pipeToSM = function ()
{
	var menuUI = this;
	function changeAccu(event)
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedFigure = menuUI.bank.namedFigures[i].figure;
		menuUI.stateMachine.transition('change', ['Figure'], {selectedFigure:selectedFigure});
	}
	this.bankSelectList.addEventListener('change', changeAccu);
};


