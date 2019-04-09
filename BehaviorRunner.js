function BehaviorRunner(groupings = [])
{
	this.groupings = groupings;
	this.grOK      = 0;
	this.grAll     = 0;
}

BehaviorRunner.prototype.run = function ()
{
	var that = this;
	this.groupings.forEach(function (grouping) {that.processGrouping(grouping);}); // (grouping) => this.processGrouping(grouping)
	this.report();
};

BehaviorRunner.prototype.processGrouping = function (grouping)
{
	function runModules(modules)
	{
		function andRun(allFlag, moduleConstructor)
		{
			var module = new moduleConstructor();
			var flag = module.run();
			console.log(' - ' + module.nOK + '/' + module.nAll);
			return allFlag && flag;
		}
		return modules.reduce(andRun, true);
	}
	let flag = runModules(grouping.modules);
	console.log(grouping.id + ': ' + (flag ? 'OK' : 'Wrong'));
	this.count(flag);
}

BehaviorRunner.prototype.count = function (flag)
{
	if (flag) this.grOK++;
	this.grAll++;
}

BehaviorRunner.prototype.report = function () {console.log('' + this.grOK + '/' + this.grAll + '');}
