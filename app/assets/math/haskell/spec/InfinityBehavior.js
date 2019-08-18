function InfinityBehavior () {}


InfinityBehavior.prototype.shouldTestInfinityBehavior = function () {return this.shouldSafeMin() && this.shouldVal_compareCases_pIVal() && this.shouldMixedMinPosInfWithNormalNumber() && this.shouldPMInfMixedMin() && this.shouldBoardMin1() && this.shouldBoardMin2() && this.shouldBoardMinSelectSet() && this.shouldPlusMinusInfinityExtensionToMaybePlusInfinityExtension() && this.shouldMaybePlusInfinityExtensionToPlusMinusInfinityExtension();};



InfinityBehavior.prototype.shouldSafeMin = function ()
{
	return true &&
	vecEq(safeMin([]                     ), ['nothing' ]) &&
	vecEq(safeMin([1, 6, 8, 2, -3, 67, 5]), ['just', -3]) &&
	true;
};

InfinityBehavior.prototype.shouldVal_compareCases_pIVal = () =>
	val_compareCases_pIVal(1  , ['nothing'], 'lt', 'eq', 'gt') == 'lt' &&
	val_compareCases_pIVal(999, ['nothing'], 'lt', 'eq', 'gt') == 'lt' &&
	val_compareCases_pIVal(1  , ['just', 3], 'lt', 'eq', 'gt') == 'lt' &&
	val_compareCases_pIVal(1  , ['just', 2], 'lt', 'eq', 'gt') == 'lt' &&
	val_compareCases_pIVal(1  , ['just', 1], 'lt', 'eq', 'gt') == 'eq' &&
	val_compareCases_pIVal(  1, ['just', 1.0000001], 'lt', 'eq', 'gt') == 'lt' &&
	val_compareCases_pIVal(  1, ['just', 0.9999999], 'lt', 'eq', 'gt') == 'gt' &&
	val_compareCases_pIVal(1  , ['just', 0], 'lt', 'eq', 'gt') == 'gt' &&
	true;

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



InfinityBehavior.prototype.shouldBoardMin1 = function ()
{
	const constTrue = it => true,
	      id        = it => it;

	const board = new Bijection;
	const flagEmpty = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['left', true]);

	board.set(null, ['right', 2]);
	const flagSingleton = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 2]);

	board.set(null, ['right', 2]);
	const flagConstant = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 2]);

	board.set(null, ['right', 3]);
	const flagIncreasing = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 2]);

	board.set(null, ['right', 1]);
	const flagDecreasing = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 1]);

	board.set(null, ['right', 2]);
	const flagMixed = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 1]);

	board.set(null, ['left', true]);
	const flagObsoletePosInf = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['right', 1]);

	board.set(null, ['left', false]);
	const flagNegInf = vecEq(boardMin(constTrue, id, pMInfLt, ['left', true], board), ['left', false]);

	return flagEmpty && flagSingleton && flagConstant && flagIncreasing && flagDecreasing && flagMixed && flagObsoletePosInf && flagNegInf;
};


InfinityBehavior.prototype.shouldBoardMin2 = function ()
{
	const constTrue = item => true,
	      grad      = item => [polynomialGrad(item), item];
	      pMInfLt_at_1 = ([currentPMInfVal, currentItem], [accPMInfVal, accItem]) => pMInfLt(currentPMInfVal, accPMInfVal);

	const board = new Bijection;
	const flagEmpty = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['left', true], '-INVALID-']);

	board.set(null, [12, 4]);
	const flagSingleton = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 1], [12, 4]]);

	board.set(null, [45, 67]);
	const flagAgainFirstWins = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 1], [12, 4]]);

	board.set(null, [11, 69, 23]);
	const flagIncreasing = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 1], [12, 4]]);

	board.set(null, [78]);
	const flagDecreasing = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 0], [78   ]]);

	board.set(null, [55, 83]);
	const flagMixed = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 0], [78   ]]);

	board.set(null, [99, 785, 1]);
	const flagMixed2 = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 0], [78   ]]);

	board.set(null, [99, 785, 1, 'power_series']);
	const flagMixed3 = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['right', 0], [78   ]]);

	board.set(null, []);
	const flagNegInf = vecEq(boardMin(constTrue, grad, pMInfLt_at_1, [['left', true], '-INVALID-'], board), [['left', false], []]);

	return flagEmpty && flagSingleton && flagAgainFirstWins && flagIncreasing && flagDecreasing && flagMixed && flagMixed2 && flagMixed3 && flagNegInf;
};


InfinityBehavior.prototype.shouldBoardMinSelectSet = function ()
{
	const constTrue   = item => true   ,
	      negInfinity = ['left', false],
	      posInfinity = ['left', true ];

	const board = new Bijection;
	const flagEmpty = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [posInfinity, []]);

	board.set(null, [12, 4]);
	const flagSingleton = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 1], [[12, 4]]]);

	board.set(null, [45, 67]);
	const flagAgainFirstWins = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 1], [[12, 4], [45, 67]]]);

	board.set(null, [11, 69, 23]);
	const flagIncreasing = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 1], [[12, 4], [45, 67]]]);

	board.set(null, [78]);
	const flagDecreasing = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 0], [[78   ]]]);

	board.set(null, [55, 83]);
	const flagMixed = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 0], [[78   ]]]);

	board.set(null, [99, 785, 1]);
	const flagMixed2 = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 0], [[78   ]]]);

	board.set(null, [99, 785, 1, 'power_series']);
	const flagMixed3 = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 0], [[78   ]]]);

	board.set(null, [7]);
	const flagMixed4 = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [['right', 0], [[78], [7]]]);

	board.set(null, []);
	const flagNegInf = vecEq(boardMinSelectSet(constTrue, polynomialGrad, pMInfCompare, posInfinity, board), [negInfinity, [[]]]);

	return flagEmpty && flagSingleton && flagAgainFirstWins && flagIncreasing && flagDecreasing && flagMixed && flagMixed2 && flagMixed3 && flagMixed4 && flagNegInf;
};


InfinityBehavior.prototype.shouldPlusMinusInfinityExtensionToMaybePlusInfinityExtension = () =>
	treeEq(plusMinusInfinityExtensionToMaybePlusInfinityExtension(['left' , false]), ['nothing'           ]) &&
	treeEq(plusMinusInfinityExtensionToMaybePlusInfinityExtension(['left' , true ]), ['just', ['nothing' ]]) &&
	treeEq(plusMinusInfinityExtensionToMaybePlusInfinityExtension(['right', 12   ]), ['just', ['just', 12]]) &&
	true;

InfinityBehavior.prototype.shouldMaybePlusInfinityExtensionToPlusMinusInfinityExtension = () =>
	treeEq(maybePlusInfinityExtensionToPlusMinusInfinityExtension(['nothing'           ]), ['left' , false]) &&
	treeEq(maybePlusInfinityExtensionToPlusMinusInfinityExtension(['just', ['nothing' ]]), ['left' , true ]) &&
	treeEq(maybePlusInfinityExtensionToPlusMinusInfinityExtension(['just', ['just', 12]]), ['right', 12   ]) &&
	true;
