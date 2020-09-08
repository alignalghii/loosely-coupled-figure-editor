function Magnet1Controller(state, canvasPseudoWidgets, gravity, statusBarDriver)
{
	this.state               = state;
	this.gravity             = gravity;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
	this.statusBarDriver     = statusBarDriver;
}

Object.assign(Magnet1Controller.prototype, ControllerMixinHistoryFollowable);
Object.assign(Magnet1Controller.prototype, ControllerMixinCanvasWidgetable);

Magnet1Controller.prototype.guess = function (currentWEPos, eitherTarget)
{
	console.log(`Magnet1 controller guess at ${JSON.stringify(currentWEPos)}`);
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget);
	const figureWidgets = canvasPseudoWidget.figureWidgets();
	const widgetToPolygon = widget => widget.high.vertices;
	const nearestTwo = new NearestTwo(currentWEPos, figureWidgets, widgetToPolygon);
	const sight = nearestTwo.inAscendingDistance();
	sight.maybeHeadPair().map(
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
				if (this.gravity.isSensible(a1a2)) {
					console.log('Gravitational action triggers!');
				}
				a1a2.uncurry(
					(a1, a2) => console.log(`a1 = ${a1}, a2 = ${a2}`)
				);
			}
		)
	);
};

/*
descartesWith( angle2_0360,  rotationalEdgeVectors([[0,0], [1,0], [1,1], [0,1]]),       rotationalEdgeVectors([[1,0], [2,0], [2,1], [1,1]])  )
@TODO: write a property findder: (a -> Bool) -> [a] -> index/reference. We wil use this to select widgets (ref indentity is important)
@TODO: write another property finder: (a -> Bool) -> [a] -> a . Copy value is enough. We can use that to select the two nearmost sides of the polygon pair.
*/
