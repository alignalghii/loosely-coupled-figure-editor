/** Used by GeomTransformationController */

function RotationArcSpan(currentWEPos, nearestFigure, widgetFactory)
{
	this.start  = currentWEPos;
	this.last   = currentWEPos; // @TODO: `last` is not used by the user-observable functioning, really it is only used in logging (console message). Move it into `RotationArcSpanLog`!
	this.figure = nearestFigure;
	this.startReferenceAngle = nearestFigure.referenceAngle,
	this.widget = widgetFactory.createWidgetFromMedium(nearestFigure);
	this.board  = widgetFactory.bijectionSvgToGeom;
}

RotationArcSpan.prototype.query = function (currentWEPos) // a pure function without side effects
{
	const {start: detectedPositionForStart, last: last, figure: nearestFigure, startReferenceAngle: startReferenceAngle, widget: widget, board: board} = this;
	const A    = detectedPositionForStart,
	      A_   = currentWEPos,
	      O    = nearestFigure.grasp,
	      AOA_ = radAOA_(A, O, A_),
	      dRad = startReferenceAngle + AOA_ - nearestFigure.referenceAngle;
	if (couldTeleportByFigTransformCommand_(nearestFigure, board, "doRotation", [dRad])) { // or: ...mand(..,.., fig => fig.doRotation(dRad))
		return {
			log     : new RotationArcSpanLog(radAOA_, [A, O, A_], nearestFigure.referenceAngle + dRad, ['nothing']),
			mbAction: ['just', {dRad: dRad, last: currentWEPos.map(i=>i)}]
		};
	} else {
		return {
			log     : new RotationArcSpanLog(radAOA_, [A, O, last], nearestFigure.referenceAngle, ['just', radAOA_(last, O, A_)]),
			mbAction: ['nothing']
		};
	}
};

RotationArcSpan.prototype.stepOrWaitAlsoLog = function (currentWEPos) // @TODO: Discuss breach of command-query separation principle
{
	const {log: log, mbAction: mbAction} = this.query(currentWEPos);
	this.stepOrWait(mbAction, currentWEPos);
	return log;
};

RotationArcSpan.prototype.stepOrWait = function (mbAction, currentWEPos)
{
	maybeMap(
		action => {this.step(action, currentWEPos);},
		mbAction
	);
};

RotationArcSpan.prototype.step = function ({dRad: dRad, last: last}, currentWEPos)
{
	this.widget.rotate(dRad);
	this.last = currentWEPos.map(i=>i); // @TODO: `last` is not used by the user-observable functioning, really it is only used in logging (console message). Move it into `RotationArcSpanLog`!
};
