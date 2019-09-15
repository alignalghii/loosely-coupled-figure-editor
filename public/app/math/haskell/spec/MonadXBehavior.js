function MonadXBehavior () {}

MonadXBehavior.prototype.shouldMLoopN = function ()
{
	var monadMaybe = new MonadX(maybeMap, just, maybeBind);

	return true &&

	vecEq(/*<<<*/monadMaybe.mLoopN(0, x => x > 0 ? ['just', x-1] : ['nothing'], 0) ,/*===*/ ['just', 0]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(1, x => x > 0 ? ['just', x-1] : ['nothing'], 0) ,/*===*/ ['nothing']/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(2, x => x > 0 ? ['just', x-1] : ['nothing'], 0) ,/*===*/ ['nothing']/*>>>*/) &&

	vecEq(/*<<<*/monadMaybe.mLoopN(0, x => x > 0 ? ['just', x-1] : ['nothing'], 1) ,/*===*/ ['just', 1]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(1, x => x > 0 ? ['just', x-1] : ['nothing'], 1) ,/*===*/ ['just', 0]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(2, x => x > 0 ? ['just', x-1] : ['nothing'], 1) ,/*===*/ ['nothing']/*>>>*/) &&

	vecEq(/*<<<*/monadMaybe.mLoopN(0, x => x > 0 ? ['just', x-1] : ['nothing'], 2) ,/*===*/ ['just', 2]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(1, x => x > 0 ? ['just', x-1] : ['nothing'], 2) ,/*===*/ ['just', 1]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(2, x => x > 0 ? ['just', x-1] : ['nothing'], 2) ,/*===*/ ['just', 0]/*>>>*/) &&

	vecEq(/*<<<*/monadMaybe.mLoopN(0, x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) ,/*===*/ ['just', 100]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(1, x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) ,/*===*/ ['just',  50]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(2, x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) ,/*===*/ ['just',  25]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(3, x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) ,/*===*/ ['nothing'  ]/*>>>*/) &&
	vecEq(/*<<<*/monadMaybe.mLoopN(4, x => x % 2 == 0 ? ['just', x/2] : ['nothing'], 100) ,/*===*/ ['nothing'  ]/*>>>*/) &&

	true;
};
