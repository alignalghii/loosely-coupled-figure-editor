function EcholocationBehavior () {}

EcholocationBehavior.prototype.shouldTestEcholocationBehavior = function () {return this.shouldBoardEcholocationHence() && this.shouldBoardMinimalEcholocationHence() && this.shouldVerticePathEchoHence() && this.shouldVerticePathReshapedMinimalEchoHence() && this.shouldNearestFiguresHence() && this.shouldMaybeNearestFigureHence() && this.shouldNearestVerticesHence() && this.shouldMaybeNearestVerticeHence() && this.shouldReshapeEchosForMinimalDistanceIfAny() && this.shouldMaybeMinimalDistanceOfEchos() && this.shouldReshapeEchosForDistance() && this.shouldReshapeEchosDroppingDistances() && this.shouldSelectEchosForDistance();};


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

EcholocationBehavior.prototype.shouldVerticePathEchoHence = () =>
	vecEq(
		verticePathEchoHence(
			[[2, -6], [11, -6], [2, 6]],
			[9, 5]
		),
		[{edge: [[2, -6], [11, -6]], distance: 11}, {edge: [[11, -6], [2, 6]], distance: 5}, {edge: [[2, 6], [2, -6]], distance: 7}]
	) &&
	vecEq(
		verticePathEchoHence(
			[[2, 2], [5, 2], [2, 6]],
			[9, 5]
		),
		[{edge: [[2, 2], [5, 2]], distance: 5}, {edge: [[5, 2], [2, 6]], distance: 5}, {edge: [[2, 6], [2, 2]], distance: 7}]
	);

EcholocationBehavior.prototype.shouldVerticePathReshapedMinimalEchoHence = () =>
	vecEq(
		verticePathReshapedMinimalEchoHence(
			[],
			[9, 5]
		),
		['nothing']
	) &&
	vecEq(
		verticePathReshapedMinimalEchoHence(
			[[2, -6], [11, -6], [2, 6]],
			[9, 5]
		),
		['just', {distance: 5, selectedEdges: [[[11, -6], [2, 6]]]}]
	) &&
	vecEq(
		verticePathReshapedMinimalEchoHence(
			[[2, 2], [5, 2], [2, 6]],
			[9, 5]
		),
		['just', {distance: 5, selectedEdges: [[[2, 2], [5, 2]], [[5, 2], [2, 6]]]}]
	);

EcholocationBehavior.prototype.shouldNearestFiguresHence = () =>
{
	const board = new Bijection;
	const flag0 = flatVecEq(nearestFiguresHence(board, [9, 5]), []); // nothing is there

	const fig1 = new Figure([[2, -6], [11, -6], [2, 6]]);
	board.set(null, fig1);
	const flag1 = flatVecEq(nearestFiguresHence(board, [9, 5]), [fig1]); // single figure is minimal-distance by default

	const fig2 = new Figure([[15, 3], [17, 3], [17, 5], [15, 5]]);
	board.set(null, fig2);
	const flag2 = flatVecEq(nearestFiguresHence(board, [9, 5]), [fig1]); // too distant

	const fig3 = new Figure([[14, 3], [16, 3], [16, 5], [14, 5]]);
	board.set(null, fig3);
	const flag3 = flatVecEq(nearestFiguresHence(board, [9, 5]), [fig1, fig3]); // tie

	const fig4 = new Figure([[13, 3], [15, 3], [15, 5], [13, 5]]);
	board.set(null, fig4);
	const flag4 = flatVecEq(nearestFiguresHence(board, [9, 5]), [fig4]); // a new distance-minimum updates the former one

	return flag0 && flag1 && flag2 && flag3 && flag4;
};

EcholocationBehavior.prototype.shouldMaybeNearestFigureHence = () =>
{
	const board = new Bijection;
	const flag0 = flatVecEq(maybeNearestFigureHence(board, [9, 5]), ['nothing']); // nothing is there

	const fig1 = new Figure([[2, -6], [11, -6], [2, 6]]);
	board.set(null, fig1);
	const flag1 = flatVecEq(maybeNearestFigureHence(board, [9, 5]), ['just', fig1]); // single figure is minimal-distance by default

	const fig2 = new Figure([[15, 3], [17, 3], [17, 5], [15, 5]]);
	board.set(null, fig2);
	const flag2 = flatVecEq(maybeNearestFigureHence(board, [9, 5]), ['just', fig1]); // too distant

	const fig3 = new Figure([[14, 3], [16, 3], [16, 5], [14, 5]]);
	board.set(null, fig3);
	const flag3 = flatVecEq(maybeNearestFigureHence(board, [9, 5]), ['nothing']); // tie

	const fig4 = new Figure([[13, 3], [15, 3], [15, 5], [13, 5]]);
	board.set(null, fig4);
	const flag4 = flatVecEq(maybeNearestFigureHence(board, [9, 5]), ['just', fig4]); // a new distance-minimum updates the former one

	return flag0 && flag1 && flag2 && flag3 && flag4;
};

EcholocationBehavior.prototype.shouldNearestVerticesHence = () =>
	vecEq(nearestVerticesHence([], [9, 5]), []) &&
	vecEq(nearestVerticesHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [0, 0]), [[-1, -1], [1, -1], [1,  1], [-1, 1]]) &&
	vecEq(nearestVerticesHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [0, 2]), [                   [1,  1], [-1, 1]]) &&
	vecEq(nearestVerticesHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [2, 2]), [                   [1,  1]         ]) &&
	true;

EcholocationBehavior.prototype.shouldMaybeNearestVerticeHence = () =>
	vecEq(maybeNearestVertexHence([], [9, 5]), ['nothing']) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [ 0        , 0]), ['nothing'      ]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [ 0        , 2]), ['nothing'      ]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [ 0.0000001, 2]), ['nothing'      ]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [-0.0000001, 2]), ['nothing'      ]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [ 0.01     , 2]), ['just', [ 1, 1]]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [-0.01     , 2]), ['just', [-1, 1]]) &&
	vecEq(maybeNearestVertexHence([[-1, -1], [1, -1], [1,  1], [-1, 1]], [ 2        , 2]), ['just', [1,  1]]) &&
	true;

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
