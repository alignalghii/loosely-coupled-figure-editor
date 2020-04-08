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
