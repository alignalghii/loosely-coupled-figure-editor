function PolygonBehavior() {}

//import GeometryHigh.Polygon
//import Number.Infinitesimal
//import GeometryLow.Orientation (BoundnessSign (Containment, Complementary))


//shouldTestPolygonBehavior :: Bool
PolygonBehavior.prototype.shouldTestPolygonBehavior = function () {return shouldIntersectIncludingTouch() && shouldIntersectExcludingTouch() && shouldIntersectExactlyTouch() && shouldContainIncludingTouch() && shouldContainExcludingTouch() && shouldContainExactlyTouch() && shouldValidState() && shouldInvalidState() && shouldFall_diagnostic() && shouldFallFromOutside() && shouldFallFromInside();}

PolygonBehavior.prototype.shouldConvexEdgeBendBy = function ()
{
	console.log(JSON.stringify(convexEdgeBendBy('positive-rotation', [[0,0], [2,0]], [[2,0], [1,1]])));
	return true &&
	true;
};

PolygonBehavior.prototype.shouldConvexVectorBendBy = function ()
{
	console.log(JSON.stringify(convexVectorBendBy('positive-rotation', [2,0], [2,0])));
	return true &&
	true;
};


PolygonBehavior.prototype.shouldPolygonInequalityStructure_ = function ()
{
	var boundnessSign = 'containment', vertices = [[0,0], [2,0], [1,1]];
	var edges   = tour(vertices),
	    rotDir  = tourRotDir(vertices),
	    rotDir_ = effectiveRotDir(boundnessSign, rotDir);
	function halfPlaneForEdge(directedSegment) {return edgeSide(rotDir_, directedSegment);}
	function convexEdgesRelation(directedSegment1, directedSegment2) {return convexEdgeBendBy(rotDir_, directedSegment1, directedSegment2);}
	console.log(JSON.stringify(edges));
	console.log(JSON.stringify(rotDir));
	console.log(JSON.stringify(rotDir_));
	console.log(JSON.stringify(halfPlaneForEdge([[0,0],[2,0]])));
	console.log(JSON.stringify(convexEdgesRelation([[0,0], [2,0]], [[2,0], [1,1]])));

	console.log(JSON.stringify(polygonInequalityStructure_('containment', [[0,0], [2,0], [1,1]])));
	return true &&
	true;
};

//shouldFallFromOutside :: Bool
PolygonBehavior.prototype.shouldFallFromOutside = function ()
{
	return true &&
	either(constK(false), ccIs(1  ), fallFromOutside([-3  ,  4], [[7, -5], [10, -5], [7, -2]], [[0, 0], [6, 3], [0, 7]])                               ) &&
	either(constK(false), ccIs(2  ), fallFromOutside([-1.5,  2], [[7, -5], [10, -5], [7, -2]], [[0, 0], [6, 3], [0, 7]])                               ) &&
	either(constK(false), ccIs(0.5), fallFromOutside([-6  ,  8], [[7, -5], [10, -5], [7, -2]], [[0, 0], [6, 3], [0, 7]])                               ) &&
	vecEq (/*<<<*/                   fallFromOutside([ 3  , -4], [[7, -5], [10, -5], [7, -2]], [[0, 0], [6, 3], [0, 7]]) ,/*===*/ ['left', true]/*>>>*/) &&
	true;
};

//shouldFallFromInside :: Bool
PolygonBehavior.prototype.shouldFallFromInside = function ()
{
	return true &&
	either(constK(false), ccIs(0.5), fallFromInside([-1,  0], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]])) &&
	either(constK(false), ccIs(0.5), fallFromInside([ 0,  1], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]])) &&
	either(constK(false), ccIs(0.2), fallFromInside([ 1,  0], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]])) &&
	either(constK(false), ccIs(5/6), fallFromInside([ 0, -1], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]])) &&
	true;
};

//shouldFall_diagnostic :: Bool
PolygonBehavior.prototype.shouldFall_diagnostic = function ()
{
	return true &&
	vecEq(/*<<<*/fall_diagnostic('containment', 'containment', [-3, 4], [[7, -5], [10, -5], [7, -2]], [[0, 0], [6, 3], [0, 7]]) ,/*===*/ [[['just', 1], ['just', 'gt'], ['just', 3]]]/*>>>*/) &&
	true;
};

//shouldIntersectIncludingTouch :: Bool
PolygonBehavior.prototype.shouldIntersectIncludingTouch  = function ()
{
	return true &&
	 //intersectIncludingTouch([], []) && // @TODO

	 intersectIncludingTouch([[0,0], [2,0], [1,1]        ], [[0  , 0], [2,  0  ], [1 ,1  ]]) &&
	 intersectIncludingTouch([[0,0], [2,0], [1,1]        ], [[2  , 0], [4,  0  ], [3 ,1  ]]) &&
	!intersectIncludingTouch([[0,0], [2,0], [1,1]        ], [[2.1, 0], [4 , 0  ], [3 ,1  ]]) &&

	 intersectIncludingTouch([[0,2], [2,1], [3,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) &&
	 intersectIncludingTouch([[0,2], [2,1], [2,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) &&
	!intersectIncludingTouch([[0,2], [2,1], [1,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) &&
	 intersectIncludingTouch([[0,2], [2,1], [4,4]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) &&

	 intersectIncludingTouch([[1,4], [5,6], [3,3], [3,-2]], [[1  ,-2], [6 ,-3  ], [5,-1  ]]) &&

	 intersectIncludingTouch([[1,3], [2,1], [2,4], [3, 9]], [[0, 1  ], [2 , 0  ], [4, 5  ]]) &&
	 intersectIncludingTouch([[1,3], [2,1], [2,4], [3, 9]], [[0,-1  ], [2 ,-2  ], [4, 3  ]]) &&
	!intersectIncludingTouch([[1,3], [2,1], [2,4], [3, 9]], [[0,-1.1], [2 ,-2.1], [4, 2.9]]) &&
	true;
};


//shouldIntersectExcludingTouch :: Bool
PolygonBehavior.prototype.shouldIntersectExcludingTouch = function ()
{
	return true &&
	 //intersectExcludingTouch([], []) && // @TODO

	 intersectExcludingTouch([[0,0], [2,0], [1,1]        ],  [[0  ,0   ], [2,   0], [1,   1]]) &&
	!intersectExcludingTouch([[0,0], [2,0], [1,1]        ],  [[2  ,0   ], [4,   0], [3,   1]]) &&
	!intersectExcludingTouch([[0,0], [2,0], [1,1]        ],  [[2.1,0   ], [4,   0], [3,   1]]) &&

	 intersectExcludingTouch([[0,2], [2,1], [3,3]        ],  [[1  ,4   ], [4,   1], [7,   4]]) &&
	!intersectExcludingTouch([[0,2], [2,1], [2,3]        ],  [[1  ,4   ], [4,   1], [7,   4]]) &&
	!intersectExcludingTouch([[0,2], [2,1], [1,3]        ],  [[1  ,4   ], [4,   1], [7,   4]]) &&
	 intersectExcludingTouch([[0,2], [2,1], [4,4]        ],  [[1  ,4   ], [4,   1], [7,   4]]) &&

	 intersectExcludingTouch([[1,4], [5,6], [3,3], [3,-2]],  [[1  ,-2  ], [6,-3  ], [5,-1  ]]) &&

	 intersectExcludingTouch([[1,3], [2,1], [2,4], [3, 9]],  [[0  , 1  ], [2, 0  ], [4, 5  ]]) &&
	!intersectExcludingTouch([[1,3], [2,1], [2,4], [3, 9]],  [[0  ,-1  ], [2,-2  ], [4, 3  ]]) &&
	!intersectExcludingTouch([[1,3], [2,1], [2,4], [3, 9]],  [[0  ,-1.1], [2,-2.1], [4, 2.9]]) &&
	true;
};

//shouldIntersectExactlyTouch :: Bool
PolygonBehavior.prototype.shouldIntersectExactlyTouch = function ()
{
	return true &&
	//!intersectExactlyTouch([], []) && // @TODO

	!intersectExactlyTouch([[0,0], [2,0], [1,1]          ],  [[0  , 0  ], [2 ,0  ], [1, 1  ]]) &&
	 intersectExactlyTouch([[0,0], [2,0], [1,1]          ],  [[2  , 0  ], [4 ,0  ], [3, 1  ]]) &&
	!intersectExactlyTouch([[0,0], [2,0], [1,1]          ],  [[2.1, 0  ], [4 ,0  ], [3, 1  ]]) &&

	!intersectExactlyTouch([[0,2], [2,1], [3,3]          ],  [[1  , 4  ], [4 ,1  ], [7, 4  ]]) &&
	 intersectExactlyTouch([[0,2], [2,1], [2,3]          ],  [[1  , 4  ], [4 ,1  ], [7, 4  ]]) &&
	!intersectExactlyTouch([[0,2], [2,1], [1,3]          ],  [[1  , 4  ], [4 ,1  ], [7, 4  ]]) &&
	!intersectExactlyTouch([[0,2], [2,1], [4,4]          ],  [[1  , 4  ], [4 ,1  ], [7, 4  ]]) &&

	!intersectExactlyTouch([[1,4], [5,6], [3,3], [3,-2  ]],  [[1  ,-2  ], [6,-3  ], [5,-1  ]]) &&
	 intersectExactlyTouch([[1,4], [5,6], [3,3], [3,-1.5]],  [[1  ,-2  ], [6,-3  ], [5,-1  ]]) &&

	!intersectExactlyTouch([[1,3], [2,1], [2,4], [3, 9  ]],  [[0  , 1  ], [2, 0  ], [4, 5  ]]) &&
	 intersectExactlyTouch([[1,3], [2,1], [2,4], [3, 9  ]],  [[0  ,-1  ], [2,-2  ], [4, 3  ]]) &&
	!intersectExactlyTouch([[1,3], [2,1], [2,4], [3, 9  ]],  [[0  ,-1.1], [2,-2.1], [4, 2.9]]) &&
	 true;
};


//shouldContainIncludingTouch, shouldContainExcludingTouch, shouldContainExactlyTouch :: Bool
PolygonBehavior.prototype.shouldContainIncludingTouch = function ()
{
	return true &&
	!containIncludingTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainExcludingTouch = function ()
{
	return true &&
	!containExcludingTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainExactlyTouch = function ()
{
	return true &&
	!containExactlyTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,4.9]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};

//shouldValidState, shouldInvalidState :: Bool
PolygonBehavior.prototype.shouldValidState = function ()
{
	return true &&
	 validState([[0,0], [2,0], [1,1]       ],  [[0  , 0  ], [2, 0  ], [1,1  ]]) &&
	 validState([[0,0], [2,0], [1,1]       ],  [[2  , 0  ], [4, 0  ], [3,1  ]]) &&
	 validState([[0,0], [2,0], [1,1]       ],  [[2.1, 0  ], [4, 0  ], [3,1  ]]) &&
	!validState([[0,2], [2,1], [3,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	 validState([[0,2], [2,1], [2,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	 validState([[1,3], [2,1], [2,4], [3,9]],  [[0  ,-1.1], [2,-2.1], [4,2.9]]) &&
	true;
};

PolygonBehavior.prototype.shouldInvalidState = function ()
{
	return true &&
	!invalidState([[0,0], [2,0], [1,1]       ],  [[0  , 0  ], [2, 0  ], [1,1  ]]) &&
	!invalidState([[0,0], [2,0], [1,1]       ],  [[2  , 0  ], [4, 0  ], [3,1  ]]) &&
	!invalidState([[0,0], [2,0], [1,1]       ],  [[2.1, 0  ], [4, 0  ], [3,1  ]]) &&

	 invalidState([[0,2], [2,1], [3,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	!invalidState([[0,2], [2,1], [2,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	!invalidState([[1,3], [2,1], [2,4], [3,9]],  [[0  ,-1.1], [2,-2.1], [4,2.9]]) &&
	true;
};
