module Logic.LogicalForms where

import Data.ListX (descartesProduct, descartesWith)
import Logic.Logic (Relation)
import Data.Bool (bool)
import GeometryLow.Orientation (BoundnessSign (..))

data Op = Or | And deriving (Eq, Show)
type OpTerminated a = (a, Op)
type NormalForm a = [[a]]
type DisjunctiveNormalForm a = NormalForm a
type ConjunctiveNormalForm a = NormalForm a

tour :: [point]            -> [(point, point)]
tour []                    =  []
tour path@(startPoint : _) =  tourWithSpliceBack startPoint path

tourWithSpliceBack :: point -> [point]                    -> [(point, point)]
tourWithSpliceBack startPoint  []                         =  []
tourWithSpliceBack startPoint  [lastPoint]                =  [(lastPoint, startPoint)]
tourWithSpliceBack startPoint  (point1 : points@(point2 : _)) =  (point1, point2) : tourWithSpliceBack startPoint points

cycleToOpsTerminatedListWith :: Relation edge -> (edge -> halfPlane) -> [edge] -> [OpTerminated halfPlane]
cycleToOpsTerminatedListWith areConvex inequalityOf = map (uncurry $ opTerminate areConvex inequalityOf) . tour

opTerminate :: Relation edge -> (edge -> halfPlane) -> edge -> edge -> OpTerminated halfPlane
opTerminate areConvex inequalityOf edge1 edge2 = (inequalityOf edge1, bool Or And $ areConvex edge1 edge2) 


opsTerminatedListToDnf :: BoundnessSign -> [OpTerminated halfPlane] -> DisjunctiveNormalForm halfPlane
opsTerminatedListToDnf Containment   = cnfToDnf . uncurry spliceBackIfNeeded . takeDisjunctiveSubTerms
opsTerminatedListToDnf Complementary =            uncurry spliceBackIfNeeded . takeConjunctiveSubTerms

spliceBackIfNeeded :: [[halfPlane]] -> Maybe [halfPlane] -> [[halfPlane]]
spliceBackIfNeeded subterms = maybe subterms (spliceBack subterms)

spliceBack :: [[halfPlane]] -> [halfPlane] -> [[halfPlane]]
spliceBack []                   subtermToBeSplicedBack = [subtermToBeSplicedBack]
spliceBack (subterm : subterms) subtermToBeSplicedBack = (subtermToBeSplicedBack ++ subterm) : subterms

takeDisjunctiveSubTerms :: [OpTerminated halfPlane] -> ([[halfPlane]], Maybe [halfPlane])
takeDisjunctiveSubTerms []       = ([], Nothing)
takeDisjunctiveSubTerms (o : os) = let (subterm, mos) = takeDisjunctiveSubTerm o os
                                   in case mos of
                                       Nothing  -> ([], Just subterm)
                                       Just os_ -> let (subterms, mbSubterm) = takeDisjunctiveSubTerms os_
                                                   in (subterm : subterms, mbSubterm)

takeDisjunctiveSubTerm :: OpTerminated halfPlane -> [OpTerminated halfPlane] -> ([halfPlane], Maybe [OpTerminated halfPlane])
takeDisjunctiveSubTerm (halfPlane, And) more     = ([halfPlane], Just more)
takeDisjunctiveSubTerm (halfPlane, Or ) []       = ([halfPlane], Nothing)
takeDisjunctiveSubTerm (halfPlane, Or ) (o : os) = let (subterm, mos) = takeDisjunctiveSubTerm o os
                                                   in (halfPlane : subterm, mos)


takeConjunctiveSubTerms :: [OpTerminated halfPlane] -> ([[halfPlane]], Maybe [halfPlane])
takeConjunctiveSubTerms []       = ([], Nothing)
takeConjunctiveSubTerms (o : os) = let (subterm, mos) = takeConjunctiveSubTerm o os
                                   in case mos of
                                       Nothing  -> ([], Just subterm)
                                       Just os_ -> let (subterms, mbSubterm) = takeConjunctiveSubTerms os_
                                                   in (subterm : subterms, mbSubterm)

takeConjunctiveSubTerm :: OpTerminated halfPlane -> [OpTerminated halfPlane] -> ([halfPlane], Maybe [OpTerminated halfPlane])
takeConjunctiveSubTerm (halfPlane, Or ) more     = ([halfPlane], Just more)
takeConjunctiveSubTerm (halfPlane, And) []       = ([halfPlane], Nothing)
takeConjunctiveSubTerm (halfPlane, And) (o : os) = let (subterm, mos) = takeConjunctiveSubTerm o os
                                                   in (halfPlane : subterm, mos)


cnfToDnf :: ConjunctiveNormalForm halfPlane -> DisjunctiveNormalForm halfPlane
cnfToDnf [] = [[]]
cnfToDnf (disSubTerm : disSubTerms) = map (uncurry (:)) $ descartesProduct disSubTerm $ cnfToDnf disSubTerms
--cnftoDnf (disSubTrm : disSubTerms) = map (descartesProduct disSubTerm) cnfToDnf disSubTerms


dnfAnd :: DisjunctiveNormalForm a -> DisjunctiveNormalForm a -> DisjunctiveNormalForm a
dnfAnd = descartesWith (++)
