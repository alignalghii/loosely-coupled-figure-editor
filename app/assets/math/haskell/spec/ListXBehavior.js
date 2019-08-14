function ListXBehavior() {}

ListXBehavior.prototype.shouldTestListXBehavior = function () {return this.shouldDescartesProduct() && this.shouldDescartesWith() && this.shouldConsX() && this.shouldAppend() && this.shouldUncons() && this.shouldListBind() && this.shouldZipWith() && this.shouldHomogenityByEq() && this.shouldIsHomogenousByEq();};


ListXBehavior.prototype.shouldDescartesProduct = function ()
{
	var letters = ['a', 'b', 'c'], numbers = [1, 2];
	return true &&
		vecEq(descartesProduct([], []), []) && vecEq(descartesProduct([12], []), []) && vecEq(descartesProduct([], [13]), []) &&
		vecEq(descartesProduct(letters, numbers), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]) &&
		vecEq(letters, ['a', 'b', 'c']) && vecEq(numbers, [1, 2]) &&
		true;
};

ListXBehavior.prototype.shouldDescartesWith = function ()
{
	var letters = ['a', 'b', 'c'], numbers = [1, 2];
	function mathTyp(letter, num) {return '⟨⌜' + letter + '⌝, ' + num + '⟩';}
	return true &&
		vecEq(descartesWith(mathTyp, [], []), []) && vecEq(descartesWith(mathTyp, [12], []), []) && vecEq(descartesWith(mathTyp, [], [13]), []) &&
		vecEq(descartesWith(mathTyp, letters, numbers), ['⟨⌜a⌝, 1⟩', '⟨⌜a⌝, 2⟩', '⟨⌜b⌝, 1⟩', '⟨⌜b⌝, 2⟩', '⟨⌜c⌝, 1⟩', '⟨⌜c⌝, 2⟩']) &&
		vecEq(letters, ['a', 'b', 'c']) && vecEq(numbers, [1, 2]) &&
		true;
};

ListXBehavior.prototype.shouldConsX = function ()
{
	var a = 'a';
	var as = ['x', 'y'];
	return vecEq(consX(a, as), ['a', 'x', 'y']) && a == 'a' && vecEq(as, ['x', 'y']);
};

ListXBehavior.prototype.shouldAppend = function ()
{
	var as = ['a', 'b'];
	var xs = ['x', 'y'];
	return vecEq(append(as, xs), ['a', 'b', 'x', 'y']) && vecEq(as, ['a', 'b']) && vecEq(xs, ['x', 'y']);
};

ListXBehavior.prototype.shouldUncons = function ()
{
	return true &&
	vecEq(uncons([]), ['nothing']) &&
	vecEq(uncons([12]), ['just', [12, []]]) &&
	vecEq(uncons([12, 15]), ['just', [12, [15]]]) &&
	vecEq(uncons([12, 15, 20]), ['just', [12, [15, 20]]]) &&
	true;
};

ListXBehavior.prototype.shouldListBind = () => vecEq(listBind([{edges: [1,2,3]}, {edges: [10,20,30]}], pack => pack.edges), [1, 2, 3, 10, 20, 30]);

ListXBehavior.prototype.shouldZipWith = function ()
{
	return true &&
	vecEq(zipWith((a, b) => a + b, [1, 3, 67], [4, 12, 88]), [5, 15, 155]) &&
	vecEq(zipWith((a, b) => a + b, [1, 3], [4, 12, 88]), [5, 15]) &&
	vecEq(zipWith((a, b) => a + b, [1, 3, 67], [4, 12]), [5, 15]) &&
	true;
};

// @TODO: not used: ratioEq would have used it, but its new implementation does not use it
ListXBehavior.prototype.shouldIsHomogenousByEq = function ()
{
	const absEq = (a, b) => Math.abs(a) == Math.abs(b);
	return true &&
	 isHomogenousByEq(absEq, [2, -2, 2, 2, -2]) &&
	!isHomogenousByEq(absEq, [2, -2, 3, 2, -2]) &&

	 isHomogenousByEq(absEq, []) &&
	 isHomogenousByEq(absEq, [3]) &&
	true;
}

ListXBehavior.prototype.shouldHomogenityByEq = function ()
{
	const absEq = (a, b) => Math.abs(a) == Math.abs(b);
	return true &&
	vecEq(homogenityByEq(absEq, [2, -2, 2, 2, -2]), ['just', ['just', 2]]) &&
	vecEq(homogenityByEq(absEq, [2, -2, 3, 2, -2]), ['nothing']          ) &&

	vecEq(homogenityByEq(absEq, [] ), ['just', ['nothing']]) &&
	vecEq(homogenityByEq(absEq, [3]), ['just', ['just', 3]]) &&
	true;
}
