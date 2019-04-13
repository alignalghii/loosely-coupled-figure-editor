function CoordSysTransformerMock(returns_of_highToLow, returns_of_lowToHigh)
{
	Mock.call(this);
	this.returns_of_highToLow = returns_of_highToLow;
	this.returns_of_lowToHigh = returns_of_lowToHigh;
}

CoordSysTransformerMock.prototype = Object.create(Mock.prototype);

CoordSysTransformerMock.prototype.constructor = CoordSysTransformerMock;

CoordSysTransformerMock.prototype.highToLow = function (point)
{
	var result = this.returns_of_highToLow[this.communication.length];
	this.track('highToLow', [point], result);
	return result;
};

CoordSysTransformerMock.prototype.lowToHigh = function (point)
{
	var result = this.returns_of_lowToHigh[this.communication.length];
	this.track('lowToHigh', [point], result);
	return result;
};
