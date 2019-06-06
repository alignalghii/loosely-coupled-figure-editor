function MassPoint2Factory () {}

MassPoint2Factory.prototype.testMassPoint2 = function (color, [x,y])
{
	return new MassPoint2(
		new Figure(
			[[ 0.5, -0.5], [ 0.5,  0.5], [-0.5,  0.5], [-0.5, -0.5]],
			{fill: color}
		).translation([x, y])
	);
};
