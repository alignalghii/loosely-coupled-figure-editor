function Bijection () {this.mapStraight = new Map; this.mapInverse = new Map;}

Bijection.prototype.set        = function (a, b) {this.mapStraight.set(a, b); this.mapInverse.set(b, a);};

Bijection.prototype.get        = function (a) {return this.mapStraight.get(a);};
Bijection.prototype.getInverse = function (b) {return this.mapInverse .get(b);};

Bijection.prototype.has        = function (a) {return this.mapStraight.has(a);};
Bijection.prototype.hasInverse = function (b) {return this.mapInverse .has(b);};

Bijection.prototype.domain = function () {return this.mapStraight.keys();}
Bijection.prototype.range  = function () {return this.mapInverse .keys();}
Bijection.prototype.size   = function () {return this.mapStraight.size;}

Bijection.prototype.delete        = function (a) {var b = this.mapStraight.get(a); this.mapStraight.delete(a); this.mapInverse.delete(b);}
Bijection.prototype.deleteInverse = function (b) {var a = this.mapInverse .get(b); this.mapStraight.delete(a); this.mapInverse.delete(b);}

Bijection.prototype.doInvertIt = function () {[this.mapStraight, this.mapInverse] = [this.mapInverse, this.mapStraight];};

Bijection.prototype.deleteAll = function () {this.mapStraight.clear(); this.mapInverse.clear();};


Bijection.prototype.exportToSerializableObject = function ()
{
	return {
		mapStraight: exportMapToSerializableObject(this.mapStraight),
		mapInverse : exportMapToSerializableObject(this.mapInverse )
	};
};

Bijection.prototype.exportToSerializableObjectBy = function (specialKey)
{
	return exportMapToSerializableObjectBy(this.mapStraight, specialKey);
};


// @TODO put it into a better module file
function exportMapToSerializableObject(map)
{
	const arrayRepresentation = [];
	for (let [x, y] of map) {
		arrayRepresentation.push([x, y]);
	}
	return arrayRepresentation;
}


function exportMapToSerializableObjectBy(map, specialKey)
{
	const objectRepresentation = {};
	let i = 1;
	for (let [x, y] of map) {
		if (x == specialKey) {
			objectRepresentation.own = y;
		} else {
			objectRepresentation[`other_${i++}`] = y;
		}
	}
	return objectRepresentation;
}
