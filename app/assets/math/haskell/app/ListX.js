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

function zipWith(f, as, bs)
{
	var n = Math.min(as.length, bs.length);
	var res = [];
	for (let i = 0; i < n; i++) {
		res.push(f(as[i], bs[i]));
	}
	return res;
}
