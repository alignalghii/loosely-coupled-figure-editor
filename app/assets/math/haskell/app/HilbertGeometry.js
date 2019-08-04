const incidenceVertexOnVertex = ccVecEq,
      incidenceVertexOnEdge = (p, e) => ccSegmentHasStrictly(e, p),
      incidenceEdgeOnVertex = (e, p) => ccSegmentHasStrictly(e, p),
      incidenceEdgeOnEdge = (e, f) => ccSameLine(lineOfSegment(e), lineOfSegment(f)) && f.some(p => ccSegmentHasStrictly(e, p)) && ccGt(lengthOfSegment(e), 0) && ccGt(lengthOfSegment(f), 0);

const ccSameLine = ([a1, b1, c1], [a2, b2, c2]) => ccRatioEqStrict([a1, a2], [b1, b2]) && ccRatioEqStrict([b1, b2], [c1, c2]) && ccRatioEqStrict([c1, c2], [a1, a2]),
        sameLine = ([a1, b1, c1], [a2, b2, c2]) =>   ratioEqStrict([a1, a2], [b1, b2]) &&   ratioEqStrict([b1, b2], [c1, c2]) &&   ratioEqStrict([c1, c2], [a1, a2]);
