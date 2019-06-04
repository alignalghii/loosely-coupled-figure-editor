function MassPointFactory () {}

MassPointFactory.prototype.testMassPoint = function (color, [x,y])
{
	return new MassPoint(
		new Figure(
			[[ 0.5, -0.5], [ 0.5,  0.5], [-0.5,  0.5], [-0.5, -0.5]],
			{fill: color}
		).translation([x, y])
	);
};
