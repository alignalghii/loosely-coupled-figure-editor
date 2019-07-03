{-# LANGUAGE FlexibleInstances #-}

module GeometryLow.Vector where

import GeometryLow.Orientation -- @TODO
import Number.RealModulus
import Number.Infinitesimal

type Point  = (Float, Float)
type Vector = (Float, Float)

(.+), (.-), fromTo, (.->) :: Vector -> Vector -> Vector 
(a, b) .+ (c, d) = (a+c, b+d)
(a, b) .- (c, d) = (a-c, b-d)
fromTo a b = b .- a
(.->) = fromTo

(^*) :: Float -> Vector -> Vector
r ^* (c, d) = (r*c, r*d)

(*.*), (|*|), angle2_cosHint, angle2_sinHint, angle2_mP180, angle2_0360 :: Vector -> Vector -> Float
(a, b) *.* (c, d) = a*c + b*d
(a, b) |*| (c, d) = a*d - b*c
angle2_cosHint a b = acos_safe ((a *.* b) / (vLength a * vLength b)) * 180 / pi
angle2_sinHint a b = asin_safe ((a |*| b) / (vLength a * vLength b)) * 180 / pi
angle2_mP180 a b = if angle2_sinHint a b >= 0
    then  angle2_cosHint a b
    else -angle2_cosHint a b
angle2_0360 a b = mod_0_360 $ angle2_mP180 a b

angle2_0360_by :: RotationDirection -> Vector -> Vector -> Float
angle2_0360_by rotDir a b = mod_0_360 $ rotationDirectionInterpretation rotDir $ angle2_0360 a b

vLength, arg :: Vector -> Float
vLength v = sqrt(v *.* v)
arg v = angle2_0360 (1, 0) v

rotBy90 :: RotationDirection -> Vector -> Vector
rotBy90 PositiveRotation (x, y) = (-y,  x)
rotBy90 NegativeRotation (x, y) = ( y, -x)


instance Infinitesimal (Float, Float) where
    normSquare a = a *.* a
    diff = (.-)
