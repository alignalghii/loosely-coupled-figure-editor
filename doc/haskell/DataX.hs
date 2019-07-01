module DataX where


descartesProduct :: [a] -> [b] -> [(a, b)]
descartesProduct    as     bs  =  [(a, b) | a <- as, b <- bs]

descartesWith :: (a -> b -> c) -> [a] -> [b] -> [c]
descartesWith f as bs = map (uncurry f) (descartesProduct as bs)


tripleToList :: (a, a, a) -> [a]
tripleToList (a, b, c) = [a, b, c]

type NEList a = (a, [a])

tripleToNEList :: (a, a, a) -> NEList a
tripleToNEList (a, b, c) = (a, [b, c])


descartesPlus :: Num a => [NEList a] -> [NEList a] -> [NEList a]
descartesPlus = descartesWith nePlus


nePlus :: Num a => NEList a -> NEList a -> NEList a
nePlus (a, as) (b, bs) = (a + b, zipWith (+) as bs)

maybeLoop :: (a -> Maybe a) -> a -> a
maybeLoop f a = maybe a (maybeLoop f) (f a)

safeMin :: Ord a => [a] -> Maybe a
safeMin [] = Nothing
safeMin lst = Just $ minimum lst
