module Orientation where

data SideOrientation = LeftSide | RightSide
data RotationDirection = PositiveRotation | NegativeRotation deriving (Eq, Show)

sideToRotDir_natural, sideToRotDir_reverse :: SideOrientation -> RotationDirection
sideToRotDir_natural LeftSide  = PositiveRotation
sideToRotDir_natural RightSide = NegativeRotation
sideToRotDir_reverse LeftSide  = NegativeRotation
sideToRotDir_reverse RightSide = PositiveRotation

rotToSideDir_natural, rotToSideDir_reverse :: RotationDirection -> SideOrientation
rotToSideDir_natural PositiveRotation = LeftSide
rotToSideDir_natural NegativeRotation = RightSide
rotToSideDir_reverse PositiveRotation = RightSide
rotToSideDir_reverse NegativeRotation = LeftSide

invertRot :: RotationDirection -> RotationDirection
invertRot PositiveRotation = NegativeRotation
invertRot NegativeRotation = PositiveRotation

invertSide :: SideOrientation -> SideOrientation
invertSide LeftSide  = RightSide
invertSide RightSide = LeftSide

rotationDirectionInterpretation :: Num a => RotationDirection -> (a -> a)
rotationDirectionInterpretation PositiveRotation = id
rotationDirectionInterpretation NegativeRotation = negate
