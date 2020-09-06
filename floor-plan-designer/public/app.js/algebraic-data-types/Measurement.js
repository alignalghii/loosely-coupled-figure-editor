function Measurement(who, howMuch, where)
{
	this.who     = who;
	this.howMuch = howMuch;
	this.where   = where;
}

Measurement.prototype.leq = function (otherMeasurement) {return this.howMuch <= otherMeasurement.howMuch;};
Measurement.prototype.lt  = function (otherMeasurement) {return this.howMuch <  otherMeasurement.howMuch;};
Measurement.prototype.min_bias1 = function (otherMeasurement) {return this.leq(otherMeasurement) ? this : otherMeasurement;};
Measurement.prototype.min_bias2 = function (otherMeasurement) {return this.lt (otherMeasurement) ? this : otherMeasurement;};

Measurement.prototype.leq_posInf = function (maybeOtherMeasurement)
{
	return maybeOtherMeasurement.maybe_val(
		true,
		otherMeasurement => this.leq(otherMeasurement)
	);
};
Measurement.prototype.lt_posInf = function (maybeOtherMeasurement)
{
	return maybeOtherMeasurement.maybe_val(
		true,
		otherMeasurement => this.lt(otherMeasurement)
	);
};
Measurement.prototype.min_bias1_posInf = function (maybeOtherMeasurement) {return this.leq_posInf(maybeOtherMeasurement) ? Maybe.just(this) : maybeOtherMeasurement;};
Measurement.prototype.min_bias2_posInf = function (maybeOtherMeasurement) {return this.lt_posInf (maybeOtherMeasurement) ? Maybe.just(this) : maybeOtherMeasurement;};
