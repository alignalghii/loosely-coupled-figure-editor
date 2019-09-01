function PolygonPropertyAlgebraBehavior() {}

PolygonPropertyAlgebraBehavior.prototype.shouldTestPolygonPropertyAlgebraBehavior = function ()
{
	return true &&
		this.shouldGetPerimeter() &&
		this.shouldGetArea() &&
		this.shouldGetEdgeMeasures() &&
		this.shouldGetAngleMeasures() &&
		this.shouldEditEdge() &&
		this.shouldEditEdge_areaInvariant() &&
		//this.shouldEditAngle() &&
		//this.shouldEditAngle_areaInvariant() &&
		this.shouldInternalAngle() &&
		this.shouldExternalAngle() &&
		true;
};

PolygonPropertyAlgebraBehavior.prototype.shouldGetPerimeter            = () =>
	getPerimeter([[-1, -1], [ 1, -1], [ 1,  1], [-1,  1]]) == 8 &&
	getPerimeter([[-1, -1], [-1,  1], [ 1,  1], [ 1, -1]]) == 8 &&
	true;

PolygonPropertyAlgebraBehavior.prototype.shouldGetArea                 = () =>
	getArea([[-1, -1], [ 1, -1], [ 1, 1], [-1,  1]]) == 4 &&
	getArea([[-1, -1], [-1,  1], [ 1, 1], [ 1, -1]]) == 4 &&

	getArea([[ 1, -2], [ 2, -1], [ 2, 1], [ 1,  2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]) == 14 &&
	getArea([[-1, -2], [-2, -1], [-2, 1], [-1,  2], [ 1, 2], [ 2, 1], [ 2, -1], [ 1, -2]]) == 14 &&

	getArea([[ 1, -2], [ 2, -1], [ 2, 2], [ 1,  1], [-1, 1], [-2, 2], [-2, -1], [-1, -2]]) == 12 &&
	getArea([[-1, -2], [-2, -1], [-2, 2], [-1,  1], [ 1, 1], [ 2, 2], [ 2, -1], [ 1, -2]]) == 12 &&

	getArea([[0, -1], [ 1, -2], [ 2, -1], [ 1, 0], [ 1, 2], [0, 1], [-1, 2], [-1, 0], [-2,-1], [-1, -2]]) == 8 &&
	getArea([[0, -1], [-1, -2], [-2, -1], [-1, 0], [-1, 2], [0, 1], [ 1, 2], [ 1, 0], [ 2,-1], [ 1, -2]]) == 8 &&

	true;

PolygonPropertyAlgebraBehavior.prototype.shouldGetEdgeMeasures         = () => vecEq(getEdgeMeasures ([[-1, -1], [1, -1], [1, 1], [-1, 1]]), [2, 2, 2, 2]);
PolygonPropertyAlgebraBehavior.prototype.shouldGetAngleMeasures        = () =>
	vecEq(getAngleMeasures([[-1, -1], [ 1, -1], [1, 1], [-1,  1]]), [90, 90, 90, 90]) &&
	vecEq(getAngleMeasures([[-1, -1], [-1,  1], [1, 1], [ 1, -1]]), [90, 90, 90, 90]) &&

	vecEq(getAngleMeasures([[ 1, -2], [ 2, -1], [ 2, 1], [ 1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]), [135, 135, 135, 135, 135, 135, 135, 135]) &&
	vecEq(getAngleMeasures([[-1, -2], [-2, -1], [-2, 1], [-1, 2], [ 1, 2], [ 2, 1], [ 2, -1], [ 1, -2]]), [135, 135, 135, 135, 135, 135, 135, 135]) &&

	vecEq(getAngleMeasures([[ 1, -2], [ 2, -1], [ 2, 2], [ 1, 1], [-1, 1], [-2, 2], [-2, -1], [-1, -2]]), [135, 135,  45, 225, 225,  45, 135, 135]) &&
	vecEq(getAngleMeasures([[-1, -2], [-2, -1], [-2, 2], [-1, 1], [ 1, 1], [ 2, 2], [ 2, -1], [ 1, -2]]), [135, 135,  45, 225, 225,  45, 135, 135]) &&

	vecEq(getAngleMeasures([[0, -1], [ 1, -2], [ 2, -1], [ 1, 0], [ 1, 2], [0, 1], [-1, 2], [-1, 0], [-2,-1], [-1, -2]]), [270, 90, 90,  225, 45, 270,  45, 225, 90, 90]) &&
	vecEq(getAngleMeasures([[0, -1], [-1, -2], [-2, -1], [-1, 0], [-1, 2], [0, 1], [ 1, 2], [ 1, 0], [ 2,-1], [ 1, -2]]), [270, 90, 90,  225, 45, 270,  45, 225, 90, 90]) &&
	true;

PolygonPropertyAlgebraBehavior.prototype.shouldEditEdge = () =>
	treeEq(editEdge([[-1, -1], [ 1, -1], [ 1,  1], [-1, 1]], 0, 6), [[-3, -1], [3, -1], [3, 1], [-3, 1]]) &&
	ccTreeEq(editEdge([[ 0, -1], [ 1, -2], [ 2, -1], [ 1, 0], [2, 1], [ 1, 2], [0, 1], [-1, 2], [-2, 1], [-1, 0], [-2,-1], [-1, -2]], 1, 3*Math.sqrt(2)), [[-1, -2], [ 0, -3], [ 3,  0], [ 2, 1], [5, 4], [ 4, 5], [1, 2], [0, 3], [-3, 0], [-2, -1], [-5, -4], [-4, -5]]) &&
	true;

PolygonPropertyAlgebraBehavior.prototype.shouldEditEdge_areaInvariant = () =>
	treeEq(editEdge_areaInvariant ([[-1, -1], [1, -1], [1, 1], [-1, 1]], 0, 4), [[-2, -0.5], [2, -0.5], [2, 0.5], [-2, 0.5]]) &&
	true;

//PolygonPropertyAlgebraBehavior.prototype.shouldEditAngle               = () => treeEq(editAngle([], 0, 135), []);
//PolygonPropertyAlgebraBehavior.prototype.shouldEditAngle_areaInvariant = () => treeEq(editAngle_areaInvariant([], 0, 135), []);

PolygonPropertyAlgebraBehavior.prototype.shouldInternalAngle = () =>
	ccEq(internalAngle('positive-rotation', [1, 0], [ 1,  0]), 180) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [ 1,  1]), 135) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [ 0,  1]),  90) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [-1,  1]),  45) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [-1,  0]),   0) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [-1, -1]), 315) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [ 0, -1]), 270) &&
	ccEq(internalAngle('positive-rotation', [1, 0], [ 1, -1]), 225) &&

	ccEq(internalAngle('negative-rotation', [1, 0], [ 1,  0]), 180) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [ 1,  1]), 225) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [ 0,  1]), 270) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [-1,  1]), 315) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [-1,  0]),   0) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [-1, -1]),  45) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [ 0, -1]),  90) &&
	ccEq(internalAngle('negative-rotation', [1, 0], [ 1, -1]), 135) &&
	true;

PolygonPropertyAlgebraBehavior.prototype.shouldExternalAngle = () =>
	ccEq(externalAngle('positive-rotation', [1, 0], [ 1,  0]),   0) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [ 1,  1]),  45) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [ 0,  1]),  90) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [-1,  1]), 135) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [-1,  0]), 180) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [-1, -1]), 225) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [ 0, -1]), 270) &&
	ccEq(externalAngle('positive-rotation', [1, 0], [ 1, -1]), 315) &&

	ccEq(externalAngle('negative-rotation', [1, 0], [ 1,  0]),   0) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [ 1,  1]), 315) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [ 0,  1]), 270) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [-1,  1]), 225) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [-1,  0]), 180) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [-1, -1]), 135) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [ 0, -1]),  90) &&
	ccEq(externalAngle('negative-rotation', [1, 0], [ 1, -1]),  45) &&
	true;
