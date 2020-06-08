function NonEmptyFootListBehavior () {}

NonEmptyFootListBehavior.prototype.shouldFootUncons = function ()
{
	return true &&
	vecEq(footUncons([[], 12]), ['nothing']) &&
	vecEq(footUncons([[10], 12]), ['just', [10, [[], 12]]]) &&
	vecEq(footUncons([[10, 20], 12]), ['just', [10, [[20], 12]]]) &&
	vecEq(footUncons([[10, 20, 30], 12]), ['just', [10, [[20, 30], 12]]]) &&
	true;
};

NonEmptyFootListBehavior.prototype.shouldFootMap = function ()
{
	return true &&
	vecEq(footMap(n=>n*2, [[], 12]), [[], 24]) &&
	vecEq(footMap(n=>n*2, [[10], 12]), [[20], 24]) &&
	vecEq(footMap(n=>n*2, [[10, 20], 12]), [[20, 40], 24]) &&
	vecEq(footMap(n=>n*2, [[10, 20, 30], 12]), [[20, 40, 60], 24]) &&
	true;
};
