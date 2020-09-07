function TransformRewriter (svgElem) {this.svgElem = svgElem;}

TransformRewriter.createAsRerotated_excp = function (svgElem, angle)
{
	const transformRewriter = new TransformRewriter(svgElem);
	transformRewriter.updateRotationAngle_excp(angle);
	return transformRewriter;
};

TransformRewriter.prototype.maybeTransform = function ()
{
	const transform = this.svgElem.getAttribute('transform');
	return Maybe.asTruey(transform);
};

TransformRewriter.prototype.getMaybeRotationAngle = function ()
{
	return this.maybeTransform().bind(
		transform => {
			const matches = /rotate\(([\+\-0-9\.]+)/.exec(transform),
			      mbRep = matches.maybeAt(1);
			return mbRep.bind(Maybe.number); // @TODO `Number` is too tolerant, it accepts '' and ' ' and converts them to 0
		}
	);
};


TransformRewriter.prototype.updateRotationAngle_silent = function (angle)
{
	this.maybeTransform().map(
		transform => {
			const transform2 = transform.replace(/rotate\(([\+\-0-9\.]+)/, `rotate(${angle}`);
			this.svgElem.setAttribute('transform', transform2);
		}
	);
};

TransformRewriter.prototype.updateRotationAngle_flag = function (angle)
{
	return this.getMaybeRotationAngle().maybe_val(
		false,
		_ => {
			this.updateRotationAngle_silent(angle);
			return true;
		}
	);
};

TransformRewriter.prototype.updateRotationAngle_excp = function (angle)
{
	const isSuccess = this.updateRotationAngle_flag(angle);
	if (!isSuccess) throw 'Transform rewrite error: no rotation to rewrite';
};

TransformRewriter.prototype.getBox = function () // @TODO it is not for all kinds of svg elems, it is a partial function
{
	const x = Number(this.svgElem.getAttribute('x')),
	      y = Number(this.svgElem.getAttribute('y'));
	const w = Number(this.svgElem.getAttribute('width')),
	      h = Number(this.svgElem.getAttribute('height'));
	return [[x, y], [w, h]]; // @TODO introduce a `Box` class and delgate some responsibilities to it
};

TransformRewriter.prototype.conjointVerticalDoorFlipRef = function () // @TODO generalize+parametrize this method further + contract with other methods of this family: `conjoint(Horizont|Vertic)al(Door|Window)Flip(Ref?)`
{
	const [[x, y], [w, h]] = this.getBox(); // @TODO `h` is not used
	const transform = this.maybeTransform().maybe_exec(
		() => `translate(${x+w} ${y}) scale(-1, 1) translate(${-x-w} ${-y})`,
		transform => {
			const regexp = /(^|.*[^ ])\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*scale\(-1[, ]\s*1\)\s*translate\(-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?\)\s*$/;
			if (regexp.test(transform)) {
				const submatches = regexp.exec(transform);
				return submatches.maybeAt(1).fromJustWith('Regexp bug');
			} else {
				return transform + ` translate(${x+w} ${y}) scale(-1, 1) translate(${-x-w} ${-y})`;
			}
		}
	);
	this.svgElem.setAttribute('transform', transform);
};
