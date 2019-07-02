module Logic.Logic where

import Logic.Combinator (bbb, phi, phi2)

type BoolOp1 = Bool -> Bool
type BoolOp2 = Bool -> Bool -> Bool

type Predicate a = a -> Bool
type Relation a = a -> a -> Bool

type Quantor a = Predicate a -> [a] -> Bool
type QuantifiedPredicate a = (Quantor a, Predicate a)

predicateNot :: Predicate a -> Predicate a
predicateNot = (not .)

predicateAnd, (&.&*), predicateOr, (|.|*) :: Predicate a -> Predicate a -> Predicate a
predicateAnd = phi (&&)
predicateOr  = phi (||)
(&.&*)       = predicateAnd
(|.|*)       = predicateOr

relationNot :: Relation a -> Relation a
relationNot = bbb not

relationAnd, relationOr :: Relation a -> Relation a -> Relation a
relationAnd = phi2 (&&)
relationOr  = phi2 (||)

none, notAll :: Quantor a
none   predicate = not . any predicate
notAll predicate = not . all predicate
