function Maybe (internalRepresentation) {this.internalRepresentation = internalRepresentation;};

Maybe.just    = a  => new Maybe(['just', a]);
Maybe.nothing = () => new Maybe(['nothing']);

Maybe.prototype.maybe_val = function (nothingValue, justCase) // could be defined upon maybe_exec, but it is more optimized to hardcode
{
	const [tag, value] = this.internalRepresentation;
	switch (tag) {
		case 'nothing' : return nothingValue
		case 'just'    : return justCase(value);
		default        : throw 'Maybe ADT: internal representation error';
	}
};

Maybe.prototype.maybe_exec = function (nothingCase, justCase)
{
	const [tag, value] = this.internalRepresentation;
	switch (tag) {
		case 'nothing' : return nothingCase();
		case 'just'    : return justCase(value);
		default        : throw 'Maybe ADT: internal representation error';
	}
};

Maybe.prototype.map = function (f)
{
	return this.maybe_val(
		Maybe.nothing(),
		internRep => Maybe.just(f(internRep))
	);
};

Maybe.prototype.bind = function (f) // f: a -> Maybe<b> @TODO type check in TypeScript?
{
	return this.maybe_val(
		Maybe.nothing(),
		value => f(value)
	);
};

Maybe.prototype.fromJustWith = function (errorMsg)
{
	return this.maybe_exec(
		()  => Logger.write(errorMsg),
		val => val
	);
};


Maybe.ifTrue  = (flag, value) => flag ? Maybe.just(value) : Maybe.nothing();
Maybe.ifFalse = (flag, value) => Maybe.ifTrue(!flag, value);
Maybe.asTruey = value => Maybe.ifTrue(value, value);
Maybe.ifTrue_lazy  = (flag, execute) => flag ? Maybe.just(execute()) : Maybe.nothing();

Maybe.number = function (rep)
{
	const num = Number(rep); // @TODO `Number` is too tolerant, it accepts '' and ' ' and converts them to 0
	return Maybe.ifFalse(Number.isNaN(num), num);
};

Maybe.toInt = function (rep)
{
	const isInt = /^[\+\-]?(0|[1-9]\d*)$/.test(rep);
	return Maybe.ifTrue(isInt, Number(rep));
};
