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
