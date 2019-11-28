const mbVectorTransformationForAllowance_ = (fallingFigure, board) => infinitezimalDisplacement => mbVectorTransformer_(fallingFigure, board, infinitezimalDisplacement);

function mbVectorTransformer_(fallingFigure, board, infinitezimalDisplacement)
{
	const [maybePIScale, minFallTargetFigures] = fallFigureOnBoard_allMins(fallingFigure, board, infinitezimalDisplacement);
	return [
		maybeMap(
			pIScaleGovernedVectorTransformation(fallingFigure, board, infinitezimalDisplacement, minFallTargetFigures),
			maybePIScale
		),
		minFallTargetFigures
	];
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

function couldTeleportByFigTransformCommand(fallingFigure, board, figTransformCommand)
{
	const probeFigure = fallingFigure.translation([0, 0]);
	figTransformCommand(probeFigure);
	return !invalidSituationOnBoardBut(probeFigure, fallingFigure, board);
}

function couldTeleportByFigTransformCommand_(fallingFigure, board, figTransformCommand, args)
{
	const probeFigure = fallingFigure.translation([0, 0]);
	probeFigure[figTransformCommand].apply(probeFigure, args);
	return !invalidSituationOnBoardBut(probeFigure, fallingFigure, board);
}

function confirm_or_interpolate_realParamOfCommand(fallingFigure, board, figTransformCommandWithRealParameter, safeOldValue, challengingNewValue, counterLimit)
{
	const probeFigure = fallingFigure.translation([0, 0]);
	figTransformCommandWithRealParameter(probeFigure, challengingNewValue);
	return !invalidSituationOnBoardBut(probeFigure, fallingFigure, board) ?
	         [true , challengingNewValue]
	       : [false, interpolate_realParamOfCommand(fallingFigure, board, figTransformCommandWithRealParameter, safeOldValue, challengingNewValue, counterLimit)];
}

function interpolate_realParamOfCommand(fallingFigure, board, figTransformCommandWithRealParameter, validValue, invalidValue, counterLimit)
{
	for (let counter = 0; counter < counterLimit; counter++) {
		const tryValue = (validValue + invalidValue) / 2;
		const probeFigure = fallingFigure.translation([0, 0]);
		figTransformCommandWithRealParameter(probeFigure, tryValue);
		const isValid = !invalidSituationOnBoardBut(probeFigure, fallingFigure, board);
		if (isValid) {
			validValue = tryValue;
		} else {
			invalidValue = tryValue;
		}
	}
	return validValue;
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
