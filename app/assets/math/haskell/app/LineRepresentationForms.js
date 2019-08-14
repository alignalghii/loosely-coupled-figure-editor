// Line (common concepts):

const line_toggle_eq_poly = ([a, b, c]) => [a, b, -c],
      line_norm           = e           => vectorLength (line_eq_lhs(e));

// Line --- equation form:

const line_eq_lhs = ([a, b, c]) => [a, b],
      line_eq_rhs = ([a, b, c]) => c     ;

const line_eq_subst   = e => p =>      scalarProduct(line_eq_lhs   (e), p) == line_eq_rhs ,
      line_eq_ccSubst = e => p => ccEq(scalarProduct(line_eq_lhs   (e), p),   line_eq_rhs),
      line_poly_subst = e => p =>      scalarProduct(line_poly_gr1s(e), p)  - line_poly_gr0(e);

function line_eq_topoldist_orig(e)
{
	const poly = line_toggle_eq_poly(e);
	return line_poly_topoldist_orig(e);
}

function line_eq_geomdist_orig(e)
{
	const poly = line_toggle_eq_poly(e);
	return line_poly_geomdist_orig(e);
}

function line_eq_topoldist(e, p)
{
	const poly = line_toggle_eq_poly(e);
	return line_poly_topoldist(e, p);
}

function line_eq_geomdist(e, p)
{
	const poly = line_toggle_eq_poly(e);
	return line_poly_geomdist(e, p);
}

// Line --- polygon form:

const line_poly_gr1s    = ([a, b, c]) =>  [a, b],
      line_poly_gr0     = ([a, b, c]) =>  c     ,
      line_poly_gr0_neg = ([a, b, c]) => -c     ;

const line_poly_topoldist_orig = e => -line_poly_gr0(e) / line_norm(e),
      line_poly_geomdist_orig  = e => Math.abs(line_poly_topoldist_orig(e));

const line_poly_topoldist = (e, p) => line_poly_subst(e)(p) / line_norm(e),
      line_poly_geomdist  = (e, p) => Math.abs(line_poly_topoldist(e, p)) ;
