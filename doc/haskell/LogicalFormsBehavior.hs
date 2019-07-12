module LogicalFormsBehavior where

import Logic.LogicalForms
import GeometryLow.Orientation

shouldTestLogicalFormsBehavior :: Bool
shouldTestLogicalFormsBehavior = shouldOpsTerminatedListToDnf && shouldSpliceBackIfNeeded && shouldSpliceBack && shouldTakeSubTermTerminatedBy && shouldTakeSubTermTerminatedBy && shouldTakeSubTermsSeparatedBy



shouldOpsTerminatedListToDnf :: Bool
shouldOpsTerminatedListToDnf =
    opsTerminatedListToDnf Containment   [(1,And), (2,Or ), (3,And), (4,And)] == [[1,2,4], [1,3,4]] && opsTerminatedListToDnf Containment   [(3,And), (4,And), (1,And), (2,Or )] == [[2,4,1], [3,4,1]] &&
    opsTerminatedListToDnf Complementary [(1,Or ), (2,And), (3,Or ), (4,Or )] == [[1], [2,3], [4]]  && opsTerminatedListToDnf Complementary [(3,Or ), (4,Or ), (1,Or ), (2,And)] == [[2,3], [4], [1]] &&

    opsTerminatedListToDnf Containment   [('a', And), ('b', And), ('c', And), ('d', And)] == [['a', 'b', 'c', 'd']] &&
    opsTerminatedListToDnf Complementary [('a', Or ), ('b', Or ), ('c', Or ), ('d', Or )] == [['a'], ['b'], ['c'], ['d']] &&

    opsTerminatedListToDnf Containment   ([]::[OpTerminated Char]) == [[]] &&
    opsTerminatedListToDnf Complementary ([]::[OpTerminated Char]) == [] &&

    opsTerminatedListToDnf Containment   [('a', And), ('b', Or), ('c', Or), ('d', Or), ('e', And), ('f', And)] == [['a', 'b', 'f'], ['a', 'c', 'f'], ['a', 'd', 'f'], ['a', 'e', 'f']] &&
    opsTerminatedListToDnf Complementary [('a', And), ('b', Or), ('c', Or), ('d', Or), ('e', And), ('f', And)] == [['e', 'f', 'a', 'b'], ['c'], ['d']]



shouldSpliceBackIfNeeded :: Bool
shouldSpliceBackIfNeeded =
    spliceBackIfNeeded []                                 Nothing                == ([]::[[Char]]) &&
    spliceBackIfNeeded [] (Just [10, 20, 30])                                    == [[10, 20, 30]] &&
    spliceBackIfNeeded [['a', 'b', 'c'], ['x', 'y', 'z']] Nothing                == [                ['a', 'b', 'c'], ['x', 'y', 'z']] &&
    spliceBackIfNeeded [['a', 'b', 'c'], ['x', 'y', 'z']] (Just ['1', '2', '3']) == [['1', '2', '3',  'a', 'b', 'c'], ['x', 'y', 'z']]

shouldSpliceBack :: Bool
shouldSpliceBack =
    spliceBack []                                 [10, 20, 30]    == [[10, 20, 30]] &&
    spliceBack [['a', 'b', 'c'], ['x', 'y', 'z']] ['1', '2', '3'] == [['1', '2', '3',  'a', 'b', 'c'], ['x', 'y', 'z']]


shouldTakeSubTermTerminatedBy :: Bool
shouldTakeSubTermTerminatedBy =
    takeSubTermTerminatedBy And ('a', And) [('b', And), ('c', And), ('d', And)] == (['a']               , Just [('b', And), ('c', And), ('d', And)]) &&
    takeSubTermTerminatedBy And ('a', Or ) [('b', Or ), ('c', Or ), ('d', Or )] == (['a', 'b', 'c', 'd'], Nothing                                  ) &&
    takeSubTermTerminatedBy And ('a', Or ) [('b', Or ), ('c', And), ('d', Or )] == (['a', 'b', 'c']     , Just [('d', Or )                        ])


shouldTakeSubTermsSeparatedBy :: Bool
shouldTakeSubTermsSeparatedBy =
    takeSubTermsSeparatedBy And [('a', And), ('b', And), ('c', And), ('d', And)] == ([['a'], ['b'], ['c'], ['d']], Nothing                  ) &&
    takeSubTermsSeparatedBy And [('a', Or ), ('b', Or ), ('c', Or ), ('d', Or )] == ([                          ], Just ['a', 'b', 'c', 'd']) &&
    takeSubTermsSeparatedBy And [('a', Or ), ('b', Or ), ('c', And), ('d', Or )] == ([['a', 'b', 'c']           ], Just ['d'               ])
