function maybe(asNothing, asJust, maybeData)
{
	switch (maybeData[0]) {
		case 'nothing': return asNothing;
		case 'just'   : return asJust(maybeData[1]);
	}
}

function maybe_f0(asNothing, asJust, maybeData)
{
	switch (maybeData[0]) {
		case 'nothing': return asNothing();
		case 'just'   : return asJust(maybeData[1]);
	}
}

// For monadic laws and reuse:
function just(x) {return ['just', x];}
function maybeMap(f, mx)   {return maybe(['nothing'], x => ['just', f(x)], mx);}
function maybeBind(mx, mf) {return maybe(['nothing'], mf,                  mx);}

function maybeLoop(f, x)
{
	var maybeXNext = f(x);
	while (maybeXNext[0] == 'just') {
		x = maybeXNext[1];
		maybeXNext = f(x);
	}
	return x;
}

function fromJust(mbX) {return maybe_f0(() => {throw "`fromJust` error";}, x => x, mbX);}
