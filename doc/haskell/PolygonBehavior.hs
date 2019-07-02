module PolygonBehavior where

import GeometryHigh.Polygon

shouldTestPolygonBehavior :: Bool
shouldTestPolygonBehavior = shouldIntersectIncludingTouch && shouldIntersectExcludingTouch && shouldIntersectExactlyTouch && shouldContainIncludingTouch && shouldContainExcludingTouch && shouldContainExactlyTouch && shouldValidState && shouldInvalidState


shouldIntersectIncludingTouch :: Bool
shouldIntersectIncludingTouch = intersectIncludingTouch [] [] &&
    intersectIncludingTouch [(0,0), (2,0), (1,1)] [(0,0), (2,0), (1,1)] && intersectIncludingTouch [(0,0), (2,0), (1,1)] [(2,0), (4,0), (3,1)] && not (intersectIncludingTouch [(0,0), (2,0), (1,1)] [(2.1,0), (4,0), (3,1)]) &&
    intersectIncludingTouch [(0,2), (2,1), (3,3)] [(1,4), (4,1), (7,4)] && intersectIncludingTouch [(0,2), (2,1), (2,3)] [(1,4), (4,1), (7,4)] && not (intersectIncludingTouch [(0,2), (2,1), (1,3)] [(1,4), (4,1), (7,4)]) && intersectIncludingTouch [(0,2), (2,1), (4,4)] [(1,4), (4,1), (7,4)]  &&
    intersectIncludingTouch [(1,4), (5,6), (3,3), (3,-2)] [(1,-2), (6,-3), (5,-1)] &&
    intersectIncludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,1), (2,0), (4,5)] && intersectIncludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1), (2,-2), (4,3)] && not (intersectIncludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1.1), (2,-2.1), (4,2.9)])


shouldIntersectExcludingTouch :: Bool
shouldIntersectExcludingTouch = intersectExcludingTouch [] [] &&
    intersectExcludingTouch [(0,0), (2,0), (1,1)] [(0,0), (2,0), (1,1)]  && not (intersectExcludingTouch [(0,0), (2,0), (1,1)] [(2,0), (4,0), (3,1)])  && not (intersectExcludingTouch [(0,0), (2,0), (1,1)] [(2.1,0), (4,0), (3,1)]) &&
    intersectExcludingTouch [(0,2), (2,1), (3,3)] [(1,4), (4,1), (7,4)] && not (intersectExcludingTouch [(0,2), (2,1), (2,3)] [(1,4), (4,1), (7,4)]) && not (intersectExcludingTouch [(0,2), (2,1), (1,3)] [(1,4), (4,1), (7,4)]) && intersectExcludingTouch [(0,2), (2,1), (4,4)] [(1,4), (4,1), (7,4)] &&
    intersectExcludingTouch [(1,4), (5,6), (3,3), (3,-2)] [(1,-2), (6,-3), (5,-1)] &&
    intersectExcludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,1), (2,0), (4,5)] && not (intersectExcludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1), (2,-2), (4,3)]) && not (intersectExcludingTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1.1), (2,-2.1), (4,2.9)])

shouldIntersectExactlyTouch :: Bool
shouldIntersectExactlyTouch = not (intersectExactlyTouch [] []) &&
    not (intersectExactlyTouch [(0,0), (2,0), (1,1)] [(0,0), (2,0), (1,1)]) && intersectExactlyTouch [(0,0), (2,0), (1,1)] [(2,0), (4,0), (3,1)]  && not (intersectExactlyTouch [(0,0), (2,0), (1,1)] [(2.1,0), (4,0), (3,1)]) &&
    not (intersectExactlyTouch [(0,2), (2,1), (3,3)] [(1,4), (4,1), (7,4)]) && intersectExactlyTouch [(0,2), (2,1), (2,3)] [(1,4), (4,1), (7,4)] && not (intersectExactlyTouch [(0,2), (2,1), (1,3)] [(1,4), (4,1), (7,4)]) && not (intersectExactlyTouch [(0,2), (2,1), (4,4)] [(1,4), (4,1), (7,4)]) &&
    not (intersectExactlyTouch [(1,4), (5,6), (3,3), (3,-2)] [(1,-2), (6,-3), (5,-1)]) && intersectExactlyTouch [(1,4), (5,6), (3,3), (3,-1.5)] [(1,-2), (6,-3), (5,-1)] &&
    not (intersectExactlyTouch [(1,3), (2,1), (2,4), (3,9)] [(0,1), (2,0), (4,5)]) && intersectExactlyTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1), (2,-2), (4,3)] && not (intersectExactlyTouch [(1,3), (2,1), (2,4), (3,9)] [(0,-1.1), (2,-2.1), (4,2.9)])


shouldContainIncludingTouch, shouldContainExcludingTouch, shouldContainExactlyTouch :: Bool
shouldContainIncludingTouch = not (containIncludingTouch [(3,4), (4,4), (4,6), (2,6)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && containIncludingTouch [(3,4), (4,4), (4,6), (2,6), (3,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)] && containIncludingTouch [(3,4), (4,4), (4,6), (2,6), (3,5.2)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)] && containIncludingTouch [(3,4), (4,4), (4,6), (2,6), (3.2,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]
shouldContainExcludingTouch = not (containExcludingTouch [(3,4), (4,4), (4,6), (2,6)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && not (containExcludingTouch [(3,4), (4,4), (4,6), (2,6), (3,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && not (containExcludingTouch [(3,4), (4,4), (4,6), (2,6), (3,5.2)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && containExcludingTouch [(3,4), (4,4), (4,6), (2,6), (3.2,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]
shouldContainExactlyTouch   = not (containExactlyTouch [(3,4), (4,4), (4,6), (2,6)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && containExactlyTouch [(3,4), (4,4), (4,6), (2,6), (3,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)] && containExactlyTouch [(3,4), (4,4), (4,6), (2,6), (3,5.2)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)] && not (containExactlyTouch [(3,4), (4,4), (4,6), (2,6), (3,4.9)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)]) && not (containExactlyTouch [(3,4), (4,4), (4,6), (2,6), (3.2,5)] [(2,2), (5,4), (7,4), (5,8), (1,6), (3,5)])

shouldValidState, shouldInvalidState :: Bool
shouldValidState = validState [(0,0), (2,0), (1,1)] [(0,0), (2,0), (1,1)] && validState [(0,0), (2,0), (1,1)] [(2,0), (4,0), (3,1)] && validState [(0,0), (2,0), (1,1)] [(2.1,0), (4,0), (3,1)] &&
    not (validState [(0,2), (2,1), (3,3)] [(1,4), (4,1), (7,4)]) && validState [(0,2), (2,1), (2,3)] [(1,4), (4,1), (7,4)] && validState [(1,3), (2,1), (2,4), (3,9)] [(0,-1.1), (2,-2.1), (4,2.9)]
shouldInvalidState = not (invalidState [(0,0), (2,0), (1,1)] [(0,0), (2,0), (1,1)]) && not (invalidState [(0,0), (2,0), (1,1)] [(2,0), (4,0), (3,1)]) && not (invalidState [(0,0), (2,0), (1,1)] [(2.1,0), (4,0), (3,1)]) &&
    invalidState [(0,2), (2,1), (3,3)] [(1,4), (4,1), (7,4)] && not (invalidState [(0,2), (2,1), (2,3)] [(1,4), (4,1), (7,4)]) && not (invalidState [(1,3), (2,1), (2,4), (3,9)] [(0,-1.1), (2,-2.1), (4,2.9)])
