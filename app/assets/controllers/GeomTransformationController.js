function GeomTransformationController(state, widgetFactory, msgConsole)
{
	this.state         = state;
	this.widgetFactory = widgetFactory;
	this.msgConsole    = msgConsole;
}

GeomTransformationController.prototype.openRotationArc = function (currentWEPos)
{
	const board = this.widgetFactory.bijectionSvgToGeom;
	const consoleMessage = maybe(
		'A forgatáshoz nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const widget = this.widgetFactory.createWidgetFromMedium(nearestFigure);
			this.state.mbRotationArc = ['just', {start: currentWEPos, last: currentWEPos, figure: nearestFigure, startReferenceAngle: nearestFigure.referenceAngle, widget: widget, board: board}];
			return "Kifeszítendő AOA'∡ forgatásív irányszöge: 0° [ref: " + nearestFigure.referenceAngle*180/Math.PI + "°] (O: " + JSON.stringify(nearestFigure.grasp) + "A, A': " + JSON.stringify(currentWEPos) + ")";
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.msgConsole.innerHTML = consoleMessage;
}

GeomTransformationController.prototype.spanRotationArcByDragging = function (currentWEPos)
{
	maybe_exec(
		() => {this.msgConsole.innerHTML = 'Jelöld ki a kifeszítendő forgatásív kezdőpozícióját...';},
		rotationArc => {
			const {consoleMessage: consoleMessage, mbAction: mbAction} = spanRotationArc(rotationArc, currentWEPos);
			maybeMap(
				({dRad: dRad, last: last}) => {
					rotationArc.widget.rotate(dRad);
					rotationArc.last = currentWEPos.map(i=>i);
				},
				mbAction
			);
			this.msgConsole.innerHTML = consoleMessage;
		},
		this.state.mbRotationArc
	);
};

GeomTransformationController.prototype.closeRotationArc = function ()
{
	this.state.mbRotationArc = ['nothing'];
	this.msgConsole.innerHTML = 'Forgatásív véglegesítve és végrehajtva.';
};


// @TODO: Theses is a GLOBAL(!!) function!:

function spanRotationArc(rotationArc, currentWEPos) // a pure function without side effects
{
	const {start: detectedPositionForStart, last: last, figure: nearestFigure, startReferenceAngle: startReferenceAngle, widget: widget, board: board} = rotationArc;
	const A    = detectedPositionForStart,
	      A_   = currentWEPos,
	      O    = nearestFigure.grasp,
	      AOA_ = radAOA_(A, O, A_),
	      dRad = startReferenceAngle + AOA_ - nearestFigure.referenceAngle;
	const probeFigure = nearestFigure.translation([0,0]);
	probeFigure.doRotation(dRad);
	if (!invalidSituationOnBoardBut(probeFigure, nearestFigure, board)) {
		return {
			consoleMessage: "Kifeszítendő AOA'∡ forgatásív irányszöge: " + degAOA_(A, O, A_) + "° [ref: " + (nearestFigure.referenceAngle + dRad) * 180/Math.PI + "°] (O: " + JSON.stringify(O) +  ", A: " + JSON.stringify(A) + ", A': " + JSON.stringify(A_) + ")",
			mbAction: ['just', {dRad: dRad, last: currentWEPos.map(i=>i)}]
		};
	} else {
		return {
			consoleMessage: "Kifeszítendő AOA'∡ forgatásív irányszöge: " + degAOA_(A, O, last) + "° (+ " + degAOA_(last, O, A_) +  "° sikertelen) [ref: " + nearestFigure.referenceAngle*180/Math.PI + "°] (O: " + JSON.stringify(O) +  ", A: " + JSON.stringify(A) + ", A': " + JSON.stringify(last) + "). Ütközés, esetleges visszapattanással!",
			mbAction: ['nothing']
		};
	}
}
