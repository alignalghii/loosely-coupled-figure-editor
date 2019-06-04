function bPlus(a, b) {return a + b;}
function bAnd (a, b) {return a && b;}
function bOr (a, b) {return a || b;}

function cca(x, r) {return Math.abs(x - r) < 0.001;} // @TODO Used in tests, maybe it should belong to `testframework.js` @TODO rather here, but parametrize it by an `epsilon` put into the `config` upmost folder

var ccEpsilon = 0.001;
function ccEq(x, y) {return Math.abs(x - y) < ccEpsilon;}
function cc0(x) {return ccEq(x, 0);}
function ccVecEq([a1, a2], [b1, b2]) {return ccEq(a1,b1) && ccEq(a2, b2);}
