function LogicBehavior() {}

LogicBehavior.prototype.shouldAll = function ()
{
	return true &&
	 all(x => x > 0, []) &&
	 all(x => x > 0, [5]) &&
	 all(x => x > 0, [5, 7]) &&
	 all(x => x > 0, [5, 7, 92]) &&
	!all(x => x > 0, [5, 7, -3, 92]) &&
	!all(x => x > 0, [-5]) &&
	true;
};

LogicBehavior.prototype.shouldAny = function ()
{
	return true &&
	!any(x => x > 0, [               ]) &&
	 any(x => x > 0, [ 5             ]) &&
	 any(x => x > 0, [ 5,  7         ]) &&
	 any(x => x > 0, [ 5,  7,      92]) &&
	 any(x => x > 0, [ 5,  7, -3,  92]) &&
	 any(x => x > 0, [ 5,  7, -3, -92]) &&
	 any(x => x > 0, [ 5, -7, -3, -92]) &&
	!any(x => x > 0, [-5, -7, -3, -92]) &&
	!any(x => x > 0, [-5             ]) &&
	true;
};

LogicBehavior.prototype.shouldNone = function ()
{
	return true &&
	 none(x => x > 0, [               ]) &&
	!none(x => x > 0, [ 5             ]) &&
	!none(x => x > 0, [ 5,  7         ]) &&
	!none(x => x > 0, [ 5,  7,      92]) &&
	!none(x => x > 0, [ 5,  7, -3,  92]) &&
	!none(x => x > 0, [ 5,  7, -3, -92]) &&
	!none(x => x > 0, [ 5, -7, -3, -92]) &&
	 none(x => x > 0, [-5, -7, -3, -92]) &&
	 none(x => x > 0, [-5             ]) &&
	true;
}
