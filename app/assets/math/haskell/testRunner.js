function testRunner()
{
	const polygonBehavior                         = new PolygonBehavior,
	      fourierMotzkinEliminationBehavior       = new FourierMotzkinEliminationBehavior,
	      logicalFormsBehavior                    = new LogicalFormsBehavior,
	      collisionAsVectorTransformationBehavior = new CollisionAsVectorTransformationBehavior,
	      infinityBehavior                        = new InfinityBehavior,
	      boardBehavior                           = new BoardBehavior,
	      polynomialBehavior                      = new PolynomialBehavior;
	return true &&
	polygonBehavior                        .shouldTestPolygonBehavior                        () &&
	fourierMotzkinEliminationBehavior      .shouldTestFourierMotzkinEliminationBehavior      () &&
	logicalFormsBehavior                   .shouldTestLogicalFormsBehavior                   () &&
	collisionAsVectorTransformationBehavior.shouldTestCollisionAsVectorTransformationBehavior() &&
	infinityBehavior                       .shouldTestInfinityBehavior                       () &&
	boardBehavior                          .shouldTestBoardBehavior                          () &&
	polynomialBehavior                     .shouldTestPolynomialBehavior                     () &&
	true;
}
