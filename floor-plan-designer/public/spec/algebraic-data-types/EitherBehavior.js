function EitherBehavior () {}

EitherBehavior.prototype.shouldPassAll = function () {return this.shouldAccessLeft() && this.shouldAccessRight() && this.shouldMap();};

EitherBehavior.prototype.shouldAccessLeft  = () => Either.left (7).either(n => n + 1, n => n * 10) ==  8;
EitherBehavior.prototype.shouldAccessRight = () => Either.right(7).either(n => n + 1, n => n * 10) == 70;

EitherBehavior.prototype.shouldMap = () =>
	Either.left (0).map(n => n + 1).either(n => n + 1, n => n * 10) ==  1 &&
	Either.right(7).map(n => n + 1).either(n => n + 1, n => n * 10) == 80;
