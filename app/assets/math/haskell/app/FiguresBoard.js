function fallFigureOnBoard_allMins(fallingFigure, board, fallDirectionVector)
{
	const isAnOther    = (anotherFigure) => anotherFigure != fallingFigure;
	const itsFallScale = (targetFigure ) => fallPolygonOnPolygon_IMPROVED(fallingFigure.vertices, targetFigure.vertices, fallDirectionVector);
	return boardMinSelectSet(isAnOther, itsFallScale, pMInfCompare, ['left', true], board);
}

function invalidSituationOnBoard(fallingFigure, board)
{
	const affects = (targetFigure) => targetFigure != fallingFigure && invalidSituation(fallingFigure.vertices, targetFigure.vertices);
	return boardAny(affects, board);
}

function invalidSituationOnBoardBut(probeFigure, fallingFigure, board)
{
	const affects = (targetFigure) => targetFigure != fallingFigure  && invalidSituation(probeFigure.vertices, targetFigure.vertices);
	return boardAny(affects, board);
}