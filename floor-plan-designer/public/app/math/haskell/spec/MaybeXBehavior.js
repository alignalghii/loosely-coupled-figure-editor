function MaybeXBehavior () {}

MaybeXBehavior.prototype.shouldTestMaybeXBehavior = function () {return this.shouldMaybeLoop() && this.shouldFromJust() && this.shouldCatMaybes() && this.shouldFromMaybe() && this.shouldFromMaybe_exec();}

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

MaybeXBehavior.prototype.shouldCatMaybes = () =>
	vecEq(catMaybes([], []), []) &&
	vecEq(catMaybes([['just', 1], ['nothing'], ['just', 2]]), [1, 2]) &&
	true;

MaybeXBehavior.prototype.shouldFromMaybe = () =>
	fromMaybe(-1, ['nothing']) == -1 &&
	fromMaybe(-1, ['just', 5]) ==  5 &&
	true;

MaybeXBehavior.prototype.shouldFromMaybe_exec = () =>
	fromMaybe_exec(() => -1, ['nothing']) == -1 &&
	fromMaybe_exec(() => -1, ['just', 5]) ==  5 &&
	true;
