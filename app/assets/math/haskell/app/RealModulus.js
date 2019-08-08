//module Number.RealModulus where

//mod0Real, modMinusPlusHalfReal :: Float -> Float -> Float

function mod0Real(m, x)
{
	while (x < 0 || x >= m) x+= -Math.sign(x)*m;
	return x;
}
function modMinusPlusHalfReal(m, x)
{
	while (x <= -m/2 || x > m/2) x+= -Math.sign(x)*m;
	return x;
}

//mod_0_360 :: Float -> Float
function mod_0_360(x) {return mod0Real(360, x);}
const mod_0_180 = x => mod0Real(180, x);

//isConvex, isConcave :: Float -> Bool
function isConvex (angle) {return mod_0_360(angle) <= 180;}
function isConcave(angle) {return !isConvex(angle);}

//areConvex, areConcave :: Float -> Float -> Bool
function areConvex (angle1, angle2) {return isConvex  (angle2 - angle1);}
function areConcave(angle1, angle2) {return !areConvex(angle1,  angle2);}
