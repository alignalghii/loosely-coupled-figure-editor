function CollisionAsVectorFieldTransformationBehavior () {}

CollisionAsVectorFieldTransformationBehavior.prototype.shouldPolygon2ToContainment = function ()
{
	return true &&
		polygon2ToContainment([[0, 0], [ 2, 0], [ 1,  1]], [[10, 0], [12, 0], [11,  1]]) === 'areAlien'      &&
		polygon2ToContainment([[5, 5], [ 5, 7], [ 6,  6]], [[ 0, 0], [20, 0], [10, 10]]) === 'isPartOf'      &&
		polygon2ToContainment([[0, 0], [20, 0], [10, 10]], [[ 5, 5], [ 5, 7], [ 6,  6]]) === 'isContainerOf' &&
		true;
};

CollisionAsVectorFieldTransformationBehavior.prototype.shouldContainmentToSign2 = function ()
{
	return true &&
		vecEq(containmentToSign2('areAlien'     ), ['-', '-']) &&
		vecEq(containmentToSign2('isPartOf'     ), ['-', '+']) &&
		vecEq(containmentToSign2('isContainerOf'), ['+', '-']) &&
		true;
};

CollisionAsVectorFieldTransformationBehavior.prototype.shouldSignWithPolygonToSignedPolygon = function ()
{
	return true &&
		vecEq(signWithPolygon('+', [[0, 0], [2, 0], [1, 1]]), ['+', [[0, 0], [2, 0], [1, 1]]]) &&
		vecEq(signWithPolygon('-', [[0, 0], [2, 0], [1, 1]]), ['-', [[0, 0], [2, 0], [1, 1]]]) &&
		true;
};

CollisionAsVectorFieldTransformationBehavior.prototype.shouldContainmentWithPolygon2ToSignedPolygon2 = function ()
{
	return true &&
		vecEq(
			containmentWithPolygon2ToSignedPolygon2(
				'areAlien'     ,
				[[0, 0], [ 2, 0], [ 1,  1]] ,       [[10, 0], [12, 0], [11,  1]]
			),
			[['-',  [[0, 0], [ 2, 0], [ 1,  1]]], ['-', [[10, 0], [12, 0], [11,  1]]]]
		) &&
		vecEq(
			containmentWithPolygon2ToSignedPolygon2(
				'isPartOf'     ,
				[[5, 5], [ 5, 7], [ 6,  6]] ,       [[ 0, 0], [20, 0], [10, 10]]
			),
			[['-',  [[5, 5], [ 5, 7], [ 6,  6]]], ['+', [[ 0, 0], [20, 0], [10, 10]]]]
		) &&
		vecEq(
			containmentWithPolygon2ToSignedPolygon2(
				'isContainerOf',
				[[0, 0], [20, 0], [10, 10]] ,       [[ 5, 5], [ 5, 7], [ 6,  6]]
			),
			[['+',  [[0, 0], [20, 0], [10, 10]]], ['-', [[ 5, 5], [ 5, 7], [ 6,  6]]]]
		) &&
		true;
};

CollisionAsVectorFieldTransformationBehavior.prototype.shouldPolygon2ToSignedPolygon2 = function ()
{
	return true &&
		vecEq(
			polygon2ToSignedPolygon2(
				[[0, 0], [ 2, 0], [ 1,  1]] ,       [[10, 0], [12, 0], [11,  1]]
			),
			[['-',  [[0, 0], [ 2, 0], [ 1,  1]]], ['-', [[10, 0], [12, 0], [11,  1]]]]
		) &&
		vecEq(
			polygon2ToSignedPolygon2(
				[[5, 5], [ 5, 7], [ 6,  6]] ,       [[ 0, 0], [20, 0], [10, 10]]
			),
			[['-',  [[5, 5], [ 5, 7], [ 6,  6]]], ['+', [[ 0, 0], [20, 0], [10, 10]]]]
		) &&
		vecEq(
			polygon2ToSignedPolygon2(
				[[0, 0], [20, 0], [10, 10]] ,       [[ 5, 5], [ 5, 7], [ 6,  6]]
			),
			[['+',  [[0, 0], [20, 0], [10, 10]]], ['-', [[ 5, 5], [ 5, 7], [ 6,  6]]]]
		) &&
		true;
};

CollisionAsVectorFieldTransformationBehavior.prototype.shouldSignedPolygonToVectorFieldTransformationNC = function () // UC: not curried
{
	return true &&
		vecEq(signedPolygonToVectorFieldTransformationNC(['+', [[0, 0], [20, 0], [10, 10]]])([10, 0], [0, -2]), [0,  0]) &&
		vecEq(signedPolygonToVectorFieldTransformationNC(['+', [[0, 0], [20, 0], [10, 10]]])([10, 0], [0,  2]), [0,  2]) &&
		vecEq(signedPolygonToVectorFieldTransformationNC(['-', [[0, 0], [20, 0], [10, 10]]])([10, 0], [0, -2]), [0, -2]) &&
		vecEq(signedPolygonToVectorFieldTransformationNC(['-', [[0, 0], [20, 0], [10, 10]]])([10, 0], [0,  2]), [0,  0]) &&
		true;
};

/*CollisionAsVectorFieldTransformationBehavior.prototype.should = function ()
{
	return true &&
		vecEq((), []) &&
		true;
};*/
