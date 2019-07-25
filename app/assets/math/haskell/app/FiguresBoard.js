function fallFigureOnBoard_IMPROVED(fallingFigure, board, fallDirectionVector)
{
	const isAnOther    = (anotherFigure) => anotherFigure != fallingFigure;
	const itsFallScale = (targetFigure ) => fallPolygonOnPolygon_IMPROVED(fallingFigure.vertices, targetFigure.vertices, fallDirectionVector);
	return boardMin(isAnOther, itsFallScale, pMInfLt, ['left', true], board);
}

function affectsAnyOtherFigure_IMPROVED(fallingFigure, board)
{
	const affects = (targetFigure) => targetFigure != fallingFigure && invalidState(fallingFigure.vertices, targetFigure.vertices) 
	return boardAny(affects, board);
}

function affectsAnyFigureBut_IMPROVED(fallingFigure, exceptionProbeFigure, board)
{
	const affects = (targetFigure) => exception != targetFigure && invalidState(fallingFigure.vertices, targetFigure.vertices);
	return boardAny(affects, board);
}

function fallPolygonOnPolygon_IMPROVED(verticesSrc, verticesTgt, fallDirectionVector)
{
	/*var ineqSystemsSrc  = polygonInequalityStructure('containment'  , verticesSrc),
	    ineqSystemsSrc_ = polygonInequalityStructure('complementary', verticesSrc),
	    ineqSystemsTgt  = polygonInequalityStructure('containment'  , verticesTgt),
	    ineqSystemsTgt_ = polygonInequalityStructure('complementary', verticesTgt),

	    ineqSystems_intersect       = dnfAnd(ineqSystemsSrc , ineqSystemsTgt ),
	    ineqSystems_antiContains    = dnfAnd(ineqSystemsSrc_, ineqSystemsTgt ),
	    ineqSystems_antiContainedBy = dnfAnd(ineqSystemsSrc , ineqSystemsTgt_),*/

	var status = situationStatus(verticesSrc, verticesTgt);
	if ('disjoint' in status) return ;
}
