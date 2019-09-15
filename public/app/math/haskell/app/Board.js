function boardReduce(reducer, initialValue, board)
{
	var accumulator = initialValue;
	for (let currentValue of board.range()) {
		if (isJust(currentValue.isCollidable())) // @TODO OOP polymorphism @TODO raise level in module hierarchy
			accumulator = reducer(accumulator, currentValue);
	}
	return accumulator;
}

const boardMap_unopt = (mapper, board) => boardReduce(
	(acc, curr) => acc.concat([mapper(curr)]),
	[],
	board
);

// Optimizated special implementations for reduction (partial, lazy evaluation):

function boardMap_opt(mapper, board)
{
	const results = [];
	for (let currentValue of board.range()) {
		if (isJust(currentValue.isCollidable())) // @TODO raise level in module hierarchy
			results.push(mapper(currentValue));
	}
	return results;
}

function boardAll(predicate, board)
{
	for (let currentValue of board.range()) {
		if (isJust(currentValue.isCollidable())) // @TODO OOP polymorphism @TODO raise level in module hierarchy
			if (!predicate(currentValue)) return false;
	}
	return true;
}

function boardAny(predicate, board)
{
	for (let currentValue of board.range()) {
		if (isJust(currentValue.isCollidable())) // @TODO OOP polymorphism @TODO raise level in module hierarchy
			if (predicate(currentValue)) return true;
	}
	return false;
}
