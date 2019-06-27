module Combinator where

phi u f g x = u (f x) (g x)

psi g f x y = g (f x) (f y)

bbb :: (y -> z) -> (x1 -> x2 -> y) -> (x1 -> x2 -> z)
bbb f g x y = f (g x y)
