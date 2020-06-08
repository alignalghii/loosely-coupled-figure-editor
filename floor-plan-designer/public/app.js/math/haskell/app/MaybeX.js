function maybe(asNothing, asJust, maybeData)
{
	switch (maybeData[0]) {
		case 'nothing': return asNothing;
		case 'just'   : return asJust(maybeData[1]);
		default       : throw "Invalid `Maybe` label: `" + maybeData[0] + "'";
	}
}

function maybe_exec(asNothing, asJust, maybeData)
{
	switch (maybeData[0]) {
		case 'nothing': return asNothing();
		case 'just'   : return asJust(maybeData[1]);
	}
}

// For monadic laws and reuse:
function just(x) {return ['just', x];}
const nothing = ['nothing'];

function maybeMap(f, mx)   {return maybe(['nothing'], x => ['just', f(x)], mx);}
function maybeBind(mx, mf) {return maybe(['nothing'], mf,                  mx);}
const maybeReturn = just;
const maybeJoin = mmX =>
	maybeBind(
		mmX,
		mX => maybeBind(mX, maybeReturn)
	)

function maybeLoop(f, x)
{
	var maybeXNext = f(x);
	while (maybeXNext[0] == 'just') {
		x = maybeXNext[1];
		maybeXNext = f(x);
	}
	return x;
}

const fromMaybe      = (defaultValue    , mX) => maybe     (defaultValue    , x => x, mX),
      fromMaybe_exec = (defaultConstCall, mX) => maybe_exec(defaultConstCall, x => x, mX);


function fromJust(mbX) {return maybe_exec(() => {throw "`fromJust` error";}, x => x, mbX);}


// const listToMaybe = list => list.length > 0 ? ['just', list[0]] : ['nothing'];
// listToMaybe = foldr (const . Just) Nothing
const listToMaybe = list =>
	skippableReduce(
		(acc, curr) => maybe(rdcCONTINUE(['just', curr]), item => rdcSKIP, acc),
		['nothing'],
		list
	);

const isJust    = mbX => maybe(false, x => true , mbX);
const isNothing = mbX => maybe(true , x => false, mbX);

const catMaybes = mXs => mapMaybe(x=>x, mXs);

const mapMaybe = (mf, xs) =>
	xs.reduce(
		(acc, curr) => acc.concat(
			maybe(
				[],
				y=>[y],
				mf(curr)
			)
		),
		[]
	);

const possiblyFalsyToMaybe = x => x ? just(x) : nothing;

const maybeEq_shallow = (mbX, mbY) =>
	maybe(
		maybe(
			true,
			x => false,
			mbX
		),
		y => maybe(
			false,
			x => x == y,
			mbX
		),
		mbY
	);
