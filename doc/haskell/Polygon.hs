module Polygon where

import Vector
import Orientation
import TourRotation
import LogicalForms
import RealModulus (isConvex)
import FourierMotzkinElimination
import DataX
import Combinator
import Orientation
import Logic (BoolOp1, Predicate, Relation, predicateAnd, relationNot, relationAnd, relationOr, none)

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
polygonInequalityStructure boundnessSign = cnfToDnf . opsTerminatedListToCnf . polygonInequalityStructure_ boundnessSign

polygonInequalityStructure_ :: BoundnessSign -> [Point] -> [OpTerminated HalfPlaneInequality]
polygonInequalityStructure_ boundnessSign  vertices = let edges   = tour vertices
                                                          rotDir  = tourRotDir vertices
                                                          rotDir_ = effectiveRotDir boundnessSign rotDir
                                                      in cycleToOpsTerminatedListWith (convexEdgeBendBy rotDir_) (edgeSide rotDir_) edges

convexVectorBend :: Vector -> Vector -> Bool
convexVectorBend = bbb isConvex angle2_0360

convexVectorBendBy :: RotationDirection -> Vector -> Vector -> Bool
convexVectorBendBy rotDir u v = isConvex $ angle2_0360_by rotDir u v

convexEdgeBendBy :: RotationDirection -> DirectedSegment -> DirectedSegment -> Bool
convexEdgeBendBy rotDir = psi (convexVectorBendBy rotDir) edgeVector

diagnostizeCollision :: BoundnessSign -> BoundnessSign -> [Point] -> [Point] -> [EqSystemCharacteristic]
diagnostizeCollision bs1 bs2 verticesA verticesB = let eqSystemsA = polygonInequalityStructure bs1 verticesA
                                                       eqSystemsB = polygonInequalityStructure bs2 verticesB
                                                       eqSystems  = dnfAnd eqSystemsA eqSystemsB
                                                   in map eqSystemCharacteristic $ map (map tripleToNEList) eqSystems

diagnostizeIntersect, diagnostizeAntiContain :: [Point] -> [Point] -> [EqSystemCharacteristic]
diagnostizeIntersect   = diagnostizeCollision Containment Containment
diagnostizeAntiContain = diagnostizeCollision Containment Complementary

intersectIncludingTouch, intersectExcludingTouch, intersectExactlyTouch :: [Point] -> [Point] -> Bool
intersectIncludingTouch = globalPredicateForIncludingBoundary `bbb` diagnostizeIntersect
intersectExcludingTouch = globalPredicateForExcludingBoundary `bbb` diagnostizeIntersect
intersectExactlyTouch   = globalPredicateForExactBoundary     `bbb` diagnostizeIntersect
--intersectExactlyTouch verticesA verticesB  = intersectIncludingTouch verticesA verticesB && not (intersectExcludingTouch verticesA verticesB)

containIncludingTouch, containExcludingTouch, containExactlyTouch :: [Point] -> [Point] -> Bool
containIncludingTouch = (not . globalPredicateForExcludingBoundary) `bbb` diagnostizeAntiContain
containExcludingTouch = (not . globalPredicateForIncludingBoundary) `bbb` diagnostizeAntiContain
containExactlyTouch   =        globalPredicateForExactBoundary      `bbb` diagnostizeAntiContain
--containExactlyTouch verticesA verticesB  = containIncludingTouch verticesA verticesB && not (containExcludingTouch verticesA verticesB)

validState, invalidState :: [Point] -> [Point] -> Bool
validState   = relationNot intersectExcludingTouch `relationOr` containIncludingTouch
invalidState = relationNot validState
