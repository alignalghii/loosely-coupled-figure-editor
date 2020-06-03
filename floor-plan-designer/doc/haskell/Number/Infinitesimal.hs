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
