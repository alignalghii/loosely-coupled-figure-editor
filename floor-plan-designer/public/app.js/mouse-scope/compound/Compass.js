function Compass(loc) {this.loc = loc;}

Compass.prototype.sections = function ()
{
	return [
		[[ 1,  1], [ 2,  2]],
		[[-1, -1], [-2, -2]],
		[[ 1, -1], [ 2, -2]],
		[[-1,  1], [-2,  2]]
	].map(
		edge => edge.map(
			point => addVec(this.loc, point)
		)
	);
};
