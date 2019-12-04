function Interval (a, b)
{
	if (a > b) throw 'Interval inconsistence';
	this.a = a;
	this.b = b;
}

Interval.prototype.length = function () {return this.b - this.a;};

Interval.prototype.isDisjointFrom = function (iv) {return this.b <  iv.a || this.a >  iv.b;};

Interval.prototype.isMergebleWith = function (iv) {return this.b >= iv.a && this.a <= iv.b;};

Interval.prototype.maybeMergeWith = function (iv) {return this.isMergebleWith(iv) ? just(new Interval(Math.min(this.a, iv.a), Math.max(this.b, iv.b))) : nothing;};

Interval.prototype.union = function (intervals) // class method
{
	const formers = [];
	while (intervals.length > 0) {
		let candidate = intervals.shift();
		for (let i = 0; i < formers.length; i++) {
			if (formers[i]) {
				maybeMap(
					merged => {
						formers[i] = null;
						candidate = merged;
					},
					formers[i].maybeMergeWith(candidate)
				);
			}
		}
		formers.push(candidate);
	}
	return formers.filter(interval => interval);
};
