function either(funLeft, funRight, eitherAB)
{
	switch (eitherAB[0]) {
		case 'left' : return funLeft (eitherAB[1]);
		case 'right': return funRight(eitherAB[1]);
		default     : throw 'Invalid `Either` tag';
	}
}

const left  = a => ['left' , a],
      right = b => ['right', b];

const eitherEMap = (fBC, eitherAB) => either(left, b => ['right', fBC(b)], eitherAB);

const maybeToEitherE = (errCode, maybeValue) =>
	maybe(
		left(errCode),
		right,
		maybeValue
	);
