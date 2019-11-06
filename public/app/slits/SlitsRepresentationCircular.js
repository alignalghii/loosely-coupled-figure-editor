function SlitsRepresentationCircular(perimeter, centerRadiusPairs, minimalAllowedDistance)
{
	this.perimeter              = perimeter;
	this.centerRadiusPairs      = centerRadiusPairs;
	this.minimalAllowedDistance = minimalAllowedDistance;
	this.check();
}

SlitsRepresentationCircular.prototype.check = function () {if (!this.isValid()) throw this.errorMsg();};

SlitsRepresentationCircular.prototype.isValid = function ()
{
	const centerRadiusPairs = this.centerRadiusPairs,
	      n                 = centerRadiusPairs.length;
	for (let i in centerRadiusPairs)// console.log(i, typeof i, centerRadiusPairs[i], this.next(i), centerRadiusPairs[this.next(i)]);
		if (Math.abs(centerRadiusPairs[this.next(i)].center - centerRadiusPairs[i].center) < centerRadiusPairs[this.next(i)].radius + this.centerRadiusPairs[i].radius + this.minimalAllowedDistance)
			return false;
	return true;
};

SlitsRepresentationCircular.prototype.errorMsg = () => 'Invalid slits arrangement!';

SlitsRepresentationCircular.prototype.next = function (i) {return (Number(i) + 1) % this.centerRadiusPairs.length;};
