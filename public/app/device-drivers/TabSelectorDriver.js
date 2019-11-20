function TabSelectorDriver(aDocument, domHelper)
{
	this.domHelper = domHelper;

	this.canvasTabSelector = aDocument.getElementById('canvasTabSelector');

	this.tab_schema    = aDocument.getElementById('tab_schema'   );
	this.tab_furniture = aDocument.getElementById('tab_furniture');
	this.tab_slit      = aDocument.getElementById('tab_slit'     );
	this.tab_DB        = aDocument.getElementById('tab_DB'       );

	this.canvas_schema    = aDocument.getElementById('svgRoot_menuCanvas'  );
	this.canvas_furniture = aDocument.getElementById('svgRoot_menuCanvas_2');
	this.canvas_slit      = aDocument.getElementById('svgRoot_menuCanvas_3');
	this.canvas_DB        = aDocument.getElementById('svgRoot_menuCanvas_4');

	this.names       = ['schema', 'furniture', 'slit', 'DB'];

	this.switchTo('DB');
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

TabSelectorDriver.prototype.relabelTab = function (name, label) {this['tab_' + name].innerHTML = label;};

TabSelectorDriver.prototype.enDisAbleTab = function (name, flag)
{
	const tab = this['tab_' + name];
	tab.disabled = !flag;
	if (flag) {
		tab.style['background-color'] = '';
		tab.style['color'           ] = '';
		tab.style['font-weight'     ] = '';
	} else {
		tab.style['background-color'] = 'darkgray';
		tab.style['color'           ] = 'darkgray';
	}
};
