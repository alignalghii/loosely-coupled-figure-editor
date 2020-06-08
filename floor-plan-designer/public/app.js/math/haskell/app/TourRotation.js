/*
-- In Hungarian: Körüljárás (alakzat körüljárása)

module GeometryHigh.TourRotation where

import GeometryLow.Vector
import Logic.LogicalForms
import Number.Infinitesimal
import GeometryLow.Orientation
*/

//samplePlusRotTriangle, sampleMinusRotTriangle :: [Point]
function samplePlusRotTriangle () {return [(0, 0), (2, 0), (1, 1)];}
function sampleMinusRotTriangle() {return [(0, 0), (1, 1), (2, 0)];}

//rotationalEdgeVectors :: [Point] -> [Vector]
function rotationalEdgeVectors(vertices) {return tour(vertices).map(([beginPoint, endPoint]) => fromTo(beginPoint, endPoint));}

//rotationalExternalAnglesFloating :: [Point] -> [(Vector, Vector)]
function rotationalExternalAnglesFloating(vertices) {return tour(rotationalEdgeVectors(vertices));}

//rotationalExternalAngleMeasures :: [Point] -> [Float]
function rotationalExternalAngleMeasures(vertices) {return rotationalExternalAnglesFloating(vertices).map(([a, b]) => angle2_mP180(a, b));}

//rotationalSumOfExternalAngles :: [Point] -> Float
function rotationalSumOfExternalAngles(vertices) {return rotationalExternalAngleMeasures(vertices).reduce((a,b)=>a+b, 0);}

//tourRotDir :: [Point] -> RotationDirection
function tourRotDir(vertices)
{
	var val = rotationalSumOfExternalAngles(vertices);
	switch (true) {
		case ccEq(val,  360): return 'positive-rotation';
		case ccEq(val, -360): return 'negative-rotation';
		default             : throw "Invalid tour rotation value " + val + " for polygon vertices tour " + JSON.stringify(vertices);
	}
}

//tourRotDirIsPositive, tourRotDirIsNegative :: [Point] -> Bool
function tourRotDirIsPositive(vertices) {return tourRotDir(vertices) == 'positive-rotation';}
function tourRotDirIsNegative(vertices) {return tourRotDir(vertices) == 'negative-rotation';}
