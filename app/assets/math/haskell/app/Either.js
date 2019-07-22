function either(funLeft, funRight, eitherAB)
{
	switch (eitherAB[0]) {
		case 'left' : return funLeft (eitherAB[1]);
		case 'right': return funRight(eitherAB[1]);
		default     : throw 'Invalid `Either` tag';
	}
}
