function CollisionAsVectorTransformationBehavior () {}

CollisionAsVectorTransformationBehavior.prototype.shouldTestCollisionAsVectorTransformationBehavior = function () {return this.shouldRestrictOrTeleport();};


CollisionAsVectorTransformationBehavior.prototype.shouldRestrictOrTeleport = function ()
{
	return true &&
	restrictOrTeleport([0.1, 0.2], ['nothing'   ], undefined )  == 1   &&
	restrictOrTeleport([0.1, 0.2], ['just', 10  ], undefined )  == 1   &&
	restrictOrTeleport([0.1, 0.2], ['just',  1  ], undefined )  == 1   &&
	restrictOrTeleport([0.1, 0.2], ['just',  0.5], undefined )  == 0.5 &&
	restrictOrTeleport([0.1, 0.2], ['just',  0.4], undefined )  == 0.4 &&
	restrictOrTeleport([0.1, 0.2], ['just',  0  ], dsp=>true )  == 1   &&
	restrictOrTeleport([0.1, 0.2], ['just',  0  ], dsp=>false)  == 0   &&
	true;
}

/*
CollisionAsVectorTransformationBehavior.prototype.shouldRestrictOrTeleport = function ()
{
	const board = new Map();
	const srcFigure = new Figure([[0,0], [2,0], [1,1]]);
	const tgtFigure = new Figure([[2,0], [4,0], [3,1]]);
	return true &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['nothing'   ])  == 1   &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['just', 10  ])  == 1   &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['just',  1  ])  == 1   &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['just',  0.5])  == 0.5 &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['just',  0.5])  == 0.5 &&
	restrictOrTeleport(undefined, undefined, [0.1, 0.2], ['just',  0.5])  == 0.5 &&
	true;
}
*/
