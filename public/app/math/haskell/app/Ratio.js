const ratioEqWeak   = ([a, b], [c, d]) => a*d == b*c,
      ratioEqStrict = (ratio1, ratio2) => ratioEqWeak(ratio1, ratio2) && infoPreservingRatio(ratio1) && infoPreservingRatio(ratio2);

const infoPreservingRatio = ([a, b]) => sameZeroness(a, b),
      sameZeroness        = ( a, b ) => bothOrNone(a == 0, b == 0);


const ccRatioEqWeak   = ([a, b], [c, d]) => ccEq(a*d, b*c),
      ccRatioEqStrict = (ratio1, ratio2) => ccRatioEqWeak(ratio1, ratio2) && ccInfoPreservingRatio(ratio1) && ccInfoPreservingRatio(ratio2);

const ccInfoPreservingRatio = ([a, b]) => ccSameZeroness(a, b),
      ccSameZeroness        = ( a, b ) => bothOrNone(ccEq(a, 0), ccEq(b, 0));
