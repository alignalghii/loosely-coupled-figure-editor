function DistanceHenceBehavior () {}

DistanceHenceBehavior.prototype.shouldTestDistanceHenceBehavior = function () {return this.shouldDistancePointHence() && this.shouldDistanceLineHence() && this.shouldDistanceSegmentHence();};


DistanceHenceBehavior.prototype.shouldDistancePointHence = () =>
	distancePointHence([4.5, 4], [4.5, 4]) == 0   &&
	distancePointHence([4.5, 4], [6  , 6]) == 2.5 &&
	distancePointHence([4.5, 4], [8.5, 7]) == 5   &&
	true;

DistanceHenceBehavior.prototype.shouldDistanceLineHence = () =>
	distanceLineHence([4, 3, 30], [4.5, 4]) == 0 &&
	distanceLineHence([4, 3, 30], [8.5, 7]) == 5 &&
	true;

DistanceHenceBehavior.prototype.shouldDistanceSegmentHence = () =>
	distanceSegmentHence([[4.5, 4], [6, 2]], [6  , 6]) == 2.5 &&
	distanceSegmentHence([[4.5, 4], [6, 2]], [8.5, 7]) == 5   &&
	true;
