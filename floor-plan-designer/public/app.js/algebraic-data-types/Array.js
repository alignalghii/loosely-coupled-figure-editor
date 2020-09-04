// @credit to https://stackoverflow.com/questions/948358/adding-custom-functions-into-array-prototype
// @ TODO: Is it an acceptible practice?

Object.defineProperty(
	Array.prototype,
	'maybeFindFirst',
	{
		value:
			function (property)
			{
				for (let member of this) {
					if (property(member)) {
						return Maybe.just(member);
					}
				}
				return Maybe.nothing();
			}
	}
);

Object.defineProperty(
	Array.prototype,
	'maybeHeadPair',
	{
		value:
		function () {
			return Maybe.ifTrue_lazy(
				this.length >= 2,
				() => new Pair(this[0], this[1])
			);
		}
	}
);
