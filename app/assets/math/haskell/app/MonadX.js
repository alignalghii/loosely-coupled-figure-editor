function MonadX (mMap, mReturn, mBind)
{
	this.mMap    = mMap;
	this.mReturn = mReturn;
	this.mBind   = mBind;
}

MonadX.prototype.mLoopN = function (n, f, x)
{
	var mx = this.mReturn(x);
	for (let i = 0; i < n; i++) {
		mx = this.mBind(mx, f);
	}
	return mx;
};
