function all (predicate, list) {return list.every(predicate);}
function any (predicate, list) {return list.some (predicate);}
function none(predicate, list) {return list.every(x => !predicate(x));}
