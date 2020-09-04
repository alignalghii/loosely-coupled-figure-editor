const HomPair = Pair

/*
instance Functor (a, a) where
	fmap f (a1, a2) = (f a1, f a2)
*/

HomPair.prototype.typevalid = function () {return typeof this.fst() == typeof this.snd();};


HomPair.prototype.typecheck = function ()
{
	if (!this.typevalid()) console.log('HomPair must have same-typed constituents');
};

HomPair.prototype.map = function (f)
{
	this.typecheck();
	return this.uncurry(
		(a1, a2) => new HomPair(f(a1), f(a2))
	);
};

HomPair.prototype.filter = function (prop)
{
	this.typecheck();
	return this.uncurry(
		(a1, a2) => [a1, a2].filter(prop)
	);
};
