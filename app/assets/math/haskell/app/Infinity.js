function minimum(ns) {return Math.min.apply(null, ns);}
function safeMin(ns) {return ns.length > 0 ? ['just', minimum(ns)] : ['nothing'];}
//function safeMin(ns) {return ns.reduce((acc, curr) => ['just', mixedMinPosInfWithNormalNumber(acc, curr)], ['nothing']);}

function mixedMinPosInfWithNormalNumber(mbX, y) {return maybe(y, x => Math.min(x, y), mbX);}


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
