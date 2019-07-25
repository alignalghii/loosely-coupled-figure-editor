function testRunner()
{
	var polygonBehavior                   = new PolygonBehavior,
	    fourierMotzkinEliminationBehavior = new FourierMotzkinEliminationBehavior,
	    logicalFormsBehavior              = new LogicalFormsBehavior;
	return true &&
	polygonBehavior.shouldTestPolygonBehavior() &&
	fourierMotzkinEliminationBehavior.shouldTestFourierMotzkinEliminationBehavior() &&
	logicalFormsBehavior.shouldTestLogicalFormsBehavior() &&
	true;
}
