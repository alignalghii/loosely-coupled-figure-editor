function eqType([a, b, rhs])
{
	if (cc0(a) && cc0(b)) return cc0(rhs) ? 'unconstrained' : 'inconsistent';
	else return 'line';
}

function solveGeneral([a1, b1, rhs1], [a2, b2, rhs2])
{
	var type1 = eqType([a1, b1, rhs1]);
	var type2 = eqType([a2, b2, rhs2]);
	if (type1 == 'inconsistent' || type2 == 'inconsistent') return ['inconsistent'];
	if (type1 == 'unconstrained') return [type2, a2, b2, rhs2];
	if (type2 == 'unconstrained') return [type1, a1, b1, rhs1];
	if (type1 == 'line' && type2 == 'line') return solveLines([a1, b1, rhs1], [a2, b2, rhs2]);
}

function solveLines([a1, b1, rhs1], [a2, b2, rhs2])
{
	/*if (cc0(a1) && cc0(b2) || cc0(b1) && cc0(a2)) {var [x,y] = intersectionPoint([a1, b1, rhs1], [a2, b2, rhs2]); return ['point', x, y]}
	if (cc0(a1) && cc0(a2)) return ccEq(rhs1*b2/b1, rhs2) ? ['line', 0 , b1, rhs1] : ['inconsistent'];
	if (cc0(b1) && cc0(b2)) return ccEq(rhs1*a2/a1, rhs2) ? ['line', a1, 0 , rhs1] : ['inconsistent'];*/

	var col1 = [a1, a2];
	var col2 = [b1, b2];
	var rhsV = [rhs1, rhs2];
	return solveColumns(col1, col2, rhsV);
}

function solveColumns(col1, col2, rhsV)
{
	var [a1, a2] = col1;
	var [b1, b2] = col2;
	var [rhs1, rhs2] = rhsV;
	detAll  = detCols(col1, col2);
	detSub1 = detCols(rhsV, col2);
	detSub2 = detCols(col1, rhsV);
	if (!cc0(detAll)) return ['point', detSub1/detAll, detSub2/detAll];
	if ( cc0(detAll)) return cc0(detSub1) && cc0(detSub2) ? ['line', a1, b1, rhs1] : ['inconsistent'];
}
