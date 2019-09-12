function DomainObject(figure) {this.figure = figure;} // @TODO considere whether every future business object has a figure

DomainObject.prototype.perimeter = function () {return this.figure.perimeter();};
DomainObject.prototype.copy      = function () {return new DomainObject(this.figure.translation([0,0]));}; // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
DomainObject.prototype.centering = function () {var copy = this.copy(); copy.figure.doCentering(); return copy;};
