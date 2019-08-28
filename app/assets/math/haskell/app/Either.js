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

const eitherAMap = (fBC, eitherAB) => either(left, b => ['right', fBC(b)], eitherAB);
