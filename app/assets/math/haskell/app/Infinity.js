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

function ccMixedGeq_callback(valueOrPosInf, finiteValue, thenValue, elseFunction)
{
	return maybe(
		thenValue,
		val => ccGeq(val, finiteValue) ? thenValue
		                               : elseFunction(val),
		valueOrPosInf
	);
}


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
function pMInfCompare(pMInf1, pMInf2)
{
	var [tag1, val1] = pMInf1;
	var [tag2, val2] = pMInf2;
	var casesStr = JSON.stringify(pMInf1) + ' ! ' + JSON.stringify(pMInf2);
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

function pMInfGeq(a, b) {return pMInfCompare(a, b) >= 0;}
function pMInfGt (a, b) {return pMInfCompare(a, b) >  0;}
function pMInfLeq(a, b) {return pMInfCompare(a, b) <= 0;}
function pMInfLt (a, b) {return pMInfCompare(a, b) <  0;}
function pMInfEq (a, b) {return pMInfCompare(a, b) == 0;}


function ccPMInfGeq(a, b) {return ccGeq(pMInfCompare(a, b), 0);}
function ccPMInfGt (a, b) {return ccGt (pMInfCompare(a, b), 0);}
function ccPMInfLeq(a, b) {return ccLeq(pMInfCompare(a, b), 0);}
function ccPMInfLt (a, b) {return ccLt (pMInfCompare(a, b), 0);}
function ccPMInfEq (a, b) {return ccEq (pMInfCompare(a, b), 0);}


function pMInfMixedMin(mbA, b) {return maybe(b, a => Math.min(a, b) , mbA)}


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

function pMToPInfinity(caseNegativeInfinity, callbackForValueOrPInfinity, valueOrPMInfinity)
{
	return either(
		isInfinityPositive => !isInfinityPositive ? caseNegativeInfinity
		                                          : callbackForValueOrPInfinity(['nothing'          ]),
		finiteValue        =>                       callbackForValueOrPInfinity(['just', finiteValue]),
		valueOrPMInfinity
	);
}

function pMToPInfinity_exec(caseNegativeInfinity, callbackForValueOrPInfinity, valueOrPMInfinity)
{
	return either(
		isInfinityPositive => !isInfinityPositive ? caseNegativeInfinity()
		                                          : callbackForValueOrPInfinity(['nothing'          ]),
		finiteValue        =>                       callbackForValueOrPInfinity(['just', finiteValue]),
		valueOrPMInfinity
	);
}
