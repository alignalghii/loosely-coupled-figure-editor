function boardReduce(reducer, initialValue, board)
{
	var accumulator = initialValue;
	for (let currentValue of board.range()) {
		accumulator = reducer(accumulator, currentValue);
	}
	return accumulator;
}

function boardMin(filterPred, mapFun, parametricLt, posInf, board)
{
	function reducer(accumulator, currentItem) {
		if (filterPred(currentItem)) {
			let currentValue = mapFun(currentItem);
			return parametricLt(currentValue, accumulator) ? currentValue : accumulator;
		} else {
			return accumulator;
		}
	}
	return boardReduce(reducer, posInf, board);
}

// Optimizated special implementations for reduction (partial, lazy evaluation):

function boardAll(predicate, board)
{
	for (let currentValue of board.range()) {
		if (!predicate(currentValue)) return false;
	}
	return true;
}

function boardAny(predicate, board)
{
	for (let currentValue of board.range()) {
		if (predicate(currentValue)) return true;
	}
	return false;
}
