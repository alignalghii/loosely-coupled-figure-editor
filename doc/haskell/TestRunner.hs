module TestRunner where

import PolygonBehavior
import FourierMotzkinEliminationBehavior

test :: Bool
test = shouldTestPolygonBehavior && shouldTestFourierMotzkinBehavior
