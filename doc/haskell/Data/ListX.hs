module Data.ListX where

descartesProduct :: [a] -> [b] -> [(a, b)]
descartesProduct    as     bs  =  [(a, b) | a <- as, b <- bs]

descartesWith :: (a -> b -> c) -> [a] -> [b] -> [c]
descartesWith f as bs = map (uncurry f) (descartesProduct as bs)
