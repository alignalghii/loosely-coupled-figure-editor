function ccLt( a, b) {return a <  b && !ccEq(a, b);}
function ccGt (a, b) {return a >  b && !ccEq(a, b);}

function ccLeq(a, b) {return a <= b ||  ccEq(a, b);}
function ccGeq(a, b) {return a >= b ||  ccEq(a, b);}

function ccNeq(a, b) {return           !ccEq(a, b);}
