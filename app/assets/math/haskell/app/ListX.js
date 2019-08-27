function descartesProduct(as, bs)
{
	var resultSet = [];
	for (let i = 0; i < as.length; i++)
		for (let j = 0; j < bs.length; j++)
			resultSet.push([as[i], bs[j]]);
	return resultSet;
}

function descartesWith(f, as, bs)
{
	var resultSet = [];
	for (let i = 0; i < as.length; i++)
		for (let j = 0; j < bs.length; j++)
			resultSet.push(f(as[i], bs[j]));
	return resultSet;
}

function consX (a , as) {return [a].concat(as);}
function append(as, bs) {return  as.concat(bs);}

function uncons(lst) {return lst.length > 0 ? ['just', [lst[0], lst.slice(1)]] : ['nothing'];}

const listBind = (list, mfunction) => list.flatMap(mfunction); // list.map(mfunction).flat(); // @TODO: listJoin, @TODO: implement `listBind` directly by `.reduce`

function zipWith(f, as, bs)
{
	var n = Math.min(as.length, bs.length);
	var res = [];
	for (let i = 0; i < n; i++) {
		res.push(f(as[i], bs[i]));
	}
	return res;
}

const zip = (as, bs) => zipWith((a, b) => [a, b], as, bs);

function zip3(as, bs, cs)
{
	var n = Math.min(as.length, bs.length, cs.length);
	var res = [];
	for (let i = 0; i < n; i++) {
		res.push([as[i], bs[i], cs[i]]);
	}
	return res;
}

function flatSubvec(as, bs)
{
	let flag = true;
	for (let i in as) if (!(i in bs) || as[i] != bs[i]) flag = false;
	return flag;
}

const flatVecEq = (as, bs) => flatSubvec(as, bs) && flatSubvec(bs, as);

const maybeFind  = (pred, list) => listToMaybe(list.filter(pred)); // in Haskell, simply `find`, but in JavaScript the `find` name has already been reserved for a native function. :(
const unsafeFind = (pred, list) => fromJust(maybeFind(pred, list));

const homogenityBy_ = (paramEq, list) =>
	skippableReduce_(
		(acc, curr) =>
			maybe(
				[acc, false], // never occurs
				maybeKernel =>
					maybe(
						[['just', ['just', curr]], true],
						kernel => paramEq(curr, kernel) ? [acc        , true ]
						                                : [['nothing'], false],
						maybeKernel
					)
				,
				acc
			)
		,
		['just', ['nothing']],
		list
	);


//const maybeUnambigutyByEq = (paramEq, list) => isHomogenousByEq(paramEq, list) ? listToMaybe(list) : ['nothing'];
const maybeUnambiguityByEq = (paramEq, list) => maybeJoin(homogenityByEq(paramEq, list));


const isHomogenousByEq = (paramEq, list) => isJust(homogenityByEq(paramEq, list));


const skippableReduce_ = (reducer, accumulator, list) =>
{
	let continuable = true;
	for (let i = 0; continuable && i < list.length; i++) {
		[accumulator, continuable] = reducer(accumulator, list[i])
	}
	return accumulator;
}

const skippableReduce =
	(reducer, accumulator, list) =>
	{
		let continuable = true;
		for (let i = 0; continuable && i < list.length; i++) {
			maybe_exec(
				()      => {continuable = false ;},
				newAcc  => {accumulator = newAcc;},
				reducer(accumulator, list[i])
			);
		}
		return accumulator;
	}
     rdcSKIP     = nothing,
     rdcCONTINUE = just;

const homogenityByEq = (paramEq, list) =>
	skippableReduce(
		(acc, curr) => maybe(
			rdcSKIP,
			maybeKernel => maybe(
				rdcCONTINUE(['just', ['just', curr]]),
				kernel => rdcCONTINUE(  paramEq(kernel, curr) ? acc : ['nothing']  ),
				maybeKernel
			),
			acc
		),
		['just', ['nothing']],
		list
	);
