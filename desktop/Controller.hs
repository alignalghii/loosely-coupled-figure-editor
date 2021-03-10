{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module Controller (viewAction, ajaxAction) where


import View (view)
import Model (model, indName, Name (..))

import Web.Scotty

import Text.Blaze.Html (Html)
import Text.Blaze.Html.Renderer.Pretty (renderHtml)
import Data.Text.Lazy (Text, pack)

import Shelly (shelly, test_f, cp)

import Control.Monad (unless)
import Data.Bool (bool)

viewAction :: ActionM()
viewAction = do
    existsIt >>= flip unless (cpIt XGreaterThanY)
    html $ render view

ajaxAction :: ActionM()
ajaxAction = do
    name <- fmap model jsonData
    cpIt name
    text $ pack $ show name

render :: Html -> Text
render = pack . renderHtml

cpIt :: Name -> ActionM ()
cpIt name = shelly $ cp (indName "image-to-load-upon-x-greater-than-y.png" "image-to-load-upon-y-greater-than-x.png" name) "work.png" -- !! not the same (lazy) Text -- !! No need for liftIO, as shelly returns MonadIO => ...

existsIt :: ActionM Bool
existsIt = shelly $ test_f "work.png" -- !! not the same (lazy) Text -- !! No need for liftIO, as shelly returns MonadIO => ...
