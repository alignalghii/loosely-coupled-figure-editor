function TabSelectorDriver(aDocument, domHelper)
{
	this.domHelper = domHelper;

	this.canvasTabSelector = aDocument.getElementById('canvasTabSelector');

	this.tab_schema    = aDocument.getElementById('tab_schema'   );
	this.tab_furniture = aDocument.getElementById('tab_furniture');
	this.tab_slit      = aDocument.getElementById('tab_slit'     );

	this.canvas_schema    = aDocument.getElementById('svgRoot_menuCanvas'  );
	this.canvas_furniture = aDocument.getElementById('svgRoot_menuCanvas_2');
	this.canvas_slit      = aDocument.getElementById('svgRoot_menuCanvas_3');

	this.names       = ['schema', 'furniture', 'slit'];

	this.switchTo('schema');
}

TabSelectorDriver.prototype.initTabElemsList = function ()
{
	this.tabElemsList = [];
	for (let tabElem of this.canvasTabSelector.children) {
		this.tabElemsList.push(tabElem);
	}
};

TabSelectorDriver.prototype.pipeToSM = function (dispatch)
{
	const selectTab = event =>
	{
		const target = event.target;
		if (/tab_(.*)/.test(target.id)) {
			const [_, tabName] = /tab_(.*)/.exec(target.id);
			dispatch('click', ['void'], {tabName: tabName});
		}
	}
	this.canvasTabSelector.addEventListener('click', selectTab);
};

TabSelectorDriver.prototype.tabLabel = function (tabName) {return this[`tab_${tabName}`].innerHTML;};
TabSelectorDriver.prototype.switchTo = function (tabName)
{
	this.names.map(
		name => name == tabName ? this.show(name) : this.hide(name)
	);
};

TabSelectorDriver.prototype.show = function (name)
{
	this['tab_' + name].className = 'pressed';
	this.domHelper.show(this['canvas_' + name]);
};

TabSelectorDriver.prototype.hide = function (name)
{
	this['tab_' + name].className = '';
	this.domHelper.hide(this['canvas_' + name]);
};
