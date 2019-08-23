function GeomTransformationController(state, widgetFactory, msgConsole)
{
	this.state         = state;
	this.widgetFactory = widgetFactory;
	this.msgConsole    = msgConsole;
}

GeomTransformationController.prototype.openRotationArcSpan = function (currentWEPos)
{
	const board = this.widgetFactory.bijectionSvgToGeom;
	const consoleMessage = maybe(
		'A forgatáshoz nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			this.state.maybeRotationArcSpan = ['just', new RotationArcSpan(currentWEPos, nearestFigure, this.widgetFactory)];
			const log = new RotationArcSpanLog(radAOA_, [currentWEPos, nearestFigure.grasp, currentWEPos], nearestFigure.referenceAngle, ['nothing']);
			return log.message();
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.msgConsole.innerHTML = consoleMessage;
};

GeomTransformationController.prototype.sustainRotationArcSpan = function (currentWEPos)
{
	maybe_exec(
		() => {this.msgConsole.innerHTML = 'Jelöld ki a kifeszítendő forgatásív kezdőpozícióját...';},
		rotationArcSpan => {
			const log = rotationArcSpan.stepOrWaitAlsoLog(currentWEPos); // @TODO: Discuss breach of command-query separation principle
			this.msgConsole.innerHTML = log.message();
		},
		this.state.maybeRotationArcSpan
	);
};

GeomTransformationController.prototype.closeRotationArcSpan = function ()
{
	this.state.maybeRotationArcSpan = ['nothing'];
	this.msgConsole.innerHTML = 'Forgatásív véglegesítve és végrehajtva.';
};
