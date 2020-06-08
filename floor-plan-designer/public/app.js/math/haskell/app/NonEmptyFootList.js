function descartesFootPlus(fl1, fl2) {return descartesWith(footPlus, fl1, fl2);}

function footPlus(flA, flB) {return footLift2((a, b) => a + b, flA, flB);}

function footMap(f, [as, a]) {return [as.map(f), f(a)];}
function footLift2(f, [as, a], [bs, b]) {return [zipWith(f, as, bs), f(a, b)];}
function footUncons([as, a]) {return maybeMap(([a0, as_]) => [a0, [as_, a]], uncons(as));}


//tripleToNonEmptyFootList :: (r, r, r, r) -> NonEmptyFootList r
function tripleToNonEmptyFootList([a, b, rhs]) {return [[a, b], rhs];}

//quadrupleToNonEmptyFootList :: (r, r, r, r) -> NonEmptyFootList r
function quadrupleToNonEmptyFootList([a, b, lambda, c]) {return [[a, b, lambda], c];}
