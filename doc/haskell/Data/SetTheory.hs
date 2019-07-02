module Data.SetTheory where

descartesProduct :: [a] -> [b] -> [(a, b)]
descartesProduct    as     bs  =  [(a, b) | a <- as, b <- bs]

descartesWith :: (a -> b -> c) -> [a] -> [b] -> [c]
descartesWith f as bs = map (uncurry f) (descartesProduct as bs)

withFst :: (a -> a') -> (a, b) -> (a', b )
withFst f (a, b) = (f a, b)

withSnd :: (b -> b') -> (a, b) -> (a , b')
withSnd g (a, b) = (a, g b)

