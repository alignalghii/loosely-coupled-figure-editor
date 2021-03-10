{-# LANGUAGE DeriveGeneric #-}
module Model where

import GHC.Generics
import Data.Aeson.Types (FromJSON)
import Data.Bool (bool)

data Coord = Coord {x :: Float, y :: Float} deriving Generic

data Name = XGreaterThanY | YGreaterThanX

instance Show Name where
    showsPrec _ XGreaterThanY = (++) "x-greater-than-y"
    showsPrec _ YGreaterThanX = (++) "y-greater-than-x"


instance FromJSON Coord

model :: Coord -> Name
model Coord {x = x, y = y} = bool YGreaterThanX XGreaterThanY (x > y)

indName :: a -> a -> Name -> a
indName xGreaterThanY _ XGreaterThanY = xGreaterThanY
indName _ yGreaterThanX YGreaterThanX = yGreaterThanX
