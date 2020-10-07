{-# LANGUAGE OverloadedStrings #-}

module Main (main) where

import Web.Scotty hiding (Options)
import Network.Wai.Middleware.RequestLogger (logStdoutDev)
import Network.Wai.Middleware.Static
import Controller (viewAction, ajaxAction)
import Control.Monad.IO.Class (liftIO)


main :: IO ()
main = do
    cacheContainer <- liftIO $ initCaching PublicStaticCaching
    let options = defaultOptions {cacheContainer = cacheContainer}
    scotty 3000 $ router options

router :: Options -> ScottyM ()
router options = do
    middleware $ staticPolicyWithOptions options mempty -- static
    middleware logStdoutDev
    get "/" viewAction
    post "/" ajaxAction
