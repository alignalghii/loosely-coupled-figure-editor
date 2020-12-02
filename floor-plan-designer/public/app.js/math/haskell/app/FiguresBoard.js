function fallFigureOnBoard_allMins(fallingFigure, board, fallDirectionVector, falsePositiveCollidingWidgets)
{
	const isAnOther    = (anotherFigure) => anotherFigure != fallingFigure && falsePositiveCollidingWidgets.every(widget => anotherFigure != widget.high);
	const itsFallScale = (targetFigure ) => fallPolygonOnPolygon_IMPROVED(fallingFigure.vertices, targetFigure.vertices, fallDirectionVector);
	const [pMIScale, minFigures]/*, nesting]*/ = boardMinSelectSet(isAnOther, itsFallScale, pMInfCompare, plusInfinity, board);
	return [plusMinusInfinityExtensionToMaybePlusInfinityExtension(pMIScale), minFigures];
}

function invalidSituationOnBoard(fallingFigure, board)
{
	const affects = (targetFigure) => targetFigure != fallingFigure && invalidSituation(fallingFigure.vertices, targetFigure.vertices);
	return boardAnyColliding(affects, board);
}

function invalidSituationOnBoardBut(probeFigure, fallingFigure, board)
{
	const affects = (targetFigure) => targetFigure != fallingFigure  && invalidSituation(probeFigure.vertices, targetFigure.vertices);
	return boardAnyColliding(affects, board);
}

/** @TODO: it is very ineffective to use a separate function call to check nesting status. Try to rewrite the functions such that it can be done simultaneously with falling or collision check! */

function nestingStatus(egoFigure, board)
{
	const iAmContainedBy = [];
	const iContain       = [];
	for (let environmentFigure of board.range()) {
		if (environmentFigure != egoFigure) {
			const status = situationStatus(egoFigure.vertices, environmentFigure.vertices);
			//
		}
	}
}
