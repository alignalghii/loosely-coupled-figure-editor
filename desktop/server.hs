{-# LANGUAGE OverloadedStrings #-}

module Main (main) where

import Web.Scotty
import Network.Wai.Middleware.RequestLogger (logStdoutDev)
import Network.Wai.Middleware.Static (static)
import Controller (viewAction, ajaxAction)
import Control.Monad.IO.Class (liftIO)


main :: IO ()
main = scotty 3002 router

router :: ScottyM ()
router = do
    middleware static
    -- middleware logStdoutDev -- it causes 500 internal server error, if the process detaches from closed terminal
    get "/" viewAction
    post "/" ajaxAction
