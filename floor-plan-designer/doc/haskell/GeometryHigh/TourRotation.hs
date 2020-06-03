-- In Hungarian: Körüljárás (alakzat körüljárása)

module GeometryHigh.TourRotation where

import GeometryLow.Vector
import Logic.LogicalForms
import Number.Infinitesimal
import GeometryLow.Orientation

samplePlusRotTriangle, sampleMinusRotTriangle :: [Point]
samplePlusRotTriangle  = [(0, 0), (2, 0), (1, 1)]
sampleMinusRotTriangle = [(0, 0), (1, 1), (2, 0)]

rotationalEdgeVectors :: [Point] -> [Vector]
rotationalEdgeVectors = map (uncurry fromTo) . tour

rotationalExternalAnglesFloating :: [Point] -> [(Vector, Vector)]
rotationalExternalAnglesFloating = tour. rotationalEdgeVectors

rotationalExternalAngleMeasures :: [Point] -> [Float]
rotationalExternalAngleMeasures = map (uncurry angle2_mP180) . rotationalExternalAnglesFloating

rotationalSumOfExternalAngles :: [Point] -> Float
rotationalSumOfExternalAngles = sum . rotationalExternalAngleMeasures

tourRotDir :: [Point] -> RotationDirection
tourRotDir vertices = let val = rotationalSumOfExternalAngles vertices
                                in if val =~=  360
                                    then PositiveRotation
                                    else if val =~= (-360)
                                        then NegativeRotation
                                        else error $ "Invalid tour rotation value " ++ show val ++ " for polygon vertices tour " ++ show vertices

tourRotDirIsPositive, tourRotDirIsNegative :: [Point] -> Bool
tourRotDirIsPositive = (== PositiveRotation) . tourRotDir
tourRotDirIsNegative = (== NegativeRotation) . tourRotDir
