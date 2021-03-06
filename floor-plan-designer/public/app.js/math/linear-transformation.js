function linTransf(rows, col) {return rows.map((row) => scalarProduct(row, col));}
function makeRotMatrix(phi) {return [[Math.cos(phi), -Math.sin(phi)], [Math.sin(phi), Math.cos(phi)]];}
function makeRotate(phi, [x0, y0])
{
	var rotMatrix = makeRotMatrix(phi);
	function rotate([x, y])
	{
		var [dx, dy] = [x-x0, y-y0];
		var [dx_, dy_] = linTransf(rotMatrix, [dx, dy]);
		return [x0+dx_, y0+dy_];
	}
	return rotate;
}
function makeReflectHorizontally(y0) {return ([x, y]) => [x, 2*y0-y];}
function makeReflectVertically  (x0) {return ([x, y]) => [2*x0-x, y];}

function makeScale (q, [x0, y0]) {return ([x, y]) => [q*x +(1-q)*x0, q*y +(1-q)*y0];}
function makeScaleX(q,  x0     ) {return ([x, y]) => [q*x +(1-q)*x0,   y          ];}
function makeScaleY(q,      y0 ) {return ([x, y]) => [  x          , q*y +(1-q)*y0];}
function makeScaleXY(q, r, [x0, y0])
{
	function scale(point)
	{
		var scaleX = makeScaleX(q, x0);
		var scaleY = makeScaleY(r, y0);
		return scaleY(scaleX(point));
	}
	return scale;
}
function makeScaleXYArealInvariant  (q, point0) {return makeScaleXY(q, 1/q, point0);}
function makeUnscaleXYArealInvariant(q, point0) {return makeScaleXY(1/q, q, point0);}

function makeReflectHorizontallyRef([x0, y0], refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, [x0, y0])(point);
		var point__ = makeReflectHorizontally(y0)(point_);
		return        makeRotate( refAngle, [x0, y0])(point__);
	};
}
function makeReflectVerticallyRef([x0, y0], refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, [x0, y0])(point);
		var point__ = makeReflectVertically(x0)(point_);
		return        makeRotate( refAngle, [x0, y0])(point__);
	};
}

function makeScaleXRef(q, [x0, y0], refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, [x0, y0])(point);
		var point__ = makeScaleX(q, x0)(point_);
		return        makeRotate( refAngle, [x0, y0])(point__);
	};
}
function makeScaleYRef(q, [x0, y0], refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, [x0, y0])(point);
		var point__ = makeScaleY(q, y0)(point_);
		return        makeRotate( refAngle, [x0, y0])(point__);
	};
}
function makeScaleXYRef(q, r, point0, refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, point0)(point);
		var point__ = makeScaleXY(q, r, point0)(point_);
		return        makeRotate( refAngle, point0)(point__);
	};
}
function makeScaleXYArealInvariantRef(q, point0, refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, point0)(point);
		var point__ = makeScaleXYArealInvariant(q, point0)(point_);
		return        makeRotate( refAngle, point0)(point__);
	};
}
function makeUnscaleXYArealInvariantRef(q, point0, refAngle)
{
	return function (point)
	{
		var point_  = makeRotate(-refAngle, point0)(point);
		var point__ = makeUnscaleXYArealInvariant(q, point0)(point_);
		return        makeRotate( refAngle, point0)(point__);
	};
}
