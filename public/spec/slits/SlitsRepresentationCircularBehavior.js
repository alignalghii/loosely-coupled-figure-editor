function SlitsRepresentationCircularBehavior () {}


SlitsRepresentationCircularBehavior.prototype.shouldTestSlitsRepresentationCircularBehavior = function ()
{
	return true &&
	this.shouldCheck_valid  () &&
	this.shouldCheck_invalid() &&
	this.shouldValid_valid  () &&
	this.shouldValid_invalid() &&
	true;
};



SlitsRepresentationCircularBehavior.prototype.shouldCheck_valid = function ()
{
	let flag = true;
	try {
		let slitsRepresentationCircular1 = new SlitsRepresentationCircular(16, [{center: 2, radius: 1}, {center: 6, radius: 1}, {center: 10, radius: 1}, {center: 14, radius: 1}], 0.1);
	} catch (e) {
		this.rethrowWhenForeignError(e); // @TODO I should plan my own exception class(es)
		flag = false;
	}
	return flag;
};

SlitsRepresentationCircularBehavior.prototype.shouldCheck_invalid = function ()
{
	let flag = true;
	try {
		let slitsRepresentationCircular1 = new SlitsRepresentationCircular(16, [{center: 2, radius: 3}, {center: 6, radius: 1}, {center: 10, radius: 1}, {center: 14, radius: 3}], 0.1);
	} catch (e) {
		this.rethrowWhenForeignError(e); // @TODO I should plan my own exception class(es)
		flag = false;
	}
	return !flag;
};

SlitsRepresentationCircularBehavior.prototype.shouldValid_valid = function ()
{
	let slitsRepresentationCircular1 = new SlitsRepresentationCircular(16, [], 0.1);
	slitsRepresentationCircular1.centerRadiusPairs = [{center: 2, radius: 1}, {center: 6, radius: 1}, {center: 10, radius: 1}, {center: 14, radius: 1}];
	return slitsRepresentationCircular1.isValid();
};

SlitsRepresentationCircularBehavior.prototype.shouldValid_invalid = function ()
{
	let slitsRepresentationCircular1 = new SlitsRepresentationCircular(16, [], 0.1);
	slitsRepresentationCircular1.centerRadiusPairs = [{center: 2, radius: 3}, {center: 6, radius: 1}, {center: 10, radius: 1}, {center: 14, radius: 3}];
	return !slitsRepresentationCircular1.isValid();
};


SlitsRepresentationCircularBehavior.prototype.homeError               = e => typeof e == 'string' && e == SlitsRepresentationCircular.prototype.errorMsg();
SlitsRepresentationCircularBehavior.prototype.rethrowWhenForeignError = function (e) {if (!this.homeError(e)) throw e;};
