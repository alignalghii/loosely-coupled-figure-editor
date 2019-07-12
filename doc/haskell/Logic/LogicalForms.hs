module Logic.LogicalForms where

import Data.ListX (descartesProduct, descartesWith)
import Logic.Logic (Relation)
import Data.Bool (bool)
import GeometryLow.Orientation (BoundnessSign (..))
import Control.Arrow (first)

data Op = Or | And deriving (Eq, Show)
type OpTerminated a = (a, Op)
type NormalForm a = [[a]]
type DisjunctiveNormalForm a = NormalForm a
type ConjunctiveNormalForm a = NormalForm a

tour :: [point]            -> [(point, point)]
tour []                    =  []
tour path@(startPoint : _) =  tourWithSpliceBack startPoint path

tourWithSpliceBack :: point -> [point]                    -> [(point, point)]
tourWithSpliceBack startPoint  []                         =  [] -- impossible case, when called from `tour`
tourWithSpliceBack startPoint  [lastPoint]                =  [(lastPoint, startPoint)]
tourWithSpliceBack startPoint  (point1 : points@(point2 : _)) =  (point1, point2) : tourWithSpliceBack startPoint points

cycleToOpsTerminatedListWith :: Relation edge -> (edge -> halfPlane) -> [edge] -> [OpTerminated halfPlane]
cycleToOpsTerminatedListWith areConvex inequalityOf = map (uncurry $ opTerminate areConvex inequalityOf) . tour

opTerminate :: Relation edge -> (edge -> halfPlane) -> edge -> edge -> OpTerminated halfPlane
opTerminate areConvex inequalityOf edge1 edge2 = (inequalityOf edge1, bool Or And $ areConvex edge1 edge2) 


opsTerminatedListToDnf :: BoundnessSign -> [OpTerminated halfPlane] -> DisjunctiveNormalForm halfPlane
opsTerminatedListToDnf Containment   = cnfToDnf . uncurry spliceBackIfNeeded . takeSubTermsSeparatedBy And
opsTerminatedListToDnf Complementary =            uncurry spliceBackIfNeeded . takeSubTermsSeparatedBy Or

spliceBackIfNeeded :: [[halfPlane]] -> Maybe [halfPlane] -> [[halfPlane]]
spliceBackIfNeeded subterms = maybe subterms (spliceBack subterms)

spliceBack :: [[halfPlane]] -> [halfPlane] -> [[halfPlane]]
spliceBack []                   subtermToBeSplicedBack = [subtermToBeSplicedBack]
spliceBack (subterm : subterms) subtermToBeSplicedBack = (subtermToBeSplicedBack ++ subterm) : subterms

takeSubTermsSeparatedBy :: Op -> [OpTerminated halfPlane] -> ([[halfPlane]], Maybe [halfPlane])
takeSubTermsSeparatedBy separatorOp []               = ([], Nothing) -- Nothing: simply-closed chain
takeSubTermsSeparatedBy separatorOp (opped : oppeds) = let (subterm, maybeIndependentCorpusRemainder) = takeSubTermTerminatedBy separatorOp opped oppeds
                                                       in case maybeIndependentCorpusRemainder of
                                                           Nothing                         -> ([], Just subterm) --  Just: last term is to-be-splicedback (looped) chain
                                                           Just independentCorpusRemainder -> first (subterm :) $ takeSubTermsSeparatedBy separatorOp independentCorpusRemainder

takeSubTermTerminatedBy :: Op -> OpTerminated halfPlane -> [OpTerminated halfPlane] -> ([halfPlane], Maybe [OpTerminated halfPlane])
takeSubTermTerminatedBy terminatorOp (halfPlane, postOp) oppeds
    | postOp == terminatorOp = ([halfPlane], Just oppeds) --  `Just more` signifies that `[halfPlane]` is a normal terminated term
    | postOp /= terminatorOp = case oppeds of
        []     -> ([halfPlane], Nothing) -- `Nothing` signifies that `[halfPlane]` last term is meant as the spliceback term.
        (o:os) -> first (halfPlane :) $ takeSubTermTerminatedBy terminatorOp o os

cnfToDnf :: ConjunctiveNormalForm halfPlane -> DisjunctiveNormalForm halfPlane
cnfToDnf = foldr (descartesWith (:)) [[]]
--cnftoDnf (disSubTrm : disSubTerms) = map (descartesProduct disSubTerm) cnfToDnf disSubTerms

dnfAnd :: DisjunctiveNormalForm a -> DisjunctiveNormalForm a -> DisjunctiveNormalForm a
dnfAnd = descartesWith (++)
