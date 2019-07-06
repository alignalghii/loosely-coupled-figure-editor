module LogicalFormsBehavior where

import Logic.LogicalForms
import GeometryLow.Orientation

shouldTestLogicalFormsBehavior :: Bool
shouldTestLogicalFormsBehavior = shouldOpsTerminatedListToDnf

shouldOpsTerminatedListToDnf :: Bool
shouldOpsTerminatedListToDnf = opsTerminatedListToDnf Containment [(1,And), (2,Or), (3,And), (4,And)] == [[1,2,4], [1,3,4]] && opsTerminatedListToDnf Containment [(3,And), (4,And), (1,And), (2,Or)] == [[2,4,1], [3,4,1]] && opsTerminatedListToDnf Complementary [(1,Or), (2,And), (3,Or), (4,Or)] == [[1], [2,3], [4]] && opsTerminatedListToDnf Complementary [(3,Or), (4,Or), (1,Or), (2,And)] == [[2,3], [4], [1]]
