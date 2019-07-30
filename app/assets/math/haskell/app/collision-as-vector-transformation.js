function vectorTransfomationForAllowance(fallingFigure, board) {return infinitezimalDisplacement => vectorTransformer(fallingFigure, board, infinitezimalDisplacement);}

function vectorTransformer(fallingFigure, board, infinitezimalDisplacement)
{
	const teleport_callback     = (infinitezimalDisplacement) => teleport(fallingFigure, board, infinitezimalDisplacement);
	const [fallScaleValueOrPMInf, minFallTargetFigures] = fallFigureOnBoard_allMins(fallingFigure, board, infinitezimalDisplacement),
	      effectiveScaleValue   = effectiveFallScale(infinitezimalDisplacement, fallScaleValueOrPMInf, teleport_callback);
	return slantScale(effectiveScaleValue, infinitezimalDisplacement);
}


function effectiveFallScale(infinitezimalDisplacement, fallScaleValueOrPMInf, teleport_callback)
{
	const restrictOrTeleport_ = (scaleValueOrPInf) => restrictOrTeleport(infinitezimalDisplacement, scaleValueOrPInf, teleport_callback);
	return pMToPInfinity(0, restrictOrTeleport_, fallScaleValueOrPMInf);
}

function restrictOrTeleport(infinitezimalDisplacement, fallScaleValueOrPInf, teleport_callback)
{
	const restrictedScaleValue = pMInfMixedMin(fallScaleValueOrPInf, 1);
	return ccEq(restrictedScaleValue, 0) ? teleport_callback(infinitezimalDisplacement) : restrictedScaleValue;
}

function teleport(fallingFigure, board, infinitezimalDisplacement)
{
	const probeFigure = fallingFigure.translation(infinitezimalDisplacement),
	      wouldEscape = !invalidSituationOnBoardBut(probeFigure, fallingFigure, board);
	return wouldEscape ?  1 : 0;
}
