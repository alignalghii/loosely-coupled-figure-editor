function TangentDetectorBehavior () {}

TangentDetectorBehavior.prototype.shouldTestTangentDetectorBehavior = function () {return this.shouldAbsoluteConvexAngleOfLine() && this.shouldPolygonSlideDirection();};

TangentDetectorBehavior.prototype.shouldAbsoluteConvexAngleOfLine = () =>
	absoluteConvexAngleOfLine([ 0, -1, 0]) ==   0 && // direction vector:  1,  0
	absoluteConvexAngleOfLine([ 1, -1, 0]) ==  45 && // direction vector:  1,  1
	absoluteConvexAngleOfLine([ 1,  0, 0]) ==  90 && // direction vector:  0,  1
	absoluteConvexAngleOfLine([ 1,  1, 0]) == 135 && // direction vector: -1,  1
	absoluteConvexAngleOfLine([ 0,  1, 0]) ==   0 && // direction vector: -1,  0
	absoluteConvexAngleOfLine([-1,  1, 0]) ==  45 && // direction vector: -1, -1
	absoluteConvexAngleOfLine([-1,  0, 0]) ==  90 && // direction vector:  0, -1
	absoluteConvexAngleOfLine([-1, -1, 0]) == 135 && // direction vector:  1, -1
	true;


TangentDetectorBehavior.prototype.shouldPolygonSlideDirection = () =>
	vecEq(/*<<<*/polygonSlideDirection([[1, 1], [3, 1], [3, 2], [1, 2]], [[4, 1], [5, 2], [3, 4], [2, 3]]), /*===*/ ['just', 135]/*>>>*/) &&
	vecEq(/*<<<*/polygonSlideDirection([[4, 1], [5, 2], [3, 4], [2, 3]], [[1, 1], [3, 1], [3, 2], [1, 2]]), /*===*/ ['just', 135]/*>>>*/) &&

	vecEq(/*<<<*/polygonSlideDirection([[2, 3], [3, 3], [3, 4], [2, 4]], [[3, 0], [5, 2], [2, 5], [0, 3]]), /*===*/ ['just', 135]/*>>>*/) &&
	vecEq(/*<<<*/polygonSlideDirection([[3, 0], [5, 2], [2, 5], [0, 3]], [[2, 3], [3, 3], [3, 4], [2, 4]]), /*===*/ ['just', 135]/*>>>*/) &&
	true;

//const tangentVertexOnVertex = (vertex1, vertex2) => ['nothing'];


