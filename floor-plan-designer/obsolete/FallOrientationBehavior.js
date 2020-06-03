FallOrientationBehavior.prototype.shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent = function ()
{
	return true &&

		// Eleve elfajult pontszakaszok
		// .
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 0], [0, 0]], [[0, 0], [0, 0]]) &&
		// .
		// .
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[0, 0], [0, 0]]) &&
		// ..
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 0], [0, 0]], [[1, 0], [1, 0]]) &&
		// .
		//  .
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[1, 0], [1, 0]]) &&

		// Elfajult pontszakasz vagy bökő tű szakaszra
		//  .
		// ---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[1, 2], [1, 2]], [[0, 0], [2, 0]]) &&

		// .
		// +--
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [0, 2]], [[0, 0], [2, 0]]) &&

		//  |
		// ---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[1, 3], [1, 2]], [[0, 0], [2, 0]]) &&

		// |
		// +--
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 3], [0, 2]], [[0, 0], [2, 0]]) &&

		// Szakasz pontszakaszra vagy bökő tűre

		// Egyetlen közös vezéregyenes
		// +--+
		// +--+
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [2, 2]], [[0, 0], [2, 0]]) &&

		//  Két-két közös vezéregyenes

		//  Három vezéregyenes: egy közös és egy-egy önálló
		//  +--
		//  +---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		//  +---
		//  +--
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [3, 2]], [[0, 0], [2, 0]]) &&
		//  --+
		//    +---
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[-2, 2], [0, 2]], [[0, 0], [3, 0]]) &&

		//  Négy önálló külön vezéregyenes
		//   -
		//  ---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[1, 2], [2, 2]], [[0, 0], [3, 0]]) &&
		//  ---
		//   -
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[0, 2], [3, 2]], [[1, 0], [2, 0]]) &&

		// ----
		//    ---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[-3, 2], [1, 2]], [[0, 0], [2, 0]]) &&

		// --
		//    ---
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -2], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -3], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  1], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  2], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&
		!shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0,  3], [[-3, 2], [-1, 2]], [[1, 0], [3, 0]]) &&

		/// Kifordulós esetek

		//  Három vezéregyenes: egy közös és egy-egy önálló
		//  +--
		//  +---
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[2, 2], [0, 2]], [[3, 0], [0, 0]]) && // WRONG
		 shouldCollidesSegmentWithSegment_signDependentMagnitudeIndependent([0, -1], [[2, 2], [0, 2]], [[0, 0], [3, 0]]) && // WRONG

		true;
};
