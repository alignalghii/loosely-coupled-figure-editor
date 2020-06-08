const distancePointHence      = (p, q)  => vectorLength(fromTo(p, q));
const distanceLineHence       = (e, p)  => line_eq_geomdist(e, p);
const dinstanceLineFromOrigin = e       => line_eq_geomdist_orig(e);
const projectOnOrientation    = (p, nv) => scalarProduct(p, nv) / vectorLength(nv);

function distanceSegmentHence(s, p)
{
	const [a, b] = s;
	const e  = lineOfSegment(s);
	return onStripeBetweenWeakly(a, b, p) ? distanceLineHence(e, p)
	                                      : Math.min(distancePointHence(a, p), distancePointHence(b, p));
}

const onStripeBetweenWeakly   = (a, b, p) => onStripeBetweenWith(weaklyInsideThalesCircleWithDiameter  , a, b, p);
      onStripeBetweenStrictly = (a, b, p) => onStripeBetweenWith(strictlyInsideThalesCircleWithDiameter, a, b, p);

function onStripeBetweenWith(insideThalesCircleWithDiameter, a, b, p)
{
	const s  = [a, b],
	      e  = lineOfSegment(s),
	      p_ = footPoint(e, p);
	return insideThalesCircleWithDiameter(s, p_);
}

function footPoint([a, b, c], p)
{
	const nv        = [a, b],
	      nsq       = scalarProduct(nv, nv),
	      normalize = x => x / nsq;
	return [
		 detCols(p, nv)*b + a*c,
		-detCols(p, nv)*a + b*c
	].map(normalize);
}
