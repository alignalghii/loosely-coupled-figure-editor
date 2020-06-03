function MathematicalObject () {}

MathematicalObject.prototype.isCollidable_ = () => ['nothing'];

MathematicalObject.prototype.isCollidable  = function () {return isJust(this.isCollidable_());};
