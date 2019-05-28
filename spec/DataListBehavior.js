function DataListBehavior() {}

DataListBehavor.prototype.unshiftClone = function (x, lst) {var lst2 = lst.map((i)=>i); lst2.unshift(x); return lst2;};
DataListBehavor.prototype.pushClone    = function (x, lst) {var lst2 = lst.map((i)=>i); lst2.push   (x); return lst2;};
DataListBehavor.prototype.tailClone    = function (   lst) {var lst2 = lst.map((i)=>i); lst2.shift()   ; return lst2;};
