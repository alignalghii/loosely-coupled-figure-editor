function LimitedStack(limit)
{
	this.limit = limit;
	this.elems = [];
	this.check();
}

LimitedStack.prototype.push = function (elem)
{
	this.check();
	if (!this.isFull()) {
		this.elems.push(a);
		true;
	} else {
		return false;
	}
}

LimitedStack.prototype.pop = function ()
{
	this.check();
	if (!this.isEmpty()) {
		return Maybe.just(this.elems.pop());
	} else {
		return Maybe.nothing();
	}
};

LimitedStack.prototype.isFull  = function () {return this.elems.length == this.limit;};
LimitedStack.prototype.isEmpty = function () {return this.elems.length == 0         ;};
LimitedStack.prototype.isValid = function () {return 0 <= this.elems.length && this.elems.length <= this.limit;};
LimitedStack.prototype.check   = function () {if (!this.isValid()) throw 'Invalid stack';};
