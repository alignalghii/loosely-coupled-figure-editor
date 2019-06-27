module Polygon where

import Vector
import Orientation
import TourRotation
import LogicalForms
import RealModulus (isConvex)
import FourierMotzkinElimination
import DataX
import Combinator

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


polygonInequalityStructure :: [Point] -> DisjunctiveNormalForm HalfPlaneInequality
polygonInequalityStructure  = cnfToDnf . opsTerminatedListToCnf . polygonInequalityStructure_

polygonInequalityStructure_ :: [Point] -> [OpTerminated HalfPlaneInequality]
polygonInequalityStructure_  vertices = let edges  = tour vertices
                                            rotDir = tourRotDir vertices
                                        in cycleToOpsTerminatedListWith (convexEdgeBendBy rotDir) (edgeSide rotDir) edges

convexVectorBend :: Vector -> Vector -> Bool
convexVectorBend = bbb isConvex angle2_0360

convexVectorBendBy :: RotationDirection -> Vector -> Vector -> Bool
convexVectorBendBy rotDir u v = isConvex $ angle2_0360_by rotDir u v

convexEdgeBendBy :: RotationDirection -> DirectedSegment -> DirectedSegment -> Bool
convexEdgeBendBy rotDir = psi (convexVectorBendBy rotDir) edgeVector

intersectIncludingTouch, intersectExcludingTouch :: [Point] -> [Point] -> Bool
intersectIncludingTouch = any (isConsistentIncludingTie . map tripleToNEList) `bbb` psi dnfAnd polygonInequalityStructure
intersectExcludingTouch = any (isConsistentExcludingTie . map tripleToNEList) `bbb` psi dnfAnd polygonInequalityStructure
