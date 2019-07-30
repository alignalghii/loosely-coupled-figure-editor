function BoardBehavior () {}


BoardBehavior.prototype.shouldTestBoardBehavior = function () {return this.shouldBoardReduce();}


BoardBehavior.prototype.shouldBoardReduce = function ()
{
	const plus  = (acc, curr) => acc + curr,
	      mult  = (acc, curr) => acc * curr;

	const board = new Bijection;
	const flagEmpty = boardReduce(plus, 0, board) == 0 && boardReduce(plus, 100, board) == 100 && boardReduce(mult, 1, board) == 1 && boardReduce(mult, 100, board) == 100;

	board.set(null, 5);
	const flagSingleton = boardReduce(plus, 0, board) == 5 && boardReduce(plus, 100, board) == 105 && boardReduce(mult, 1, board) == 5 && boardReduce(mult, 100, board) == 500;

	board.set(null, 7);
	const flagPair = boardReduce(plus, 0, board) == 12 && boardReduce(plus, 100, board) == 112 && boardReduce(mult, 1, board) == 35 && boardReduce(mult, 100, board) == 3500;

	board.set(null, 2);
	const flagTriple = boardReduce(plus, 0, board) == 14 && boardReduce(plus, 100, board) == 114 && boardReduce(mult, 1, board) == 70 && boardReduce(mult, 100, board) == 7000;

	return flagEmpty && flagSingleton && flagPair && flagTriple;
};
