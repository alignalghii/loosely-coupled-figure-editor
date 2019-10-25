function BusinessObject(figure, escorts = [])
{
	this.figure = figure; // @TODO considere whether every future business object has a figure. // @TODO lehet hogy jó csak a Room-ban (és talán a Furniture-ban?) deklarálni, és az absztrakt BusinessObject osztályból meg kivenni. Nem feltétlen minden üzletiolbektum kötődik alakzathoz. Pl. van cím is, igaz, az nem köthető üzleti objektumhoz. Lehet, hogy a Furniture sem fog alakzathoz kötődni (ez még bizonytalan, hisz a bútornak azért bennfoglaló téglalapdoboza azért biztos van, aszerint ütközik is. Mindenesetre a Furniture képhez is kötődik.
	this.escorts = escorts;
	this.maybeHost = ['nothing']; // @TODO: Explicit, ,,külső'', önálló fa adatstruktúrát használjunk a business objektumok tartalmazási hierarchiájának nyivántartására: Tree<BusinessObject>
}


BusinessObject.prototype.perimeter = function () {return this.figure.perimeter();};
BusinessObject.prototype.copy      = function () {return new BusinessObject(this.figure.translation([0,0]));}; // @TODO make a `clone` function in `Figure` and resuse it the more occasions as possible
BusinessObject.prototype.centering = function () {var copy = this.copy(); copy.figure.doCentering(); return copy;};

// BusinessObject.prototype.goUpdatedByOwnFigure = function () {}; // @TODO: decide: abstract or dummy method?

BusinessObject.prototype.liberate = function ()
{
	return maybeMap(
		host => {
			if (!deleteItem(this, host.escorts)) throw 'Inconsistence';
			this.maybeHost = ['nothing'];
			return host;
		},
		this.maybeHost
	);
};

BusinessObject.prototype.setOrChangeHost = function (newHost)
{
	if (this.canEscort(newHost)) {
		const maybeOldHost = this.liberate();
		this.maybeHost = ['just', newHost];
		if (!addNonRepItem(this, newHost.escorts)) throw 'Inconsistence'; // @TODO: it is NOT impossible! these are two independent aspects!
		return ['just', maybeOldHost];
	} else {
		return ['nothing'];
	}
};

BusinessObject.prototype.addToEscorts = function (escortCandidate) {return escortCandidate.setOrChangeHost(this);};

BusinessObject.prototype.canEscort = function (candidateHost) {return !isMember(this, candidateHost.ancestorChain());};

BusinessObject.prototype.ancestorChain = function ()
{
	const ancestorChain = [this];
	for (let who = this; who.maybeHost[0] == 'just'; who = who.maybeHost[1]) // @TODO reconsider code smell (`Maybe` module's encapsulation is violated)
		ancestorChain.push(who.maybeHost[1]);
	return ancestorChain;
};

BusinessObject.prototype.assertContainmentValidity = function ()
{
	const flags = {
		'escort-validity': maybe(
			true,
			host => isMember(this, host.escorts),
			this.maybeHost
		),
		'mother-validity': this.escorts.every(
			escort => maybeEq_shallow(escort.maybeHost, ['just', this]),
		)
	};
	if (anyFlagFalse(flags)) throw `Containment-validity inconsistence! Error subkinds: ${messageFalseFlags(flags)}.`;
};