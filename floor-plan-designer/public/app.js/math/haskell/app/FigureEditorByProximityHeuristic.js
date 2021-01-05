// @TODO: put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?


function FigureEditorByProximityHeuristic(figure) {this.figure = figure;}

FigureEditorByProximityHeuristic.prototype.addVertex_rough    = function (point) {this.figure.vertices = addVertex   (this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex_rough = function (point) {this.figure.vertices = deleteVertex(this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.moveVertex_rough   = function (point) {this.figure.vertices = moveVertex  (this.figure.vertices, point);};

FigureEditorByProximityHeuristic.prototype.pushEdge       = function (point)             {this.figure.vertices = pushEdge      (this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.pushnormalEdge = function (point)             {this.figure.vertices = pushnormalEdge(this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.spanEdge       = function (point, dragVector) {this.figure.vertices = spanEdge      (this.figure.vertices, point, dragVector);};


FigureEditorByProximityHeuristic.prototype.withAreaInvariance = function (command, point)
{
	const areaBefore = this.figure.area();
	this[command](point);
	const areaAfter = this.figure.area();
	const q = Math.sqrt(areaAfter/areaBefore);
	this.figure.doScale(1/q);
};


FigureEditorByProximityHeuristic.prototype.addVertex    = function (point) {this.withAreaInvariance('addVertex_rough'   , point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex = function (point) {this.withAreaInvariance('deleteVertex_rough', point);};
FigureEditorByProximityHeuristic.prototype.moveVertex   = function (point) {this.withAreaInvariance('moveVertex_rough'  , point);};
