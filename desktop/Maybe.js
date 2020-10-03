function Maybe() {}

Maybe.nothing = () => new Nothing();
Maybe.just    = a  => new Just(a);

Maybe.return = Maybe.just;

Maybe.prototype.map = function (f)
{
	return this.maybe_exec(
		Maybe.nothing,
		a => Maybe.just(
			f(a)
		)
	);
};

Maybe.prototype.join = function ()
{
	return this.maybe_exec(
		Maybe.nothing,
		ma => ma
	);
};

Maybe.prototype.bind = function (mf)
{
	return this.map(mf).join();
};


function Nothing() {}

Nothing.prototype = Object.create(Maybe.prototype);
Nothing.prototype.constructor = Nothing;

Nothing.prototype.maybe_exec = (nothing, just) => nothing();


function Just(a) {this.a = a;}

Just.prototype = Object.create(Maybe.prototype);
Just.prototype.constructor = Just;

Just.prototype.maybe_exec = function (nothing, just) {return just(this.a);};
