module FourierMotzkinEliminationBehavior where

import GeometryHigh.FourierMotzkinElimination

shouldTestFourierMotzkinEliminationBehavior :: Bool
shouldTestFourierMotzkinEliminationBehavior = shouldConstraintLastVar && shouldEliminateVar1 && shouldEliminateAllVars && shouldEliminateAllVarsButOne && shouldEliminateNVars && shouldPartitionateByNormalization && shouldTagByNormalization && shouldDecideNormalizationRule && shouldDispatch && shouldRecombine && shouldTruncateSys && shouldTruncableSys && shouldPredicateForIncludingBoundary && shouldPredicateForExcludingBoundary && shouldPredicateForExactBoundary && shouldGlobalPredicateForIncludingBoundary && shouldGlobalPredicateForExcludingBoundary && shouldGlobalPredicateForExactBoundary && shouldIneqSystemCharacteristic && shouldQuantifyCharacteristic && shouldAssembleConstraint && shouldLowConstraint && shouldHighConstraint && shouldNullConstraint && shouldSysVarCount

shouldConstraintLastVar :: Bool
shouldConstraintLastVar = constraintLastVar [([2, 3, 0], 21), ([1, -2, 0], 0), ([-1, 0, -3], -7), ([1, 1, -1], 5)] == (Just 1, Nothing, Nothing)

shouldEliminateVar1 :: Bool
shouldEliminateVar1 =
    eliminateVar1 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just [([-5/2], -5/2), ([5/2], 15/2)] &&
    eliminateVar1                                                      [([-5/2], -5/2), ([5/2], 15/2)] == Just [([], 2)] &&
    eliminateVar1                                                                                              [([], 2)] == Nothing

shouldEliminateAllVars :: Bool
shouldEliminateAllVars = eliminateAllVars [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == [2]

shouldEliminateAllVarsButOne :: Bool
shouldEliminateAllVarsButOne = eliminateAllVarsButOne [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == ([-1], [], [3])


shouldEliminateNVars :: Bool
shouldEliminateNVars =
    eliminateNVars 0 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] &&
    eliminateNVars 1 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just [([-5/2], -5/2), ([5/2], 15/2)] &&
    eliminateNVars 2 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just [([], 2)] &&
    eliminateNVars 3 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Nothing &&
    eliminateNVars 4 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Nothing &&
    eliminateNVars 5 [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Nothing &&

    eliminateNVars 0 [([-5/2], -5/2), ([5/2], 15/2)] == Just [([-5/2], -5/2), ([5/2], 15/2)] &&
    eliminateNVars 1 [([-5/2], -5/2), ([5/2], 15/2)] == Just [([], 2)] &&
    eliminateNVars 2 [([-5/2], -5/2), ([5/2], 15/2)] == Nothing &&
    eliminateNVars 3 [([-5/2], -5/2), ([5/2], 15/2)] == Nothing &&

    eliminateNVars 0 [([], 2)] == Just [([], 2)] &&
    eliminateNVars 1 [([], 2)] == Nothing &&
    eliminateNVars 2 [([], 2)] == Nothing

shouldSysVarCount :: Bool
shouldSysVarCount = sysVarCount [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == 2 && sysVarCount [([2, 3], 21), ([1, -2], 0), ([-1, 0], -4), ([-1, 0], -7), ([1, 1], 5), ([0, -1], 5)] == 2 && sysVarCount [([-5/2], -5/2), ([5/2], 15/2)] == 1 && sysVarCount [([], 2)] == 0


shouldPartitionateByNormalization :: Bool
shouldPartitionateByNormalization =
    partitionateByNormalization [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just ([([-2], -4), ([3], 6)], [], [([-1/2], 3/2)]) &&
    partitionateByNormalization [([-5/2], -5/2), ([5/2], 15/2)]              == Just ([([], -1)]            , [], [([], 3)])


shouldTagByNormalization :: Bool
shouldTagByNormalization =
    tagByNormalization ([], 3) == Nothing &&
    tagByNormalization ([-2,  6],  10) == Just (LT, ([ 3],  5)) &&
    tagByNormalization ([-2, -6],  10) == Just (LT, ([-3],  5)) &&
    tagByNormalization ([-2,  6], -10) == Just (LT, ([ 3], -5)) &&
    tagByNormalization ([-0.0000001, 6], 10) == Just (EQ, ([6], 10)) &&
    tagByNormalization ([ 0.0000001, 6], 10) == Just (EQ, ([6], 10)) &&
    tagByNormalization ([ 2,  6],  10) == Just (GT, ([ 3],  5)) &&
    tagByNormalization ([ 2, -6],  10) == Just (GT, ([-3],  5)) &&
    tagByNormalization ([ 2,  6], -10) == Just (GT, ([ 3], -5))


shouldDecideNormalizationRule :: Bool
shouldDecideNormalizationRule =
    fst (decideNormalizationRule (-5)) == LT && snd (decideNormalizationRule (-5)) 100 == 20 &&
    fst (decideNormalizationRule (-0.000001)) == EQ && snd (decideNormalizationRule (-0.000001)) 100 == 100 &&
    fst (decideNormalizationRule  0       ) == EQ && snd (decideNormalizationRule  0       ) 100 == 100 &&
    fst (decideNormalizationRule  0.000001) == EQ && snd (decideNormalizationRule  0.000001) 100 == 100 &&
    fst (decideNormalizationRule  5) == GT && snd (decideNormalizationRule  5) 100 == 20


shouldDispatch :: Bool
shouldDispatch =
    dispatch (LT, 'a') ("-kutya", "-cica", "-tyuk") == ("a-kutya",  "-cica",  "-tyuk") &&
    dispatch (EQ, 'a') ("-kutya", "-cica", "-tyuk") == ( "-kutya", "a-cica",  "-tyuk") &&
    dispatch (GT, 'a') ("-kutya", "-cica", "-tyuk") == ( "-kutya",  "-cica", "a-tyuk")


shouldRecombine :: Bool
shouldRecombine =
    recombine ([([-2], -4), ([3], 6)], []                       , [([-1/2], 3/2)]) == [([-5/2], -5/2), ([5/2], 15/2)] &&
    recombine ([([-2], -4), ([3], 6)], [([55], 12), ([-44], 33)], [([-1/2], 3/2)]) == [([-5/2], -5/2), ([5/2], 15/2), ([55], 12), ([-44], 33)] &&
    recombine ([                    ], [([55], 12), ([-44], 33)], [([-1/2], 3/2)]) == [                               ([55], 12), ([-44], 33)] &&
    recombine ([([-2], -4), ([3], 6)], [([55], 12), ([-44], 33)], [             ]) == [                               ([55], 12), ([-44], 33)] &&
    True


shouldTruncateSys :: Bool
shouldTruncateSys = truncateSys [] == [] && truncateSys [([], 12), ([], 55)] == [12, 55] && truncateSys [([4], 12), ([5], 55)] == [12, 55]


shouldTruncableSys :: Bool
shouldTruncableSys = truncableSys [] && truncableSys [([], 12), ([], 55)] && not (truncableSys [([4], 12), ([5], 55)]) && not (truncableSys [([], 12), ([5], 55)]) && not (truncableSys [([4], 12), ([], 55)])


shouldPredicateForIncludingBoundary :: Bool
shouldPredicateForIncludingBoundary = not (predicateForIncludingBoundary (-5)) && predicateForIncludingBoundary (-0.000001) && predicateForIncludingBoundary 0 && predicateForIncludingBoundary 0.000001 && predicateForIncludingBoundary 5

shouldPredicateForExcludingBoundary :: Bool
shouldPredicateForExcludingBoundary = not (predicateForExcludingBoundary (-5)) && not (predicateForExcludingBoundary (-0.000001)) && not (predicateForExcludingBoundary 0) && not (predicateForExcludingBoundary 0.000001) && predicateForExcludingBoundary 5

shouldPredicateForExactBoundary :: Bool
shouldPredicateForExactBoundary = not (predicateForExactBoundary (-5)) && predicateForExactBoundary (-0.00001) && predicateForExactBoundary 0 && predicateForExactBoundary 0.00001 && not (predicateForExactBoundary 5)



shouldGlobalPredicateForIncludingBoundary :: Bool
shouldGlobalPredicateForIncludingBoundary = globalPredicateForIncludingBoundary [Just 2, Just 0] && globalPredicateForIncludingBoundary [Just 2, Just 0, Just (-2)] && globalPredicateForIncludingBoundary [Just 2, Just (-2)] && globalPredicateForIncludingBoundary [Just (-2), Just 0] && globalPredicateForIncludingBoundary [Just 2] && globalPredicateForIncludingBoundary [Just 0] && not (globalPredicateForIncludingBoundary [Just (-2)]) && not (globalPredicateForIncludingBoundary [Just (-2), Just (-3)])

shouldGlobalPredicateForExcludingBoundary :: Bool
shouldGlobalPredicateForExcludingBoundary = globalPredicateForExcludingBoundary [Just 2, Just 0] && globalPredicateForExcludingBoundary [Just 2, Just 0, Just (-2)] && globalPredicateForExcludingBoundary [Just 2, Just (-2)] && not (globalPredicateForExcludingBoundary [Just (-2), Just 0]) && globalPredicateForExcludingBoundary [Just 2] && not (globalPredicateForExcludingBoundary [Just 0]) && not (globalPredicateForExcludingBoundary [Just (-2)]) && not (globalPredicateForExcludingBoundary [Just (-2), Just (-3)])

shouldGlobalPredicateForExactBoundary :: Bool
shouldGlobalPredicateForExactBoundary = not (globalPredicateForExactBoundary [Just 2, Just 0]) && not (globalPredicateForExactBoundary [Just 2, Just 0, Just (-2)]) && not (globalPredicateForExactBoundary [Just 2, Just (-2)]) && globalPredicateForExactBoundary [Just (-2), Just 0]  && globalPredicateForExactBoundary [Just (-2), Just 0, Just (-3)] && not (globalPredicateForExactBoundary [Just 2]) && globalPredicateForExactBoundary [Just 0] && not (globalPredicateForExactBoundary [Just (-2)]) && not (globalPredicateForExactBoundary [Just (-2), Just (-3)])


shouldIneqSystemCharacteristic :: Bool
shouldIneqSystemCharacteristic =
    ineqSystemCharacteristic [([-1, -2], -4), ([2, -1], 3), ([-1, 3], 6)] == Just 2 &&
    ineqSystemCharacteristic [([2, 3], 21), ([1, -2], 0), ([-1, 0], -4), ([-1, 0], -7), ([1, 1], 5), ([0, -1], 5)] == Just (-11/2) &&
    ineqSystemCharacteristic [([2, 3], 21), ([1, -2], 0), ([-1, 0],  0), ([-1, 0], -4), ([1, 1], 6), ([0, -1], 1)] == Just 0


shouldQuantifyCharacteristic :: Bool
shouldQuantifyCharacteristic =
    quantifyCharacteristic all  (> 0) [Just 1, Just 2, Nothing, Nothing] && not (quantifyCharacteristic all (> 0) [Just 1, Just 2, Nothing, Nothing, Just (-1)]) && quantifyCharacteristic all (> 0) [] && quantifyCharacteristic all (> 0) [Nothing] && not (quantifyCharacteristic all (> 0) [Just (-1)]) &&
    quantifyCharacteristic any (> 0) [Just 1, Just 2, Nothing, Nothing] && quantifyCharacteristic any (> 0) [Just 1, Just 2, Nothing, Nothing, Just (-1)] && not (quantifyCharacteristic any (> 0) []) && quantifyCharacteristic any (> 0) [Nothing] && not (quantifyCharacteristic any (> 0) [Just (-1)])


shouldAssembleConstraint :: Bool
shouldAssembleConstraint = assembleConstraint (* 1000) [] == Nothing && assembleConstraint (* 1000) [34, 78, 4, 23, -78, -7, 0] == Just (-78000)


shouldLowConstraint :: Bool
shouldLowConstraint = lowConstraint [] == Nothing && lowConstraint [6, -12, 55, -123, 2, -11] == Just 123

shouldHighConstraint :: Bool
shouldHighConstraint = highConstraint [] == Nothing && highConstraint [6, -12, 55, -123, 2, -11] == Just (-123)

shouldNullConstraint :: Bool
shouldNullConstraint = nullConstraint [] == Nothing && nullConstraint [6, -12, 55, -123, 2, -11] == Just LT
