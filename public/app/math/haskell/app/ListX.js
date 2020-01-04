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

const rotListRight1 = list => list.length == 0 ? [] : [list[list.length-1]].concat(list.filter((el, i) => i < list.length-1));

// @TODO move to ListX
function addNonRepItem(item, list)
{
	const allow = !isMember(item, list);
	if (allow) list.push(item);
	return allow;
}

// @TODO move to ListX
function deleteItem(item, list)
{
	const i = list.indexOf(item);
	const exists = i >= 0;
	if (exists) list.splice(i, 1);
	return exists;
}

// @TODO move to ListX
function addNonRepItemByEq(item, list, eq)
{
	const allow = !isMemberByEq(item, list, eq);
	if (allow) list.push(item);
	return allow;
}

// @TODO move to ListX
function deleteItemByEq(item, list, eq)
{
	const i = list.findIndex(curr => eq(item, curr));
	const exists = i >= 0;
	if (exists) list.splice(i, 1);
	return exists;
}

const isMember     = (item, list    ) => list.indexOf(item) >= 0;
const isMemberByEq = (item, list, eq) => list.some(curr => eq(item, curr));

const beMemberIfNotYet     = (item, list    ) => {if (!isMember    (item, list    )) list.push(item);};
const beMemberIfNotYetByEq = (item, list, eq) => {if (!isMemberByEq(item, list, eq)) list.push(item);};

function nonRepeating(list)
{
	const seen = [];
	for (let item of list) {
		if (isMember(item, list)) {
			return false;
		} else {
			seen.push(item);
		}
	}
	return true;
}
