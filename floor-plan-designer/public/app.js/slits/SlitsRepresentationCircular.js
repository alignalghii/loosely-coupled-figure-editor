function SlitsRepresentationCircular(perimeter, circularSlits, maybeMinimalAllowedDistance = just(0), valueCheckOptionFlag = true, autoSort = true) // @TODO use check, but integrate it well
{
	this.perimeter                   = perimeter;
	this.circularSlits               = circularSlits; // <center, radius> pairs
	this.maybeMinimalAllowedDistance = maybeMinimalAllowedDistance;
	this.valueCheckOptionFlag        = valueCheckOptionFlag;
	this.autoSort                    = autoSort;

	this.distanceCheck();
	if (this.valueCheckOptionFlag) this.valueCheck(); // cache-based optimization
	if (this.autoSort            ) this.sort();
}

SlitsRepresentationCircular.prototype.distanceCheck = function () {if (!this.isDistanceValid() && Global.fatal_error_sensitivity >= Global.consts.paranoid) throw this.errorMsg();}; // @TODO
SlitsRepresentationCircular.prototype.valueCheck = function () {if (!this.isValueValid() && Global.fatal_error_sensitivity >= Global.consts.paranoid) throw this.errorMsg();}; // @TODO

SlitsRepresentationCircular.prototype.isDistanceValid = function ()
{
	return maybe(
		true,
		minimalAllowedDistance => this.isDistanceValidWith(minimalAllowedDistance),
		this.maybeMinimalAllowedDistance
	);
};

SlitsRepresentationCircular.prototype.isDistanceValidWith = function (minimalAllowedDistance)
{
	const circularSlits = this.circularSlits;
	for (let circularSlit1 of circularSlits) {
		for (let circularSlit2 of circularSlits) {
			if (circularSlit1 != circularSlit2) {
				if (circularSlit1.distance(circularSlit2) < minimalAllowedDistance) {
					return false;
				}
			}
		}
	}
	return true;
};

SlitsRepresentationCircular.prototype.isValueValid = function ()
{
	for (let circularSlit of this.circularSlits)
		if (!circularSlit.isValidWith(this.perimeter))
			return false;
	return true;
};

SlitsRepresentationCircular.prototype.normalize = function () {this.circularSlits.map(circularSlit => circularSlit.normalizeWith(this.perimeter))};
SlitsRepresentationCircular.prototype.sort = function () {this.circularSlits.sort((cs1, cs2) => cs1.compare(cs2));}; // cache-based optimization


SlitsRepresentationCircular.prototype.intervals       = function () {return this.circularSlits.map(circularSlit => circularSlit.interval());};
SlitsRepresentationCircular.prototype.mergedIntervals = function () {return Interval.prototype.union(this.intervals());};
SlitsRepresentationCircular.prototype.dasharrayHigh = function ()
{
	const dasharray = [];
	let origin = 0;
	for (let slitInterval of this.mergedIntervals()) {
		dasharray.push(slitInterval.a - origin);
		dasharray.push(slitInterval.length());
		origin = slitInterval.b;
	}
	dasharray.push(this.perimeter - origin);
	return dasharray;
};
SlitsRepresentationCircular.prototype.dasharrayWith = function (q) {return this.dasharrayHigh().map(r => r * q);};

SlitsRepresentationCircular.prototype.doScale = function (q) {this.perimeter *= q; this.circularSlits.map(cs => cs.doScale(q));};


SlitsRepresentationCircular.prototype.errorMsg = () => 'Invalid slits arrangement!';

SlitsRepresentationCircular.prototype.addCircularSlit = function (cs) {this.circularSlits.push(cs); this.sort();};

SlitsRepresentationCircular.prototype.next = function (i) {return (Number(i) + 1) % this.circularSlits.length;};

SlitsRepresentationCircular.prototype.slitCalculations = function (origin, vectors)
{
	return this.circularSlits.map(
		circularSlit => ({
			slit : circularSlit,
			maybePosition: maybeReachEndPoint(origin, vectors, circularSlit.center)
		})
	);
};

SlitsRepresentationCircular.prototype.slitCalculationsAbbrev = function (origin, vectors)
{
	return mapMaybe(
		circularSlit => maybeMap(
			position => ({
				slit    : circularSlit,
				position: position
			}),
			maybeReachEndPoint(origin, vectors, circularSlit.center)
		),
		this.circularSlits
	);
};
