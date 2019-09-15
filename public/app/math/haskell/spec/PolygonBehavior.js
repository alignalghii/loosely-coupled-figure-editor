function PolygonBehavior() {}

//import GeometryHigh.Polygon
//import Number.Infinitesimal
//import GeometryLow.Orientation (BoundnessSign (Containment, Complementary))


//shouldTestPolygonBehavior :: Bool
PolygonBehavior.prototype.shouldTestPolygonBehavior = function () {return this.shouldIntersectIncludingTouch() && this.shouldIntersectExcludingTouch() && this.shouldIntersectExactlyTouch() && this.shouldContainsIncludingTouch() && this.shouldContainsExcludingTouch() && this.shouldContainsExactlyTouch() && this.shouldContainedByIncludingTouch() && this.shouldContainedByExcludingTouch() && this.shouldContainedByExactlyTouch() && this.shouldValidSituation() && this.shouldInvalidSituation() && this.shouldFall_diagnostic() && this.shouldFallFromOutside() && this.shouldFallFromInside() && this.shouldFallFromAround() && this.shouldFallPolygonOnPolygon_IMPROVED() && this.shouldSituationStatus();}

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

//shouldFallFromInside :: Bool
PolygonBehavior.prototype.shouldFallFromAround = function ()
{
	return true &&
	either(constK(false), ccIs(0.5), fallFromAround([ 1,  0], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]])) &&
	either(constK(false), ccIs(0.5), fallFromAround([ 0, -1], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]])) &&
	either(constK(false), ccIs(0.2), fallFromAround([-1,  0], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]])) &&
	either(constK(false), ccIs(5/6), fallFromAround([ 0,  1], [[1, 2], [7, 3], [9, 7], [7, 12], [5, 8], [2, 9], [2, 6]], [[2, 3], [5, 4], [5, 5], [8, 6], [8, 9], [7, 9], [7, 8], [2, 4]])) &&
	true;
};

PolygonBehavior.prototype.shouldFallPolygonOnPolygon_IMPROVED = function ()
{
	var pMInfScale1 = fallPolygonOnPolygon_IMPROVED(
		[[4,  1], [5, 1], [ 4, 2]],
		[[4, -2], [1, 4], [-5, 1]],
		[-7, -7]
	);
	var flag1 = ccTreeEq(pMInfScale1, ['right', 1/7]);

	var pMInfScale2 = fallPolygonOnPolygon_IMPROVED(
		[[4, -2], [1, 4], [-5, 1]],
		[[4,  1], [5, 1], [ 4, 2]],
		[7, 7]
	);
	var flag2 = ccTreeEq(pMInfScale2, ['right', 1/7]);

	return flag1 && flag2;
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


//shouldContainedByIncludingTouch, shouldContainedByExcludingTouch, shouldContainedByExactlyTouch :: Bool
PolygonBehavior.prototype.shouldContainedByIncludingTouch = function ()
{
	return true &&
	!containedByIncludingTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByIncludingTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainedByExcludingTouch = function ()
{
	return true &&
	!containedByExcludingTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containedByExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containedByExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByExcludingTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainedByExactlyTouch = function ()
{
	return true &&
	!containedByExactlyTouch([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	 containedByExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containedByExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3,4.9]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	!containedByExactlyTouch([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) &&
	true;
};



//shouldContainsIncludingTouch, shouldContainsExcludingTouch, shouldContainsExactlyTouch :: Bool
PolygonBehavior.prototype.shouldContainsIncludingTouch = function ()
{
	return true &&
	!containsIncludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6]         ]) &&
	 containsIncludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5  ]]) &&
	 containsIncludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5.2]]) &&
	 containsIncludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3.2,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainsExcludingTouch = function ()
{
	return true &&
	!containsExcludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6]         ]) &&
	!containsExcludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5  ]]) &&
	!containsExcludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5.2]]) &&
	 containsExcludingTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3.2,5]]) &&
	true;
};

PolygonBehavior.prototype.shouldContainsExactlyTouch = function ()
{
	return true &&
	!containsExactlyTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6]         ]) &&
	 containsExactlyTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5  ]]) &&
	 containsExactlyTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5.2]]) &&
	!containsExactlyTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,4.9]]) &&
	!containsExactlyTouch([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3.2,5]]) &&
	true;
};



//shouldValidSituation, shouldInvalidSituation :: Bool
PolygonBehavior.prototype.shouldValidSituation = function ()
{
	return true &&
	 validSituation([[0,0], [2,0], [1,1]       ],  [[0  , 0  ], [2, 0  ], [1,1  ]]) &&
	 validSituation([[0,0], [2,0], [1,1]       ],  [[2  , 0  ], [4, 0  ], [3,1  ]]) &&
	 validSituation([[0,0], [2,0], [1,1]       ],  [[2.1, 0  ], [4, 0  ], [3,1  ]]) &&
	!validSituation([[0,2], [2,1], [3,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	 validSituation([[0,2], [2,1], [2,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	 validSituation([[1,3], [2,1], [2,4], [3,9]],  [[0  ,-1.1], [2,-2.1], [4,2.9]]) &&
	true;
};

PolygonBehavior.prototype.shouldInvalidSituation = function ()
{
	return true &&
	!invalidSituation([[0,0], [2,0], [1,1]       ],  [[0  , 0  ], [2, 0  ], [1,1  ]]) &&
	!invalidSituation([[0,0], [2,0], [1,1]       ],  [[2  , 0  ], [4, 0  ], [3,1  ]]) &&
	!invalidSituation([[0,0], [2,0], [1,1]       ],  [[2.1, 0  ], [4, 0  ], [3,1  ]]) &&

	 invalidSituation([[0,2], [2,1], [3,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	!invalidSituation([[0,2], [2,1], [2,3]       ],  [[1  , 4  ], [4, 1  ], [7,4  ]]) &&
	!invalidSituation([[1,3], [2,1], [2,4], [3,9]],  [[0  ,-1.1], [2,-2.1], [4,2.9]]) &&
	true;
};


PolygonBehavior.prototype.shouldSituationStatus  = function ()
{
	return true &&

	/*** Intersect ***/

	 //situationStatus([], []) && // @TODO

	vecEq(/*<<<*/ situationStatus([[0,0], [2,0], [1,1]        ], [[0  , 0], [2,  0  ], [1 ,1  ]]) ,/*===*/ {contains:0, containedBy:0} /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[0,0], [2,0], [1,1]        ], [[2  , 0], [4,  0  ], [3 ,1  ]]) ,/*===*/ {disjoint:0}                /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[0,0], [2,0], [1,1]        ], [[2.1, 0], [4 , 0  ], [3 ,1  ]]) ,/*===*/ {disjoint:1}                /*>>>*/) &&

	vecEq(/*<<<*/ situationStatus([[0,2], [2,1], [3,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) ,/*===*/ {}                          /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[0,2], [2,1], [2,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) ,/*===*/ {disjoint:0}                /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[0,2], [2,1], [1,3]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) ,/*===*/ {disjoint:1}                /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[0,2], [2,1], [4,4]        ], [[1  , 4], [4 , 1  ], [7 ,4  ]]) ,/*===*/ {}                          /*>>>*/) &&

	vecEq(/*<<<*/ situationStatus([[1,4], [5,6], [3,3], [3,-2]], [[1  ,-2], [6 ,-3  ], [5,-1  ]]) ,/*===*/ {}                          /*>>>*/) &&

	vecEq(/*<<<*/ situationStatus([[1,3], [2,1], [2,4], [3, 9]], [[0, 1  ], [2 , 0  ], [4, 5  ]]) ,/*===*/ {}                          /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[1,3], [2,1], [2,4], [3, 9]], [[0,-1  ], [2 ,-2  ], [4, 3  ]]) ,/*===*/ {disjoint:0}                /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[1,3], [2,1], [2,4], [3, 9]], [[0,-1.1], [2 ,-2.1], [4, 2.9]]) ,/*===*/ {disjoint:1}                /*>>>*/) &&


	true &&

	/*** ContainedBy ***/
	vecEq(/*<<<*/ situationStatus([[3,4], [4,4], [4,6], [2,6]         ],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) ,/*===*/ {}               /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[3,4], [4,4], [4,6], [2,6], [3,5  ]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) ,/*===*/ {containedBy:0}  /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[3,4], [4,4], [4,6], [2,6], [3,5.2]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) ,/*===*/ {containedBy:0}  /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[3,4], [4,4], [4,6], [2,6], [3,4.8]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) ,/*===*/ {}               /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[3,4], [4,4], [4,6], [2,6], [3.2,5]],  [[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]]) ,/*===*/ {containedBy:1}  /*>>>*/) &&

	true &&

	/*** Contains ***/
	vecEq(/*<<<*/ situationStatus([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6]         ]) ,/*===*/ {}            /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5  ]]) ,/*===*/ {contains:0}  /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,5.2]]) ,/*===*/ {contains:0}  /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3,4.8]]) ,/*===*/ {}            /*>>>*/) &&
	vecEq(/*<<<*/ situationStatus([[2,2], [5,4], [7,4], [5,8], [1,6], [3,5]],  [[3,4], [4,4], [4,6], [2,6], [3.2,5]]) ,/*===*/ {contains:1}  /*>>>*/) &&

	true;
};
