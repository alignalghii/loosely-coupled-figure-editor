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

Object.defineProperty(
	Array.prototype,
	'maybeFindMinMeasurement', // [a] -> (a -> number) -> Maybe (a, number)
	{
		value:
		function (measure)
		{
			return this.reduce(
				(maybeMinMeasurement, currentValue, currentIndex) => new Measurement(
					currentValue,
					measure(currentValue),
					currentIndex
				).min_bias2_posInf(maybeMinMeasurement),
				Maybe.nothing() // positive infinity as start value of accumulator
			);
		}
	}
);

Object.defineProperty(
	Array.prototype,
	'maybeFindOnMeasureMin', // [a] -> (a -> number) -> Maybe a
	{
		value:
		function (measure)
		{
			return this.maybeFindMinMeasurement(
				measure
			).map(
				minMeasurement => minMeasurement.who
			);
		}
	}
);

Object.defineProperty(
	Array.prototype,
	'maybeFindIndexOnMeasureMin', // [a] -> (a -> number) -> Maybe index
	{
		value:
		function (measure)
		{
			return this.maybeFindMinMeasurement(
				measure
			).map(
				minMeasurement => minMeasurement.where
			);
		}
	}
);
