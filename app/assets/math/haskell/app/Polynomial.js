function polynomialGrad(polynomial)
{
	if (polynomial.length > 0) {
		const lastIndex = polynomial.length - 1;
		      lastValue = polynomial[lastIndex];
		return lastValue != 'power_series' ? ['right', lastIndex] // a finite non-0 polynom's grad is its length minus one 
	                                           : ['left' , true     ] // a power series is a positive infinite grad polynom
	} else {
		return ['left', false];                                   // let grad of 0 polynom be negative infinity
	}
}
