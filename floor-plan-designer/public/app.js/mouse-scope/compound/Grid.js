function Grid(grossWidth, grossHeight, step)
{
	this.grossWidth  = grossWidth;
	this.grossHeight = grossHeight;
	this.step        = step;
}


Grid.prototype.sections = function ()
{
	return this.centeringWidth().map(
		x => [
			[x, -30],
			[x,  30]
		]
	).concat(
		this.centeringHeight().map(
			y => [
				[-50, y],
				[ 50, y]
			]
		)
	);
};


Grid.prototype.countWidth  = function () {return this.count_(this.grossWidth );};
Grid.prototype.countHeight = function () {return this.count_(this.grossHeight);};

Grid.prototype.netWidth  = function () {return this.net_(this.grossWidth );}
Grid.prototype.netHeight = function () {return this.net_(this.grossHeight);};

Grid.prototype.centeringWidth  = function () {return this.centering_(this.grossWidth );};
Grid.prototype.centeringHeight = function () {return this.centering_(this.grossHeight);};

Grid.prototype.count_     = function (a) {return Grid.auxCount    (a, this.step);};
Grid.prototype.net_       = function (a) {return Grid.auxNet      (a, this.step);};
Grid.prototype.centering_ = function (a) {return Grid.auxCentering(a, this.step);};

Grid.auxCount = (a, d) => Math.floor(a / d) + 1;
Grid.auxNet   = (a, d) => Math.floor(a / d) * d;

Grid.auxCentering = (a, d) =>
	Array.base0(
		Grid.auxCount(a, d)
	).map(
		i => i * d - Grid.auxNet(a, d) / 2
	);

