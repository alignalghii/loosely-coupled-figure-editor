module Data.TupleX where

prod3 :: (a -> a') -> (b -> b') ->  (c -> c') -> (a, b, c) -> (a', b', c')
prod3 f g h (a, b, c) = (f a, g b, h c)
