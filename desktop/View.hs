{-# LANGUAGE OverloadedStrings #-}

module View (view) where

import Text.Blaze.Html5
import Text.Blaze.Html5.Attributes hiding (title)
import Prelude hiding (head, id)

view :: Html
view = docTypeHtml $ do
    head $ do
        meta ! charset "UTF-8"
        script0 ! src "main-dependency-injector.js"
        script0 ! src "Router.js"
        script0 ! src "DiagramController.js"
        script0 ! src "device-drivers/WorkCanvasDeviceDriver.js"
        script0 ! src "device-drivers/DiagramServerDeviceDriver.js"
        script0 ! src "algebraic-datatypes/Maybe.js"
        title "Desktop prototype"
    body $ do
        h1 "Desktop prototype"
        img ! id "work-image" ! src "work.png" ! alt "Work canvas"

script0 :: Html
script0 = script mempty
