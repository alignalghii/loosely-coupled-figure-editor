module GeometryHigh.Polygon where

import GeometryLow.Vector
import GeometryLow.Orientation
import GeometryHigh.TourRotation
import Number.RealModulus (isConvex)
import Number.Infinity (PMInf, pMInfCompare, minimumBy)
import Number.Infinitesimal
import GeometryHigh.FourierMotzkinElimination
import Data.NonEmptyFootList (tripleToNonEmptyFootList, quadrupleToNonEmptyFootList)

import Logic.Combinator
import Logic.LogicalForms
import Logic.Logic (BoolOp1, Predicate, Relation, predicateAnd, relationNot, relationAnd, relationOr, none)

type LineEquation        = (Float, Float, Float) -- Ax + By = C
type HalfPlaneInequality = (Float, Float, Float) -- Ax + By < C

type Ray = (Point, Vector)
type DirectedSegment = (Point, Point)

orientSide :: SideOrientation -> Ray -> HalfPlaneInequality
orientSide sideOrientation  (point, dirVector) = let normalVector = rotBy90 (sideToRotDir_reverse sideOrientation) dirVector
                                                 in  normalVector ..<-. (normalVector *.* point)

edgeSide :: RotationDirection -> DirectedSegment -> HalfPlaneInequality
edgeSide rotDir = orientSide (rotToSideDir_natural rotDir) . edgeRay

edgeRay :: DirectedSegment -> Ray
edgeRay (startPoint, endPoint) = (startPoint, startPoint .-> endPoint)

edgeVector :: DirectedSegment -> Vector
edgeVector = uncurry fromTo

(..<-.) :: (a, b) -> c -> (a, b, c)
(a, b) ..<-. c = (a, b, c)


polygonInequalityStructure :: BoundnessSign -> [Point] -> DisjunctiveNormalForm HalfPlaneInequality
polygonInequalityStructure boundnessSign = opsTerminatedListToDnf boundnessSign . polygonInequalityStructure_ boundnessSign

polygonInequalityStructure_ :: BoundnessSign -> [Point] -> [OpTerminated HalfPlaneInequality]
polygonInequalityStructure_ boundnessSign  vertices = let edges   = tour vertices
                                                          rotDir  = tourRotDir vertices
                                                          rotDir_ = effectiveRotDir boundnessSign rotDir
                                                      in cycleToOpsTerminatedListWith (convexEdgeBendBy rotDir_) (edgeSide rotDir_) edges

convexVectorBend :: Vector -> Vector -> Bool
convexVectorBend = deter_2 isConvex angle2_0360

convexVectorBendBy :: RotationDirection -> Vector -> Vector -> Bool
convexVectorBendBy rotDir u v = isConvex $ angle2_0360_by rotDir u v

convexEdgeBendBy :: RotationDirection -> DirectedSegment -> DirectedSegment -> Bool
convexEdgeBendBy rotDir = psi (convexVectorBendBy rotDir) edgeVector

-- Collision

diagnostizeCollision :: BoundnessSign -> BoundnessSign -> [Point] -> [Point] -> [IneqSystemCharacteristic]
diagnostizeCollision bs1 bs2 verticesA verticesB = let ineqSystemsA = polygonInequalityStructure bs1 verticesA
                                                       ineqSystemsB = polygonInequalityStructure bs2 verticesB
                                                       ineqSystems  = dnfAnd ineqSystemsA ineqSystemsB
                                                   in map ineqSystemCharacteristic $ map (map tripleToNonEmptyFootList) ineqSystems

diagnostizeIntersect, diagnostizeAntiContain :: [Point] -> [Point] -> [IneqSystemCharacteristic]
diagnostizeIntersect   = diagnostizeCollision Containment Containment
diagnostizeAntiContain = diagnostizeCollision Containment Complementary

intersectIncludingTouch, intersectExcludingTouch, intersectExactlyTouch :: [Point] -> [Point] -> Bool
intersectIncludingTouch = globalPredicateForIncludingBoundary `deter_2` diagnostizeIntersect
intersectExcludingTouch = globalPredicateForExcludingBoundary `deter_2` diagnostizeIntersect
intersectExactlyTouch   = globalPredicateForExactBoundary     `deter_2` diagnostizeIntersect
--intersectExactlyTouch verticesA verticesB  = intersectIncludingTouch verticesA verticesB && not (intersectExcludingTouch verticesA verticesB)

containIncludingTouch, containExcludingTouch, containExactlyTouch :: [Point] -> [Point] -> Bool
containIncludingTouch = (not . globalPredicateForExcludingBoundary) `deter_2` diagnostizeAntiContain
containExcludingTouch = (not . globalPredicateForIncludingBoundary) `deter_2` diagnostizeAntiContain
containExactlyTouch   =        globalPredicateForExactBoundary      `deter_2` diagnostizeAntiContain
--containExactlyTouch verticesA verticesB  = containIncludingTouch verticesA verticesB && not (containExcludingTouch verticesA verticesB)

validState, invalidState :: [Point] -> [Point] -> Bool
validState   = relationNot intersectExcludingTouch `relationOr` containIncludingTouch
invalidState = relationNot validState

-- Fall

fallFromOutside, fallFromInside :: Vector -> [Point] -> [Point] -> PMInf Float
fallFromOutside = deter_3 fallScale $ fall_diagnostic Containment Containment
fallFromInside  = deter_3 fallScale $ fall_diagnostic Containment Complementary

fall_diagnostic :: BoundnessSign -> BoundnessSign -> Vector -> [Point] -> [Point] -> [(Maybe Float, Maybe Ordering, Maybe Float)]
fall_diagnostic bs1 bs2 vector verticesSrc verticesTgt = let ineqSystemsSrc  = polygonInequalityStructure bs1 verticesSrc
                                                             ineqSystemsTgt  = polygonInequalityStructure bs2 verticesTgt
                                                             ineqSystemsSrc' = animateWith vector ineqSystemsSrc
                                                             ineqSystemsTgt' = animateWith (0, 0) ineqSystemsTgt
                                                             ineqSystems'    = dnfAnd ineqSystemsSrc' ineqSystemsTgt'
                                                         in map constraintLastVar $ map (map quadrupleToNonEmptyFootList) ineqSystems'

type AnimatedHalfPlaneInequality = (Float, Float, Float, Float)

animateWith :: Vector -> DisjunctiveNormalForm HalfPlaneInequality -> DisjunctiveNormalForm AnimatedHalfPlaneInequality
animateWith vector = map (map (animateWith_ vector))

animateWith_ :: Vector -> HalfPlaneInequality -> AnimatedHalfPlaneInequality
animateWith_ (u, v) (a, b, c) = (a, b, -a*u-b*v, c)

fallScale :: [(Maybe Float, Maybe Ordering, Maybe Float)] -> PMInf Float
fallScale =  minimumBy pMInfCompare . map fallScale_

fallScale_ :: (Maybe Float, Maybe Ordering, Maybe Float) -> PMInf Float
fallScale_ (_       , Just LT, _      ) = Left True
fallScale_ (Nothing , _      , Nothing) = Left False
fallScale_ (Just low, _      , Nothing) = if low >~= 0  then Right low else Left False
fallScale_ (Nothing , _      , Just up) = if up  <~= 0  then Left True else Left False
fallScale_ (Just low, _      , Just up)
    | low =~= up                          = Left True
    | low >~  up                          = Left True
    | low <~  up && low >~= 0             = Right low
    | low <~  up && low <~  0 && up <~= 0 = Left True
    | low <~  up && low <~  0 && up >~  0 = Left False
