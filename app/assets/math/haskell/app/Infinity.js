function minimum(ns) {return Math.min.apply(null, ns);}
function safeMin(ns) {return ns.length > 0 ? ['just', minimum(ns)] : ['nothing'];}
//function safeMin(ns) {return ns.reduce((acc, curr) => ['just', mixedMinPosInfWithNormalNumber(acc, curr)], ['nothing']);}

function mixedMinPosInfWithNormalNumber(mbX, y) {return maybe(y, x => Math.min(x, y), mbX);}
