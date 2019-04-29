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
