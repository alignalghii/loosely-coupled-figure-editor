function minimum(ns) {return Math.min.apply(null, ns);}
function safeMin(ns) {return ns.length > 0 ? ['just', minimum(ns)] : ['nothing'];}
//function safeMin(ns) {return ns.reduce((acc, curr) => ['just', mixedMinPosInfWithNormalNumber(acc, curr)], ['nothing']);}

function mixedMinPosInfWithNormalNumber(mbX, y) {return maybe(y, x => Math.min(x, y), mbX);}
function mixedLeq(finiteValue, valueOrPosInf) {return maybe(true, val => val <= finiteValue, valueOrPosInf);}
function mixedLt (finiteValue, valueOrPosInf) {return maybe(true, val => val <  finiteValue, valueOrPosInf);}
function mixedGeq(valueOrPosInf, finiteValue) {return maybe(true, val => val >= finiteValue, valueOrPosInf);}
function mixedGt (valueOrPosInf, finiteValue) {return maybe(true, val => val >  finiteValue, valueOrPosInf);}

function ccMixedLeq(finiteValue, valueOrPosInf) {return maybe(true, val => ccLeq(val, finiteValue), valueOrPosInf);}
function ccMixedLt (finiteValue, valueOrPosInf) {return maybe(true, val => ccLt (val, finiteValue), valueOrPosInf);}
function ccMixedGeq(valueOrPosInf, finiteValue) {return maybe(true, val => ccGeq(val, finiteValue), valueOrPosInf);}
function ccMixedGt (valueOrPosInf, finiteValue) {return maybe(true, val => ccGt (val, finiteValue), valueOrPosInf);}


//minimumBy :: (a -> a -> Ordering) -> [a] -> a
function minimumBy (cmp, lst)
{
	var currentMin = lst[0];
	function compareIt(current) {if (cmp(current, currentMin) < 0) currentMin = current;}
	lst.forEach(compareIt);
	return currentMin;
}

// type PMInf a = Either Bool a

//pMInfCompare :: Ord a => PMInf a -> PMInf a -> Ordering
function pMInfCompare(pmInf1, pmInf2)
{
	var [tag1, val1] = pmInf1;
	var [tag2, val2] = pmInf2;
	var casesStr = JSON.stringify(pmInf1) + ' ! ' + JSON.stringify(pmInf2);
	switch (true) {
		case /\["left",false\] ! \["left",false\]/.test(casesStr): return  0; // eq
		case /\["left",false\] ! \["right",.*\]/  .test(casesStr): return -1; // lt
		case /\["left",false\] ! \["left",true\]/ .test(casesStr): return -1; // lt

		case /\["right",.*\] ! \["left",false\]/  .test(casesStr): return  1; // gt
		case /\["right",.*\] ! \["right",.*\]/    .test(casesStr): return Math.sign(val1-val2);
		case /\["right",.*\] ! \["left",true\]/   .test(casesStr): return -1; // lt

		case /\["left",true\] ! \["left",false\]/ .test(casesStr): return  1; // gt
		case /\["left",true\] ! \["right",.*\]/   .test(casesStr): return  1; // gt
		case /\["left",true\] ! \["left",true\]/  .test(casesStr): return  0; // eq
	}
}

function pMInfGeq(a, b) {return pmInfCompare(a, b) >= 0;}
function pMInfGt (a, b) {return pmInfCompare(a, b) >  0;}
function pMInfLeq(a, b) {return pmInfCompare(a, b) <= 0;}
function pMInfLt (a, b) {return pmInfCompare(a, b) <  0;}
function pMInfEq (a, b) {return pmInfCompare(a, b) == 0;}


function ccPMInfGeq(a, b) {return ccGeq(pmInfCompare(a, b), 0);}
function ccPMInfGt (a, b) {return ccGt (pmInfCompare(a, b), 0);}
function ccPMInfLeq(a, b) {return ccLeq(pmInfCompare(a, b), 0);}
function ccPMInfLt (a, b) {return ccLt (pmInfCompare(a, b), 0);}
function ccPMInfEq (a, b) {return ccEq (pmInfCompare(a, b), 0);}


// Catamorhisms:

function valueOrPMInfCatamorhism     (caseNegInf, callbackForFiniteValue, casePosInf, valueOrPMInf)
{
	return either(
		isInfinityPos => isInfinityPos ? casePosInf : caseNegInf,
		callbackForFiniteValue,
		valueOrPMInf
	);
}

function valueOrPMInfCatamorhism_exec(caseNegInf, callbackForFiniteValue, casePosInf)
{
	return either(
		isInfinityPos => isInfinityPos ? casePosInf() : caseNegInf(),
		callbackForFiniteValue,
		valueOrPMInf
	);
}

function pMToPInfinity(caseNegatioveInfinity, callbackForValueOrPInfinity, valueOrPMInfinity)
{
	return either(
		isInfinityPositive => !isInfinityPositive ? caseNegativeInfinity
		                                          : callbackForValueOrPInfinity(['nothing          ']),
		finiteValue        =>                       callbackForValueOrPInfinity(['just', finiteValue])
	);
}

function pMToPInfinity_exec(caseNegatioveInfinity, callbackForValueOrPInfinity, valueOrPMInfinity)
{
	return either(
		isInfinityPositive => !isInfinityPositive ? caseNegativeInfinity()
		                                          : callbackForValueOrPInfinity(['nothing          ']),
		finiteValue        =>                       callbackForValueOrPInfinity(['just', finiteValue])
	);
}
