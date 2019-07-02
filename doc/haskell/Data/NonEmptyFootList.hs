{-# LANGUAGE TupleSections #-}

module Data.NonEmptyFootList where

import Data.SetTheory (withSnd, descartesWith)
import Data.List (uncons)


type NonEmptyFootList a = ([a], a)

footMap f (as, a) = (map f as, f a)

footUncons :: NonEmptyFootList a -> Maybe (a, NonEmptyFootList a)
footUncons (lst, foot) = fmap (withSnd (, foot)) $ uncons lst

footHead :: NonEmptyFootList a -> a
footHead (lst, foot) = maybe foot fst $ uncons lst

tripleToNonEmptyFootList :: (a, a, a) -> NonEmptyFootList a
tripleToNonEmptyFootList (a, b, c) = ([a, b], c)

descartesFootPlus :: Num a => [NonEmptyFootList a] -> [NonEmptyFootList a] -> [NonEmptyFootList a]
descartesFootPlus = descartesWith neFootPlus

neFootPlus :: Num a => NonEmptyFootList a -> NonEmptyFootList a -> NonEmptyFootList a
neFootPlus (as, a) (bs, b) = (zipWith (+) as bs, a + b)
