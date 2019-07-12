function maybe(asNothing, asJust, maybeData)
{
	switch (maybeData[0]) {
		case 'nothing': return asNothing;
		case 'just'   : return asJust(maybeData[1]);
	}
}
