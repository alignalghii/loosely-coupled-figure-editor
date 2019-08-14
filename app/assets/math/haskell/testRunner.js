function testRunner()
{
	const polygonBehavior                         = new PolygonBehavior,
	      fourierMotzkinEliminationBehavior       = new FourierMotzkinEliminationBehavior,
	      logicalFormsBehavior                    = new LogicalFormsBehavior,
	      collisionAsVectorTransformationBehavior = new CollisionAsVectorTransformationBehavior,
	      hilbertGeometryBehavior                 = new HilbertGeometryBehavior,
	      geometryBehavior                        = new GeometryBehavior,
	      tangentDetectorBehavior                 = new TangentDetectorBehavior,
	      echolocationBehavior                    = new EcholocationBehavior,
	      distanceHenceBehavior                   = new DistanceHenceBehavior,
	      infinityBehavior                        = new InfinityBehavior,
	      boardBehavior                           = new BoardBehavior,
	      polynomialBehavior                      = new PolynomialBehavior,
	      ratioBehavior                           = new RatioBehavior,
	      logicBehavior                           = new LogicBehavior,
	      maybeXBehavior                          = new MaybeXBehavior,
	      listXBehavior                           = new ListXBehavior;
	      ccSubtreeBehavior                       = new CcSubtreeBehavior;
	return true &&
	polygonBehavior                        .shouldTestPolygonBehavior                        () &&
	fourierMotzkinEliminationBehavior      .shouldTestFourierMotzkinEliminationBehavior      () &&
	logicalFormsBehavior                   .shouldTestLogicalFormsBehavior                   () &&
	collisionAsVectorTransformationBehavior.shouldTestCollisionAsVectorTransformationBehavior() &&
	hilbertGeometryBehavior                .shouldTestHilbertGeometryBehavior                () &&
	geometryBehavior                       .shouldTestGeometryBehavior                       () &&
	infinityBehavior                       .shouldTestInfinityBehavior                       () &&
	boardBehavior                          .shouldTestBoardBehavior                          () &&
	polynomialBehavior                     .shouldTestPolynomialBehavior                     () &&
	ratioBehavior                          .shouldTestRatioBehavior                          () &&
	logicBehavior                          .shouldTestLogicBehavior                          () &&
	maybeXBehavior                         .shouldTestMaybeXBehavior                         () &&
	listXBehavior                          .shouldTestListXBehavior                          () &&
	tangentDetectorBehavior                .shouldTestTangentDetectorBehavior                () &&
	echolocationBehavior                   .shouldTestEcholocationBehavior                   () &&
	distanceHenceBehavior                  .shouldTestDistanceHenceBehavior                  () &&
	ccSubtreeBehavior                      .shouldTestCcSubtreeBehavior                      () &&
	true;
}
