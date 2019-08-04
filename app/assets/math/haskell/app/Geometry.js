const lineOfSegment_ = ([p, q]) => directionVectorEquation(fromTo(p, q), p);
const lengthOfSegment = ([p, q]) => vectorLength(fromTo(p, q));

const directionVectorEquation = (directionVector, point) => detColsXYWith(directionVector).concat([detCols(point, directionVector)]);

const detColsXYWith = ([v1, v2]) => [v2, -v1],
      detColsWithXY = ([v1, v2]) => [-v2, v1];

const rot90Positive = detColsWithXY,
      rot90Negative = detColsXYWith;

const scalarProductThroughBend = (p, q, r) => scalarProduct(fromTo(p, q), fromTo(q, r));



const strictlyInsideThalesCircleWithDiameter = ([a, b], p) => scalarProductThroughBend(a, p, b) >  0,
      weaklyInsideThalesCircleWithDiameter   = ([a, b], p) => scalarProductThroughBend(a, p, b) >= 0;

const segmentHasStrictly = (sgm, p) => satisfiesLinearEquation(lineOfSegment(sgm), p) && strictlyInsideThalesCircleWithDiameter(sgm, p),
      segmentHasWeakly   = (sgm, p) => satisfiesLinearEquation(lineOfSegment(sgm), p) && weaklyInsideThalesCircleWithDiameter  (sgm, p);

const satisfiesLinearEquation = ([a, b, c], [x, y]) => a*x + b*y == c;



const ccStrictlyInsideThalesCircleWithDiameter = ([a, b], p) => ccGt (scalarProductThroughBend(a, p, b),  0),
      ccWeaklyInsideThalesCircleWithDiameter   = ([a, b], p) => ccGeq(scalarProductThroughBend(a, p, b),  0);

const ccSegmentHasStrictly = (sgm, p) => ccSatisfiesLinearEquation(lineOfSegment(sgm), p) && ccStrictlyInsideThalesCircleWithDiameter(sgm, p),
      ccSegmentHasWeakly   = (sgm, p) => ccSatisfiesLinearEquation(lineOfSegment(sgm), p) && ccWeaklyInsideThalesCircleWithDiameter  (sgm, p);

const ccSatisfiesLinearEquation = ([a, b, c], [x, y]) => ccEq(a*x + b*y, c);
