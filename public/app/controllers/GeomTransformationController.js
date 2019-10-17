function GeomTransformationController(state, canvasPseudoWidgets, statusBarDriver)
{
	this.state           = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver = statusBarDriver;
}

GeomTransformationController.prototype = Object.create(Controller.prototype);
GeomTransformationController.prototype.constructor = GeomTransformationController;

/** Rotation: */

GeomTransformationController.prototype.openRotationArcSpan = function (currentWEPos, eitherTarget)
{
	// @TODO: reuse repeating code occurrences
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const consoleMessage = maybe(
		'A forgatáshoz nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			this.state.maybeRotationArcSpan = ['just', new RotationArcSpan(currentWEPos, nearestFigure, canvasPseudoWidget)];
			const log = new RotationArcSpanLog(radAOA_, [currentWEPos, nearestFigure.grasp, currentWEPos], nearestFigure.referenceAngle, ['nothing']);
			return log.message();
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(consoleMessage);
};

GeomTransformationController.prototype.sustainRotationArcSpan = function (currentWEPos)
{
	maybe_exec(
		() => this.statusBarDriver.report('Jelöld ki a kifeszítendő forgatásív kezdőpozícióját...'),
		rotationArcSpan => {
			const log = rotationArcSpan.stepOrWaitAlsoLog(currentWEPos); // @TODO: Discuss breach of command-query separation principle
			this.statusBarDriver.report(log.message());
		},
		this.state.maybeRotationArcSpan
	);
};

GeomTransformationController.prototype.closeRotationArcSpan = function ()
{
	this.state.maybeRotationArcSpan = ['nothing'];
	this.statusBarDriver.report('Forgatásív véglegesítve és végrehajtva.');
};

/** Scale: */

GeomTransformationController.prototype.openScaleStressSpan = function (commandNamePair, currentWEPos, eitherTarget)
{
	// @TODO: reuse repeating code occurrences
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const consoleMessage = maybe(
		'Az átméretezéshez nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			this.state.maybeScaleStressSpan = ['just', new ScaleStressSpan(this.state.interpret(commandNamePair), currentWEPos, nearestFigure, canvasPseudoWidget)];
			//const log = new ScaleStressSpanLog(radAOA_, [currentWEPos, nearestFigure.grasp, currentWEPos], nearestFigure.referenceAngle, ['nothing']);
			return '...';//log.message();
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(consoleMessage);
};

GeomTransformationController.prototype.sustainScaleStressSpan = function (currentWEPos)
{
	maybe_exec(
		() => this.statusBarDriver.report('Jelöld ki a kifeszítendő átméretezőfeszültség kezdőpozícióját...'),
		scaleStressSpan => {
			const log = scaleStressSpan.stepOrWaitAlsoLog(currentWEPos); // @TODO: Discuss breach of command-query separation principle
			this.statusBarDriver.report('......');//log.message(); // @TODO: Plan log message
		},
		this.state.maybeScaleStressSpan
	);
};

GeomTransformationController.prototype.closeScaleStressSpan = function ()
{
	this.state.maybeScaleStressSpan = ['nothing'];
	this.statusBarDriver.report('Forgatásív véglegesítve és végrehajtva.');
};

/** Reflection: */


GeomTransformationController.prototype.reflectionFlip = function (commandNamePair, currentWEPos, eitherTarget)
{
	// @TODO: reuse repeating code occurrences
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget),
	      board              = canvasPseudoWidget.board();
	const consoleMessage = maybe(
		'A tükrözéshez nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const reflectionFlip = new ReflectionFlip(this.state.interpret(commandNamePair), nearestFigure, canvasPseudoWidget);
			const log = reflectionFlip.stepOrWaitAlsoLog();
			return '...';//log.message(); // @TODO: Plan log message
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.statusBarDriver.report(consoleMessage);
};
