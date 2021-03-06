/*
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
};
*/


//orientSide :: SideOrientation -> Ray -> HalfPlaneInequality
function orientSide(sideOrientation, [point, dirVector])
{
	var normalVector = rotBy90(sideToRotDir_reverse(sideOrientation), dirVector);
	return pushAfterPair(normalVector, scalarProduct(normalVector, point));
};


//edgeSide :: RotationDirection -> DirectedSegment -> HalfPlaneInequality
function edgeSide(rotDir, directedSegment)
{
	var ray     = edgeRay(directedSegment),
	    sideDir = rotToSideDir_natural(rotDir);
	return orientSide(sideDir, ray);
}

//edgeRay :: DirectedSegment -> Ray
function edgeRay([startPoint, endPoint]) {return [startPoint, fromTo(startPoint, endPoint)];}


//edgeVector :: DirectedSegment -> Vector
function edgeVector([beginPoint, endPoint]) {return fromTo(beginPoint, endPoint);}

//(..<-.) :: (a, b) -> c -> (a, b, c)
function pushAfterPair([a, b], c) {return [a, b, c];};

//polygonInequalityStructure :: BoundnessSign -> [Point] -> DisjunctiveNormalForm HalfPlaneInequality
function polygonInequalityStructure(boundnessSign, vertices)
{
	var ineqStruct = polygonInequalityStructure_(boundnessSign, vertices);
	return opsTerminatedListToDnf(boundnessSign, ineqStruct);
};



//polygonInequalityStructure_ :: BoundnessSign -> [Point] -> [OpTerminated HalfPlaneInequality]
function polygonInequalityStructure_(boundnessSign, vertices)
{
	var edges   = tour(vertices),
	    rotDir  = tourRotDir(vertices),
	    rotDir_ = effectiveRotDir(boundnessSign, rotDir);
	function halfPlaneForEdge(directedSegment) {return edgeSide(rotDir_, directedSegment);}
	function convexEdgesRelation(directedSegment1, directedSegment2) {return convexEdgeBendBy(rotDir_, directedSegment1, directedSegment2);}
	return cycleToOpsTerminatedListWith(convexEdgesRelation, halfPlaneForEdge, edges);
}

//convexVectorBend :: Vector -> Vector -> Bool
function convexVectorBend(u, v) {return isConvex(angle2_0360(u, v));}
//convexVectorBendBy :: RotationDirection -> Vector -> Vector -> Bool
function convexVectorBendBy(rotDir, u, v) {return isConvex(angle2_0360_by(rotDir, u, v));}
//convexEdgeBendBy :: RotationDirection -> DirectedSegment -> DirectedSegment -> Bool
function convexEdgeBendBy(rotDir, directedSegment1, directedSegment2)
{
	var edgeVector1 = edgeVector(directedSegment1),
	    edgeVector2 = edgeVector(directedSegment2);
	return convexVectorBendBy(rotDir, edgeVector1, edgeVector2);
}


// Collision

//diagnostizeCollision :: BoundnessSign -> BoundnessSign -> [Point] -> [Point] -> [IneqSystemCharacteristic]
function diagnostizeCollision(bs1, bs2, verticesA, verticesB)
{
	var ineqSystemsA = polygonInequalityStructure(bs1, verticesA),
	    ineqSystemsB = polygonInequalityStructure(bs2, verticesB),
	    ineqSystems  = dnfAnd(ineqSystemsA, ineqSystemsB),
	    matrices = ineqSystems.map(ineqSys => ineqSys.map(tripleToNonEmptyFootList));
	return matrices.map(ineqSystemCharacteristic);
};



//diagnostizeIntersect, diagnostizeAntiContain :: [Point] -> [Point] -> [IneqSystemCharacteristic]
function diagnostizeIntersect      (verticesSrc, verticesTgt) {return diagnostizeCollision('containment'  , 'containment'  , verticesSrc, verticesTgt);}
function diagnostizeAntiContains   (verticesSrc, verticesTgt) {return diagnostizeCollision('complementary', 'containment'  , verticesSrc, verticesTgt);}
function diagnostizeAntiContainedBy(verticesSrc, verticesTgt) {return diagnostizeCollision('containment'  , 'complementary', verticesSrc, verticesTgt);}


//intersectIncludingTouch, intersectExcludingTouch, intersectExactlyTouch :: [Point] -> [Point] -> Bool
//intersectExactlyTouch verticesA verticesB  = intersectIncludingTouch verticesA verticesB && not (intersectExcludingTouch verticesA verticesB)
function intersectIncludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeIntersect(verticesSrc, verticesTgt);
	return globalPredicateForIncludingBoundary(ineqSysCharacteristics);
}
function intersectExcludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeIntersect(verticesSrc, verticesTgt);
	return globalPredicateForExcludingBoundary(ineqSysCharacteristics);
}
function intersectExactlyTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeIntersect(verticesSrc, verticesTgt);
	return globalPredicateForExactBoundary(ineqSysCharacteristics);
}

//containIncludingTouch, containExcludingTouch, containExactlyTouch :: [Point] -> [Point] -> Bool
//containExactlyTouch verticesA verticesB  = containIncludingTouch verticesA verticesB && not (containExcludingTouch verticesA verticesB)
function containsIncludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContains(verticesSrc, verticesTgt);
	return !globalPredicateForExcludingBoundary(ineqSysCharacteristics);
}
function containsExcludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContains(verticesSrc, verticesTgt);
	return !globalPredicateForIncludingBoundary(ineqSysCharacteristics);
}
function containsExactlyTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContains(verticesSrc, verticesTgt);
	return globalPredicateForExactBoundary(ineqSysCharacteristics);
}

// containedBy(src, tgt) <===> contain(tgt, src)
function containedByIncludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContainedBy(verticesSrc, verticesTgt);
	return !globalPredicateForExcludingBoundary(ineqSysCharacteristics);
}
function containedByExcludingTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContainedBy(verticesSrc, verticesTgt);
	return !globalPredicateForIncludingBoundary(ineqSysCharacteristics);
}
function containedByExactlyTouch(verticesSrc, verticesTgt)
{
	var ineqSysCharacteristics = diagnostizeAntiContainedBy(verticesSrc, verticesTgt);
	return globalPredicateForExactBoundary(ineqSysCharacteristics);
}



//validSituation, invalidSituation :: [Point] -> [Point] -> Bool
// @TODO: optimize: for src, FME of containement is counted thrice instead of once (and same applies for tgt)
function validSituation(verticesSrc, verticesTgt) {return !intersectExcludingTouch(verticesSrc, verticesTgt) || containsIncludingTouch(verticesSrc, verticesTgt) || containedByIncludingTouch(verticesSrc, verticesTgt);}
function invalidSituation(verticesSrc, verticesTgt) {return !validSituation(verticesSrc, verticesTgt);}

// @TODO! optimize!
function situationStatus(verticesSrc, verticesTgt)
{
	var disjoint_weak      = !intersectExcludingTouch  (verticesSrc, verticesTgt),
	    disjoint_strict    = !intersectIncludingTouch  (verticesSrc, verticesTgt);
	var contains_weak      =  containsIncludingTouch   (verticesSrc, verticesTgt),
	    contains_strict    =  containsExcludingTouch   (verticesSrc, verticesTgt);
	var containedBy_weak   =  containedByIncludingTouch(verticesSrc, verticesTgt),
	    containedBy_strict =  containedByExcludingTouch(verticesSrc, verticesTgt);

	var status = {};
	if (disjoint_weak    && !disjoint_strict   ) status.disjoint    = 0;
	if (disjoint_weak    &&  disjoint_strict   ) status.disjoint    = 1;
	if (contains_weak    && !contains_strict   ) status.contains    = 0;
	if (contains_weak    &&  contains_strict   ) status.contains    = 1;
	if (containedBy_weak && !containedBy_strict) status.containedBy = 0;
	if (containedBy_weak &&  containedBy_strict) status.containedBy = 1;
	return status;
}


// Fall



//type AnimatedHalfPlaneInequality = (Float, Float, Float, Float)

//animateWith :: Vector -> DisjunctiveNormalForm HalfPlaneInequality -> DisjunctiveNormalForm AnimatedHalfPlaneInequality
function animateWith(vector, dnf)
{
	function animateLiteralWithIt(halfPlane) {return animateWith_(vector, halfPlane);}
	return dnf.map(conjuctiveSubterm => conjuctiveSubterm.map(animateLiteralWithIt));
};

//animateWith_ :: Vector -> HalfPlaneInequality -> AnimatedHalfPlaneInequality
function animateWith_([u, v], [a, b, c]) {return [a, b, -a*u-b*v, c];};



//fall_diagnostic :: BoundnessSign -> BoundnessSign -> Vector -> [Point] -> [Point] -> [(Maybe Float, Maybe Ordering, Maybe Float)]
function fall_diagnostic(bs1, bs2, vector, verticesSrc, verticesTgt)
{
	var ineqSystemsSrc  = polygonInequalityStructure(bs1, verticesSrc),
	    ineqSystemsTgt  = polygonInequalityStructure(bs2, verticesTgt),
	    ineqSystemsSrc_ = animateWith(vector, ineqSystemsSrc),
	    ineqSystemsTgt_ = animateWith([0, 0], ineqSystemsTgt),
	    ineqSystems_    = dnfAnd(ineqSystemsSrc_, ineqSystemsTgt_);
	return ineqSystems_.map(ineqSys => ineqSys.map(quadrupleToNonEmptyFootList)).map(constraintLastVar);
};

//fallFromOutside, fallFromInside, fallFromAround :: Vector -> [Point] -> [Point] -> PMInf Float
function fallFromOutside(vector, verticesSrc, verticesTgt)
{
	var constraintPartitions = fall_diagnostic('containment', 'containment', vector, verticesSrc, verticesTgt);
	return fallScale(constraintPartitions);
}
function fallFromInside(vector, verticesSrc, verticesTgt)
{
	var constraintPartitions = fall_diagnostic('containment', 'complementary', vector, verticesSrc, verticesTgt);
	return fallScale(constraintPartitions);
}
function fallFromAround(vector, verticesSrc, verticesTgt)
{
	var constraintPartitions = fall_diagnostic('complementary', 'containment', vector, verticesSrc, verticesTgt);
	return fallScale(constraintPartitions);
}



function fallPolygonOnPolygon_IMPROVED(verticesSrc, verticesTgt, fallDirectionVector)
{
	// @TODO: optimize!
	/*var ineqSystemsSrc  = polygonInequalityStructure('containment'  , verticesSrc),
	    ineqSystemsSrc_ = polygonInequalityStructure('complementary', verticesSrc),
	    ineqSystemsTgt  = polygonInequalityStructure('containment'  , verticesTgt),
	    ineqSystemsTgt_ = polygonInequalityStructure('complementary', verticesTgt),

	    ineqSystems_intersect       = dnfAnd(ineqSystemsSrc , ineqSystemsTgt ),
	    ineqSystems_antiContains    = dnfAnd(ineqSystemsSrc_, ineqSystemsTgt ),
	    ineqSystems_antiContainedBy = dnfAnd(ineqSystemsSrc , ineqSystemsTgt_),*/

	var status = situationStatus(verticesSrc, verticesTgt);
	if ('disjoint'    in status) return fallFromOutside(fallDirectionVector, verticesSrc, verticesTgt);
	if ('containedBy' in status) return fallFromInside (fallDirectionVector, verticesSrc, verticesTgt);
	if ('contains'    in status) return fallFromAround (fallDirectionVector, verticesSrc, verticesTgt);
	// if control reaches here, it means empty situation status, and that means collision:
	return minusInfinity;
}


//fallScale :: [(Maybe Float, Maybe Ordering, Maybe Float)] -> PMInf Float
function fallScale(constraintPartitions)
{
	var extendedScaleValues = constraintPartitions.map(fallScale_);
	return minimumBy(pMInfCompare, extendedScaleValues);
}




//fallScale_ :: (Maybe Float, Maybe Ordering, Maybe Float) -> PMInf Float
function fallScale_(constraintPartition)
{
	var [mbLow, mbIndiff, mbUp] = constraintPartition,
	    caseTriple = JSON.stringify(constraintPartition);
	switch (true) {
		case /\[.*\],\["just","lt"\],\[.*\]/     .test(caseTriple): return ['left', true ];
		case /\["nothing"\],\[.*\],\["nothing"\]/.test(caseTriple): return ['left', false];
		case /\["just",.*\],\[.*\],\["nothing"\]/.test(caseTriple): return ccGeq(mbLow[1], 0) ? ['right', mbLow[1]] : ['left', false];
		case /\["nothing"\],\[.*\],\["just",.*\]/.test(caseTriple): return ccLeq(mbUp [1], 0) ? ['left' , true    ] : ['left', false];
		case /\["just",.*\],\[.*\],\["just",.*\]/.test(caseTriple):
			var [low, up] = [mbLow[1], mbUp[1]];
			if (ccEq(low, up)                                 ) return ['left', true];
			if (ccGt(low, up)                                 ) return ['left', true];
			if (ccLt(low, up) && ccGeq(low, 0)                ) return ['right', low];
			if (ccLt(low, up) && ccLt (low, 0) && ccLeq(up, 0)) return ['left', true ];
			if (ccLt(low, up) && ccLt (low, 0) && ccGt (up, 0)) return ['left', false];
	}
}
