function CcSubtreeBehavior() {}

CcSubtreeBehavior.prototype.shouldTestCcSubtreeBehavior = function () {return this.shouldCcSubtree() && this.shouldCcTreeEq() && this.shouldSubtree() && this.shouldTreeEq();};

CcSubtreeBehavior.prototype.shouldCcSubtree = function ()
{
	var exceptionFlag = true;
	try {ccSubtree(null, 12);} catch (a) {if (a != 'Equality for null is a debated thing, see SQL vs JS interpretation') exceptionFlag = false;}
	try {ccSubtree('a' , 12);} catch (a) {if (!/`ccSubtree` type error/.test(a)) exceptionFlag = false;}
	return true &&
		exceptionFlag &&
		ccSubtree(0.99999, 1.0000001) && ccSubtree(1, 1) && !ccSubtree(1.01, 0.09) &&
		ccSubtree("alma", "alma") && !ccSubtree("Alma", "alma") &&
		ccSubtree([], []) && ccSubtree({}, {}) &&
		ccSubtree([], [12]) && ccSubtree({}, {u:12}) && !ccSubtree([12], []) && !ccSubtree({u:12}, {}) && ccSubtree([12], [12]) && ccSubtree({u:12}, {u:12}) && !ccSubtree([12], [13]) && !ccSubtree({u:12}, {u:13}) && !ccSubtree({u:12}, {v:12}) && ccSubtree([11.9999999], [12.000001]) && ccSubtree({u:11.999999}, {u:12.000001}) &&
		ccSubtree([], [12, 13]) && ccSubtree([11.99999], [12.00001, 13]) && !ccSubtree([13], [12, 13]) && ccSubtree([12, 13], [12, 13]) && ccSubtree({}, {u:12}) && !ccSubtree([12, 13], [12]) &&
		true;
};


CcSubtreeBehavior.prototype.shouldCcTreeEq = function ()
{
	var exceptionFlag = true;
	try {ccTreeEq(null, 12);} catch (a) {if (a != 'Equality for null is a debated thing, see SQL vs JS interpretation') exceptionFlag = false;}
	try {ccTreeEq('a' , 12);} catch (a) {if (!/`ccSubtree` type error/.test(a)) exceptionFlag = false;}
	return true &&
		 exceptionFlag &&
		 ccTreeEq(0.99999, 1.0000001) && ccTreeEq(1, 1) && !ccTreeEq(1.01, 0.09) &&
		 ccTreeEq("alma", "alma") && !ccTreeEq("Alma", "alma") &&
		 ccTreeEq([], []) && ccTreeEq({}, {}) &&
		!ccTreeEq([], [12]) && !ccTreeEq({}, {u:12}) && !ccTreeEq([12], []) && !ccTreeEq({u:12}, {}) && ccTreeEq([12], [12]) && ccTreeEq({u:12}, {u:12}) && !ccTreeEq([12], [13]) && !ccTreeEq({u:12}, {u:13}) && !ccTreeEq({u:12}, {v:12}) && ccTreeEq([11.9999999], [12.000001]) && ccTreeEq({u:11.999999}, {u:12.000001}) &&

		 ccTreeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "majom", {x:5.5}]]}) &&
		 ccTreeEq({w:'a', z:[12.699999, [false, "majom", {x:5.4999999}]]}, {w:'a', z:[12.700001, [false, "majom", {x:5.500001}]]}) &&
		!ccTreeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "Majom", {x:5.5}]]}) &&
		!ccTreeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "majom", {x:5.51}]]}) &&
		true;
};

CcSubtreeBehavior.prototype.shouldSubtree = function ()
{
	var exceptionFlag = true;
	try {subtree(null, 12);} catch (a) {if (a != 'Equality for null is a debated thing, see SQL vs JS interpretation') exceptionFlag = false;}
	try {subtree('a' , 12);} catch (a) {if (!/`subtree` type error/.test(a)) exceptionFlag = false;}
	return true &&
		exceptionFlag &&
		!subtree(0.99999, 1.0000001) && subtree(1, 1) && !subtree(1.01, 0.09) &&
		subtree("alma", "alma") && !subtree("Alma", "alma") &&
		subtree([], []) && subtree({}, {}) &&
		subtree([], [12]) && subtree({}, {u:12}) && !subtree([12], []) && !subtree({u:12}, {}) && subtree([12], [12]) && subtree({u:12}, {u:12}) && !subtree([12], [13]) && !subtree({u:12}, {u:13}) && !subtree({u:12}, {v:12}) && !subtree([11.9999999], [12.000001]) && !subtree({u:11.999999}, {u:12.000001}) &&
		subtree([], [12, 13]) && !subtree([11.99999], [12.00001, 13]) && !subtree([13], [12, 13]) && subtree([12, 13], [12, 13]) && subtree({}, {u:12}) && !subtree([12, 13], [12]) &&
		true;
};


CcSubtreeBehavior.prototype.shouldTreeEq = function ()
{
	var exceptionFlag = true;
	try {treeEq(null, 12);} catch (a) {if (a != 'Equality for null is a debated thing, see SQL vs JS interpretation') exceptionFlag = false;}
	try {treeEq('a' , 12);} catch (a) {if (!/`subtree` type error/.test(a)) exceptionFlag = false;}
	return true &&
		 exceptionFlag &&
		 !treeEq(0.99999, 1.0000001) && treeEq(1, 1) && !treeEq(1.01, 0.09) &&
		 treeEq("alma", "alma") && !treeEq("Alma", "alma") &&
		 treeEq([], []) && treeEq({}, {}) &&
		!treeEq([], [12]) && !treeEq({}, {u:12}) && !treeEq([12], []) && !treeEq({u:12}, {}) && treeEq([12], [12]) && treeEq({u:12}, {u:12}) && !treeEq([12], [13]) && !treeEq({u:12}, {u:13}) && !treeEq({u:12}, {v:12}) && !treeEq([11.9999999], [12.000001]) && !treeEq({u:11.999999}, {u:12.000001}) &&

		 treeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "majom", {x:5.5}]]}) &&
		!treeEq({w:'a', z:[12.699999, [false, "majom", {x:5.4999999}]]}, {w:'a', z:[12.700001, [false, "majom", {x:5.500001}]]}) &&
		!treeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "Majom", {x:5.5}]]}) &&
		!treeEq({w:'a', z:[12.7, [false, "majom", {x:5.5}]]}, {w:'a', z:[12.7, [false, "majom", {x:5.51}]]}) &&
		true;
};
