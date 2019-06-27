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

solveIncludingTie, solveExcludingTie :: DisjunctiveNormalForm HalfPlaneInequality -> Bool
solveIncludingTie = any (isConsistentIncludingTie . map tripleToNEList)
solveExcludingTie = any (isConsistentExcludingTie . map tripleToNEList)

intersectIncludingTouch, intersectExcludingTouch :: [Point] -> [Point] -> Bool
intersectIncludingTouch = solveIncludingTie `bbb` psi dnfAnd (polygonInequalityStructure Containment)
intersectExcludingTouch = solveExcludingTie `bbb` psi dnfAnd (polygonInequalityStructure Containment)

containIncludingTouch, containExcludingTouch :: [Point] -> [Point] -> Bool
containIncludingTouch verticesA verticesB = let eqSysA = polygonInequalityStructure Containment   verticesA
                                                eqSysB = polygonInequalityStructure Complementary verticesB
                                                eqSys  = dnfAnd eqSysA eqSysB
                                            in not $ solveExcludingTie eqSys
containExcludingTouch verticesA verticesB = let eqSysA = polygonInequalityStructure Containment   verticesA
                                                eqSysB = polygonInequalityStructure Complementary verticesB
                                                eqSys  = dnfAnd eqSysA eqSysB
                                            in not $ solveIncludingTie eqSys
