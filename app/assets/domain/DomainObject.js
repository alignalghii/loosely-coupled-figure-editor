function DomainObject(figure) {this.figure = figure;}

DomainObject.prototype.perimeter = function () {return this.figure.perimeter();};
DomainObject.prototype.copy      = function () {return new DomainObject(this.figure.translation([0,0]));}; // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
