function PolygonReverseDeductionBehavior() {}

PolygonReverseDeductionBehavior.prototype.shouldTestPolygonReverseDeductionBehavior = function () {return this.shouldTitlePositionFor() && this.shouldConvexSubpolygonsOf();};

PolygonReverseDeductionBehavior.prototype.shouldTitlePositionFor = () => vecEq(titlePositionFor([[-1, -1], [3, -1], [3, 1], [1, 1], [1, 3], [-1, 3]]), [1, 0]);

PolygonReverseDeductionBehavior.prototype.shouldConvexSubpolygonsOf = () =>
{
	const convexSubpolygons = convexSubpolygonsOf(poly2_concave_ccw);
	return convexSubpolygons.length == 2 && convexSubpolygons.every(pol => pol.length == 3) && (
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||

		//--------------------------------------------------------------------------------------------------------------------------

		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]],     [[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]]]) ||

		//==========================================================================================================================


		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[-2/3,  1/3], [ 0  ,  1  ], [ 2  , -1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[ 2  , -1  ], [-2/3,  1/3], [ 0  ,  1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[ 0  ,  1  ], [ 2  , -1  ], [-2/3,  1/3]]]) ||

		//--------------------------------------------------------------------------------------------------------------------------

		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[ 2  , -1  ], [ 0  ,  1  ], [-2/3,  1/3]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[-2/3,  1/3], [ 2  , -1  ], [ 0  ,  1  ]]]) ||



		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [ 0  ,  1  ], [-2  , -1  ]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 2/3,  1/3], [ 0  ,  1  ]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [-2  , -1  ], [ 2/3,  1/3]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||

		ccTreeEq(convexSubpolygons, [[[-2  , -1  ], [ 0  ,  1  ], [ 2/3,  1/3]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 2/3,  1/3], [-2  , -1  ], [ 0  ,  1  ]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||
		ccTreeEq(convexSubpolygons, [[[ 0  ,  1  ], [ 2/3,  1/3], [-2  , -1  ]],     [[ 0  ,  1  ], [-2/3,  1/3], [ 2  , -1  ]]]) ||

		//==========================================================================================================================

		false
	);
};
