function ccLt( a, b) {return a <  b && !ccEq(a, b);}
function ccGt (a, b) {return a >  b && !ccEq(a, b);}

function ccLeq(a, b) {return a <= b ||  ccEq(a, b);}
function ccGeq(a, b) {return a >= b ||  ccEq(a, b);}

function ccNeq(a, b) {return           !ccEq(a, b);}

function ccIs(n) {return x => ccEq(x, n);}

function ccCompareCases(a, b, ltCase, eqCase, gtCase)
{
	switch (true) {
		case ccEq(a, b): return eqCase;
		case ccLt(a, b): return ltCase;
		case ccGt(a, b): return gtCase;
		default        : throw 'Invalid `compare` label at `ccCompareCases`';
	}
}

const val_ccCompareCases_pIVal = (val1, pIVal2, ltCase, eqCase, gtCase) =>
	maybe(
		ltCase,
		val2 => ccCompareCases(val1, val2, ltCase, eqCase, gtCase),
		pIVal2
	);


//acos_safe, asin_safe, mend :: Float -> Float
function acos_safe(x) {return Math.acos(mend(x));}
function asin_safe(x) {return Math.asin(mend(x));}
function mend     (r)
{
	switch (true) {
		case r < -1: return -1;
		case r >  1: return  1;
		default    : return  r;
	}
}

/*
module Number.Infinitesimal where

import Logic.Combinator

epsilon :: Float
epsilon = 0.0001

class Infinitesimal a where
    normSquare :: a -> Float
    diff :: a -> a -> a

    norm :: a -> Float
    norm = sqrt . normSquare

    distance, (<->) :: a -> a -> Float
    distance a b = norm (a `diff` b)
    (<->) = distance

    approx, (=~=), (=/~=) :: a -> a -> Bool
    approx a b = distance a b < epsilon
    (=~=)  = approx
    (=/~=) = deter_2 not approx

class (Infinitesimal a, Ord a) => InfinitesimalOrd a where
    (<~=), (>~=), (<~), (>~) :: a -> a -> Bool
    a <~= b = a < b || a =~=  b
    a >~= b = a > b || a =~=  b
    a <~  b = a < b && a =/~= b
    a >~  b = a > b && a =/~= b

instance Infinitesimal Float where
    norm = abs
    normSquare a = a*a
    diff a b = a - b

instance InfinitesimalOrd Float

acos_safe, asin_safe, mend :: Float -> Float
acos_safe = acos . mend
asin_safe = asin . mend
mend r
    | r < -1    = -1
    | r >  1    =  1
    | otherwise =  r
*/
