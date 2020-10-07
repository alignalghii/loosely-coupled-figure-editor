{-# LANGUAGE DeriveGeneric #-}
module Model where

import GHC.Generics
import Data.Aeson.Types (FromJSON)
import Data.Bool (bool)

data Coord = Coord {x :: Float, y :: Float} deriving Generic

data Name = Donkey | Favicon

instance Show Name where
    showsPrec _ Donkey = (++) "donkey"
    showsPrec _ Favicon = (++) "favicon"


instance FromJSON Coord

model :: Coord -> Name
model Coord {x = x, y = y} = bool Donkey Favicon (x > y)

indName :: a -> a -> Name -> a
indName donkey _       Donkey  = donkey
indName _      favicon Favicon = favicon
