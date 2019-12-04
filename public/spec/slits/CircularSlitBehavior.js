function CircularSlitBehavior () {}

CircularSlitBehavior.prototype.shouldTestCircularSlitBehavior = function () {return this.shouldNormalizeWith();};


CircularSlitBehavior.prototype.shouldNormalizeWith = function (perimeter)
{
	const circularSlit_10By16_actual = new CircularSlit(10, 1);
	circularSlit_10By16_actual.normalizeWith(16);
	const circularSlit_10By16_expected = new CircularSlit(10, 1);

	const circularSlit_10By8_actual = new CircularSlit(10, 1);
	circularSlit_10By8_actual.normalizeWith(8);
	const circularSlit_10By8_expected = new CircularSlit(2, 1);

	const circularSlit_minus2By10_actual = new CircularSlit(-2, 1);
	circularSlit_minus2By10_actual.normalizeWith(10);
	const circularSlit_minus2By10_expected = new CircularSlit(8, 1);
	return true &&
		treeEq(circularSlit_10By16_actual    , circularSlit_10By16_expected    ) &&
		treeEq(circularSlit_10By8_actual     , circularSlit_10By8_expected     ) &&
		treeEq(circularSlit_minus2By10_actual, circularSlit_minus2By10_expected) &&
		true;
};
