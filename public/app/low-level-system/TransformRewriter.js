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
			      mbRep = Maybe.at(matches, 1);
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
