function testRunner()
{
	const polygonBehavior                         = new PolygonBehavior,
	      polygonReverseDeductionBehavior         = new PolygonReverseDeductionBehavior,
	      fourierMotzkinEliminationBehavior       = new FourierMotzkinEliminationBehavior,
	      logicalFormsBehavior                    = new LogicalFormsBehavior,
	      collisionAsVectorTransformationBehavior = new CollisionAsVectorTransformationBehavior,
	      hilbertGeometryBehavior                 = new HilbertGeometryBehavior,
	      geometryBehavior                        = new GeometryBehavior,
	      tangentDetectorBehavior                 = new TangentDetectorBehavior,
	      echolocationBehavior                    = new EcholocationBehavior,
	      distanceHenceBehavior                   = new DistanceHenceBehavior,
	      verticePathClickAlgebraBehavior         = new VerticePathClickAlgebraBehavior,
	      figureEditorByProximityHeuristicBehavior = new FigureEditorByProximityHeuristicBehavior,
	      polygonPropertyAlgebraBehavior          = new PolygonPropertyAlgebraBehavior,
	      rotationArcSpanLogBehavior              = new RotationArcSpanLogBehavior,
	      infinityBehavior                        = new InfinityBehavior,
	      infinitesimalBehavior                   = new InfinitesimalBehavior,
	      boardBehavior                           = new BoardBehavior,
	      polynomialBehavior                      = new PolynomialBehavior,
	      ratioBehavior                           = new RatioBehavior,
	      logicBehavior                           = new LogicBehavior,
	      maybeXBehavior                          = new MaybeXBehavior,
	      listXBehavior                           = new ListXBehavior;
	      ccSubtreeBehavior                       = new CcSubtreeBehavior;
	return true &&
	polygonBehavior                        .shouldTestPolygonBehavior                        () &&
	polygonReverseDeductionBehavior        .shouldTestPolygonReverseDeductionBehavior        () &&
	fourierMotzkinEliminationBehavior      .shouldTestFourierMotzkinEliminationBehavior      () &&
	logicalFormsBehavior                   .shouldTestLogicalFormsBehavior                   () &&
	collisionAsVectorTransformationBehavior.shouldTestCollisionAsVectorTransformationBehavior() &&
	hilbertGeometryBehavior                .shouldTestHilbertGeometryBehavior                () &&
	geometryBehavior                       .shouldTestGeometryBehavior                       () &&
	infinityBehavior                       .shouldTestInfinityBehavior                       () &&
	infinitesimalBehavior                  .shouldTestInfinitesimalBehavior                  () &&
	boardBehavior                          .shouldTestBoardBehavior                          () &&
	polynomialBehavior                     .shouldTestPolynomialBehavior                     () &&
	ratioBehavior                          .shouldTestRatioBehavior                          () &&
	logicBehavior                          .shouldTestLogicBehavior                          () &&
	maybeXBehavior                         .shouldTestMaybeXBehavior                         () &&
	listXBehavior                          .shouldTestListXBehavior                          () &&
	tangentDetectorBehavior                .shouldTestTangentDetectorBehavior                () &&
	echolocationBehavior                   .shouldTestEcholocationBehavior                   () &&
	distanceHenceBehavior                  .shouldTestDistanceHenceBehavior                  () &&
	verticePathClickAlgebraBehavior        .shouldTestVerticePathClickAlgebraBehavior        () &&
	figureEditorByProximityHeuristicBehavior.shouldTestFigureEditorByProximityHeuristicBehavior() &&
	polygonPropertyAlgebraBehavior         .shouldTestPolygonPropertyAlgebraBehavior         () &&
	rotationArcSpanLogBehavior             .shouldTestRotationArcSpanLogBehavior             () &&
	ccSubtreeBehavior                      .shouldTestCcSubtreeBehavior                      () &&
	true;
}
