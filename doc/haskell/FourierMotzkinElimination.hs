{-# LANGUAGE TupleSections #-}

module FourierMotzkinElimination where

import Infinitesimal ((=~=))
import Data.List (uncons)
import DataX (NEList, descartesWith)

isConsistentIncludingTie, isConsistentExcludingTie :: [NEList Float] -> Bool
isConsistentIncludingTie = maybe True (\n -> n =~= 0 || n >= 0) . consistence
isConsistentExcludingTie = maybe True (\n -> not (n =~= 0) && n > 0) . consistence

consistence :: [NEList Float] -> Maybe Float
consistence = safeMin . eliminate

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

descartesPlus :: Num a => [NEList a] -> [NEList a] -> [NEList a]
descartesPlus = descartesWith nePlus


nePlus :: Num a => NEList a -> NEList a -> NEList a
nePlus (a, as) (b, bs) = (a + b, zipWith (+) as bs)

maybeLoop :: (a -> Maybe a) -> a -> a
maybeLoop f a = maybe a (maybeLoop f) (f a)

safeMin :: Ord a => [a] -> Maybe a
safeMin [] = Nothing
safeMin lst = Just $ minimum lst
