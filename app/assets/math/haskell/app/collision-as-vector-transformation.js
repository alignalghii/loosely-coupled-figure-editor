const mbVectorTransfomationForAllowance = (fallingFigure, board) => infinitezimalDisplacement => mbVectorTransformer(fallingFigure, board, infinitezimalDisplacement);

function mbVectorTransformer(fallingFigure, board, infinitezimalDisplacement)
{
	const [maybePIScale, minFallTargetFigures] = fallFigureOnBoard_allMins(fallingFigure, board, infinitezimalDisplacement);
	return maybeMap(
		pIScaleGovernedVectorTransformation(fallingFigure, board, infinitezimalDisplacement, minFallTargetFigures),
		maybePIScale
	);
}

const pIScaleGovernedVectorTransformation = (fallingFigure, board, infinitezimalDisplacement, minFallTargetFigures) => pIScale =>
{
	const mbContractScale = maybeContractor(pIScale);
	return maybe(
		infinitezimalDisplacement,
		contractScale => couldTeleport(fallingFigure, board, infinitezimalDisplacement) ? infinitezimalDisplacement
		                                                                                : detectSlide(fallingFigure, board, infinitezimalDisplacement, minFallTargetFigures, contractScale),
		mbContractScale
	);
};

const maybeContractor = pIScale => maybeBind(pIScale, scaleVal => scaleVal < 1 ? ['just', scaleVal] : ['nothing']);

function couldTeleport(fallingFigure, board, infinitezimalDisplacement)
{
	const probeFigure = fallingFigure.translation(infinitezimalDisplacement);
	return !invalidSituationOnBoardBut(probeFigure, fallingFigure, board);
}

function detectSlide(fallingFigure, board, infinitezimalDisplacement, minFallTargetFigures, contractScale)
{
	const slides = minFallTargetFigures.map(targetFigure => polygonSlideDirection(fallingFigure.vertices, targetFigure.vertices)),
              slide  = combineSlides(slides);console.log(JSON.stringify(slides));
	const fallVector  = slantScale(    contractScale, infinitezimalDisplacement),
	      dipVector   = slantScale(1 - contractScale, infinitezimalDisplacement);
	      simplyCalculatedSlideVector = maybe(
	          [0, 0],
	          orientation => projectVectorOnOrientation(orientation, dipVector),
	          slide
	      );
	const simplyCalculatedFallAndSlideVector = addVec(fallVector, simplyCalculatedSlideVector);
	const probeFigure = fallingFigure.translation(simplyCalculatedFallAndSlideVector);
	return !invalidSituationOnBoardBut(probeFigure, fallingFigure, board) ? simplyCalculatedFallAndSlideVector : fallVector;
}

function projectVectorOnOrientation(orient, dipVector)
{
	const orientedUnitVector = orientUnitVector(orient),
	      projectionLength   = scalarProduct(orientedUnitVector, dipVector);
	return slantScale(projectionLength, orientedUnitVector);
}

function orientUnitVector(orientation)
{
	const rad = orientation * Math.PI / 180;
	return [Math.cos(rad), Math.sin(rad)];
};
