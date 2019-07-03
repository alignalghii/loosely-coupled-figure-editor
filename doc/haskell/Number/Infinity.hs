module Number.Infinity where

safeMin :: Ord a => [a] -> Maybe a
safeMin []  = Nothing
safeMin lst = Just $ minimum lst
