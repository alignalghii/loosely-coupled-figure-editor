function MaybeXBehavior () {}

MaybeXBehavior.prototype.shouldMaybeLoop = function ()
{
	return true &&
	maybeLoop(x => x > 0 ? ['just', x-1] : ['nothing'], 0) == 0 &&
	maybeLoop(x => x > 0 ? ['just', x-1] : ['nothing'], 1) == 0 &&
	maybeLoop(x => x > 0 ? ['just', x-1] : ['nothing'], 2) == 0 &&

	maybeLoop(x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) == 25 &&
	true;
}

MaybeXBehavior.prototype.shouldFromJust = function ()
{
	var exceptionsFlag = false;
	try {fromJust(['nothing']);} catch (e) {if (e == '`fromJust` error') exceptionsFlag = true;}
 
	return true &&
	exceptionsFlag &&
	fromJust(['just', 12]) == 12 &&
	true;
};
