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
