function DomainObject(figure)
{
	this.figure = figure; // @TODO considere whether every future business object has a figure. // @TODO lehet hogy jó csak a Room-ban (és talán a Furniture-ban?) deklarálni, és az absztrakt DomainObject osztályból meg kivenni. Nem feltétlen minden üzletiolbektum kötődik alakzathoz. Pl. van cím is, igaz, az nem köthető üzleti objektumhoz. Lehet, hogy a Furniture sem fog alakzathoz kötődni (ez még bizonytalan, hisz a bútornak azért bennfoglaló téglalapdoboza azért biztos van, aszerint ütközik is. Mindenesetre a Furniture képhez is kötődik.
	this.maybeHost = ['nothing']; // @TODO: Explicit, ,,külső'', önálló fa adatstruktúrát használjunk a business objektumok tartalmazási hierarchiájának nyivántartására: Tree<BusinessObject>
}


DomainObject.prototype.perimeter = function () {return this.figure.perimeter();};
DomainObject.prototype.copy      = function () {return new DomainObject(this.figure.translation([0,0]));}; // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
DomainObject.prototype.centering = function () {var copy = this.copy(); copy.figure.doCentering(); return copy;};

// DomainObject.prototype.goUpdatedByOwnFigure = function () {}; // @TODO: decide: abstract or dummy method?
