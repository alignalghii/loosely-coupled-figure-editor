var Eq = {
	eq: function (a, b)
	{
		if (a == null && b == null) return true;
		if (a == null && b != null) return false;
		if (a != null && b == null) return false;
		if (a != null && b != null) {
			if (typeof a == 'object' && typeof b == 'object') return Eq.subobject(a, b) && Eq.subobject(b, a);
			if (typeof a == 'object' && typeof b != 'object') return false;
			if (typeof a != 'object' && typeof b == 'object') return false;
			if (typeof a != 'object' && typeof b != 'object') return a == b;
		}
	},

	subobject: function (as, bs)
	{
		var flag = true;
		for (let i in as) {
			if (as.hasOwnProperty(i)) {
				flag = flag && (i in bs) && bs.hasOwnProperty(i) && Eq.eq(as[i], bs[i]);
			}
		}
		return flag;
	},

	flatObjectCopy: function (ob)
	{
		var resOb = {};
		for (let prop in ob) resOb[prop] = ob[prop];
		return resOb;
	},

	flatListCopy: function (lst) {return lst.map((i) => i);},

	obListCopy: function (obList) {return obList.map(Eq.flatObjectCopy);}
}
