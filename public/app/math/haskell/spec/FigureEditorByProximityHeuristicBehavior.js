// @TODO: Would `FigureEditorBehavior` be a better name?
// @TODO: put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?
function FigureEditorByProximityHeuristicBehavior() {}

FigureEditorByProximityHeuristicBehavior.prototype.shouldTestFigureEditorByProximityHeuristicBehavior = function () {return this.shouldAddVertex_degenerate() && this.shouldAddVertex() && this.shouldDeleteVertex() && this.shouldMoveVertex();};

/** Due to a typo, it can be considered an interesting degenerate edge case*/
FigureEditorByProximityHeuristicBehavior.prototype.shouldAddVertex_degenerate = () =>
{
	const figure1 = new Figure([[-5, -5], [-5, 5], [5, 5], [-5, 5]]);
	const figureEditor1 = new FigureEditorByProximityHeuristic(figure1);
	const flag1a = vecEq(figure1.vertices, [[-5, -5], [-5, 5], [5, 5], [-5, 5]]);
	figureEditor1.addVertex([0, -6]);
	const flag1b = vecEq(figure1.vertices, [[-5, -5], [-5, 5], [5, 5], [-5, 5]]); // due to tye, in the former iplementation, it was [[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]] due to heading
	return flag1a && flag1b;
};

FigureEditorByProximityHeuristicBehavior.prototype.shouldAddVertex = () =>
{
	const figure1 = new Figure([[-5, -5], [5, -5], [5, 5], [-5, 5]]);
	const figureEditor1 = new FigureEditorByProximityHeuristic(figure1);
	const flag1a = vecEq(figure1.vertices, [[-5, -5], [5, -5], [5, 5], [-5, 5]]);
	figureEditor1.addVertex([0, -6]);
	const flag1b = vecEq(figure1.vertices, [[-5, -5], [0, -6], [5, -5], [5, 5], [-5, 5]]); // due to tye, in the former iplementation, it was [[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]] due to heading
	return flag1a && flag1b;
};


FigureEditorByProximityHeuristicBehavior.prototype.shouldDeleteVertex = () =>
{
	const figure1 = new Figure([[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]]);
	const figureEditor1 = new FigureEditorByProximityHeuristic(figure1);
	const flag1a = vecEq(figure1.vertices, [[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]]);
	figureEditor1.deleteVertex([0, -7]);
	const flag1b = vecEq(figure1.vertices, [[-5, -5],          [-5, 5], [5, 5], [-5, 5]]);
	return flag1a && flag1b;
};


FigureEditorByProximityHeuristicBehavior.prototype.shouldMoveVertex = () =>
{
	const figure1 = new Figure([[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]]);
	const figureEditor1 = new FigureEditorByProximityHeuristic(figure1);
	const flag1a = vecEq(figure1.vertices, [[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]]);
	figureEditor1.moveVertex([0, -7]);
	const flag1b = vecEq(figure1.vertices, [[-5, -5], [0, -7], [-5, 5], [5, 5], [-5, 5]]);
	return flag1a && flag1b;
};
