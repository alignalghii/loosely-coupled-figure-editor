function MaybeBehavior () {}

MaybeBehavior.prototype.shouldPassAll = function () {return this.shouldAccessJust() && this.shouldAccessNothing() && this.shouldMap();};

MaybeBehavior.prototype.shouldAccessJust    = () => Maybe.just(1)  .maybe_val(10, n => n + 1) ==  2 && Maybe.just(1)  .maybe_exec(() => 10, n => n + 1) ==  2;
MaybeBehavior.prototype.shouldAccessNothing = () => Maybe.nothing().maybe_val(10, n => n + 1) == 10 && Maybe.nothing().maybe_exec(() => 10, n => n + 1) == 10;

MaybeBehavior.prototype.shouldMap = () => Maybe.just(7).map(n => n + 1).maybe_val(10, n => n + 3) == 11 && Maybe.nothing().map(n => n + 1).maybe_val(10, n => n + 2) == 10;
