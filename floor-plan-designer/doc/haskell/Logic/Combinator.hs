module Logic.Combinator where

phi  u f g x = u (f x) (g x)
phi2 u f g x y = u (f x y) (g x y)

psi g f x y = g (f x) (f y)

deter = (.)(.)

deter_1 :: (y -> z) -> (x -> y) -> (x -> z)
deter_1 = (.)

deter_2 :: (y -> z) -> (x1 -> x2 -> y) -> (x1 -> x2 -> z)
deter_2 = deter deter_1

deter_3 :: (y -> z) -> (x1 -> x2 -> x3 -> y) -> (x1 -> x2 -> x3 -> z)
deter_3 = deter deter_2
