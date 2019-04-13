function CoordSysTransformerMock(returns_of_highToLow)
{
	Mock.call(this);
	this.returns_of_highToLow = returns_of_highToLow;
}

CoordSysTransformerMock.prototype = Object.create(Mock.prototype);

CoordSysTransformerMock.prototype.constructor = CoordSysTransformerMock;

CoordSysTransformerMock.prototype.highToLow = function (point)
{
	var result = this.returns_of_highToLow[this.communication.length];
	this.track('highToLow', [point], result);
	return result;
};
