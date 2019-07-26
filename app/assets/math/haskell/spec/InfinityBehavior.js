function InfinityBehavior () {}


InfinityBehavior.prototype.shouldTestInfinityBehavior = function () {return this.shouldSafeMin() && this.shouldMixedMinPosInfWithNormalNumber() && this.shouldPMInfMixedMin();};



InfinityBehavior.prototype.shouldSafeMin = function ()
{
	return true &&
	vecEq(safeMin([]                     ), ['nothing' ]) &&
	vecEq(safeMin([1, 6, 8, 2, -3, 67, 5]), ['just', -3]) &&
	true;
};


InfinityBehavior.prototype.shouldMixedMinPosInfWithNormalNumber = function ()
{
	return true &&
	vecEq(mixedMinPosInfWithNormalNumber(['nothing'], 3), 3) &&
	vecEq(mixedMinPosInfWithNormalNumber(['just', 5], 3), 3) &&
	vecEq(mixedMinPosInfWithNormalNumber(['just', 2], 3), 2) &&
	true;
};


InfinityBehavior.prototype.shouldPMInfMixedMin = function ()
{
	return true &&
	pMInfMixedMin(['nothing' ], 13) == 13 &&
	pMInfMixedMin(['just', 12], 13) == 12 &&
	pMInfMixedMin(['just', 13], 13) == 13 &&
	pMInfMixedMin(['just', 14], 13) == 13 &&
	true;
};
