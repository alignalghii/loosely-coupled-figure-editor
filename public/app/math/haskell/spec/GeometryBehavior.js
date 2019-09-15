function GeometryBehavior () {}

GeometryBehavior.prototype.shouldTestGeometryBehavior = function () {return this.shouldLineOfSegment_() && this.shouldStrictlyInsideThalesCircleWithDiameter() && this.shouldWeaklyInsideThalesCircleWithDiameter() && this.shouldSegmentHasStrictly() && this.shouldSegmentHasWeakly() && this.shouldSatisfiesLinearEquation();};

GeometryBehavior.prototype.shouldSegmentHasStrictly = () =>
	!segmentHasStrictly([[2,1], [5,2]], [-1   , 0   ]) && // external
	!segmentHasStrictly([[2,1], [5,2]], [ 2   , 1   ]) && // terminal
	 segmentHasStrictly([[2,1], [5,2]], [ 2.75, 1.25]) && // internal
	 segmentHasStrictly([[2,1], [5,2]], [ 3.5 , 1.5 ]) && // internal
	!segmentHasStrictly([[2,1], [5,2]], [ 5   , 2   ]) && // terminal
	!segmentHasStrictly([[2,1], [5,2]], [ 8   , 3   ]) && // external

	!segmentHasStrictly([[2,1], [5,2]], [ 0   , 0   ]) && // nonlinear
	!segmentHasStrictly([[2,1], [5,2]], [ 2   , 1.1 ]) && // nonlinear
	!segmentHasStrictly([[2,1], [5,2]], [ 3   , 1   ]) && // nonlinear
	 true;


GeometryBehavior.prototype.shouldSegmentHasWeakly = () =>
	!segmentHasWeakly([[2,1], [5,2]], [-1   , 0   ]) && // external
	 segmentHasWeakly([[2,1], [5,2]], [ 2   , 1   ]) && // terminal
	 segmentHasWeakly([[2,1], [5,2]], [ 2.75, 1.25]) && // internal
	 segmentHasWeakly([[2,1], [5,2]], [ 3.5 , 1.5 ]) && // internal
	 segmentHasWeakly([[2,1], [5,2]], [ 5   , 2   ]) && // terminal
	!segmentHasWeakly([[2,1], [5,2]], [ 8   , 3   ]) && // external

	!segmentHasWeakly([[2,1], [5,2]], [ 0   , 0   ]) && // nonlinear
	!segmentHasWeakly([[2,1], [5,2]], [ 3   , 2   ]) && // nonlinear
	 true;


GeometryBehavior.prototype.shouldLineOfSegment_ = () => vecEq(lineOfSegment_([[6, 5], [12, 9]]), [4, -6, -6]);

GeometryBehavior.prototype.shouldStrictlyInsideThalesCircleWithDiameter = () =>

	// Terminal (boundary):

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 1  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.5]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 4  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 5  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 4  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.5]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 1  ]) &&

	// Internal:

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 1  ]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 1.1]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 1.1]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.6, 2.5]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 4  ]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 3.9]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 3.9]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 4.9]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 4  ]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 3.9]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 3.9]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.4, 2.5]) &&

	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 1  ]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 1.1]) &&
	 strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 1.1]) &&

	// External:

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 1  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 0.9]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 0.9]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.4, 2.5]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.4]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.6]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 4  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 4.1]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 4.1]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 5.1]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [3.9, 5  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4.1, 5  ]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 4  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 4.1]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 4.1]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.6, 2.5]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.4]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.6]) &&

	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 1  ]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 0.9]) &&
	!strictlyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 0.9]) ;


GeometryBehavior.prototype.shouldWeaklyInsideThalesCircleWithDiameter = () =>

	// Terminal (boundary):

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 1  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.5]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 4  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 5  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 4  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.5]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 1  ]) &&

	// Internal:

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 1  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 1.1]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 1.1]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.6, 2.5]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 4  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2.1, 3.9]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 3.9]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 4.9]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 4  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 3.9]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 3.9]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.4, 2.5]) &&

	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 1  ]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 1.1]) &&
	 weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [5.9, 1.1]) &&

	// External:

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 1  ]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 0.9]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 0.9]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.4, 2.5]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.4]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.5, 2.6]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 4  ]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [2  , 4.1]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [1.9, 4.1]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4  , 5.1]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [3.9, 5  ]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [4.1, 5  ]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 4  ]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 4.1]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 4.1]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.6, 2.5]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.4]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.5, 2.6]) &&

	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 1  ]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6  , 0.9]) &&
	!weaklyInsideThalesCircleWithDiameter([[2, 1], [6, 4]], [6.1, 0.9]) ;


GeometryBehavior.prototype.shouldSatisfiesLinearEquation = () =>
	 satisfiesLinearEquation([2, -3, -3], [-3, -1]) &&
	 satisfiesLinearEquation([2, -3, -3], [ 0,  1]) &&
	 satisfiesLinearEquation([2, -3, -3], [ 3,  3]) &&

	!satisfiesLinearEquation([2, -3, -3], [-3  , -1.1]) &&
	!satisfiesLinearEquation([2, -3, -3], [ 0  ,  1.1]) &&
	!satisfiesLinearEquation([2, -3, -3], [ 3.1,  3  ]) &&
	true;
