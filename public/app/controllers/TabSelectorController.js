function TabSelectorController(tabSelectorDriver, quoteHelper, statusBarDriver) // @TODO Tidy argument order
{
	this.tabSelectorDriver = tabSelectorDriver;
	this.quoteHelper       = quoteHelper;
	this.statusBarDriver   = statusBarDriver;
}

TabSelectorController.prototype.select = function (tabName)
{
	this.tabSelectorDriver.switchTo(tabName);
	this.statusBarDriver.report(`A menüvásznak &bdquo;${this.quoteHelper.name(this.tabSelectorDriver.tabLabel(tabName))}&rdquo; fülecskéjét kiválasztottad`); // @TODO the message text should be modularized out to a view module
};
