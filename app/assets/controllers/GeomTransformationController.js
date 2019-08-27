function GeomTransformationController(state, widgetFactories, msgConsole)
{
	this.state           = state;
	this.widgetFactories = widgetFactories;
	this.msgConsole      = msgConsole;
}

GeomTransformationController.prototype = Object.create(Controller.prototype);
GeomTransformationController.prototype.constructor = GeomTransformationController;

/** Rotation: */

GeomTransformationController.prototype.openRotationArcSpan = function (currentWEPos, eitherTarget)
{
	const widgetFactory = this.widgetFactoryForEitherTarget(eitherTarget),
	      board         = widgetFactory.bijectionSvgToGeom;
	const consoleMessage = maybe(
		'A forgatáshoz nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			this.state.maybeRotationArcSpan = ['just', new RotationArcSpan(currentWEPos, nearestFigure, widgetFactory)];
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

/** Scale: */

GeomTransformationController.prototype.openScaleStressSpan = function (commandNames, currentWEPos, eitherTarget)
{
	const widgetFactory = this.widgetFactoryForEitherTarget(eitherTarget),
	      board         = widgetFactory.bijectionSvgToGeom;
	const consoleMessage = maybe(
		'Az átméretezéshez nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			this.state.maybeScaleStressSpan = ['just', new ScaleStressSpan(commandNames, currentWEPos, nearestFigure, widgetFactory)];
			//const log = new ScaleStressSpanLog(radAOA_, [currentWEPos, nearestFigure.grasp, currentWEPos], nearestFigure.referenceAngle, ['nothing']);
			return '...';//log.message();
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.msgConsole.innerHTML = consoleMessage;
};

GeomTransformationController.prototype.sustainScaleStressSpan = function (currentWEPos)
{
	maybe_exec(
		() => {this.msgConsole.innerHTML = 'Jelöld ki a kifeszítendő átméretezőfeszültség kezdőpozícióját...';},
		scaleStressSpan => {
			const log = scaleStressSpan.stepOrWaitAlsoLog(currentWEPos); // @TODO: Discuss breach of command-query separation principle
			this.msgConsole.innerHTML = '......';//log.message();
		},
		this.state.maybeScaleStressSpan
	);
};

GeomTransformationController.prototype.closeScaleStressSpan = function ()
{
	this.state.maybeScaleStressSpan = ['nothing'];
	this.msgConsole.innerHTML = 'Forgatásív véglegesítve és végrehajtva.';
};

/** Reflection: */


GeomTransformationController.prototype.reflectionFlip = function ([figCommandName, wdgCommandName], currentWEPos, eitherTarget)
{
	const widgetFactory = this.widgetFactoryForEitherTarget(eitherTarget),
	      board         = widgetFactory.bijectionSvgToGeom;
	const consoleMessage = maybe(
		'A tükrözéshez nem határozható meg egyértelműen legközelebbi alakzat.',
		nearestFigure => {
			const reflectionFlip = new ReflectionFlip([figCommandName, wdgCommandName], nearestFigure, widgetFactory);
			const log = reflectionFlip.stepOrWaitAlsoLog();
			return '...';//log.message();
		},
		maybeNearestFigureHence(board, currentWEPos)
	);
	this.msgConsole.innerHTML = consoleMessage;
};
