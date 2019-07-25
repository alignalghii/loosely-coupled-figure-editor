function vectorTransfomationForAllowance_OBSOLETE(fallingFigure, board)
{
	function trf(infinitezimalDisplacement) {
		if (vectorLength(infinitezimalDisplacement) > 0) {
			var wasCaptured = affectsAnyOtherFigureBoundary(fallingFigure, board);
			if (!wasCaptured) {console.log('not capt');
				var maybeFallVector       = fallFigureOnBoard(infinitezimalDisplacement, fallingFigure, board);
				var isFullRunAllowed      = lessThanPossibleInfinitelyDistant(infinitezimalDisplacement, maybeFallVector);
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

function vectorTransfomationForAllowance(fallingFigure, board)
{//console.log(fallingFigure);
	function vectorTransformer(infinitezimalDisplacement) {
		var fallScaleValueOrPMInf = fallFigureOnBoard_IMPROVED(fallingFigure, board, infinitezimalDisplacement);
		console.log(fallScaleValueOrPMInf);
		return pMToPInfinity_exec(
			(                ) => escapeDisplacement(fallingFigure, board, infinitezimalDisplacement),
			(scaleValueOrPInf) => allowableDisplacement(infinitezimalDisplacement, scaleValueOrPInf),
			fallScaleValueOrPMInf
		);
	}
	return infinitezimalDisplacement => vectorLength(infinitezimalDisplacement) > 0 ? vectorTransformer(infinitezimalDisplacement) : [0,0];
}

function allowableDisplacement(infinitezimalDisplacement, fallScaleValueOrPInf)
{
	return ccMixedGeq_callback(
		valueOrPInf, 1,
		infinitezimalDisplacement,
		value => slantScale(value, infinitezimalDisplacement)
	);
}

function escapeDisplacement(fallingFigure, board, infinitezimalDisplacement)
{
	var probeFigure = fallingFigure.translation(infinitezimalDisplacement);
	var wouldEscape = !affectsAnyFigureBut_IMPROVED(probeFigure, fallingFigure, board);
	return wouldEscape ?  infinitezimalDisplacement : [0,0];
}
