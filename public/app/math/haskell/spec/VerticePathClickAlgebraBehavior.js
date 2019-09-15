function VerticePathClickAlgebraBehavior() {}

VerticePathClickAlgebraBehavior.prototype.shouldTestVerticePathClickAlgebraBehavior = function () {return this.shouldAddVertex() && this.shouldDeleteVertex() && this.shouldMoveVertex();};

VerticePathClickAlgebraBehavior.prototype.shouldAddVertex    = () => vecEq(addVertex   ([[-5, -5],          [-5, 5], [5, 5], [-5, 5]], [0, -6]), [[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]]);
VerticePathClickAlgebraBehavior.prototype.shouldDeleteVertex = () => vecEq(deleteVertex([[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]], [0, -7]), [[-5, -5],          [-5, 5], [5, 5], [-5, 5]]);
VerticePathClickAlgebraBehavior.prototype.shouldMoveVertex   = () => vecEq(moveVertex  ([[-5, -5], [0, -6], [-5, 5], [5, 5], [-5, 5]], [0, -7]), [[-5, -5], [0, -7], [-5, 5], [5, 5], [-5, 5]]);
