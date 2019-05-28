function maybeMap(f, maybeData)
{
	switch (maybeData[0]) {
		case 'just'   : return ['just', f(maybeData[1])];
		case 'nothing': return ['nothing'];
	}
}

function compareLengthForMin (acc, curr)
{
	if (acc[0] == 'nothing'                        ) return curr;
	if (acc[0] == 'just'    && curr[0] == 'nothing') return acc ;
	if (acc[0] == 'just'    && curr[0] == 'just'   ) return vectorLength(curr[1]) < vectorLength(acc[1]) ? curr : acc;
}

function compareLengthForLessThan (acc, curr)
{
	if (acc[0] == 'nothing'                        ) return false;
	if (acc[0] == 'just'    && curr[0] == 'nothing') return true ;
	if (acc[0] == 'just'    && curr[0] == 'just'   ) return vectorLength(acc[1]) < vectorLength(curr[1]);
}

function compareLengthForLeqThan (acc, curr)
{
	if (acc[0] == 'nothing'                        ) return false;
	if (acc[0] == 'just'    && curr[0] == 'nothing') return true ;
	if (acc[0] == 'just'    && curr[0] == 'just'   ) return vectorLength(acc[1]) <= vectorLength(curr[1]);
}

function leqThanPossibleInfinitelyDistant(vector, possibleInfinitelyDistant)
{
	if (possibleInfinitelyDistant[0] == 'nothing') return true;
	if (possibleInfinitelyDistant[0] == 'just'   ) return vectorLength(vector) <= vectorLength(possibleInfinitelyDistant[1]);
}

function lessThanPossibleInfinitelyDistant(vector, possibleInfinitelyDistant)
{
	if (possibleInfinitelyDistant[0] == 'nothing') return true;
	if (possibleInfinitelyDistant[0] == 'just'   ) return vectorLength(vector) <  vectorLength(possibleInfinitelyDistant[1]);
}
