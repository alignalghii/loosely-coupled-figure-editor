function shouldDescartesProduct()
{
	var letters = ['a', 'b', 'c'], numbers = [1, 2];
	return true &&
		vecEq(descartesProduct([], []), []) && vecEq(descartesProduct([12], []), []) && vecEq(descartesProduct([], [13]), []) &&
		vecEq(descartesProduct(letters, numbers), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]) &&
		vecEq(letters, ['a', 'b', 'c']) && vecEq(numbers, [1, 2]) &&
		true;
}

function shouldDescartesWith()
{
	var letters = ['a', 'b', 'c'], numbers = [1, 2];
	function mathTyp(letter, num) {return '⟨⌜' + letter + '⌝, ' + num + '⟩';}
	return true &&
		vecEq(descartesWith(mathTyp, [], []), []) && vecEq(descartesWith(mathTyp, [12], []), []) && vecEq(descartesWith(mathTyp, [], [13]), []) &&
		vecEq(descartesWith(mathTyp, letters, numbers), ['⟨⌜a⌝, 1⟩', '⟨⌜a⌝, 2⟩', '⟨⌜b⌝, 1⟩', '⟨⌜b⌝, 2⟩', '⟨⌜c⌝, 1⟩', '⟨⌜c⌝, 2⟩']) &&
		vecEq(letters, ['a', 'b', 'c']) && vecEq(numbers, [1, 2]) &&
		true;
}

function shouldConsX()
{
	var a = 'a';
	var as = ['x', 'y'];
	return vecEq(consX(a, as), ['a', 'x', 'y']) && a == 'a' && vecEq(as, ['x', 'y']);
}

function shouldAppend()
{
	var as = ['a', 'b'];
	var xs = ['x', 'y'];
	return vecEq(append(as, xs), ['a', 'b', 'x', 'y']) && vecEq(as, ['a', 'b']) && vecEq(xs, ['x', 'y']);
}
