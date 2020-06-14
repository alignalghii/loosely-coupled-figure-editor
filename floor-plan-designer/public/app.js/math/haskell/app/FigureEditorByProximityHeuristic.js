// @TODO: put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditorByProximityHeuristic` class?


function FigureEditorByProximityHeuristic(figure) {this.figure = figure;}

FigureEditorByProximityHeuristic.prototype.addVertex      = function (point) {this.figure.vertices = addVertex   (this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.deleteVertex   = function (point) {this.figure.vertices = deleteVertex(this.figure.vertices, point);};
FigureEditorByProximityHeuristic.prototype.moveVertex     = function (point) {this.figure.vertices = moveVertex  (this.figure.vertices, point);};

FigureEditorByProximityHeuristic.prototype.pushEdge       = function (point)             {this.figure.vertices = pushEdge      (this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.pushnormalEdge = function (point)             {this.figure.vertices = pushnormalEdge(this.figure.vertices, point            );};
FigureEditorByProximityHeuristic.prototype.spanEdge       = function (point, dragVector) {this.figure.vertices = spanEdge      (this.figure.vertices, point, dragVector);};