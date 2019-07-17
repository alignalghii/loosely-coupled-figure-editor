function shouldTour() {return vecEq(tour([]), []) && vecEq(tour([10]), [[10,10]]) && vecEq(tour([10,20]), [[10,20], [20,10]]) && vecEq(tour([10,20,30]), [[10,20], [20,30], [30,10]]);}

function shouldCycleToOpsTerminatedListWith()
{
	function posModR(a, m) {while (a < 0 || a >= m) a -= Math.sign(a) * m; return a;}
	function isConvexValue(a) {return posModR(a, 360) <= 180;}
	function changeIsConvexValue(a1, a2) {return isConvexValue(a2-a1);}
	function changeCountsAsConvexValue(referenceRotDir, a1, a2) {return isConvexValue(referenceRotDir == '+' ? a2-a1 : a1-a2);}
	function showAsDegree (a) {return ''+a+'°';}
	return true &&
		vecEq(cycleToOpsTerminatedListWith(changeIsConvexValue, showAsDegree, [0, 90, 180, 270]), [['0°', 'and'], ['90°', 'and'], ['180°', 'and'], ['270°', 'and']])
		true;
}

function shouldOpTerminate()
{
	function posModR(a, m) {while (a < 0 || a >= m) a -= Math.sign(a) * m; return a;}
	function isConvexValue(a) {return posModR(a, 360) <= 180;}
	function changeIsConvexValue(a1, a2) {return isConvexValue(a2-a1);}
	function changeCountsAsConvexValue(referenceRotDir, a1, a2) {return isConvexValue(referenceRotDir == '+' ? a2-a1 : a1-a2);}
	function showAsDegree (a) {return ''+a+'°';}
	return true &&
		vecEq(opTerminate(changeIsConvexValue, showAsDegree, 10 ,  20), ['10°', 'and']) &&
		vecEq(opTerminate(changeIsConvexValue, showAsDegree, 10 ,   0), ['10°', 'or' ]) &&
		vecEq(opTerminate(changeIsConvexValue, showAsDegree, 10,  220), ['10°', 'or' ]) &&
		true;
}

function shouldOpsTerminatedListToDnf()
{
	function posModR(a, m) {while (a < 0 || a >= m) a -= Math.sign(a) * m; return a;}
	function isConvexValue(a) {return posModR(a, 360) <= 180;}
	function changeIsConvexValue(a1, a2) {return isConvexValue(a2-a1);}
	function changeCountsAsConvexValue(referenceRotDir, a1, a2) {return isConvexValue(referenceRotDir == '+' ? a2-a1 : a1-a2);}
	function showAsDegree (a) {return ''+a+'°';}
	return true &&
		vecEq(opsTerminatedListToDnf('containment'  , [['a', 'and'], ['b', 'and'], ['c', 'and'], ['d', 'and']]), [['a', 'b', 'c', 'd']]) &&
		vecEq(opsTerminatedListToDnf('complementary', [['a', 'or' ], ['b', 'or' ], ['c', 'or' ], ['d', 'or' ]]), [['a'], ['b'], ['c'], ['d']]) &&
		vecEq(opsTerminatedListToDnf('containment'  , []), [[]]) &&
		vecEq(opsTerminatedListToDnf('complementary', []), []) &&
		vecEq(opsTerminatedListToDnf('containment'  , [['a', 'and'], ['b', 'or'], ['c', 'or'], ['d', 'or'], ['e', 'and'], ['f', 'and']]), [['a', 'b', 'f'], ['a', 'c', 'f'], ['a', 'd', 'f'], ['a', 'e', 'f']]) &&
		vecEq(opsTerminatedListToDnf('complementary', [['a', 'and'], ['b', 'or'], ['c', 'or'], ['d', 'or'], ['e', 'and'], ['f', 'and']]), [['e', 'f', 'a', 'b'], ['c'], ['d']]) &&
		true;
}

function shouldSpliceBackIfNeeded()
{
	return true &&
		vecEq(spliceBackIfNeeded([]                                , ['nothing'              ]), []                                              ) &&
		vecEq(spliceBackIfNeeded([]                                , ['just'   , [10, 20, 30]]), [[10, 20, 30]]                                  ) &&
		vecEq(spliceBackIfNeeded([['a', 'b', 'c'], ['x', 'y', 'z']], ['nothing'              ]), [              ['a', 'b', 'c'], ['x', 'y', 'z']]) &&
		vecEq(spliceBackIfNeeded([['a', 'b', 'c'], ['x', 'y', 'z']], ['just'   , [10, 20, 30]]), [[10, 20, 30,   'a', 'b', 'c'], ['x', 'y', 'z']]) &&
		true;
}


function shouldSpliceBack()
{
	return true &&
		vecEq(spliceBack([]                                , [10, 20, 30]), [[10, 20, 30]]                                ) &&
		vecEq(spliceBack([['a', 'b', 'c'], ['x', 'y', 'z']], [10, 20, 30]), [[10, 20, 30, 'a', 'b', 'c'], ['x', 'y', 'z']]) &&
		true;
}

function shouldTakeSubTermTerminatedBy()
{
	return true &&
		vecEq(takeSubTermTerminatedBy('and', ['a', 'and'], [['b', 'and'], ['c', 'and'], ['d', 'and']], 0), [['a']               , ['just', 0]]) &&
		vecEq(takeSubTermTerminatedBy('and', ['a', 'or' ], [['b', 'or' ], ['c', 'or' ], ['d', 'or' ]], 0), [['a', 'b', 'c', 'd'], ['nothing']]) &&
		vecEq(takeSubTermTerminatedBy('and', ['a', 'or' ], [['b', 'or' ], ['c', 'and'], ['d', 'or' ]], 0), [['a', 'b', 'c']     , ['just', 2]]) &&
		true;
}

function shouldTakeSubTermsSeparatedBy()
{
	return true &&
		vecEq(takeSubTermsSeparatedBy('and', [['a', 'and'], ['b', 'and'], ['c', 'and'], ['d', 'and']]), [[['a'], ['b'], ['c'], ['d']], ['nothing'                      ]]) &&
		vecEq(takeSubTermsSeparatedBy('and', [['a', 'or' ], ['b', 'or' ], ['c', 'or' ], ['d', 'or' ]]), [[                          ], ['just'   , ['a', 'b', 'c', 'd']]]) &&
		vecEq(takeSubTermsSeparatedBy('and', [['a', 'or' ], ['b', 'or' ], ['c', 'and'], ['d', 'or' ]]), [[['a', 'b', 'c']           ], ['just'   , ['d'               ]]]) &&
		true;
}
