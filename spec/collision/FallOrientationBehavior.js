function FallOrientationBehavior () {}


FallOrientationBehavior.prototype.shouldCollidesSegmentWithSegment_signAndMagnitudeIndependent = function ()
{
	return true &&

		// Eleve elfajult pontszakaszok
		// .
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		// .
		// .
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		// ..
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		// .
		//  .
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&

		// Elfajult pontszakasz vagy bökő tű szakaszra
		//  .
		// ---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&

		// .
		// +--
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&

		//  |
		// ---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&

		// |
		// +--
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&

		// Szakasz pontszakaszra vagy bökő tűre

		// Egyetlen közös vezéregyenes
		// +--+
		// +--+
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&

		//  Két-két közös vezéregyenes

		//  Három vezéregyenes: egy közös és egy-egy önálló
		//  +--
		//  +---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		//  +---
		//  +--
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		//  --+
		//    +---
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&

		//  Négy önálló külön vezéregyenes
		//   -
		//  ---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		//  ---
		//   -
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&

		// ----
		//    ---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&

		// --
		//    ---
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -2], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -3], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  1], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  2], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!collidesSegmentWithSegment_signAndMagnitudeIndependent([0,  3], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&

		/// Kifordulós esetek

		//  Három vezéregyenes: egy közös és egy-egy önálló
		//  +--
		//  +---
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[2, 2], [0, 2]], [[3, 0], [0, 0]]) && // WRONG
		 collidesSegmentWithSegment_signAndMagnitudeIndependent([0, -1], [[2, 2], [0, 2]], [[0, 0], [3, 0]]) && // WRONG

		true;
};



FallOrientationBehavior.prototype.shouldInfiniteIntersection = function ()
{
	return true &&
		 infiniteIntersection([1, 5], [2, 4]) &&
		 infiniteIntersection([1, 5], [4, 7]) &&
		!infiniteIntersection([1, 5], [5, 7]) &&
		!infiniteIntersection([1, 5], [6, 7]) &&
		!infiniteIntersection([1, 5], [3, 3]) &&
		!infiniteIntersection([3, 3], [3, 3]) &&
		!infiniteIntersection([1, 1], [5, 5]) &&
		true;
};


FallOrientationBehavior.prototype.shouldIsPointDegenerateAndInternalIn = function ()
{
	return true &&
		 isPointDegenerateAndInternalIn([3, 3], [1, 5]) &&
		!isPointDegenerateAndInternalIn([1, 1], [1, 5]) &&
		!isPointDegenerateAndInternalIn([5, 5], [1, 5]) &&

		!isPointDegenerateAndInternalIn([1, 5], [1, 1]) &&
		!isPointDegenerateAndInternalIn([1, 5], [5, 5]) &&
		!isPointDegenerateAndInternalIn([1, 5], [3, 3]) &&

		!isPointDegenerateAndInternalIn([3, 3], [3, 3]) &&
		!isPointDegenerateAndInternalIn([1, 1], [3, 3]) &&
		true;
};
