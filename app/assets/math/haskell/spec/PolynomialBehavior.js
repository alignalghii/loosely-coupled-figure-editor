function PolynomialBehavior () {}

PolynomialBehavior.prototype.shouldTestPolynomialBehavior = function() {return this.shouldPolynomialGrad();};

PolynomialBehavior.prototype.shouldPolynomialGrad = function ()
{
	return true &&
	vecEq(polynomialGrad([]), ['left', false]) && // let grad of 0 polynom be negative infinity

	vecEq(polynomialGrad([17]), ['right', 0]) && // a finite non-0 polynom's grad is its length minus one
	vecEq(polynomialGrad([17, 45]), ['right', 1]) &&
	vecEq(polynomialGrad([17, 45, 88]), ['right', 2]) &&
	vecEq(polynomialGrad([17, 45, 88, 32]), ['right', 3]) &&

	vecEq(polynomialGrad([17, 45, 88, 32, 'power_series']), ['left', true]) && // a power series is a positive infinite grad polynom
	true;
};
