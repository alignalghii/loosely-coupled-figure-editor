function EqOrDiffBehavior () {}

EqOrDiffBehavior.prototype.shouldPassAll = function ()
{
	return true &&
		this.shouldAcceessEq() && this.shouldAccessDiff() &&
		this.shouldCompareValEq() && this.shouldCompareValDiff() && this.shouldCompareObEq() && this.shouldCompareObDiff() &&
		this.shouldMap_shallow() && this.shouldMap_deep() &&
		true;
};

EqOrDiffBehavior.prototype.shouldAcceessEq  = () => EqOrDiff.eq  (10    ).eqOrDiff(n => n + 1, (a, b) => a + b) == 11;
EqOrDiffBehavior.prototype.shouldAccessDiff = () => EqOrDiff.diff(10, 20).eqOrDiff(n => n + 1, (a, b) => a + b) == 30;

EqOrDiffBehavior.prototype.shouldCompareValEq   = () => EqOrDiff.compare(10, 10).eqOrDiff(n => n + 1, (a, b) => a + b) == 11;
EqOrDiffBehavior.prototype.shouldCompareValDiff = () => EqOrDiff.compare(10, 20).eqOrDiff(n => n + 1, (a, b) => a + b) == 30;

// @TODO Debated (because of typing: Either and Tupe does not consist of homogenous types, List does. EqOrDiff becomes to be undecided in this aspect, if we add a compare method:

EqOrDiffBehavior.prototype.shouldCompareObEq = function ()
{
	const ob = {};
	return EqOrDiff.compare(ob, ob).eqOrDiff(o => 1, (o1, o2) => 2) == 1;
};

EqOrDiffBehavior.prototype.shouldCompareObDiff = () => EqOrDiff.compare({}, {}).eqOrDiff(o => 1, (o1, o2) => 2) == 2;


// @TODO Debated (because of typing: Either and Tupe does not consist of homogenous types, List does. EqOrDiff becomes to be undecided in this aspect, if we add a map method:

EqOrDiffBehavior.prototype.shouldMap_shallow = () =>
	EqOrDiff.eq(7) .map_shallow(n => n + 1).eqOrDiff(n => n + 2, (a, b) => a + b) == 10 &&
	EqOrDiff.diff(13, 14).map_shallow(n => n + 1).eqOrDiff(n => n + 2, (a, b) => a + b) == 29 &&
	EqOrDiff.diff(-7, 7).map_shallow(n => n ** 2).eqOrDiff(n => n + 2, (a, b) => a + b) == 98 &&
	true;

EqOrDiffBehavior.prototype.shouldMap_deep = () =>
	EqOrDiff.eq(7) .map_deep(n => n + 1).eqOrDiff(n => n + 2, (a, b) => a + b) == 10 &&
	EqOrDiff.diff(13, 14).map_deep(n => n + 1).eqOrDiff(n => n + 2, (a, b) => a + b) == 29 &&
	EqOrDiff.diff(-7, 7).map_deep(n => n ** 2).eqOrDiff(n => n + 2, (a, b) => a + b) == 51 &&
	true;
