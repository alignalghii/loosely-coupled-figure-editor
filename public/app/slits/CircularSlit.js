function CircularSlit(center, radius)
{
	this.center = center;
	this.radius = radius;
	if (!this.isValid()) throw 'Error';
}

CircularSlit.prototype.distance = function (cs) {return Math.abs(cs.center - this.center) - (cs.radius + this.radius);};
CircularSlit.prototype.isValid = function () {return this.radius > 0;};
CircularSlit.prototype.isValidWith = function (perimeter) {return 0 <= this.center && this.center <= perimeter;};

CircularSlit.prototype.compare = function (cs) {return this.center - cs.center;};

CircularSlit.prototype.normalizeWith = function (perimeter)
{
	if (perimeter <= 0) throw 'Invalid perimeter';
	while (!(0 <= this.center && this.center <= perimeter)) {
		if (this.center < 0        ) this.center += perimeter;
		if (this.center > perimeter) this.center -= perimeter;
	}
};

CircularSlit.prototype.interval = function () {return new Interval(this.center - this.radius, this.center + this.radius);};

CircularSlit.prototype.doScale = function (q) {this.center *= q; this.radius *= q;};
