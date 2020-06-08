function EqOrDiff (internalRepresentation) {this.internalRepresentation = internalRepresentation;}

// Constructors:

EqOrDiff.eq   = a      => new EqOrDiff(['eq'  , a   ]);
EqOrDiff.diff = (a, b) => new EqOrDiff(['diff', a, b]);

// @TODO Debated (because of typing: Either and Tupe does not consist of homogenous types, List does. EqOrDiff becomes to be undecided in this aspect, if we add a compare method:
EqOrDiff.compare = function (a, b, eq)
{
	const flag = eq ? eq(a, b) : a == b;
	return flag ? EqOrDiff.eq(a) : EqOrDiff.diff(a, b);
};

// Destructor:

EqOrDiff.prototype.eqOrDiff = function (eqCase, diffCase)
{
	const [tag, a, b] = this.internalRepresentation;
	switch (tag) {
		case 'eq'  : return eqCase  (a   );
		case 'diff': return diffCase(a, b);
		default    : throw '`EqOrDiff` algebraic datatype: internal representation error';
	}
};

// @TODO Debated (because of typing: Either and Tupe does not consist of homogenous types, List does. EqOrDiff becomes to be undecided in this aspect, if we add a map method:
EqOrDiff.prototype.map_shallow = function (f)
{
	return this.eqOrDiff(
		a      => EqOrDiff.eq  ( f(a)       ),
		(a, b) => EqOrDiff.diff( f(a), f(b) )
	);
};

EqOrDiff.prototype.map_deep = function (f)
{
	return this.eqOrDiff(
		a      => EqOrDiff.eq(f(a)),
		(a, b) => EqOrDiff.compare(f(a), f(b))
	);
};
