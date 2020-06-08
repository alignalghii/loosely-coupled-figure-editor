function HilbertGeometryBehavior () {}

HilbertGeometryBehavior.prototype.shouldTestHilbertGeometryBehavior = function () {return this.shouldIncidenceVertexOnVertex() && this.shouldIncidenceVertexOnEdge() && this.shouldIncidenceEdgeOnVertex() && this.shouldIncidenceEdgeOnEdge() && this.shouldSameLine();};

HilbertGeometryBehavior.prototype.shouldIncidenceVertexOnVertex = function ()
{
	return true &&
	 incidenceVertexOnVertex([3, 4], [3  , 4  ]) &&
	 incidenceVertexOnVertex([3, 4], [3.00000001, 4]) &&
	 incidenceVertexOnVertex([3, 4], [3  , 3.99999999]) &&
	!incidenceVertexOnVertex([3, 4], [3  , 5  ]) &&
	!incidenceVertexOnVertex([3, 4], [2  , 4  ]) &&
	!incidenceVertexOnVertex([3, 4], [2  , 5  ]) &&
	!incidenceVertexOnVertex([3, 4], [3.2, 3.8]) &&
	!incidenceVertexOnVertex([3, 4], [2  , 5  ]) &&
	true;
};

HilbertGeometryBehavior.prototype.shouldIncidenceVertexOnEdge = function ()
{
	return true &&
	!incidenceVertexOnEdge([0, 0], [[ 6, 3], [2, 1]]) &&
	!incidenceVertexOnEdge([4, 2], [[ 4, 2], [2, 1]]) &&
	 incidenceVertexOnEdge([4, 2], [[ 6, 3], [2, 1]]) &&
	!incidenceVertexOnEdge([2, 1], [[ 4, 2], [2, 1]]) &&
	!incidenceVertexOnEdge([6, 3], [[ 4, 2], [2, 1]]) &&

	!incidenceVertexOnEdge([0, 0.000001], [[ 6, 3], [2, 1]]) &&
	!incidenceVertexOnEdge([4, 1.999999], [[ 4, 2], [2, 1]]) &&
	!incidenceVertexOnEdge([4, 2.000001], [[ 4, 2], [2, 1]]) &&
	 incidenceVertexOnEdge([4, 1.999999], [[ 6, 3], [2, 1]]) &&
	 incidenceVertexOnEdge([4, 2.000001], [[ 6, 3], [2, 1]]) &&
	!incidenceVertexOnEdge([2, 1], [[ 4, 2], [2, 1]]) &&
	!incidenceVertexOnEdge([6, 3], [[ 4, 2], [2, 1]]) &&

	// incidenceVertexOnEdge([7, 1], [[11, 3], [9, 2]]) &&
	// incidenceVertexOnEdge([0.000001, 0], [[ 4, 2], [2, 1]]) &&
	// incidenceVertexOnEdge([7, 0.999999], [[11, 3], [9, 2]]) &&
	//!incidenceVertexOnEdge([0, 4], [[ 4, 2], [2, 1]]) &&
	//!incidenceVertexOnEdge([7, 5], [[11, 3], [9, 2]]) &&
	true;
};

HilbertGeometryBehavior.prototype.shouldIncidenceEdgeOnVertex = function ()
{
	return true &&
	!incidenceEdgeOnVertex([[ 6, 3], [2, 1]], [0, 0]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [4, 2]) &&
	 incidenceEdgeOnVertex([[ 6, 3], [2, 1]], [4, 2]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [2, 1]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [6, 3]) &&

	!incidenceEdgeOnVertex([[ 6, 3], [2, 1]], [0, 0.000001]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [4, 1.999999]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [4, 2.000001]) &&
	 incidenceEdgeOnVertex([[ 6, 3], [2, 1]], [4, 1.999999]) &&
	 incidenceEdgeOnVertex([[ 6, 3], [2, 1]], [4, 2.000001]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [2, 1]) &&
	!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [6, 3]) &&

	// incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [0, 0]) &&
	// incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [0, 0]) &&
	// incidenceEdgeOnVertex([[11, 3], [9, 2]], [7, 1]) &&
	// incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [0.000001, 0]) &&
	// incidenceEdgeOnVertex([[11, 3], [9, 2]], [7, 0.999999]) &&
	//!incidenceEdgeOnVertex([[ 4, 2], [2, 1]], [0, 4]) &&
	//!incidenceEdgeOnVertex([[11, 3], [9, 2]], [7, 5]) &&
	true;
};

HilbertGeometryBehavior.prototype.shouldIncidenceEdgeOnEdge = function ()
{
	return true &&

	 incidenceEdgeOnEdge([[3, 1], [7, 3]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[3, 1], [7, 3]], [[9, 4], [5, 2]]) &&
	 incidenceEdgeOnEdge([[7, 3], [3, 1]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[7, 3], [3, 1]], [[9, 4], [5, 2]]) &&

	 incidenceEdgeOnEdge([[3.0000001, 1], [7, 3]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[3.0000001, 1], [7, 3]], [[9, 4], [5, 2]]) &&
	 incidenceEdgeOnEdge([[7.0000001, 3], [3, 1]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[7.0000001, 3], [3, 1]], [[9, 4], [5, 2]]) &&

	 incidenceEdgeOnEdge([[3, 0.9999999], [7, 3]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[3, 0.9999999], [7, 3]], [[9, 4], [5, 2]]) &&
	 incidenceEdgeOnEdge([[7, 2.9999999], [3, 1]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[7, 2.9999999], [3, 1]], [[9, 4], [5, 2]]) &&

	 incidenceEdgeOnEdge([[3.0000001, 0.9999999], [7, 3]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[3.0000001, 0.9999999], [7, 3]], [[9, 4], [5, 2]]) &&
	 incidenceEdgeOnEdge([[7.0000001, 2.9999999], [3, 1]], [[5, 2], [9, 4]]) &&
	 incidenceEdgeOnEdge([[7.0000001, 2.9999999], [3, 1]], [[9, 4], [5, 2]]) &&



	!incidenceEdgeOnEdge([[3, 1], [7, 3]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[3, 1], [7, 3]], [[11, 5], [ 7, 3]]) &&
	!incidenceEdgeOnEdge([[7, 3], [3, 1]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[7, 3], [3, 1]], [[11, 5], [ 7, 3]]) &&

	!incidenceEdgeOnEdge([[3.0000001, 1], [7, 3]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[3.0000001, 1], [7, 3]], [[11, 5], [ 7, 3]]) &&
	!incidenceEdgeOnEdge([[7.0000001, 3], [3, 1]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[7.0000001, 3], [3, 1]], [[11, 5], [ 7, 3]]) &&

	!incidenceEdgeOnEdge([[3, 0.9999999], [7, 3]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[3, 0.9999999], [7, 3]], [[11, 5], [ 7, 3]]) &&
	!incidenceEdgeOnEdge([[7, 2.9999999], [3, 1]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[7, 2.9999999], [3, 1]], [[11, 5], [ 7, 3]]) &&

	!incidenceEdgeOnEdge([[3.0000001, 1.9999999], [7, 3]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[3.0000001, 1.9999999], [7, 3]], [[11, 5], [ 7, 3]]) &&
	!incidenceEdgeOnEdge([[7.0000001, 2.9999999], [3, 1]], [[ 7, 3], [11, 5]]) &&
	!incidenceEdgeOnEdge([[7.0000001, 2.9999999], [3, 1]], [[11, 5], [ 7, 3]]) &&



	!incidenceEdgeOnEdge([[3, 1], [5, 2]], [[7, 3], [9, 4]]) &&
	!incidenceEdgeOnEdge([[3, 1], [5, 2]], [[9, 4], [7, 3]]) &&
	!incidenceEdgeOnEdge([[5, 2], [3, 1]], [[7, 3], [9, 4]]) &&
	!incidenceEdgeOnEdge([[5, 2], [3, 1]], [[9, 4], [7, 3]]) &&

	true;
};

HilbertGeometryBehavior.prototype.shouldSameLine = () =>
	 sameLine([2, -3, -3], [4, -6, -6]) &&
	!sameLine([2, -3, -3], [4, -6, -5]) &&
	!sameLine([2, -3, -3], [0,  0,  0]) &&
	true;
