module GeometryLow.RealModulus where

mod0Real, modMinusPlusHalfReal :: Float -> Float -> Float
mod0Real m x
    | x < 0     = mod0Real m (x + m)
    | x < m     = x
    | otherwise = mod0Real m (x - m)
modMinusPlusHalfReal m x
    | x <= -m/2 = mod0Real m (x + m)
    | x <=  m/2 = x
    | otherwise = mod0Real m (x - m)

mod_0_360 :: Float -> Float
mod_0_360 = mod0Real 360

isConvex, isConcave :: Float -> Bool
isConvex angle = mod_0_360 angle <= 180
isConcave = not . isConvex

areConvex, areConcave :: Float -> Float -> Bool
areConvex angle1 angle2 = isConvex (angle2 - angle1)
areConcave angle1 angle2 = not $ areConvex angle1 angle2
