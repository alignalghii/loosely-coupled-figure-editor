// Alternative names: FigureBetweennessContext
function BiFigCxt(/*DepInj:*/ widgetToPolygon, gravity, /*base:*/ widget1, widget2, /*arg*/ currentWEPos) // @TODO DRY redundancy
{
	// DepInj:

	this.widgetToPolygon = widgetToPolygon; // @TODO DRY redundancy
	this.gravity = gravity;

	// Base:

	this.widget1 = widget1;
	this.widget2 = widget2;

	// Cache:

	this.polygon1 = widgetToPolygon(widget1);
	this.polygon2 = widgetToPolygon(widget2);

	this.F = this.gravity.force(this.polygon1, this.polygon2);
	this.a1a2 = this.gravity.accelerationPair(this.polygon1, this.polygon2);
	this.triggerFlag = this.gravity.isSensible(this.a1a2); // @TODO should `isSensible` belong to `BiFigCxt` instead of `Gravity`? Note that `Gravity` has also `meterInHighLevelUnits`

	this.eitherErrorCodeFlagOrNearestEdge1 =
		Maybe.ifTrue_lazy(
			this.triggerFlag,
			() => maybeNearestEdgeOfFrom(this.polygon1, currentWEPos)
		).assoc();
}

BiFigCxt.prototype.maybeTranslate = function (currentWEPos)
{
	return this.eitherErrorCodeFlagOrNearestEdge1.map(
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
					fallPolygonOnPolygon(fallDirectionVector, this.polygon1, this.polygon2)
				)
			);
			console.log('maybeFallVector', maybeFallVector);
			maybeFallVector.map(
				fallVector => this.widget1.translate(fallVector)
			);
		}
	);
};

BiFigCxt.prototype.maybeRotate = function (currentWEPos)
{
	this.eitherErrorCodeFlagOrNearestEdge1.map(
		nearestEdge1 => maybeNearestEdgeOfFrom(
			this.polygon2,
			currentWEPos
		).map(
			nearestEdge2 => {
				const angle = angle2_0360(
					vectorOfSegment(nearestEdge1),
					vectorOfSegment(nearestEdge2)
				);
				console.log(`Angle: ${angle}`);
				this.widget1.rotate((angle-180)*Math.PI/180);
			}
		)
	);
};
