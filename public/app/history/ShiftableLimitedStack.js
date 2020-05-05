function ShiftableLimitedStack(limit)
{
	this.limit = limit;
	this.elems = [];
	this.check();
}

ShiftableLimitedStack.prototype.push = function (elem)
{
	this.check();
	this.elems.push(elem);
	const maybeFall =  this.isOverflown() ? Maybe.just(this.elems.shift()) : Maybe.nothing();
	this.check();
	return maybeFall;
};

ShiftableLimitedStack.prototype.pop = function ()
{
	this.check();
	return !this.isEmpty() ? Maybe.just(this.elems.pop()) : Maybe.nothing();
};

ShiftableLimitedStack.prototype.isFull  = function () {return this.elems.length == this.limit;};
ShiftableLimitedStack.prototype.isEmpty = function () {return this.elems.length == 0         ;};
ShiftableLimitedStack.prototype.isValid = function () {return this.isNatural() && !this.isOverflown();};
ShiftableLimitedStack.prototype.isNatural = function () {return Number.isInteger(this.limit) && this.limit >= 0;};
ShiftableLimitedStack.prototype.isOverflown  = function () {return this.elems.length > this.limit;};
ShiftableLimitedStack.prototype.check   = function () {if (!this.isValid()) throw 'Invalid stack';};
