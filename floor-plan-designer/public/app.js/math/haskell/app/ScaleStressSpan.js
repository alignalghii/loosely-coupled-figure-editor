/** Used by GeomTransformationController */
function ScaleStressSpan([figCommandName, wdgCommandName], currentWEPos, nearestFigure, canvasPseudoWidget)
{
	this.figCommandName = figCommandName;
	this.wdgCommandName = wdgCommandName;

	this.start  = currentWEPos;
	this.last   = currentWEPos; // @TODO: `last` is not used by the user-observable functioning, really it is only used in logging (console message). Move it into `ScaleStressSpanLog`!
	this.figure = nearestFigure;
	this.widget = canvasPseudoWidget.arbitrary.detectTypeAndComposeFromHigh(nearestFigure);
	this.board  = canvasPseudoWidget.board();
}

ScaleStressSpan.prototype.query = function (currentWEPos) // a pure function without side effects
{
	const {start: detectedPositionForStart, last: last, figure: nearestFigure, widget: widget, board: board} = this;
	const A     = detectedPositionForStart,
	      A_    = currentWEPos,
	      O     = nearestFigure.grasp,
	      q     = ratioAOA_(A   , O, A_),
	      dq    = ratioAOA_(last, O, A_);
	if (!widget.high.isCollidable() || couldTeleportByFigTransformCommand_(nearestFigure, board, this.figCommandName, [dq])) { // or: ...mand(..,.., fig => fig.doRotation(dRad))
		return {
			log     : {},//new ScaleStressSpanLog(ratioAOA_, [A, O, A_], nearestFigure.referenceAngle + dRad, ['nothing']),
			mbAction: ['just', {dq: dq, last: currentWEPos.map(i=>i)}]
		};
	} else {
		return {
			log     : {},//new ScaleStressSpanLog(ratioAOA_, [A, O, last], nearestFigure.referenceAngle, ['just', radAOA_(last, O, A_)]),
			mbAction: ['nothing']
		};
	}
};

ScaleStressSpan.prototype.stepOrWaitAlsoLog = function (currentWEPos) // @TODO: Discuss breach of command-query separation principle
{
	const {log: log, mbAction: mbAction} = this.query(currentWEPos);
	this.stepOrWait(mbAction, currentWEPos);
	return log;
};

ScaleStressSpan.prototype.stepOrWait = function (mbAction, currentWEPos)
{
	maybeMap(
		action => {this.step(action, currentWEPos);},
		mbAction
	);
};

ScaleStressSpan.prototype.step = function ({dq: dq, last: last}, currentWEPos)
{
	this.widget[this.wdgCommandName](dq);
	this.last = currentWEPos.map(i=>i); // @TODO: `last` is not used by the user-observable functioning, really it is only used in logging (console message). Move it into `ScaleStressSpanLog`!
};
