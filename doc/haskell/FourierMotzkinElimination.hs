{-# LANGUAGE TupleSections #-}

module FourierMotzkinElimination where

import Infinitesimal ((=~=))
import Data.List (uncons)
import DataX (NEList, descartesPlus, maybeLoop, safeMin)
import Logic (Predicate, Quantor, predicateNot, predicateAnd)

type EqSystem =  [NEList Float]
type EqSystemCharacteristic = Maybe Float

globalStatementForEqSystems :: Predicate [EqSystemCharacteristic] -> Predicate [EqSystem]
globalStatementForEqSystems globalPred = globalPred . map eqSystemCharacteristic

eqSystemCharacteristic   :: EqSystem -> EqSystemCharacteristic
eqSystemCharacteristic = safeMin . eliminate

quantifyCharacteristic :: Quantor EqSystemCharacteristic -> Predicate Float -> Predicate [EqSystemCharacteristic]
quantifyCharacteristic quantor = quantor . maybe True

globalPredicateForIncludingBoundary, globalPredicateForExcludingBoundary, globalPredicateForExactBoundary :: Predicate [EqSystemCharacteristic]
globalPredicateForIncludingBoundary =  quantifyCharacteristic any predicateForIncludingBoundary
globalPredicateForExcludingBoundary =  quantifyCharacteristic any predicateForExcludingBoundary
globalPredicateForExactBoundary     =  quantifyCharacteristic any predicateForExactBoundary `predicateAnd` predicateNot globalPredicateForExcludingBoundary


predicateForIncludingBoundary, predicateForExcludingBoundary, predicateForExactBoundary :: Predicate Float
predicateForIncludingBoundary n =      n =~= 0  || n >= 0
predicateForExcludingBoundary n = not (n =~= 0) && n >  0
predicateForExactBoundary     n =      n =~= 0

eliminate :: [NEList Float] -> [Float]
eliminate = map fst . maybeLoop eliminate1

eliminate1 :: [NEList Float] -> Maybe [NEList Float]
eliminate1 [] = Nothing
eliminate1 lst = fmap combine $ normalize1stCol lst

normalize1stCol :: [NEList Float] -> Maybe ([NEList Float], [NEList Float], [NEList Float])
normalize1stCol []           = Just ([], [], [])
normalize1stCol (row : rows) = dispatch (normalize1 row) (normalize1stCol rows)

normalize1 :: NEList Float -> Maybe (Ordering, NEList Float)
normalize1 ne = let (o, as) = normalize1_ ne
                in fmap (o ,) (uncons as)

normalize1_ :: NEList Float -> (Ordering, [Float])
normalize1_ (a, as)
    | a =~= 0 = (EQ, as) 
    | a  >  0 = (GT, map (/   a ) as)
    | a  <  0 = (LT, map (/ (-a)) as)

dispatch :: Maybe (Ordering, NEList a) -> Maybe ([NEList a], [NEList a], [NEList a]) -> Maybe ([NEList a], [NEList a], [NEList a])
dispatch mbTaggedRow mbPartition = do
    (tag, ne)       <- mbTaggedRow
    (negs, nuls, poss) <- mbPartition
    case tag of
        LT -> return (ne:negs, nuls, poss)
        EQ -> return (negs, ne:nuls, poss)
        GT -> return (negs, nuls, ne:poss)

combine :: Num a => ([NEList a], [NEList a], [NEList a]) -> [NEList a]
combine (negs, nuls, poss) = descartesPlus negs poss ++ nuls
