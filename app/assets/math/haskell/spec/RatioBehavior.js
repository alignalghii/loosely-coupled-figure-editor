function RatioBehavior () {}

RatioBehavior.prototype.shouldTestRatioBehavior = function () {return this.shouldRatioEqWeak() && this.shouldRatioEqStrict() && this.shouldCcRatioEqWeak() && this.shouldCcRatioEqStrict();};

RatioBehavior.prototype.shouldRatioEqWeak = function ()
{
	return true &&
	 ratioEqWeak([4, 6], [12, 18]) &&
	 ratioEqWeak([0, 0], [12, 18]) &&
	 ratioEqWeak([4, 6], [ 0,  0]) &&
	 ratioEqWeak([0, 0], [ 0,  0]) &&
	 ratioEqWeak([0, 0], [ 1,  0]) &&
	 ratioEqWeak([0, 0], [ 0,  1]) &&
	 ratioEqWeak([1, 0], [ 0,  0]) &&
	 ratioEqWeak([0, 1], [ 0,  0]) &&

	!ratioEqWeak([4, 5], [12, 18]) &&

	!ratioEqWeak([0, 6], [12, 18]) &&
	!ratioEqWeak([4, 0], [12, 18]) &&
	!ratioEqWeak([4, 6], [ 0, 18]) &&
	!ratioEqWeak([4, 6], [12,  0]) &&
	!ratioEqWeak([4, 0], [ 0, 18]) &&
	!ratioEqWeak([0, 6], [12,  0]) &&
	!ratioEqWeak([0, 3], [12, 18]) &&
	true;
};


RatioBehavior.prototype.shouldRatioEqStrict = function ()
{
	return true &&
	 ratioEqStrict([4, 6], [12, 18]) &&
	 ratioEqStrict([0, 0], [12, 18]) &&
	 ratioEqStrict([4, 6], [ 0,  0]) &&
	 ratioEqStrict([0, 0], [ 0,  0]) &&
	!ratioEqStrict([0, 0], [ 1,  0]) &&
	!ratioEqStrict([0, 0], [ 0,  1]) &&
	!ratioEqStrict([1, 0], [ 0,  0]) &&
	!ratioEqStrict([0, 1], [ 0,  0]) &&

	!ratioEqStrict([4, 5], [12, 18]) &&

	!ratioEqStrict([0, 6], [12, 18]) &&
	!ratioEqStrict([4, 0], [12, 18]) &&
	!ratioEqStrict([4, 6], [ 0, 18]) &&
	!ratioEqStrict([4, 6], [12,  0]) &&
	!ratioEqStrict([4, 0], [ 0, 18]) &&
	!ratioEqStrict([0, 6], [12,  0]) &&
	!ratioEqStrict([0, 3], [12, 18]) &&
	true;
};


RatioBehavior.prototype.shouldCcRatioEqWeak = function ()
{
	return true &&

	 ccRatioEqWeak([4, 6], [12, 18]) &&
	 ccRatioEqWeak([0, 0], [12, 18]) &&
	 ccRatioEqWeak([4, 6], [ 0,  0]) &&
	 ccRatioEqWeak([0, 0], [ 0,  0]) &&
	 ccRatioEqWeak([0, 0], [ 1,  0]) &&
	 ccRatioEqWeak([0, 0], [ 0,  1]) &&
	 ccRatioEqWeak([1, 0], [ 0,  0]) &&
	 ccRatioEqWeak([0, 1], [ 0,  0]) &&

	!ccRatioEqWeak([4, 5], [12, 18]) &&

	!ccRatioEqWeak([0, 6], [12, 18]) &&
	!ccRatioEqWeak([4, 0], [12, 18]) &&
	!ccRatioEqWeak([4, 6], [ 0, 18]) &&
	!ccRatioEqWeak([4, 6], [12,  0]) &&
	!ccRatioEqWeak([4, 0], [ 0, 18]) &&
	!ccRatioEqWeak([0, 6], [12,  0]) &&
	!ccRatioEqWeak([0, 3], [12, 18]) &&



	 ccRatioEqWeak([4.000001, 6], [12, 18]) &&
	 ccRatioEqWeak([0.000001, 0], [12, 18]) &&
	 ccRatioEqWeak([4.000001, 6], [ 0,  0]) &&
	 ccRatioEqWeak([0.000001, 0], [ 0,  0]) &&
	 ccRatioEqWeak([0.000001, 0], [ 1,  0]) &&
	 ccRatioEqWeak([0.000001, 0], [ 0,  1]) &&
	 ccRatioEqWeak([1.000001, 0], [ 0,  0]) &&
	 ccRatioEqWeak([0.000001, 1], [ 0,  0]) &&

	!ccRatioEqWeak([4.000001, 5], [12, 18]) &&

	!ccRatioEqWeak([0.000001, 6], [12, 18]) &&
	!ccRatioEqWeak([4.000001, 0], [12, 18]) &&
	!ccRatioEqWeak([4.000001, 6], [ 0, 18]) &&
	!ccRatioEqWeak([4.000001, 6], [12,  0]) &&
	!ccRatioEqWeak([4.000001, 0], [ 0, 18]) &&
	!ccRatioEqWeak([0.000001, 6], [12,  0]) &&
	!ccRatioEqWeak([0.000001, 3], [12, 18]) &&

	true;
};


RatioBehavior.prototype.shouldCcRatioEqStrict = function ()
{
	return true &&

	 ccRatioEqStrict([4, 6], [12, 18]) &&
	 ccRatioEqStrict([0, 0], [12, 18]) &&
	 ccRatioEqStrict([4, 6], [ 0,  0]) &&
	 ccRatioEqStrict([0, 0], [ 0,  0]) &&
	!ccRatioEqStrict([0, 0], [ 1,  0]) &&
	!ccRatioEqStrict([0, 0], [ 0,  1]) &&
	!ccRatioEqStrict([1, 0], [ 0,  0]) &&
	!ccRatioEqStrict([0, 1], [ 0,  0]) &&

	!ccRatioEqStrict([4, 5], [12, 18]) &&

	!ccRatioEqStrict([0, 6], [12, 18]) &&
	!ccRatioEqStrict([4, 0], [12, 18]) &&
	!ccRatioEqStrict([4, 6], [ 0, 18]) &&
	!ccRatioEqStrict([4, 6], [12,  0]) &&
	!ccRatioEqStrict([4, 0], [ 0, 18]) &&
	!ccRatioEqStrict([0, 6], [12,  0]) &&
	!ccRatioEqStrict([0, 3], [12, 18]) &&



	 ccRatioEqStrict([4.000001, 6], [12, 18]) &&
	 ccRatioEqStrict([0.000001, 0], [12, 18]) &&
	 ccRatioEqStrict([4.000001, 6], [ 0,  0]) &&
	 ccRatioEqStrict([0.000001, 0], [ 0,  0]) &&
	!ccRatioEqStrict([0.000001, 0], [ 1,  0]) &&
	!ccRatioEqStrict([0.000001, 0], [ 0,  1]) &&
	!ccRatioEqStrict([1.000001, 0], [ 0,  0]) &&
	!ccRatioEqStrict([0.000001, 1], [ 0,  0]) &&

	!ccRatioEqStrict([4.000001, 5], [12, 18]) &&

	!ccRatioEqStrict([0.000001, 6], [12, 18]) &&
	!ccRatioEqStrict([4.000001, 0], [12, 18]) &&
	!ccRatioEqStrict([4.000001, 6], [ 0, 18]) &&
	!ccRatioEqStrict([4.000001, 6], [12,  0]) &&
	!ccRatioEqStrict([4.000001, 0], [ 0, 18]) &&
	!ccRatioEqStrict([0.000001, 6], [12,  0]) &&
	!ccRatioEqStrict([0.000001, 3], [12, 18]) &&

	true;
};
