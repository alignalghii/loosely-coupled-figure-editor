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
	this.getMaybeGuess(currentWEPos, eitherTarget).map(
		guess => guess.maybeNearestEdgeFromPolygon1.map(
			nearestEdge1 => maybeNearestEdgeOfFrom(
				guess.polygon2,
				currentWEPos
			).map(
				nearestEdge2 => {
					const angle = angle2_0360(
						vectorOfSegment(nearestEdge1),
						vectorOfSegment(nearestEdge2)
					);
					console.log(`Angle: ${angle}`);
					guess.widget1.rotate((angle-180)*Math.PI/180);
				}
			)
		)
	);
};

MagnetController.prototype.guessTranslation = function (currentWEPos, eitherTarget)
{
	this.getMaybeGuess(currentWEPos, eitherTarget).map(
		guess => guess.maybeNearestEdgeFromPolygon1.map(
			nearestEdge1 => {
				const roughVector = fromTo(
					centroid(nearestEdge1),
					currentWEPos
				);
				const normalVectors = ['positive-rotation', 'negative-rotation'].map(
					rotDir => rotBy90(rotDir, edgeVector(nearestEdge1))
				);
				console.log('NormalVectors', normalVectors);
				const maybeFallVector = normalVectors.filter(
					normalVector => 0 < scalarProduct(normalVector, roughVector)
				).toMaybe().bind(
					fallDirectionVector => Maybe.fromObsolete(
						fallPolygonOnPolygon(fallDirectionVector, guess.polygon1, guess.polygon2)
					)
				);
				console.log('maybeFallVector', maybeFallVector);
				maybeFallVector.map(
					fallVector => guess.widget1.translate(fallVector)
				);
			}
		)
	);
};

MagnetController.prototype.getMaybeGuess = function (currentWEPos, eitherTarget)
{
	console.log(`Magnet1 controller guess at ${JSON.stringify(currentWEPos)}`);
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget);
	const figureWidgets = canvasPseudoWidget.figureWidgets();
	const widgetToPolygon = widget => widget.high.vertices;
	const nearestTwo = new NearestTwo(currentWEPos, figureWidgets, widgetToPolygon);
	const sight = nearestTwo.inAscendingDistance();
	return sight.maybeHeadPair().bind(
		headPair => headPair.map(
			widgetAndDistance => widgetAndDistance.fst()
		).uncurry(
			(widget1, widget2) => {
				console.log('The two widgets:', widget1.businessObject.title.name, widget2.businessObject.title.name);
				const polygon1 = widgetToPolygon(widget1);
				const polygon2 = widgetToPolygon(widget2);
				const F = this.gravity.force(polygon1, polygon2);
				const a1a2 = this.gravity.accelerationPair(polygon1, polygon2);
				console.log(`F = ${F} N`);
				return Maybe.ifTrue_lazy(
					this.gravity.isSensible(a1a2),
					() => new Guess(
						polygon1, polygon2,
						maybeNearestEdgeOfFrom(polygon1, currentWEPos),
						widget1
					)
				);
			}
		)
	);
};


function Guess(polygon1, polygon2, maybeNearestEdgeFromPolygon1, widget1) // @TODO DRY redundancy
{
	this.polygon1 = polygon1;
	this.polygon2 = polygon2;
	this.maybeNearestEdgeFromPolygon1 = maybeNearestEdgeFromPolygon1;
	this.widget1 = widget1; // @TODO DRY redundancy
}
