{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module Controller (viewAction, ajaxAction) where


import View (view)
import Model (model, indName, Name (..))

import Web.Scotty

import Text.Blaze.Html (Html)
import Text.Blaze.Html.Renderer.Pretty (renderHtml)
import Data.Text.Lazy (Text, pack)

import Shelly
import Data.Time.Clock.POSIX
import Data.Bool (bool)

viewAction :: ActionM()
viewAction = do
    existsIt >>= flip unless (cpIt Donkey)
    html $ render view

ajaxAction :: ActionM()
ajaxAction = do
    name <- fmap model jsonData
    cpIt name
    t <- getTimeStamp
    text $ pack $ show name ++ "-" ++ show t

render :: Html -> Text
render = pack . renderHtml

cpIt :: Name -> ActionM ()
cpIt name = shelly $ cp (indName "donkey.svg" "favicon.svg" name) "work.svg" -- !! not the same (lazy) Text -- !! No need for liftIO, as shelly returns MonadIO => ...

existsIt :: ActionM Bool
existsIt = shelly $ test_f "work.svg" -- !! not the same (lazy) Text -- !! No need for liftIO, as shelly returns MonadIO => ...

getTimeStamp :: ActionM Int
getTimeStamp = fmap (round . (* 1000)) $ liftIO $ getPOSIXTime
