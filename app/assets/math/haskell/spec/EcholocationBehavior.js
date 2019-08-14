function EcholocationBehavior () {}

EcholocationBehavior.prototype.shouldTestEcholocationBehavior = function () {return this.shouldBoardEcholocationHence() && this.shouldBoardMinimalEcholocationHence() && this.shouldReshapeEchosForMinimalDistanceIfAny() && this.shouldMaybeMinimalDistanceOfEchos() && this.shouldReshapeEchosForDistance() && this.shouldReshapeEchosDroppingDistances() && this.shouldSelectEchosForDistance();};


EcholocationBehavior.prototype.shouldBoardEcholocationHence = () =>
{
	const board = new Bijection;
	const flag0 = vecEq(boardEcholocationHence(board, [4.5, 4]), []);

	const fig1 = new Figure([[0, -2], [9, -2], [0, 10]]);
	board.set(null, fig1);
	const res1a = boardEcholocationHence(board, [4.5, 4])
	      res1b = boardEcholocationHence(board, [8.5, 7]);
	const flag1a = res1a.length == 1 && res1a[0].figure == fig1 && treeEq(res1a[0].reverberations, [
	                                                                                      {edge: [[0, -2], [9, -2]], distance: 6  },
	                                                                                      {edge: [[9, -2], [0, 10]], distance: 0  },
	                                                                                      {edge: [[0, 10], [0, -2]], distance: 4.5}
	                                                                                  ]),
	      flag1b = res1b.length == 1 && res1b[0].figure == fig1 && treeEq(res1b[0].reverberations, [
	                                                                                      {edge: [[0, -2], [9, -2]], distance: 9  },
	                                                                                      {edge: [[9, -2], [0, 10]], distance: 5  },
	                                                                                      {edge: [[0, 10], [0, -2]], distance: 8.5}
	                                                                                  ]);
	return flag0 && flag1a && flag1b;
};

EcholocationBehavior.prototype.shouldBoardMinimalEcholocationHence = () =>
{
	const board = new Bijection;
	const flag0 = vecEq(boardMinimalEcholocationHence(board, [4.5, 4]), ['nothing']);

	const fig1 = new Figure([[0, -2], [9, -2], [0, 10]]);
	board.set(null, fig1);
	const res1a = boardMinimalEcholocationHence(board, [4.5, 4])
	      res1b = boardMinimalEcholocationHence(board, [8.5, 7]);
	const flag1a =
		res1a.length == 2 &&
			res1a[0] == 'just' &&
			res1a[1].distance == 0 &&
			res1a[1].fronts.length == 1 &&
				res1a[1].fronts[0].figure == fig1 &&
				treeEq(
					res1a[1].fronts[0].selectedEdges,
					[
						[[9, -2], [0, 10]]
					]
				);
	const flag1b =
		res1b.length == 2 &&
			res1b[0] == 'just' &&
			res1b[1].distance == 5 &&
			res1b[1].fronts.length == 1 &&
				res1a[1].fronts[0].figure == fig1 &&
				treeEq(
					res1b[1].fronts[0].selectedEdges,
					[
						[[9, -2], [0, 10]]
					]
				);

	return flag0 && flag1a && flag1b;
};

EcholocationBehavior.prototype.shouldMaybeMinimalDistanceOfEchos = () =>
	treeEq(
		maybeMinimalDistanceOfEchos(
			[
				{
					figure: '<figure-1>',
					reverberations: [
						{edge: [[0, -2], [9, -2]], distance:  6},
						{edge: [[9, -2], [0, 10]], distance: 10},
						{edge: [[0, 10], [0, -2]], distance:  6}
					]
				},
				{
					figure: '<figure-2>',
					reverberations: [
						{edge: [[6, -7], [6,  9]], distance: 15},
						{edge: [[8, -4], [7, -3]], distance:  6},
						{edge: [[4, -6], [3, -7]], distance: 14}
					]
				},
				{
					figure: '<figure-3>',
					reverberations: [
						{edge: [[3, 12], [1,  3]], distance: 11},
						{edge: [[4, -1], [4, 12]], distance: 12},
						{edge: [[0, 17], [6, 19]], distance: 13}
					]
				}
			]
		),
		['just', 6]
	) &&
	vecEq(maybeMinimalDistanceOfEchos([]), ['nothing']) &&
	vecEq(maybeMinimalDistanceOfEchos([{figure: '<figure-1>', reverberations: []}]), ['nothing']);

EcholocationBehavior.prototype.shouldReshapeEchosForMinimalDistanceIfAny = () =>
	treeEq(
		reshapeEchosForMinimalDistanceIfAny(
			[
				{
					figure: '<figure-1>',
					reverberations: [
						{edge: [[0, -2], [9, -2]], distance:  6},
						{edge: [[9, -2], [0, 10]], distance: 10},
						{edge: [[0, 10], [0, -2]], distance:  6}
					]
				},
				{
					figure: '<figure-2>',
					reverberations: [
						{edge: [[6, -7], [6,  9]], distance: 15},
						{edge: [[8, -4], [7, -3]], distance:  6},
						{edge: [[4, -6], [3, -7]], distance: 14}
					]
				},
				{
					figure: '<figure-3>',
					reverberations: [
						{edge: [[3, 12], [1,  3]], distance: 11},
						{edge: [[4, -1], [4, 12]], distance: 12},
						{edge: [[0, 17], [6, 19]], distance: 13}
					]
				}
			]
		),
		[
			'just',
			{
				distance: 6,
				fronts: [
					{
						figure: '<figure-1>',
						selectedEdges: [
							[[0, -2], [9, -2]],
							[[0, 10], [0, -2]]
						]
					},
					{
						figure: '<figure-2>',
						selectedEdges: [
							[[8, -4], [7, -3]]
						]
					}
				]
			}
		]
	) &&
	vecEq(reshapeEchosForMinimalDistanceIfAny([]), ['nothing']) &&
	vecEq(reshapeEchosForMinimalDistanceIfAny([{figure: '<figure-1>', reverberations: []}]), ['nothing']);

EcholocationBehavior.prototype.shouldReshapeEchosForDistance = () =>
	treeEq(
		reshapeEchosForDistance(
			6,
			[
				{
					figure: '<figure-1>',
					reverberations: [
						{edge: [[0, -2], [9, -2]], distance: 6},
						{edge: [[9, -2], [0, 10]], distance: 0},
						{edge: [[0, 10], [0, -2]], distance: 6}
					]
				},
				{
					figure: '<figure-2>',
					reverberations: [
						{edge: [[6, -7], [6,  9]], distance: 5},
						{edge: [[8, -4], [7, -3]], distance: 6},
						{edge: [[4, -6], [3, -7]], distance: 4}
					]
				},
				{
					figure: '<figure-3>',
					reverberations: [
						{edge: [[3, 12], [1,  3]], distance: 1},
						{edge: [[4, -1], [4, 12]], distance: 2},
						{edge: [[0, 17], [6, 19]], distance: 3}
					]
				}
			]
		),
		{
			distance: 6,
			fronts: [
				{
					figure: '<figure-1>',
					selectedEdges: [
						[[0, -2], [9, -2]],
						[[0, 10], [0, -2]]
					]
				},
				{
					figure: '<figure-2>',
					selectedEdges: [
						[[8, -4], [7, -3]]
					]
				}
			]
		}
	);

EcholocationBehavior.prototype.shouldReshapeEchosDroppingDistances = () =>
	treeEq(
		reshapeEchosDroppingDistances(
			[
				{
					figure: '<figure-1>',
					reverberations: [
						{edge: [[0, -2], [9, -2]], distance: 6  },
						{edge: [[0, 10], [0, -2]], distance: 6  }
					]
				},
				{
					figure: '<figure-2>',
					reverberations: [
						{edge: [[8, -4], [7, -3]], distance: 6  }
					]
				}
			]
		),
		[
			{
				figure: '<figure-1>',
				selectedEdges: [
					[[0, -2], [9, -2]],
					[[0, 10], [0, -2]]
				]
			},
			{
				figure: '<figure-2>',
				selectedEdges: [
					[[8, -4], [7, -3]]
				]
			}
		]
	);

EcholocationBehavior.prototype.shouldSelectEchosForDistance = () =>
	treeEq(
		selectEchosForDistance(
			6,
			[
				{
					figure: '<figure-1>',
					reverberations: [
						{edge: [[0, -2], [9, -2]], distance: 6},
						{edge: [[9, -2], [0, 10]], distance: 0},
						{edge: [[0, 10], [0, -2]], distance: 6}
					]
				},
				{
					figure: '<figure-2>',
					reverberations: [
						{edge: [[6, -7], [6,  9]], distance: 5},
						{edge: [[8, -4], [7, -3]], distance: 6},
						{edge: [[4, -6], [3, -7]], distance: 4}
					]
				},
				{
					figure: '<figure-3>',
					reverberations: [
						{edge: [[3, 12], [1,  3]], distance: 1},
						{edge: [[4, -1], [4, 12]], distance: 2},
						{edge: [[0, 17], [6, 19]], distance: 3}
					]
				}
			]
		),
		[
			{
				figure: '<figure-1>',
				reverberations: [
					{edge: [[0, -2], [9, -2]], distance: 6},
					{edge: [[0, 10], [0, -2]], distance: 6}
				]
			},
			{
				figure: '<figure-2>',
				reverberations: [
					{edge: [[8, -4], [7, -3]], distance: 6}
				]
			}
		]
	);
