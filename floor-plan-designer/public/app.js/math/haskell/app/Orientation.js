/*
module GeometryLow.Orientation where

data SideOrientation = LeftSide | RightSide
data RotationDirection = PositiveRotation | NegativeRotation deriving (Eq, Show)
*/

//sideToRotDir_natural, sideToRotDir_reverse :: SideOrientation -> RotationDirection
function sideToRotDir_natural(sidedness)
{
	switch (sidedness) {
		case 'left-side' : return 'positive-rotation';
		case 'right-side': return 'negative-rotation';
		default          : throw "Sidedness error: invalid label `" + sidedness + "'";
	}
}
function sideToRotDir_reverse(sidedness)
{
	switch (sidedness) {
		case 'left-side' : return 'negative-rotation';
		case 'right-side': return 'positive-rotation';
		default          : throw "Sidedness error: invalid label `" + sidedness + "'";
	}
}

//rotToSideDir_natural, rotToSideDir_reverse :: RotationDirection -> SideOrientation
function rotToSideDir_natural(rotDir)
{
	switch (rotDir) {
		case 'positive-rotation': return 'left-side' ;
		case 'negative-rotation': return 'right-side';
		default                 : throw "Rotation-direction error: invalid label `" + rotDir + "'";
	}
}
function rotToSideDir_reverse(rotDir)
{
	switch (rotDir) {
		case 'positive-rotation': return 'right-side' ;
		case 'negative-rotation': return 'left-side';
		default                 : throw "Rotation-direction error: invalid label `" + rotDir + "'";
	}
}

//invertRot :: RotationDirection -> RotationDirection
function invertRot(rotDir)
{
	switch (rotDir) {
		case 'positive-rotation': return 'negative-rotation' ;
		case 'negative-rotation': return 'positive-rotation';
		default                 : throw "Rotation-direction error: invalid label `" + rotDir + "'";
	}
}

//invertSide :: SideOrientation -> SideOrientation
function invertSide(sidedness)
{
	switch (sidedness) {
		case 'left-side' : return 'right-side';
		case 'right-side': return 'left-side';
		default          : throw "Sidedness error: invalid label `" + sidedness + "'";
	}
}

//rotationDirectionInterpretation :: Num a => RotationDirection -> (a -> a)
function rotationDirectionInterpretation(rotDir)
{
	switch (rotDir) {
		case 'positive-rotation': return a =>  a;
		case 'negative-rotation': return a => -a;
		default                 : throw "Rotation-direction error: invalid label `" + rotDir + "'";
	}
}

//data BoundnessSign = Containment | Complementary

//effectiveRotDir :: BoundnessSign -> RotationDirection -> RotationDirection
function effectiveRotDir(boundnessSign, rotationDirection)
{
	var caseString = boundnessSign + ' ! ' + rotationDirection;
	switch (caseString) {
		case 'containment ! positive-rotation'  : return 'positive-rotation';
		case 'containment ! negative-rotation'  : return 'negative-rotation';
		case 'complementary ! positive-rotation': return 'negative-rotation';
		case 'complementary ! negative-rotation': return 'positive-rotation';
		default                                 : throw "Invalid label pair for combined boundness-sign and rotation-direction: `" + caseString + "'";
	}
}
