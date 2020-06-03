function fromTo(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [b1-a1, b2-a2];
}

function addVec(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [a1+b1, a2+b2];
}

const doAddVec = (pos, [dx, dy]) => (pos[0] += dx, pos[1] += dy);
const doSubVec = (pos, [dx, dy]) => (pos[0] -= dx, pos[1] -= dy);


function scalarProduct ([a, b], [c, d]) {return a*c + b*d;}
function detCols([a11, a21], [a12, a22]) {return a11*a22-a21*a12;}
function vectorLength  ([a, b]        ) {return Math.sqrt(a*a + b*b);}

function signedRotAngleOfVectors(u , v)
{
	var measure = angleOfVectors(u, v);
	var dir = det(u, v);
	return (dir >= 0 ? 1 : -1) * measure;
}

function angleOfVectors(u , v)
{
	var val = scalarProduct(u, v) / (vectorLength(u) * vectorLength(v));
	if (val >  1) val =  1;
	if (val < -1) val = -1;
	return Math.acos(val) * 180 / Math.PI;
}

function det(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return a1*b2 - a2*b1;
}

function toNegative([x, y]) {return [-x, -y];}

/******************************
 * Transition between coordinate sytems:
 ******************************/

function domainToSvgFactory(svgSize, scale)
{
	function domainToSvg(domainPosition)
	{
		var [ w,  h] = svgSize;    // width, height (w and h is used, not to clash with windows.width and windows.height)
		var [sw, sh] = [w/2, h/2]; // semiwidth, semiheight
		var [ x,  y] = domainPosition;
		return [sw+scale*x, sh-scale*y];
	}
	return domainToSvg;
}

function svgToDomainFactory(svgSize, scale)
{
	function svgToDomain(svgPosition)
	{
		var [ w,  h] = svgSize;
		var [Ox, Oy] = [w/2, h/2];
		var [ x,  y] = svgPosition;
		var [dx, dy] = [x-Ox, Oy-y];
		return [dx/scale, dy/scale];
	}
	return svgToDomain;
}

/************************/

function centroid(points)
{
	var count = points.length;
	var xSum = 0, ySum = 0;
	for (i = 0; i < count; i++) {xSum += points[i][0]; ySum += points[i][1];}
	return [xSum / count, ySum / count];
}

function decompose(base1, base2, toDecompose)
{
	var solution = solveColumns(base1, base2, toDecompose);
	solution.shift();
	return solution;
}

function projectNormal(newYAxisBackDirection, point)
{
	var base2 = normalizeVector(toNegative(newYAxisBackDirection));
	var base1 = normalizeVector(rotVec90CW(base2));
	return decompose(base1, base2, point)[0];
}

function normalizeVector(vector)
{
	var [x, y] = vector;
	var n      = vectorLength(vector);
	return       [x/n, y/n];
}

function rotVec90CCW([x, y]) {return [-y,  x];}
function rotVec90CW ([x, y]) {return [ y, -x];}


function slideProject(what, ontoWhat)
{
	const u = normalizeVector(ontoWhat),
	      l = scalarProduct(u, what);
	return slantScale(l, u);
}
