/** Used by GeomTransformationController */

function ReflectionFlip([figCommandName, wdgCommandName], nearestFigure, canvasPseudoWidget)
{
	this.figCommandName = figCommandName;
	this.wdgCommandName = wdgCommandName;

	this.figure = nearestFigure;
	this.widget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(nearestFigure);
	this.board  = canvasPseudoWidget.board();
}

ReflectionFlip.prototype.query = function () // a pure function without side effects
{
	const {figure: nearestFigure, widget: widget, board: board} = this;
	if (couldTeleportByFigTransformCommand_(nearestFigure, board, this.figCommandName, [])) { // or: ...mand(..,.., fig => fig.doReflectHorizontallyRef())
		return {
			log     : {},//new ReflectionFlipLog(ratioAOA_, [A, O, A_], nearestFigure.referenceAngle + dRad, ['nothing']),
			flagAction: true
		};
	} else {
		return {
			log     : {},//new ReflectionFlipLog(ratioAOA_, [A, O, last], nearestFigure.referenceAngle, ['just', radAOA_(last, O, A_)]),
			flagAction: false
		};
	}
};

ReflectionFlip.prototype.stepOrWaitAlsoLog = function () // @TODO: Discuss breach of command-query separation principle
{
	const {log: log, flagAction: flagAction} = this.query();
	this.stepOrWait(flagAction);
	return log;
};

ReflectionFlip.prototype.stepOrWait = function (flagAction)
{
	if (flagAction) {
		this.step();
	}
};

ReflectionFlip.prototype.step = function ()
{
	this.widget[this.wdgCommandName]();
};
