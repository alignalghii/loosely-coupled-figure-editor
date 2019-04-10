function Bijection () {this.mapStraight = new Map; this.mapInverse = new Map;}

Bijection.prototype.set        = function (a, b) {this.mapStraight.set(a, b); this.mapInverse.set(b, a);};

Bijection.prototype.get        = function (a) {return this.mapStraight.get(a);};
Bijection.prototype.getInverse = function (b) {return this.mapInverse .get(b);};

Bijection.prototype.domain = function () {return this.mapStraight.keys;}
Bijection.prototype.range  = function () {return this.mapInverse .keys;}
Bijection.prototype.size   = function () {return this.mapStraight.size;}

Bijection.prototype.delete        = function (a) {var b = this.mapStraight.get(a); this.mapStraight.delete(a); this.mapInverse.delete(b);}
Bijection.prototype.deleteInverse = function (b) {var a = this.mapInverse .get(b); this.mapStraight.delete(a); this.mapInverse.delete(b);}

Bijection.prototype.doInvertIt = function () {[this.mapStraight, this.mapInverse] = [this.mapInverse, this.mapStraight];};
