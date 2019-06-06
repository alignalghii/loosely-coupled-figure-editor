function MassPoint1Factory () {}

MassPoint1Factory.prototype.testMassPoint1 = function (color, [x,y])
{
	return new MassPoint1(
		new Figure(
			[[ 0.5, -0.5], [ 0.5,  0.5], [-0.5,  0.5], [-0.5, -0.5]],
			{fill: color}
		).translation([x, y])
	);
};
