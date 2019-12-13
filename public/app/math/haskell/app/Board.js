function boardReduceColliding(reducer, initialValue, board)
{
	var accumulator = initialValue;
	for (let currentValue of board.range()) {
		if (isJust(currentValue.isCollidable_())) // @TODO OOP polymorphism @TODO raise level in module hierarchy
			accumulator = reducer(accumulator, currentValue);
	}
	return accumulator;
}

const boardMapColliding_unopt = (mapper, board) => boardReduceColliding(
	(acc, curr) => acc.concat([mapper(curr)]),
	[],
	board
);

// Optimizated special implementations for reduction (partial, lazy evaluation):

const boardMap_opt = (mapper, board) =>
{
	const results = [];
	for (let currentValue of board.range()) {
		results.push(mapper(currentValue));
	}
	return results;
}

function boardMapFilter_opt(maybeMapper, board)
{
	const results = [];
	for (let currentValue of board.range()) {
		maybeMap(
			result => results.push(result),
			maybeMapper(currentValue)
		);
	}
	return results;
}

const boardMapColliding_opt = (mapper, board) =>
	boardMapFilter_opt(
		currentValue => maybeMap(
			_ => mapper(currentValue),
			currentValue.isCollidable_()
		),
		board
	);

const boardMapFigural_opt = (mapper, board) =>
	boardMapFilter_opt(
		currentValue => maybeMap(
			_ => mapper(currentValue),
			possiblyFalsyToMaybe(currentValue.constructor.name != 'Title') // @TODO OOP polymorphism, or duck typing: `currentCalue.vertices` (exists)
		),
		board
	);

function boardAll(predicate, board)  // @TODO this function os used nowhere @TODO define and reuse `boardAny`
{
	for (let currentValue of board.range()) {
		if (!predicate(currentValue)) return false;
	}
	return true;
}

const boardAllColliding = (predicate, board) =>
	boardAll(
		currentValue => isNothing(currentValue.isCollidable_()) || predicate(currentValue), // @TODO isJust(currentValue.isCollidable_()) -> predicate(currentValue) 
		board
	);

function boardAny(predicate, board)
{
	for (let currentValue of board.range()) {
		if (predicate(currentValue)) return true;
	}
	return false;
}

const boardAnyColliding = (predicate, board) =>
	boardAny(
		currentValue => isJust(currentValue.isCollidable_()) && predicate(currentValue),
		board
	);
