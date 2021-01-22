function SamplingInterval (lower, upper)
{
	this.lower = lower;
	this.upper = upper;
}

SamplingInterval.prototype.sampling = function (step, representative)
{
	const length = this.upper - this.lower;
	const offset = representative % step;
	const n = SamplingInterval.count(length, step);
	return Array.base0(n).map(i => i * step + this.lower + offset);
};

SamplingInterval.count = (a, d) => Math.floor(a / d) + 1;
