function EdgePushBehavior() {}

EdgePushBehavior.prototype.shouldTestEdgePushBehavior = function () {return this.shouldPushEdge();};

EdgePushBehavior.prototype.shouldPushEdge = () =>
	true &&
	treeEq( // 0th
		pushEdge(
			[1000, 1000],
			[[0, 0], [9, 0], [8, 3], [2, 3]],
			[[0, 0], [9, 0]]
		),
		[[0, 0], [9, 0], [8, 3], [2, 3]]
	) &&
	treeEq( // 1st
		pushEdge(
			[1000, 1000],
			[[0, 0], [9, 0], [8, 3], [2, 3]],
			[[9, 0], [8, 3]]
		),
		[[0, 0], [1009, 0], [1008, 3], [2, 3]]
	) &&
	treeEq( // 2nd
		pushEdge(
			[1000, 1000],
			[[0, 0], [9, 0], [8, 3], [2, 3]],
			[[8, 3], [2, 3]]
		),
		[[0, 0], [9, 0], [8, 3], [2, 3]]
	) &&
	treeEq( // 3rd
		pushEdge(
			[1000, 1000],
			[[0, 0], [9, 0], [8, 3], [2, 3]],
			[[2, 3], [0, 0]]
		),
		[[1000, 0], [9, 0], [8, 3], [1002, 3]]
	) &&
	true;
