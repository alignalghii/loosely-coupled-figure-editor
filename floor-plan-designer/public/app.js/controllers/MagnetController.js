function MagnetController(state, canvasPseudoWidgets, gravity, statusBarDriver)
{
	this.state               = state;
	this.gravity             = gravity;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver     = statusBarDriver;
}

Object.assign(MagnetController.prototype, ControllerMixinHistoryFollowable);
Object.assign(MagnetController.prototype, ControllerMixinCanvasWidgetable);


// @TODO: a less efficient approach: descartesWith( angle2_0360,  rotationalEdgeVectors([[0,0], [1,0], [1,1], [0,1]]),       rotationalEdgeVectors([[1,0], [2,0], [2,1], [1,1]])  )
MagnetController.prototype.guessRotation = function (currentWEPos, eitherTarget)
{
	this.getMaybeBiFigCxt(currentWEPos, eitherTarget).map( // @TODO move to `BiFigCxt` as `maybeFactory`? Main principle: try to make `BiFigCxt` an algebraic datatype, or at least a model!
		biFigCxt => biFigCxt.maybeRotate(currentWEPos)
	);
};

MagnetController.prototype.guessTranslation = function (currentWEPos, eitherTarget)
{
	this.getMaybeBiFigCxt(currentWEPos, eitherTarget).map( // @TODO move to `BiFigCxt` as `maybeFactory`? Main principle: try to make `BiFigCxt` an algebraic datatype, or at least a model!
		biFigCxt => biFigCxt.maybeTranslate(currentWEPos)
	);
};



MagnetController.prototype.getMaybeBiFigCxt = function (currentWEPos, eitherTarget) // @TODO move to `BiFigCxt` as `maybeFactory`? Main principle: try to make `BiFigCxt` an algebraic datatype, or at least a model!
{
	console.log(`Magnet controller biFigCxt at ${JSON.stringify(currentWEPos)}`);
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget);
	const figureWidgets = canvasPseudoWidget.figureWidgets();
	const widgetToPolygon = widget => widget.high.vertices;
	const nearestTwo = new NearestTwo(currentWEPos, figureWidgets, widgetToPolygon);
	return nearestTwo.inAscendingDistance().maybeHeadPair().map(
		headPair => headPair.map(
			widgetAndDistance => widgetAndDistance.fst()
		).uncurry(
			(widget1, widget2) => new BiFigCxt(
				widgetToPolygon, this.gravity, // depInj
				widget1, widget2,              // base
				currentWEPos                   // arg
			)
		)
	);
};
