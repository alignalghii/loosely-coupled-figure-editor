module Data.MaybeX where

maybeLoop :: (a -> Maybe a) -> a -> a
maybeLoop f a = maybe a (maybeLoop f) (f a)

safeMin :: Ord a => [a] -> Maybe a
safeMin [] = Nothing
safeMin lst = Just $ minimum lst
