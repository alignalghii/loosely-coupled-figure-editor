function Either(internalRepresentation) {this.internalRepresentation = internalRepresentation;}

Either.left  = a => new Either(['left' , a]);
Either.right = b => new Either(['right', b]);

Either.prototype.either = function (leftCase, rightCase)
{
	const [tag, value] = this.internalRepresentation;
	switch (tag) {
		case 'left' : return leftCase (value);
		case 'right': return rightCase(value);
		default     : throw `Internal representation error: invalid tag ${tag}`;
	}
};

Either.prototype.map = function (f)
{
	return this.either(
		a => Either.left(a),
		b => Either.right(f(b))
	);
};
