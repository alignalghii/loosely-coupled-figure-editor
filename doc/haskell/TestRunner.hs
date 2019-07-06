module TestRunner where

import PolygonBehavior (shouldTestPolygonBehavior)
import FourierMotzkinEliminationBehavior (shouldTestFourierMotzkinBehavior)
import LogicalFormsBehavior (shouldTestLogicalFormsBehavior)

test :: Bool
test = shouldTestPolygonBehavior && shouldTestFourierMotzkinBehavior && shouldTestLogicalFormsBehavior
