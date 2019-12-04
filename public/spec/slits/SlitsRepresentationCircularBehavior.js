function SlitsRepresentationCircularBehavior () {}


SlitsRepresentationCircularBehavior.prototype.shouldTestSlitsRepresentationCircularBehavior = function ()
{
	return true &&
	this.shouldConstructor_valid1  () &&
	this.shouldConstructor_invalid1() &&
	this.shouldIsValid_valid1  () &&
	this.shouldIsValid_invalid1() &&
	this.shouldIsValid_invalid2() &&
	this.shouldIsValid_invalid3() &&
	this.shouldNormalize() &&
	this.shouldSort() &&
	this.shouldMergedIntervals() &&
	this.shouldDasharrayHigh() &&
	true;
};



SlitsRepresentationCircularBehavior.prototype.shouldConstructor_valid1 = function ()
{
	let flag = true;
	try {
		new SlitsRepresentationCircular(16, [new CircularSlit(2, 1), new CircularSlit(6, 1), new CircularSlit(10, 1), new CircularSlit(14, 1)], just(0.1));
	} catch (e) {
		this.rethrowWhenForeignError(e); // @TODO I should plan my own exception class(es)
		flag = false;
	}
	return flag;
};

SlitsRepresentationCircularBehavior.prototype.shouldConstructor_invalid1 = function ()
{
	let flag = true;
	try {
		new SlitsRepresentationCircular(16, [new CircularSlit(2, 3), new CircularSlit(6, 1), new CircularSlit(10, 1), new CircularSlit(14, 3)], just(0.1));
	} catch (e) {
		this.rethrowWhenForeignError(e); // @TODO I should plan my own exception class(es)
		flag = false;
	}
	return !flag;
};

SlitsRepresentationCircularBehavior.prototype.shouldIsValid_valid1 = function ()
{
	const slitsRepresentationCircular = new SlitsRepresentationCircular(16, [], just(0.1));
	slitsRepresentationCircular.circularSlits = [new CircularSlit(2, 1), new CircularSlit(6, 1), new CircularSlit(10, 1), new CircularSlit(14, 1)];
	return slitsRepresentationCircular.isDistanceValid();
};

SlitsRepresentationCircularBehavior.prototype.shouldIsValid_invalid1 = function ()
{
	const slitsRepresentationCircular = new SlitsRepresentationCircular(16, [], just(0.1));
	slitsRepresentationCircular.circularSlits = [new CircularSlit(2, 3), new CircularSlit(6, 1), new CircularSlit(10, 1), new CircularSlit(14, 3)];
	return !slitsRepresentationCircular.isDistanceValid();
};

SlitsRepresentationCircularBehavior.prototype.shouldIsValid_invalid2 = function ()
{
	const slitsRepresentationCircular = new SlitsRepresentationCircular(16, [], just(0.1));
	slitsRepresentationCircular.circularSlits = [new CircularSlit(2, 1), new CircularSlit(10, 1), new CircularSlit(2, 1)];
	return !slitsRepresentationCircular.isDistanceValid();
};

SlitsRepresentationCircularBehavior.prototype.shouldIsValid_invalid3 = function ()
{
	const slitsRepresentationCircular = new SlitsRepresentationCircular(16, [], just(0.1));
	slitsRepresentationCircular.circularSlits = [new CircularSlit(2, 1), new CircularSlit(10, 1), new CircularSlit(2, 1), new CircularSlit(6, 1)];
	return !slitsRepresentationCircular.isDistanceValid();
};

SlitsRepresentationCircularBehavior.prototype.shouldNormalize = function ()
{
	const slitsRepresentationCircular_actual = new SlitsRepresentationCircular(16, [new CircularSlit(2, 1), new CircularSlit(22, 1), new CircularSlit(42, 1), new CircularSlit(62, 1)], just(0.1), false);
	slitsRepresentationCircular_actual.normalize();
	const slitsRepresentationCircular_expected = new SlitsRepresentationCircular(16, [new CircularSlit(2, 1), new CircularSlit(6, 1), new CircularSlit(10, 1), new CircularSlit(14, 1)], just(0.1), false);
	return treeEq(slitsRepresentationCircular_actual, slitsRepresentationCircular_expected);
};

SlitsRepresentationCircularBehavior.prototype.shouldSort = function ()
{
	const slitsRepresentationCircular_actual = new SlitsRepresentationCircular(16, [], just(0.1));
	slitsRepresentationCircular_actual.circularSlits = [new CircularSlit(6, 1), new CircularSlit(14, 1), new CircularSlit( 2, 1), new CircularSlit(10, 1)];
	slitsRepresentationCircular_actual.sort();
	const slitsRepresentationCircular_expected = new SlitsRepresentationCircular(16, [new CircularSlit(2, 1), new CircularSlit( 6, 1), new CircularSlit(10, 1), new CircularSlit(14, 1)], just(0.1));
	return true &&
		treeEq(slitsRepresentationCircular_actual, slitsRepresentationCircular_expected) &&
		slitsRepresentationCircular_actual.circularSlits.length == slitsRepresentationCircular_expected.circularSlits.length &&
		slitsRepresentationCircular_actual.circularSlits.length == 4 &&
		[0, 1, 2, 3].every(i => treeEq(slitsRepresentationCircular_actual.circularSlits[i], slitsRepresentationCircular_expected.circularSlits[i])) &&
		true;
};

SlitsRepresentationCircularBehavior.prototype.shouldMergedIntervals = function ()
{
	const slitsRepresentation = new SlitsRepresentationCircular(20, [new CircularSlit(3, 2), new CircularSlit(5, 1), new CircularSlit(8, 1)], nothing);
	const mergedIntervals_actual = slitsRepresentation.mergedIntervals(),
	      mergedIntervals_expected = [new Interval(1, 6), new Interval(7, 9)];
	return true &&
		treeEq(mergedIntervals_actual, mergedIntervals_expected) &&
		true;
};

SlitsRepresentationCircularBehavior.prototype.shouldDasharrayHigh = function ()
{
	const slitsRepresentation = new SlitsRepresentationCircular(20, [new CircularSlit(3, 2), new CircularSlit(5, 1), new CircularSlit(8, 1)], nothing);
	const dasharrayHigh_actual   = slitsRepresentation.dasharrayHigh(),
	      dasharrayHigh_expected = [1, 5, 1, 2, 11];
	return true &&
		treeEq(dasharrayHigh_actual, dasharrayHigh_expected) &&
		true;
};

SlitsRepresentationCircularBehavior.prototype.homeError               = e => typeof e == 'string' && e == SlitsRepresentationCircular.prototype.errorMsg();
SlitsRepresentationCircularBehavior.prototype.rethrowWhenForeignError = function (e) {if (!this.homeError(e)) throw e;};
