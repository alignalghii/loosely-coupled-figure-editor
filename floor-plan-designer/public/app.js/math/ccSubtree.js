function ccSubtree(a, b)
{
	if (typeof a == 'number' && typeof b == 'number') return Math.abs(a-b) < ccEpsilon
	if (a === null || b === null) throw 'Equality for null is a debated thing, see SQL vs JS interpretation';
	if (typeof a == 'object' && a !== null && typeof b == 'object' && b !== null) {
		var is = true;
		for (i in a) is = is && (i in b) && ccSubtree(a[i], b[i]);
		return is;
	}
	if (typeof a == typeof b) return a == b;
	throw '`ccSubtree` type error with `a`: ' + typeof a + ' and `b`: ' + typeof b;
}

function ccTreeEq(a, b) {return ccSubtree(a, b) && ccSubtree(b, a);}


function subtree(a, b)
{
	if (a === null || b === null) throw 'Equality for null is a debated thing, see SQL vs JS interpretation';
	if (typeof a == 'object' && a !== null && typeof b == 'object' && b !== null) {
		var is = true;
		for (i in a) is = is && (i in b) && subtree(a[i], b[i]);
		return is;
	}
	if (typeof a == typeof b) return a == b;
	throw '`subtree` type error with `a`: ' + typeof a + ' and `b`: ' + typeof b;
}

function treeEq(a, b) {return subtree(a, b) && subtree(b, a);}
