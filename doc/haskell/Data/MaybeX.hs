module Data.MaybeX where

maybeLoop :: (a -> Maybe a) -> a -> a
maybeLoop f a = maybe a (maybeLoop f) (f a)
