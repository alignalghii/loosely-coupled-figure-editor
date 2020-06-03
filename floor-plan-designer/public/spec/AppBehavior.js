function AppBehavior() {Behavior.call(this);}

AppBehavior.prototype = Object.create(Behavior.prototype);

AppBehavior.prototype.constructor = AppBehavior;

// The origin figure is automatically created upon running
AppBehavior.prototype.shouldCreateTheOriginFigure = function ()
{
	var polygonChildToBeCreated  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]], [[300, 200]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigureTranslatedBy00 = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var originFigure               = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]], originFigureTranslatedBy00); console.log(originFigure);
	var app                        = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure); console.log(app)

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4;

	var communicationSvg = svgLowLevelMock.communication;console.log('The `communication` log:');console.log(communicationSvg);
	var flag_runDetails =
		communicationSvg[0].name == 'subscribe'          && communicationSvg[0].args[0] == 'mousedown' &&
		communicationSvg[1].name == 'subscribe'          && communicationSvg[1].args[0] == 'mousemove' &&
		communicationSvg[2].name == 'subscribe'          && communicationSvg[2].args[0] == 'mouseup'   &&
		communicationSvg[3].name == 'createPolygonChild' && Eq.eq(communicationSvg[3].args, [[[260, 120], [300, 120], [290, 100]]]) && communicationSvg[3].result == polygonChildToBeCreated;

	var communication_transf = coordSysTransformerMock.communication;
	var flag_transf = Eq.eq(communication_transf, [{name: 'highToLow', args: [[-4, 8]], result: [260, 120]}, {name: 'highToLow', args: [[0, 8]], result: [300, 120]}, {name: 'highToLow', args: [[-1, 10]], result: [290, 100]}]);

	var communicationBij = bijectionSvgToGeomMock.communication;
	var flag_bijection = communicationBij.length = 1 && communicationBij[0].name == 'set' && communicationBij[0].args[0] == polygonChildToBeCreated && communicationBij[0].args[1] == originFigure;

	return flag_virgin && flag_run && flag_runDetails && flag_transf && flag_bijection;
};

// Delete a figure by mousedown then mouseup on it while staying on the same place
AppBehavior.prototype.shouldDeleteFigIfClickingOnItWhileStayingOnTheSamePlace = function ()
{
	var polygonChildToBeCreated0 = {};
	var anotherPolygonChild      = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigureTranslatedBy00 = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var originFigure               = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]], originFigureTranslatedBy00);
	var app                      = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4  && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.communication[0].args[2].call(svgLowLevelMock, anotherPolygonChild, [1, 2]); // prevEl = anotherPolygonChild; prevPos = [1, 2]
	var flag_mousedownAtAFig = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.communication[2].args[2].call(svgLowLevelMock, anotherPolygonChild, [1, 2]);
	var flag_mouseupSamePlaceEffectsFigDel =
		svgLowLevelMock.communication.length == 5 &&
		svgLowLevelMock.communication[4].name == 'deletePolygonChild' && svgLowLevelMock.communication[4].args.length == 1 && svgLowLevelMock.communication[4].args[0] == anotherPolygonChild; // @TODO check whether also the origin polygon can be deleted this way

	var communicationBij = bijectionSvgToGeomMock.communication;
	var flag_bijection = communicationBij.length = 1 && communicationBij[0].name == 'delete' && communicationBij[0].args[0] == anotherPolygonChild;

	return flag_virgin && flag_run && flag_mousedownAtAFig && flag_mouseupSamePlaceEffectsFigDel// && flag_bijection;
};

// Drag a figure a little further by mouseup then mousedown on it while moving the mouse a little  further
AppBehavior.prototype.shouldUpdateFigIfClickingOnItWhileDraggingALittleFurther = function ()
{
	var polygonChildToBeCreated  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigure             = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var app                      = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure);

	app.run();

	svgLowLevelMock.communication[0].args[2].call(svgLowLevelMock, polygonChildToBeCreated, [10, 20]); // prevEl = polygonChildToBeCreated; prevPos = [10, 20]
	var flag_mousedownAtAFig = svgLowLevelMock.communication.length == 4;

	svgLowLevelMock.communication[2].args[2].call(svgLowLevelMock, polygonChildToBeCreated, [10, 21]);
	var flag_mouseupLittleOtherPlaceEffectsFigDel =
		svgLowLevelMock.communication.length == 5 &&
		svgLowLevelMock.communication[4].name == 'updatePolygonChild' && svgLowLevelMock.communication[4].args.length == 2 && svgLowLevelMock.communication[4].args[0] == polygonChildToBeCreated && Eq.eq(svgLowLevelMock.communication[4].args[1], [[10,21], [20,21], [20,31], [10,31]]); // @TODO return modified polygon so that it can be  tested

	return flag_mousedownAtAFig && flag_mouseupLittleOtherPlaceEffectsFigDel;
}

// Create a figure by mousedown then mouseup on an empy place -- don't drag a mouse meanwhile
AppBehavior.prototype.shouldCreateFigIfClickingOnEmptyWhileStayingOnTheSamePlace = function ()
{
	var polygonChildToBeCreated0  = {};
	var polygonChildToBeCreated1  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigure             = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var app                      = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].name == 'createPolygonChild' && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.set_return_for_createPolygonChild(polygonChildToBeCreated1);
	svgLowLevelMock.communication[0].args[1].call(svgLowLevelMock, [1, 2]); // prevEl = prevPos = null
	var flag_mousedownAtEmpty = svgLowLevelMock.communication.length == 4;

	svgLowLevelMock.communication[2].args[1].call(svgLowLevelMock, [1, 2]);
	var flag_mouseupSamePlaceEffectsNewFigCreat =
		svgLowLevelMock.communication.length == 5 &&
		svgLowLevelMock.communication[4].name == 'createPolygonChild' && Eq.eq(svgLowLevelMock.communication[4].args, [[[1,2], [11,2], [11,12], [1,12]]]) && svgLowLevelMock.communication[4].result == polygonChildToBeCreated1;

	return flag_virgin && flag_run && flag_mousedownAtEmpty && flag_mouseupSamePlaceEffectsNewFigCreat;
};

// Create a figure by mousedown then mouseup on an empy place -- down on emptym you drag a mouse meanwhile, but you still end up on empty space, not on an existing figure
AppBehavior.prototype.shouldCreateFigIfClickingOnEmptyWhileDraggingButEndingUpAtEmpty = function ()
{
	var polygonChildToBeCreated0  = {};
	var polygonChildToBeCreated1  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigure             = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var app                      = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].name == 'createPolygonChild' && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.set_return_for_createPolygonChild(polygonChildToBeCreated1);
	svgLowLevelMock.communication[0].args[1].call(svgLowLevelMock, [1, 2]); // prevEl = prevPos = null
	var flag_mousedownAtEmpty = svgLowLevelMock.communication.length == 4;

	svgLowLevelMock.communication[2].args[1].call(svgLowLevelMock, [11, 12]);
	var flag_mouseupSamePlaceEffectsNewFigCreat =
		svgLowLevelMock.communication.length == 5 &&
		svgLowLevelMock.communication[4].name == 'createPolygonChild' && Eq.eq(svgLowLevelMock.communication[4].args, [[[11,12], [21,12], [21,22], [11,22]]]) && svgLowLevelMock.communication[4].result == polygonChildToBeCreated1;

	return flag_virgin && flag_run && flag_mousedownAtEmpty && flag_mouseupSamePlaceEffectsNewFigCreat;
};


// Try to create a figure by mousedown on empty then mouseup on an existing figure
AppBehavior.prototype.shouldCreateFigIfClickingOnEmptyWhileDraggingButEndingUpAtEmpty = function ()
{
	var polygonChildToBeCreated0    = {};
	var alreadyExistingPolygonChild = {};
	var polygonChildToBeCreated1    = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var coordSysTransformerMock  = new CoordSysTransformerMock([[260, 120], [300, 120], [290, 100]]);
	var bijectionSvgToGeomMock          = new BijectionMock();
	var originFigure             = new FigureMock([[ -4,  8], [ 0,  8], [-1, 10]]);
	var app                      = new App(svgLowLevelMock, coordSysTransformerMock, bijectionSvgToGeomMock, originFigure);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].name == 'createPolygonChild' && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.set_return_for_createPolygonChild(polygonChildToBeCreated1);
	svgLowLevelMock.communication[0].args[1].call(svgLowLevelMock, [1, 2]); // prevEl = prevPos = null
	var flag_mousedownAtEmpty = svgLowLevelMock.communication.length == 4;

	svgLowLevelMock.communication[2].args[2].call(svgLowLevelMock, alreadyExistingPolygonChild, [11, 12]);
	var flag_mouseupSamePlaceEffectsNewFigCreat = svgLowLevelMock.communication.length == 5 && svgLowLevelMock.communication[4].name == 'createPolygonChild'  && Eq.eq(svgLowLevelMock.communication[4].args, [[[11,12], [21,12], [21,22], [11,22]]]) && svgLowLevelMock.communication[4].result == polygonChildToBeCreated1;

	return flag_virgin && flag_run && flag_mousedownAtEmpty && flag_mouseupSamePlaceEffectsNewFigCreat;
};
