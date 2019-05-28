function PathCollisionBehavior () {}

PathCollisionBehavior.prototype.shouldSectionsTouchOrCross = function ()
{
	var a = [[-1, 11], [ 1,  7]];
	var b = [[ 0,  9], [ 4,  1]];
	var c = [[ 2,  5], [ 3,  3]];
	var d = [[ 4,  1], [13,  4]];
	var e = [[ 7,  2], [ 6, -2]];
	var f = [[ 5,  3], [ 3, -1]];
	var g = [[ 1,  7], [ 3,  3]];
	var h = [[ 8,  3], [11,  1]];
	var i = [[13,  4], [13,  2]];
	var j = [[12,  2], [14,  2]];

	return true &&
		 sectionsTouchOrCross(a, b) &&
		 sectionsTouchOrCross(b, c) &&
		!sectionsTouchOrCross(a, c) &&
		 sectionsTouchOrCross(a, g) &&
		 sectionsTouchOrCross(b, g) &&
		!sectionsTouchOrCross(c, d) &&
		 sectionsTouchOrCross(b, d) &&
		 sectionsTouchOrCross(d, e) &&
		 sectionsTouchOrCross(d, h) &&
		!sectionsTouchOrCross(e, h) &&
		 sectionsTouchOrCross(d, i) &&
		 sectionsTouchOrCross(i, j) &&
		!sectionsTouchOrCross(d, j) &&
		true;
};

PathCollisionBehavior.prototype.shouldPolygonPathsTouchOrCross = function ()
{
	return true &&
		 polygonPathsTouchOrCross([[0, 0], [2, 0], [1, 1]], [[1, 0], [3, 0], [2, 1]]) &&
		!polygonPathsTouchOrCross([[0, 0], [2, 0], [1, 1]], [[7, 0], [9, 0], [8, 1]]) &&
		true;
};
