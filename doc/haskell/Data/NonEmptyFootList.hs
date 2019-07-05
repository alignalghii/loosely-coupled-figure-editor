{-# LANGUAGE TupleSections #-}

module Data.NonEmptyFootList where

import Data.ListX (descartesWith)
import Data.List (uncons)
import Control.Arrow (second)


type NonEmptyFootList a = ([a], a)

footMap f (as, a) = (map f as, f a)

footUncons :: NonEmptyFootList a -> Maybe (a, NonEmptyFootList a)
footUncons (lst, foot) = fmap (second (, foot)) $ uncons lst

footHead :: NonEmptyFootList a -> a
footHead (lst, foot) = maybe foot fst $ uncons lst

tripleToNonEmptyFootList :: (r, r, r) -> NonEmptyFootList r
tripleToNonEmptyFootList (a, b, c) = ([a, b], c)

quadrupleToNonEmptyFootList :: (r, r, r, r) -> NonEmptyFootList r
quadrupleToNonEmptyFootList (a, b, lambda, c) = ([a, b, lambda], c)

descartesFootPlus :: Num a => [NonEmptyFootList a] -> [NonEmptyFootList a] -> [NonEmptyFootList a]
descartesFootPlus = descartesWith neFootPlus

neFootPlus :: Num a => NonEmptyFootList a -> NonEmptyFootList a -> NonEmptyFootList a
neFootPlus (as, a) (bs, b) = (zipWith (+) as bs, a + b)
