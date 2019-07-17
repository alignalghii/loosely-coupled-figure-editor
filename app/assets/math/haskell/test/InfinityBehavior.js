function InfinityBehavior () {}

InfinityBehavior.prototype.shouldSafeMin = function ()
{
	return true &&
	vecEq(safeMin([]                     ), ['nothing' ]) &&
	vecEq(safeMin([1, 6, 8, 2, -3, 67, 5]), ['just', -3]) &&
	true;
}


InfinityBehavior.prototype.shouldMixedMinPosInfWithNormalNumber = function ()
{
	return true &&
	vecEq(mixedMinPosInfWithNormalNumber(['nothing'], 3), 3) &&
	vecEq(mixedMinPosInfWithNormalNumber(['just', 5], 3), 3) &&
	vecEq(mixedMinPosInfWithNormalNumber(['just', 2], 3), 2) &&
	true;
};
