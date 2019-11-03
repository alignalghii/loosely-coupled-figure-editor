function BoardBehavior () {}


BoardBehavior.prototype.shouldTestBoardBehavior = function () {return this.shouldBoardReduceColliding();}


BoardBehavior.prototype.shouldBoardReduceColliding = function ()
{
	const plus  = (acc, curr) => acc + curr,
	      mult  = (acc, curr) => acc * curr;

	const board = new Bijection;
	const flagEmpty = boardReduceColliding(plus, 0, board) == 0 && boardReduceColliding(plus, 100, board) == 100 && boardReduceColliding(mult, 1, board) == 1 && boardReduceColliding(mult, 100, board) == 100;

	board.set(null, 5);
	const flagSingleton = boardReduceColliding(plus, 0, board) == 5 && boardReduceColliding(plus, 100, board) == 105 && boardReduceColliding(mult, 1, board) == 5 && boardReduceColliding(mult, 100, board) == 500;

	board.set(null, 7);
	const flagPair = boardReduceColliding(plus, 0, board) == 12 && boardReduceColliding(plus, 100, board) == 112 && boardReduceColliding(mult, 1, board) == 35 && boardReduceColliding(mult, 100, board) == 3500;

	board.set(null, 2);
	const flagTriple = boardReduceColliding(plus, 0, board) == 14 && boardReduceColliding(plus, 100, board) == 114 && boardReduceColliding(mult, 1, board) == 70 && boardReduceColliding(mult, 100, board) == 7000;

	return flagEmpty && flagSingleton && flagPair && flagTriple;
};
