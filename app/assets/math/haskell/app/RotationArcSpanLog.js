function RotationArcSpanLog(arcCalculator, [A, O, A_], figRefAngle, maybeVain)
{
	this.AOA_ = arcCalculator(A, O, A_);
	[this.A, this.O, this.A_] = [A, O, A_];
	this.figRefAngle = figRefAngle,
	this.maybeVain = maybeVain;
}

RotationArcSpanLog.prototype.message = function ()
{
	const {AOA_: AOA_, figRefAngle: figRefAngle, O: O, A: A, A_: A_, maybeVain: maybeVain} = this;
	return maybe(
		vecEq(A, A_) ? formatVectorsAndConverseToDegree`Kifeszítendő AOA'∡ forgatásív irányszöge: ${AOA_} [ref: ${figRefAngle}] (O: ${O}, A, A': ${A})`
		             : formatVectorsAndConverseToDegree`Kifeszítendő AOA'∡ forgatásív irányszöge: ${AOA_} [ref: ${figRefAngle}] (O: ${O}, A: ${A}, A': ${A_})`,
		vain => formatVectorsAndConverseToDegree`Kifeszítendő AOA'∡ forgatásív irányszöge: ${AOA_} (+ ${vain} sikertelen) [ref: ${figRefAngle}] (O: ${O}, A: ${A}, A': ${A_}). Ütközés, esetleges visszapattanással!`,
		maybeVain
	);
};


// @TODO: global function!
function formatVectorsAndConverseToDegree(strings, ...vecs)
{
	var msg = '';
	for (let i in vecs) {
		const expr = (typeof vecs[i] == 'number') ? vecs[i] * 180 / Math.PI + '°' : JSON.stringify(vecs[i]);
		msg += strings[i] + expr;
	}
	return msg + strings[vecs.length];
}
