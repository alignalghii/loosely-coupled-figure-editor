// @TODO: put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?


function FigureEditorByProximityHeuristic(figure) {this.figure = figure;}



FigureEditorByProximityHeuristic.prototype.addVertex    = function (point, isAreaInvariant) {this.withAreaInvarianceIf('addVertex_rough'   , isAreaInvariant, point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex = function (point, isAreaInvariant) {this.withAreaInvarianceIf('deleteVertex_rough', isAreaInvariant, point);};
FigureEditorByProximityHeuristic.prototype.moveVertex   = function (point, isAreaInvariant) {this.withAreaInvarianceIf('moveVertex_rough'  , isAreaInvariant, point);};

FigureEditorByProximityHeuristic.prototype.pushEdge       = function (point, isAreaInvariant) {this.withAreaInvarianceIf('pushEdge_rough'      , isAreaInvariant, point);};
FigureEditorByProximityHeuristic.prototype.pushnormalEdge = function (point, isAreaInvariant) {this.withAreaInvarianceIf('pushnormalEdge_rough', isAreaInvariant, point);};
FigureEditorByProximityHeuristic.prototype.spanEdge = function (point, drgV, isAreaInvariant) {this.withAreaInvarianceIf('spanEdge_rough', isAreaInvariant, point, drgV);};



FigureEditorByProximityHeuristic.prototype.withAreaInvarianceIf = function (command, isAreaInvariant, point, optArg)
{
	this[isAreaInvariant ? 'withAreaInvariance' : 'plainExec'](command, point, optArg);
};

FigureEditorByProximityHeuristic.prototype.withAreaInvariance = function (command, point, optArg)
{
	const areaBefore = this.figure.area();
	this.plainExec(command, point, optArg);
	const areaAfter = this.figure.area();
	const q = Math.sqrt(areaAfter/areaBefore);
	this.figure.doScale(1/q);
};

FigureEditorByProximityHeuristic.prototype.plainExec = function (command, point, optArg)
{
	typeof optArg != undefined ? this[command](point, optArg)
	                           : this[command](point);
};



FigureEditorByProximityHeuristic.prototype.addVertex_rough    = function (point) {this.figure.vertices = addVertex   (this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex_rough = function (point) {this.figure.vertices = deleteVertex(this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.moveVertex_rough   = function (point) {this.figure.vertices = moveVertex  (this.figure.vertices, point);};

FigureEditorByProximityHeuristic.prototype.pushEdge_rough       = function (point)             {this.figure.vertices = pushEdge      (this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.pushnormalEdge_rough = function (point)             {this.figure.vertices = pushnormalEdge(this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.spanEdge_rough       = function (point, dragVector) {this.figure.vertices = spanEdge      (this.figure.vertices, point, dragVector);};
