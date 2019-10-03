// @TODO: Merge with `low-level/DOM-manipulation` module

function DomHelper() {}

DomHelper.prototype.show = elem => {elem.style.display = ''};
DomHelper.prototype.hide = elem => {elem.style.display = 'none'};

//@TODO put under the class, do not let it to remin a global function. Widget::jumpTo uses it for dasharray transformation

const attributeListMap = (f, attrList) => attrList.split(' ').map(n => f(Number(n))).join(' ');
      calcWithAttr     = (f, attr    ) => String(f(Number(attr)));
