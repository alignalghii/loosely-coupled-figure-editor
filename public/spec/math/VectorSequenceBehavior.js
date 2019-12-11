function VectorSequenceBehavior () {}

VectorSequenceBehavior.prototype.shouldTestVectorSequenceBehavior = function () {return this.shouldMaybeReachEndPoint();};

VectorSequenceBehavior.prototype.shouldMaybeReachEndPoint = function ()
{
	return true &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]],  0), just([0, 0])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]],  4), just([4, 0])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]],  6), just([6, 0])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]],  7), just([6, 1])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 10), just([6, 4])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 12), just([4, 4])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 13), just([3, 4])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 14), just([2, 4])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 16), just([0, 4])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 17), just([0, 3])) &&
		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 19), just([0, 1])) &&

		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 20), just([0, 0])) &&

		treeEq(maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], 21), nothing     ) &&

		(
			() => {
				let flag = false;
				try {
					maybeReachEndPoint([0, 0], [[6, 0], [0, 4], [-6, 0], [0, -4]], -1);
				} catch (e) {
					if (/Error/.test(e)) flag = true;
				};
				return flag;
			}
		)() &&
		true;
};
