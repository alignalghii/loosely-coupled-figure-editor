function fallFigureOnBoard(fallDirectionVector, fallingFigure, board)
{
	var maybeMinLengthFallingVector = ['nothing'];
	for (let anotherFigure of board.range()) {
		if (anotherFigure != fallingFigure) {
			var maybeFallingVector = fallPolygonOnPolygon(fallDirectionVector, fallingFigure.vertices, anotherFigure.vertices);
			var sp = maybeMap((v) => scalarProduct(fallDirectionVector, v), maybeFallingVector);
			if (sp[0] == 'just' && sp[1] >= 0 && compareLengthForLessThan(maybeFallingVector, maybeMinLengthFallingVector)) maybeMinLengthFallingVector = maybeFallingVector;
		}
	}
	return maybeMinLengthFallingVector;
}

function affectsAnyOtherFigureBoundary(figure, board)
{
	for (let anotherFigure of board.range()) {
		if (anotherFigure != figure) {
			if (polygonContoursTouchOrCross(figure.vertices, anotherFigure.vertices)) {
				return true;
			}
		}
	}
	return false;
}

function affectsAnyFigureBoundaryBut(figure, exception, board)
{
	for (let anotherFigure of board.range()) {
		if (anotherFigure != exception) {
			if (polygonContoursTouchOrCross(figure.vertices, anotherFigure.vertices)) {
				return true;
			}
		}
	}
	return false;
}
