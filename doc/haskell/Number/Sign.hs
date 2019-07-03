module Number.Sign where

import Data.TupleX (prod3)

type SignTagged a = (Ordering, a)

type SignPartitioned a = ([a], [a], [a])

statSignPartition :: ([a] -> b) -> SignPartitioned a -> (b, b, b) 
statSignPartition f = prod3 f f f
