function FourierMotzkinEliminationBehavior() {}

//import GeometryHigh.FourierMotzkinElimination

//shouldTestFourierMotzkinEliminationBehavior :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldTestFourierMotzkinEliminationBehavior = function () {return shouldConstraintLastVar() && shouldEliminateVar1() && shouldEliminateAllVars() && shouldEliminateAllVarsButOne() && shouldEliminateNVars() && shouldPartitionateByNormalization() && shouldTagByNormalization() && shouldDecideNormalizationRule() && shouldDispatch() && shouldRecombine() && shouldTruncateSys() && shouldTruncableSys() && shouldPredicateForIncludingBoundary() && shouldPredicateForExcludingBoundary() && shouldPredicateForExactBoundary() && shouldGlobalPredicateForIncludingBoundary() && shouldGlobalPredicateForExcludingBoundary() && shouldGlobalPredicateForExactBoundary() && shouldIneqSystemCharacteristic() && shouldQuantifyCharacteristic() && shouldAssembleConstraint() && shouldLowConstraint() && shouldHighConstraint() && shouldNullConstraint() && shouldSysVarCount;};

//shouldConstraintLastVar :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldConstraintLastVar = function () {
	return true &&
	ccTreeEq/*<<<*/(    constraintLastVar([[[2, 3, 0], 21], [[1, -2, 0], 0], [[-1, 0, -3], -7], [[1, 1, -1], 5]]), /*===*/ [['just', 1], ['nothing'], ['nothing']])/*>>>*/ &&
	true;
};

//shouldEliminateVar1 :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldEliminateVar1 = function () {
	return true &&
	ccTreeEq/*<<<*/(    eliminateVar1([[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]),/*===*/   ['just', [[[-5/2], -5/2], [[5/2], 15/2]]]                                                   )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateVar1                                                         (        [[[-5/2], -5/2], [[5/2], 15/2]]),/*===*/  ['just', [[[], 2]]]                      )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateVar1                                                                                                            (        [[[], 2]]),/*===*/   ['nothing'])/*>>>*/ &&
	true;
};

//shouldEliminateAllVars :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldEliminateAllVars = function () {
	return true &&
	ccTreeEq/*<<<*/(    eliminateAllVars([[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/ [2])/*>>>*/ &&
	true;
};

//shouldEliminateAllVarsButOne :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldEliminateAllVarsButOne = function () {
	return true &&
	ccTreeEq/*<<<*/(    eliminateAllVarsButOne([[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/ [[-1], [], [3]])/*>>>*/ &&
	true;
};


//shouldEliminateNVars :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldEliminateNVars = function () {
	return true &&
	ccTreeEq/*<<<*/(    eliminateNVars( 0, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['just', [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 1, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['just', [[[-5/2], -5/2], [[5/2], 15/2]]]             )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 2, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['just', [[[], 2]]]                                   )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 3, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['nothing']                                           )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 4, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['nothing']                                           )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 5, [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['nothing']                                           )/*>>>*/ &&

	ccTreeEq/*<<<*/(    eliminateNVars( 0, [[[-5/2], -5/2], [[5/2], 15/2]]), /*===*/    ['just', [[[-5/2], -5/2], [[5/2], 15/2]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 1, [[[-5/2], -5/2], [[5/2], 15/2]]), /*===*/    ['just', [[[], 2]]]                      )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 2, [[[-5/2], -5/2], [[5/2], 15/2]]), /*===*/    ['nothing']                              )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 3, [[[-5/2], -5/2], [[5/2], 15/2]]), /*===*/    ['nothing']                              )/*>>>*/ &&

	ccTreeEq/*<<<*/(    eliminateNVars( 0, [[[], 2]]), /*===*/    ['just', [[[], 2]]]                                            )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 1, [[[], 2]]), /*===*/    ['nothing']                                                    )/*>>>*/ &&
	ccTreeEq/*<<<*/(    eliminateNVars( 2, [[[], 2]]), /*===*/    ['nothing']                                                    )/*>>>*/ &&
	true;
};

//shouldSysVarCount :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldSysVarCount = function () {
	return true &&
	sysVarCount( [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]                                          ) == 2 &&
	sysVarCount( [[[2, 3], 21], [[1, -2], 0], [[-1, 0], -4], [[-1, 0], -7], [[1, 1], 5], [[0, -1], 5]] ) == 2 &&
	sysVarCount( [[[-5/2], -5/2], [[5/2], 15/2]]                                                       ) == 1 &&
	sysVarCount( [[[], 2]]                                                                             ) == 0 &&
	true;
};


//shouldPartitionateByNormalization :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldPartitionateByNormalization = function () {
	return true &&
	ccTreeEq/*<<<*/(    partitionateByNormalization( [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]), /*===*/    ['just', [[[[-2], -4], [[3], 6]], [], [[[-1/2], 3/2]]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    partitionateByNormalization( [[[-5/2], -5/2], [[5/2], 15/2]]             ), /*===*/    ['just', [[[[], -1]]            , [], [[[], 3]]]]      )/*>>>*/ &&
	true;
};


//shouldTagByNormalization :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldTagByNormalization = function () {
	return true &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[], 3]              ), /*===*/    ['nothing']                 )/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[-2,  6],  10]      ), /*===*/    ['just', ['lt', [[ 3],  5]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[-2, -6],  10]      ), /*===*/    ['just', ['lt', [[-3],  5]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[-2,  6], -10]      ), /*===*/    ['just', ['lt', [[ 3], -5]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[-0.0000001, 6], 10]), /*===*/    ['just', ['eq', [[ 6], 10]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[ 0.0000001, 6], 10]), /*===*/    ['just', ['eq', [[ 6], 10]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[ 2,  6],  10]      ), /*===*/    ['just', ['gt', [[ 3],  5]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[ 2, -6],  10]      ), /*===*/    ['just', ['gt', [[-3],  5]]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    tagByNormalization( [[ 2,  6], -10]      ), /*===*/    ['just', ['gt', [[ 3], -5]]])/*>>>*/ &&
	true;
};


//shouldDecideNormalizationRule :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldDecideNormalizationRule = function () {
	return true &&
	decideNormalizationRule(  -5        )[0]  == 'lt'   &&   decideNormalizationRule(  -5        )[1](100) ==  20 &&
	decideNormalizationRule(  -0.000001 )[0]  == 'eq'   &&   decideNormalizationRule(  -0.000001 )[1](100) == 100 &&
	decideNormalizationRule(   0        )[0]  == 'eq'   &&   decideNormalizationRule(   0        )[1](100) == 100 &&
	decideNormalizationRule(   0.000001 )[0]  == 'eq'   &&   decideNormalizationRule(   0.000001 )[1](100) == 100 &&
	decideNormalizationRule(   5        )[0]  == 'gt'   &&   decideNormalizationRule(   5        )[1](100) ==  20 &&
	true;
};


//shouldDispatch :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldDispatch = function () {
	return true &&
	ccTreeEq/*<<<*/( dispatch( ['lt', 'a'], [['-','d','o','g'], ['-','c','a','t'], ['-','h','e','n']] ), /*===*/ [['a','-','d','o','g'], [    '-','c','a','t'], [    '-','h','e','n']])/*>>>*/ &&
	ccTreeEq/*<<<*/( dispatch( ['eq', 'a'], [['-','d','o','g'], ['-','c','a','t'], ['-','h','e','n']] ), /*===*/ [[    '-','d','o','g'], ['a','-','c','a','t'], [    '-','h','e','n']])/*>>>*/ &&
	ccTreeEq/*<<<*/( dispatch( ['gt', 'a'], [['-','d','o','g'], ['-','c','a','t'], ['-','h','e','n']] ), /*===*/ [[    '-','d','o','g'], [    '-','c','a','t'], ['a','-','h','e','n']])/*>>>*/ &&
	true;
};

FourierMotzkinEliminationBehavior.prototype.shouldDispatchToTheRear = function () {
	return true &&
	ccTreeEq/*<<<*/( dispatchToTheRear( ['lt', '!'], [['d','o','g'], ['c','a','t'], ['h','e','n']] ), /*===*/ [['d','o','g','!'], ['c','a','t'    ], ['h','e','n'    ]])/*>>>*/ &&
	ccTreeEq/*<<<*/( dispatchToTheRear( ['eq', '!'], [['d','o','g'], ['c','a','t'], ['h','e','n']] ), /*===*/ [['d','o','g'    ], ['c','a','t','!'], ['h','e','n'    ]])/*>>>*/ &&
	ccTreeEq/*<<<*/( dispatchToTheRear( ['gt', '!'], [['d','o','g'], ['c','a','t'], ['h','e','n']] ), /*===*/ [['d','o','g'    ], ['c','a','t'    ], ['h','e','n','!']])/*>>>*/ &&
	true;
};

//shouldRecombine :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldRecombine = function () {
	return true &&
	ccTreeEq/*<<<*/(    recombine( [[[[-2], -4], [[3], 6]], []                       , [[[-1/2], 3/2]]] ), /*===*/    [[[-5/2], -5/2], [[5/2], 15/2]]                         )/*>>>*/ &&
	ccTreeEq/*<<<*/(    recombine( [[[[-2], -4], [[3], 6]], [[[55], 12], [[-44], 33]], [[[-1/2], 3/2]]] ), /*===*/    [[[-5/2], -5/2], [[5/2], 15/2], [[55], 12], [[-44], 33]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    recombine( [[                    ], [[[55], 12], [[-44], 33]], [[[-1/2], 3/2]]] ), /*===*/    [                               [[55], 12], [[-44], 33]])/*>>>*/ &&
	ccTreeEq/*<<<*/(    recombine( [[[[-2], -4], [[3], 6]], [[[55], 12], [[-44], 33]], [             ]] ), /*===*/    [                               [[55], 12], [[-44], 33]])/*>>>*/ &&
	true;
};


//shouldTruncateSys :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldTruncateSys = function () {
	return true &&
	ccTreeEq/*<<<*/(    truncateSys( []                     ), /*===*/    []      )/*>>>*/ &&
	ccTreeEq/*<<<*/(    truncateSys( [[[], 12], [[], 55]]   ), /*===*/    [12, 55])/*>>>*/ &&
	ccTreeEq/*<<<*/(    truncateSys( [[[4], 12], [[5], 55]] ), /*===*/    [12, 55])/*>>>*/ &&
	true;
};


//shouldTruncableSys :: Bool
shouldTruncableSys = function () {
	return true &&
	     truncableSys( []                     )   &&
	     truncableSys( [[[], 12], [[], 55]]   )   &&
	    !truncableSys( [[[4], 12], [[5], 55]] )   &&
	    !truncableSys( [[[], 12], [[5], 55]]  )   &&
	    !truncableSys( [[[4], 12], [[], 55]]  )   &&
	true;
};


//shouldPredicateForIncludingBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldPredicateForIncludingBoundary = function () {
	return true &&
	    !predicateForIncludingBoundary(  -5         )     &&
	     predicateForIncludingBoundary(  -0.000001  )     &&
	     predicateForIncludingBoundary(   0         )     &&
	     predicateForIncludingBoundary(   0.000001  )     &&
	     predicateForIncludingBoundary(   5         )     &&
	true;
};

//shouldPredicateForExcludingBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldPredicateForExcludingBoundary = function () {
	return true &&
	    !predicateForExcludingBoundary(-5        )    &&
	    !predicateForExcludingBoundary(-0.000001 )    &&
	    !predicateForExcludingBoundary( 0        )    &&
	    !predicateForExcludingBoundary( 0.000001 )    &&
	     predicateForExcludingBoundary( 5        )    &&
	true;
};

//shouldPredicateForExactBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldPredicateForExactBoundary = function () {
	return true &&
	    !predicateForExactBoundary(  -5        )     &&
	     predicateForExactBoundary(  -0.00001  )     &&
	     predicateForExactBoundary(   0        )     &&
	     predicateForExactBoundary(   0.00001  )     &&
	    !predicateForExactBoundary(   5        )     &&
	true;
};



//shouldGlobalPredicateForIncludingBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldGlobalPredicateForIncludingBoundary = function () {
	return true &&
	     globalPredicateForIncludingBoundary( [['just', 2], ['just', 0]]               )         &&
	     globalPredicateForIncludingBoundary( [['just', 2], ['just', 0], ['just', -2]] )         &&
	     globalPredicateForIncludingBoundary( [['just', 2], ['just', -2]]              )         &&
	     globalPredicateForIncludingBoundary( [['just', -2], ['just', 0]]              )         &&
	     globalPredicateForIncludingBoundary( [['just', 2]]                            )         &&
	     globalPredicateForIncludingBoundary( [['just', 0]]                            )         &&
	    !globalPredicateForIncludingBoundary( [['just', -2]]                           )         &&
	    !globalPredicateForIncludingBoundary( [['just', -2], ['just', -3]]             )         &&
	true;
};

//shouldGlobalPredicateForExcludingBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldGlobalPredicateForExcludingBoundary = function () {
	return true &&
	     globalPredicateForExcludingBoundary( [['just', 2], ['just', 0]]               )         &&
	     globalPredicateForExcludingBoundary( [['just', 2], ['just', 0], ['just', -2]] )         &&
	     globalPredicateForExcludingBoundary( [['just', 2], ['just', -2]]              )         &&
	    !globalPredicateForExcludingBoundary( [['just', -2], ['just', 0]]              )         &&
	     globalPredicateForExcludingBoundary( [['just', 2]]                            )         &&
	    !globalPredicateForExcludingBoundary( [['just', 0]]                            )         &&
            !globalPredicateForExcludingBoundary( [['just', -2]]                           )         &&
	    !globalPredicateForExcludingBoundary( [['just', -2], ['just', -3]]             )         &&
	true;
};

//shouldGlobalPredicateForExactBoundary :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldGlobalPredicateForExactBoundary = function () {
	return true &&
	    !globalPredicateForExactBoundary( [['just', 2], ['just', 0]]                )       &&
	    !globalPredicateForExactBoundary( [['just', 2], ['just', 0], ['just', -2]]  )       &&
	    !globalPredicateForExactBoundary( [['just', 2], ['just', -2]]               )       &&
	     globalPredicateForExactBoundary( [['just', -2], ['just', 0]]               )       &&
	     globalPredicateForExactBoundary( [['just', -2], ['just', 0], ['just', -3]] )       &&
	    !globalPredicateForExactBoundary( [['just', 2]]                             )       &&
	     globalPredicateForExactBoundary( [['just', 0]]                             )       &&
	    !globalPredicateForExactBoundary( [['just', -2]]                            )       &&
	    !globalPredicateForExactBoundary( [['just', -2], ['just', -3]]              )       &&
	true;
};


//shouldIneqSystemCharacteristic :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldIneqSystemCharacteristic = function () {
	return true &&
	ccTreeEq/*<<<*/(    ineqSystemCharacteristic( [[[-1, -2], -4], [[2, -1], 3], [[-1, 3], 6]]                                          ), /*===*/    ['just', 2]    )/*>>>*/ &&
	ccTreeEq/*<<<*/(    ineqSystemCharacteristic( [[[2, 3], 21], [[1, -2], 0], [[-1, 0], -4], [[-1, 0], -7], [[1, 1], 5], [[0, -1], 5]] ), /*===*/    ['just', -11/2])/*>>>*/ &&
	ccTreeEq/*<<<*/(    ineqSystemCharacteristic( [[[2, 3], 21], [[1, -2], 0], [[-1, 0],  0], [[-1, 0], -4], [[1, 1], 6], [[0, -1], 1]] ), /*===*/    ['just', 0]    )/*>>>*/ &&
	true;
};


//shouldQuantifyCharacteristic :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldQuantifyCharacteristic = function () {
	return true &&
	     quantifyCharacteristic( all, n => n > 0, [['just', 1], ['just', 2], ['nothing'], ['nothing']]               )         &&
	    !quantifyCharacteristic( all, n => n > 0, [['just', 1], ['just', 2], ['nothing'], ['nothing'], ['just', -1]] )         &&
	     quantifyCharacteristic( all, n => n > 0, []                                                                 )         &&
	     quantifyCharacteristic( all, n => n > 0, [['nothing']]                                                      )         &&
	    !quantifyCharacteristic( all, n => n > 0, [['just', -1]]                                                     )         &&

	     quantifyCharacteristic( any, n => n > 0, [['just', 1], ['just', 2], ['nothing'], ['nothing']]               )         &&
	     quantifyCharacteristic( any, n => n > 0, [['just', 1], ['just', 2], ['nothing'], ['nothing'], ['just', -1]] )         &&
	    !quantifyCharacteristic( any, n => n > 0, []                                                                 )         &&
	     quantifyCharacteristic( any, n => n > 0, [['nothing']]                                                      )         &&
	    !quantifyCharacteristic( any, n => n > 0, [['just', -1]]                                                     )         &&
	true;
};


//shouldAssembleConstraint :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldAssembleConstraint = function () {
	return true &&
	ccTreeEq/*<<<*/(    assembleConstraint( n => n * 1000, []                         ), /*===*/    ['nothing']     )/*>>>*/ &&
	ccTreeEq/*<<<*/(    assembleConstraint( n => n * 1000, [34, 78, 4, 23, -78, -7, 0]), /*===*/    ['just', -78000])/*>>>*/ &&
	true;
};


//shouldLowConstraint :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldLowConstraint = function () {
	return true &&
	ccTreeEq/*<<<*/(    lowConstraint( []                         ), /*===*/    ['nothing']  )/*>>>*/ &&
	ccTreeEq/*<<<*/(    lowConstraint( [6, -12, 55, -123, 2, -11] ), /*===*/    ['just', 123])/*>>>*/ &&
	true;
};

//shouldHighConstraint :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldHighConstraint = function () {
	return true &&
	ccTreeEq/*<<<*/(    highConstraint( []                         ), /*===*/    ['nothing']   )/*>>>*/ &&
	ccTreeEq/*<<<*/(    highConstraint( [6, -12, 55, -123, 2, -11] ), /*===*/    ['just', -123])/*>>>*/ &&
	true;
};

//shouldNullConstraint :: Bool
FourierMotzkinEliminationBehavior.prototype.shouldNullConstraint = function () {
	return true &&
	ccTreeEq/*<<<*/(    nullConstraint( []                         ), /*===*/    ['nothing']   )/*>>>*/ &&
	ccTreeEq/*<<<*/(    nullConstraint( [6, -12, 55, -123, 2, -11] ), /*===*/    ['just', 'lt'])/*>>>*/ &&
	true;
};
