function NearestTwo (centre, objects, objectToPolygon)
{
	this.centre          = centre;
	this.objects         = objects;
	this.objectToPolygon = objectToPolygon;
};

NearestTwo.prototype.withDistances = function ()
{
	return this.objects.map(
		object => new Pair(
			object,
			distance(
				this.centre,
				centroid(
					this.objectToPolygon(object)
				)
			)
		)
	);
};

NearestTwo.prototype.inAscendingDistance = function ()
{
	return this.withDistances().sort(
		(pair1, pair2) => pair1.snd() - pair2.snd()
	);
};
