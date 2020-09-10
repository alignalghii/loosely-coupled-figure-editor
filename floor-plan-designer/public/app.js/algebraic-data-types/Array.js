// @credit to https://stackoverflow.com/questions/948358/adding-custom-functions-into-array-prototype
// @ TODO: Is it an acceptible practice?

Object.defineProperty(
	Array.prototype,
	'maybeAt',
	{
		value:
		function (i)
		{
			return Maybe.ifTrue_lazy(
				i in this,
				() => this[i]
			);
		}
	}
);

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


/** Measure finders based on mimimazing a measure:
 * extensional finder: (a -> Bool) -> [a] -> index/reference. We wil use this to select widgets (ref indentity is important)
 * intensional finder: (a -> Bool) -> [a] -> a . Copy value is enough. We can use that to select the two nearmost sides of the polygon pair.
 */

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
