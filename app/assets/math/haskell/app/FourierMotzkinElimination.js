function dispatch([signTag, item], [lts, eqs, gts])
{
	switch (signTag) {
		case 'lt': return [consX(item, lts), eqs, gts];
		case 'eq': return [lts, consX(item, eqs), gts];
		case 'gt': return [lts, eqs, consX(item, gts)];
	}
}

function dispatchToTheRear([signTag, item], [lts, eqs, gts])
{
	switch (signTag) {
		case 'lt': return [lts.concat([item]), eqs, gts];
		case 'eq': return [lts, eqs.concat([item]), gts];
		case 'gt': return [lts, eqs, gts.concat([item])];
	}
}


function predicateForIncludingBoundary(n) {return ccGeq(n, 0);}
function predicateForExcludingBoundary(n) {return ccGt (n, 0);}
function predicateForExactBoundary    (n) {return ccEq (n, 0);}

function constraintLastVar(ineqSys)
{
	var partition = eliminateAllVarsButOne(ineqSys);
	return prod3(lowConstraint, nullConstraint, highConstraint, partition);
}

function assembleConstraint(rule, ns) {return maybeMap(rule, safeMin(ns));}
function lowConstraint (ns) {return assembleConstraint(n => -n, ns);}
function highConstraint(ns) {return assembleConstraint(n =>  n, ns);}
function nullConstraint(ns) {return assembleConstraint(n =>  decideNormalizationRule(n)[0], ns);}

function decideNormalizationRule(mainCoeff)
{
	if (ccEq(mainCoeff, 0)) return ['eq', cf => cf             ];
	if (ccGt(mainCoeff, 0)) return ['gt', cf => cf /  mainCoeff];
	if (ccLt(mainCoeff, 0)) return ['lt', cf => cf / -mainCoeff];
}

function recombine([negs, nuls, poss]) {return descartesFootPlus(negs, poss).concat(nuls);}

function truncateSys(ineqs) {return ineqs.map(([coeffs, rhs]) => rhs);}

function tagByNormalization(ineq)
{
	var mb = footUncons(ineq);
	function f([mainCoeff, ineq_]) {
		var [tag, normalizerFun] = decideNormalizationRule(mainCoeff);
		return [tag, footMap(normalizerFun, ineq_)];
	}
	return maybeMap(f, mb);
}

function partitionateByNormalization(ineqs)
{
	var partition = [[], [], []];
	for (let i = 0; i < ineqs.length; i++) {
		var mbTaggedRemainderIneq = tagByNormalization(ineqs[i]);
		switch (mbTaggedRemainderIneq[0]) {
			case 'just':
				var taggedRemainderIneq = mbTaggedRemainderIneq[1];
				partition = dispatchToTheRear(taggedRemainderIneq, partition);
				break;
			case 'nothing': return ['nothing'];
		}
	}
	return ['just', partition];
}

function eliminateVar1(ineqSys)
{
	if (ineqSys.length > 0) {
		var maybePartition = partitionateByNormalization(ineqSys);
		return maybeMap(recombine, maybePartition);
	} else {
		return ['nothing'];
	}
}

function eliminateAllVars(ineqSys)
{
	var finalSys = maybeLoop(eliminateVar1, ineqSys);
	return truncateSys(finalSys);
}

function eliminateNVars(n, ineqSys)
{
	var monadMaybe = new MonadX(maybeMap, just, maybeBind);
	return monadMaybe.mLoopN(n, eliminateVar1, ineqSys);
}

function eliminateAllVarsButOne_(ineqSys)
{
	var n = sysVarCount(ineqSys);
	var mbRedIneqSys = eliminateNVars(n-1, ineqSys);
	return fromJust(mbRedIneqSys);
}


function eliminateAllVarsButOne(ineqSys)
{
	var   redIneqSys       = eliminateAllVarsButOne_(ineqSys);
	var mbRedIneqPartition = partitionateByNormalization(redIneqSys);
	var   redIneqPartition = fromJust(mbRedIneqPartition);
	return statSignPartition(truncateSys, redIneqPartition);
}

//@TODO: Should allow empty inequality systems, and provide a `Nothing` result
function sysVarCount(ineqSys)
{
	var counts = ineqSys.map(([coeffs, rhs])=>coeffs.length);
	return minimum(counts);
}


function globalPredicateForIncludingBoundary(lst) {return quantifyCharacteristic(any, predicateForIncludingBoundary, lst);}
function globalPredicateForExcludingBoundary(lst) {return quantifyCharacteristic(any, predicateForExcludingBoundary, lst);}
function globalPredicateForExactBoundary    (lst) {return quantifyCharacteristic(any, predicateForExactBoundary, lst) && quantifyCharacteristic(none, predicateForExcludingBoundary, lst);}

function quantifyCharacteristic(quantor, predicate, setOfMaybes) {return quantor(mX => maybe(true, predicate, mX), setOfMaybes);}
