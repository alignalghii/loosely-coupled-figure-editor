module FourierMotzkinEliminationBehavior where

import GeometryHigh.FourierMotzkinElimination

shouldTestFourierMotzkinBehavior :: Bool
shouldTestFourierMotzkinBehavior = shouldConstraintLastVar

shouldConstraintLastVar :: Bool
shouldConstraintLastVar = constraintLastVar [([2, 3, 0], 21), ([1, -2, 0], 0), ([-1, 0, -3], -7), ([1, 1, -1], 5)] == (Just 1, Nothing, Nothing)
