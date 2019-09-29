// @TODO: Merge with `low-level/DOM-manipulation` module

function DomHelper() {}

DomHelper.prototype.show = elem => {elem.style.display = ''};
DomHelper.prototype.hide = elem => {elem.style.display = 'none'};
