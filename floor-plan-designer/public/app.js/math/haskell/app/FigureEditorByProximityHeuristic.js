// @TODO: put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?


function FigureEditorByProximityHeuristic(figure) {this.figure = figure;}

/** Generating by reflection:
 * FigureEditorByProximityHeuristic.prototype.addVertex    = function (point, isAreaInvariant) {this.withAreaInvarianceIf(this.addVertex_rough   , isAreaInvariant, point);};
 * FigureEditorByProximityHeuristic.prototype.deleteVertex = function (point, isAreaInvariant) {this.withAreaInvarianceIf(this.deleteVertex_rough, isAreaInvariant, point);};
 * FigureEditorByProximityHeuristic.prototype.moveVertex   = function (point, isAreaInvariant) {this.withAreaInvarianceIf(this.moveVertex_rough  , isAreaInvariant, point);};
 *
 * FigureEditorByProximityHeuristic.prototype.pushEdge       = function (point, isAreaInvariant) {this.withAreaInvarianceIf(this.pushEdge_rough      , isAreaInvariant, point);};
 * FigureEditorByProximityHeuristic.prototype.pushnormalEdge = function (point, isAreaInvariant) {this.withAreaInvarianceIf(this.pushnormalEdge_rough, isAreaInvariant, point);};
 * FigureEditorByProximityHeuristic.prototype.spanEdge = function (point, drgV, isAreaInvariant) {this.withAreaInvarianceIf(this.spanEdge_rough, isAreaInvariant, point, drgV);};
 */

FigureEditorByProximityHeuristic.prototype.addVertex_rough    = function (point) {this.figure.vertices = addVertex   (this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex_rough = function (point) {this.figure.vertices = deleteVertex(this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.moveVertex_rough   = function (point) {this.figure.vertices = moveVertex  (this.figure.vertices, point);};

FigureEditorByProximityHeuristic.prototype.pushEdge_rough       = function (point)             {this.figure.vertices = pushEdge      (this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.pushnormalEdge_rough = function (point)             {this.figure.vertices = pushnormalEdge(this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.spanEdge_rough       = function (point, dragVector) {this.figure.vertices = spanEdge      (this.figure.vertices, point, dragVector);};


Reflect.smartizeMatchingOwnMethods(
	FigureEditorByProximityHeuristic,
	/(.*)_rough$/,
	roughMethod =>
		function (point, arg2, ...restArgs)
		{
			return this.withAreaInvarianceIf(
				roughMethod,
				...
					restArgs.length > 0 ? [restArgs[0], point, arg2]
					                    : [arg2, point]
			);
		}
);


FigureEditorByProximityHeuristic.prototype.withAreaInvarianceIf = function (method, isAreaInvariant, ...restArgs)
{
	const areaBefore = this.figure.area();
	const result = method.call(this, ...restArgs);
	const areaAfter = this.figure.area();
	const q = Math.sqrt(areaAfter/areaBefore);
	if (isAreaInvariant) {
		this.figure.doScale(1/q);
	}
	return result;
};
