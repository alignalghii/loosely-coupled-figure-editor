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
