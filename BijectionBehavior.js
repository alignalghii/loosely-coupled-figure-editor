function BijectionBehavior () {Behavior.call(this);}

BijectionBehavior.prototype = Object.create(Behavior.prototype);

BijectionBehavior.prototype.constructor = BijectionBehavior;

BijectionBehavior.prototype.shouldWorkWithStraightSetInBothDirections = function ()
{
	var bijection = new Bijection();
	var a1 = {}; var b1 = {};
	var a2 = {}; var b2 = {};
	var a3 = {}; var b3 = {};

	bijection.set(a1, b1);
	bijection.set(a2, b2);
	bijection.set(a3, b3);
	return	bijection.get       (a1) == b1 && bijection.get       (a2) == b2 && bijection.get       (a3) == b3 &&
		bijection.getInverse(b1) == a1 && bijection.getInverse(b2) == a2 && bijection.getInverse(b3) == a3 ;
};

BijectionBehavior.prototype.shouldBeEmptyIfNew = function ()
{
	var bijection = new Bijection();
	return bijection.size() == 0 && bijection.size() == 0;
};

BijectionBehavior.prototype.shouldSettingEnlargeDomainAndRange = function ()
{
	var a1 = {}; var b1 = {};
	var a2 = {}; var b2 = {};
	var a3 = {}; var b3 = {};

	var bijection = new Bijection();
	var flag0 = bijection.size() == 0;
	bijection.set(a1, b1);
	var flag1 = bijection.size() == 1;
	bijection.set(a2, b2);
	var flag2 = bijection.size() == 2;
	bijection.set(a3, b3);
	var flag3 = bijection.size() == 3;

	return flag0 && flag1 && flag2 &&flag3;
};

BijectionBehavior.prototype.shouldDeletionReduceBothDomainAndRange = function ()
{
	var a1 = {}; var b1 = {};
	var a2 = {}; var b2 = {};
	var a3 = {}; var b3 = {};

	var bijection = new Bijection();

	bijection.set(a1, b1);
	bijection.set(a2, b2);
	bijection.set(a3, b3);

	var flag3 = bijection.size() == 3;
	bijection.delete(a1);
	var flag2 = bijection.size() == 2;
	bijection.delete(a2);
	var flag1 = bijection.size() == 1;
	bijection.delete(a3);
	var flag0 = bijection.size() == 0;

	return flag0 && flag1 && flag2 && flag3;
};

BijectionBehavior.prototype.shouldAlsoDeletionInverseReduceBothDomainAndRange = function ()
{
	var a1 = {}; var b1 = {};
	var a2 = {}; var b2 = {};
	var a3 = {}; var b3 = {};

	var bijection = new Bijection();

	bijection.set(a1, b1);
	bijection.set(a2, b2);
	bijection.set(a3, b3);

	var flag3 = bijection.size() == 3;
	bijection.deleteInverse(b1);
	var flag2 = bijection.size() == 2;
	bijection.deleteInverse(b2);
	var flag1 = bijection.size() == 1;
	bijection.deleteInverse(b3);
	var flag0 = bijection.size() == 0;

	return flag1 && flag2 && flag3;
};

BijectionBehavior.prototype.shouldInvertTheMapObjectItself = function ()
{
	var a1 = {}; var b1 = {};
	var a2 = {}; var b2 = {};
	var a3 = {}; var b3 = {};

	var bijection = new Bijection();

	bijection.set(a1, b1);
	bijection.set(a2, b2);
	bijection.set(a3, b3);

	bijection.doInvertIt();

	return	bijection.size() == 3 &&
		bijection.get       (b1) == a1 && bijection.get       (b2) == a2 && bijection.get       (b3) == a3 &&
		bijection.getInverse(a1) == b1 && bijection.getInverse(a2) == b2 && bijection.getInverse(a3) == b3 ;
}

// BijectionBehavior.prototype.createInverseOf = function () {} @TODO
