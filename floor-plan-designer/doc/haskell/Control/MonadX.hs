{-# LANGUAGE NPlusKPatterns #-}

module Control.MonadX where

mLoopN :: Monad m => Int -> (a -> m a) -> a -> m a
mLoopN 0       _  a = return a
mLoopN (n + 1) mf a = mf a >>= mLoopN n mf
