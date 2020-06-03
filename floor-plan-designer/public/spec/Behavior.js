function Behavior()
{
	this.nOK  = 0;
	this.nAll = 0;
}

Behavior.prototype.run = function()
{
	var allFlag = true;
	for (let shouldSentenceMethodName in this) {
		if (/^should[a-zA-Z0-9_]+/.test(shouldSentenceMethodName)) {
			flag = this[shouldSentenceMethodName]();
			allFlag = allFlag && flag;
			if (flag) this.nOK++;
			this.nAll++;
		}
	}
	return allFlag;
};

Behavior.prototype.report = function () {return [this.nOK, this.nAll];};
