function maybeReachEndPoint(startPoint, vectors, fuel) // @TODO put this global function into a math, vector or geom module
{
	if (fuel < 0) throw 'Negative fuel';
	let sumVecLengths = 0, steppingPoint = Array.from(startPoint), isReady = false;
	for (let vector of vectors) {
		const d = vectorLength(vector);
		if (sumVecLengths + d > fuel) {
			doAddVec(steppingPoint, slantScale((fuel - sumVecLengths) / d, vector));
			isReady = true;
			break;
		} else if (sumVecLengths + d == fuel) {
			doAddVec(steppingPoint, vector);
			isReady = true;
			break;
		} else {
			sumVecLengths += d;
			doAddVec(steppingPoint, vector);
		}
	}
	return isReady ? just(steppingPoint) : nothing;
}
