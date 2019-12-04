function IntervalBehavior () {}

IntervalBehavior.prototype.shouldTestIntervalBehavior= function () {return this.shouldUnion()};

IntervalBehavior.prototype.shouldUnion = function ()
{
	const intervals_empty_actual   = Interval.prototype.union([]),
	      intervals_empty_expected = [];
	const intervals_discrete_actual   = Interval.prototype.union([new Interval(1, 4), new Interval(5, 7), new Interval(9, 11), new Interval(12, 13)]),
	      intervals_discrete_expected = [new Interval(1, 4), new Interval(5, 7), new Interval(9, 11), new Interval(12, 13)];
	const intervals_mixed_actual   = Interval.prototype.union([new Interval(1, 4), new Interval(3, 6), new Interval(5, 9), new Interval(12, 13)]),
	      intervals_mixed_expected = [new Interval(1, 9), new Interval(12, 13)];
	return true &&
		treeEq(intervals_empty_actual   , intervals_empty_expected   ) &&
		treeEq(intervals_discrete_actual, intervals_discrete_expected) &&
		treeEq(intervals_mixed_actual   , intervals_mixed_expected   ) &&
		true;
};
