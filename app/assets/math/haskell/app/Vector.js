/*
{-# LANGUAGE FlexibleInstances #-}
module GeometryLow.Vector where

import GeometryLow.Orientation -- @TODO
import Number.RealModulus
import Number.Infinitesimal

type Point  = (Float, Float)
type Vector = (Float, Float)
*/

//(.+), (.-), fromTo, (.->) :: Vector -> Vector -> Vector
function pointwisePlus ([a, b], [c, d]) {return [a+c, b+d];}
function pointwiseMinus([a, b], [c, d]) {return [a-c, b-d];}
function diff  (u, v)                   {return pointwiseMinus(u, v);;}
function fromTo(u, v)                   {return pointwiseMinus(v, u);}

//slantScale :: Float -> Vector -> Vector
function slantScale(r, [a, b])          {return [r*a, r*b];}

//scalarProduct, detCols :: Vector -> Vector -> Float
function scalarProduct([a, b], [c, d])  {return a*c + b*d;}
function detCols      ([a, b], [c, d])  {return a*d - b*c;}

//vectorLength, arg :: Vector -> Float
function normSquare  (v) {return scalarProduct(v, v);}
function vectorLength(v) {return Math.sqrt(normSquare(v));}
function arg         (v) {return angle2_0360([1, 0], v);}

//angle2_cosHint, angle2_sinHint, angle2_mP180, angle2_0360 :: Vector -> Vector -> Float
function angle2_cosHint(a, b)
{
	var ab  = scalarProduct(a, b),
	    la  = vectorLength(a),
	    lb  = vectorLength(b),
	    rat = ab / (la * lb),
	    rad = acos_safe(rat);
	return rad * 180 / Math.PI;
}
function angle2_sinHint(a, b)
{
	var aXb = detCols(a, b),
	    la  = vectorLength(a),
	    lb  = vectorLength(b),
	    rat = aXb / (la * lb),
	    rad = asin_safe(rat);
	return rad * 180 / Math.PI;
}
function angle2_mP180(a, b) {return angle2_sinHint(a, b) >= 0 ? angle2_cosHint(a, b) : -angle2_cosHint(a, b);}
function angle2_0360 (a, b) {return mod_0_360(angle2_mP180(a, b));}


//angle2_0360_by :: RotationDirection -> Vector -> Vector -> Float
function angle2_0360_by(rotDir, a, b)
{
	var interpretation = rotationDirectionInterpretation(rotDir),
	    alpha          = angle2_0360(a, b),
	    alpha_         = interpretation(alpha);
	return mod_0_360(alpha_);
}


//rotBy90 :: RotationDirection -> Vector -> Vector
function rotBy90(rotDir, [x, y])
{
	switch (rotDir) {
		case 'positive-rotation': return [-y,  x];
		case 'negative-rotation': return [ y, -x];
		default                 : throw  'Undefined label for rotation direction';
	}
}

/*

instance Infinitesimal (Float, Float) where
    normSquare a = a *.* a
    diff = (.-)
*/
