function vectorTransfomationForAllowance(fallingFigure, board)
{
	function trf(infinitezimalDisplacement) {
		if (vectorLength(infinitezimalDisplacement) > 0) {
			var wasCaptured = affectsAnyOtherFigureBoundary(fallingFigure, board);
			if (!wasCaptured) {console.log('not capt');
				var maybeFallVector       = fallFigureOnBoard(infinitezimalDisplacement, fallingFigure, board);
				var isFullRunAllowed = lessThanPossibleInfinitelyDistant(infinitezimalDisplacement, maybeFallVector);
				var allowableDisplacement = isFullRunAllowed ? infinitezimalDisplacement : maybeFallVector[1];
				return allowableDisplacement;
			} else { console.log('capt');// wasCaptured
				var probeFigure = fallingFigure.translation(infinitezimalDisplacement);
				var wouldEscape = !affectsAnyFigureBoundaryBut(probeFigure, fallingFigure, board);
				return wouldEscape ?  infinitezimalDisplacement : [0,0];
			}
		} else return [0,0];
	}
	return trf;
}
