{-# LANGUAGE TupleSections #-}

module GeometryHigh.FourierMotzkinElimination where

import GeometryLow.Infinitesimal ((=~=))
import Data.NonEmptyFootList (NonEmptyFootList, footUncons, descartesFootPlus, footMap)
import Data.MaybeX (maybeLoop, safeMin)
import Logic.Logic (Predicate, Quantor, predicateNot, predicateAnd)

import Data.List (uncons)
import Control.Monad (liftM2)

type Inequality = NonEmptyFootList Float
type IneqSystem   =  [Inequality]
type IneqSystemCharacteristic = Maybe Float

type SignTagged a = (Ordering, a)
type SignPartitioned a = ([a], [a], [a])

--globalStatementForIneqSystems :: Predicate [IneqSystemCharacteristic] -> Predicate [IneqSystem]
--globalStatementForIneqSystems globalPred = globalPred . map ineqSystemCharacteristic

ineqSystemCharacteristic   :: IneqSystem -> IneqSystemCharacteristic
ineqSystemCharacteristic = safeMin . eliminateAllVars

-- @TODO : although accidentally OK, but theoretically Nothing plays the role of positive infinite. Make an explicit algebra for it: see `extended reals'.
quantifyCharacteristic :: Quantor IneqSystemCharacteristic -> Predicate Float -> Predicate [IneqSystemCharacteristic]
quantifyCharacteristic quantor = quantor . maybe True

globalPredicateForIncludingBoundary, globalPredicateForExcludingBoundary, globalPredicateForExactBoundary :: Predicate [IneqSystemCharacteristic]
globalPredicateForIncludingBoundary =  quantifyCharacteristic any predicateForIncludingBoundary
globalPredicateForExcludingBoundary =  quantifyCharacteristic any predicateForExcludingBoundary
globalPredicateForExactBoundary     =  quantifyCharacteristic any predicateForExactBoundary `predicateAnd` predicateNot globalPredicateForExcludingBoundary

-- @TODO : although accidentally OK, but theoretically Nothing plays the role of positive infinite. Make an explicit algebra for it: see `extended reals'.
predicateForIncludingBoundary, predicateForExcludingBoundary, predicateForExactBoundary :: Predicate Float
predicateForIncludingBoundary n =      n =~= 0  || n >= 0
predicateForExcludingBoundary n = not (n =~= 0) && n >  0
predicateForExactBoundary     n =      n =~= 0

eliminateAllVars :: IneqSystem -> [Float]
eliminateAllVars = map snd . maybeLoop eliminateVar1

eliminateVar1 :: IneqSystem -> Maybe IneqSystem
eliminateVar1 []  = Nothing
eliminateVar1 lst = fmap recombine $ partitionateByNormalization lst

partitionateByNormalization :: IneqSystem -> Maybe (SignPartitioned Inequality)
partitionateByNormalization []             = Just ([], [], [])
partitionateByNormalization (ineq : ineqs) = liftM2 dispatch (tagByNormalization ineq) (partitionateByNormalization ineqs)

tagByNormalization :: Inequality -> Maybe (SignTagged Inequality)
tagByNormalization ineq = do
    (mainCoeff, ineq') <- footUncons ineq
    let    (signTag, normalizerFunction) = decideNormalizationRule mainCoeff
    return (signTag, footMap normalizerFunction ineq')

decideNormalizationRule :: Float -> SignTagged (Float -> Float)
decideNormalizationRule mainCoeff
    | mainCoeff =~= 0 = (EQ, id     ) 
    | mainCoeff  >  0 = (GT, (/  mainCoeff) )
    | mainCoeff  <  0 = (LT, (/(-mainCoeff)))

dispatch :: SignTagged a -> SignPartitioned a -> SignPartitioned a
dispatch (tag, a) (negs, nuls, poss) = case tag of
        LT -> (a:negs, nuls, poss)
        EQ -> (negs, a:nuls, poss)
        GT -> (negs, nuls, a:poss)

-- @TODO: generalize signature
recombine :: SignPartitioned Inequality -> IneqSystem
recombine (negs, nuls, poss) = descartesFootPlus negs poss ++ nuls
