module Combinator where

phi  u f g x = u (f x) (g x)
phi2 u f g x y = u (f x y) (g x y)

psi g f x y = g (f x) (f y)

bbb :: (y -> z) -> (x1 -> x2 -> y) -> (x1 -> x2 -> z)
bbb f g x y = f (g x y)
