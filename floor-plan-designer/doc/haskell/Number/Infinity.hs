module Number.Infinity where

import Data.List (sortBy)

safeMin :: Ord a => [a] -> Maybe a
safeMin []  = Nothing
safeMin lst = Just $ minimum lst

minimumBy :: (a -> a -> Ordering) -> [a] -> a
minimumBy cmp = head . sortBy cmp

type PMInf a = Either Bool a

pMInfCompare :: Ord a => PMInf a -> PMInf a -> Ordering
pMInfCompare (Left False) (Left False) = EQ
pMInfCompare (Left False) (Right _   ) = LT
pMInfCompare (Left False) (Left True ) = LT
pMInfCompare (Right _   ) (Left False) = GT
pMInfCompare (Right a   ) (Right b   ) = compare a b
pMInfCompare (Right _   ) (Left True ) = LT
pMInfCompare (Left True ) (Left False) = GT
pMInfCompare (Left True ) (Right _   ) = GT
pMInfCompare (Left True ) (Left True ) = EQ
