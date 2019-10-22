function NumberHelperAndValidator(nDecimals) {this.nDecimals = nDecimals;}

NumberHelperAndValidator.prototype.show = function (n)
{
	const q  = 10 ** this.nDecimals,
	      n_ = Math.round(n * q) / q;
	return Number(n_).toLocaleString('hu-HU');
};

NumberHelperAndValidator.prototype.maybeRead = function (s)
{
	const s2 = s .replace(/\s+/g, '');
	const s3 = s2.replace(',', '.');
	return /^[\+\-]?\d+(\.\d+)?$/.test(s3) ? ['just', Number(s3)] : ['nothing'];
};

NumberHelperAndValidator.prototype.eitherERead = function (errMsg, inputStr)
{
	return maybeToEitherE(
		errMsg,
		this.maybeRead(inputStr)
	);
};

NumberHelperAndValidator.prototype.eitherRawNat = raw => /^\d+$/.test(raw) ? right(Number(raw)) : left(raw);

NumberHelperAndValidator.prototype.readToMaybeEitherRawNat = function (raw)
{
	const word = raw.replace(/\s+/g, '');
	return word.length > 0 ? just(
	                               /^\d+$/.test(word) ? right(Number(word))
	                                                  : left (raw         )
	                         )
	                       : nothing;
};
