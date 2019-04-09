function AppBehavior() {Behavior.call(this);}

AppBehavior.prototype = Object.create(Behavior.prototype);

AppBehavior.prototype.constructor = AppBehavior;

// The origin figure is automatically created upon running
AppBehavior.prototype.shouldCreateTheOriginFigure = function ()
{
	var polygonChildToBeCreated  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated);
	var app                      = new App(svgLowLevelMock, null);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4;

	var communication = svgLowLevelMock.communication;
	var flag_runDetails =
		communication[0].name == 'subscribe'          && communication[0].args[0] == 'mousedown' &&
		communication[1].name == 'subscribe'          && communication[1].args[0] == 'mousemove' &&
		communication[2].name == 'subscribe'          && communication[2].args[0] == 'mouseup'   &&
		communication[3].name == 'createPolygonChild' && Eq.eq(communication[3].args, [[[300, 200], [310, 200], [310, 210], [300, 210]]]) && communication[3].result == polygonChildToBeCreated;

	return flag_virgin && flag_run && flag_runDetails;
};

// Delete a figure by mousedown then mouseup on it while staying on the same place
AppBehavior.prototype.shouldDeleteFigIfClickingOnItWhileStayingOnTheSamePlace = function ()
{
	var polygonChildToBeCreated0 = {};
	var anotherPolygonChild      = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var app                      = new App(svgLowLevelMock, null);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4  && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.communication[0].args[2].call(svgLowLevelMock, anotherPolygonChild, [1, 2]); // prevEl = anotherPolygonChild; prevPos = [1, 2]
	var flag_mousedownAtAFig = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.communication[2].args[2].call(svgLowLevelMock, anotherPolygonChild, [1, 2]);
	var flag_mouseupSamePlaceEffectsFigDel =
		svgLowLevelMock.communication.length == 5 &&
		svgLowLevelMock.communication[4].name == 'deletePolygonChild' && svgLowLevelMock.communication[4].args.length == 1 && svgLowLevelMock.communication[4].args[0] == anotherPolygonChild; // @TODO check whether also the origin polygon can be deleted this way

	return flag_virgin && flag_run && flag_mousedownAtAFig && flag_mouseupSamePlaceEffectsFigDel;
};

// Drag a figure a little further by mouseup then mousedown on it while moving the mouse a little  further
AppBehavior.prototype.shouldUpdateFigIfClickingOnItWhileDraggingALittleFurther = function ()
{
	var polygonChildToBeCreated  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated);
	var app                      = new App(svgLowLevelMock, null);
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
	var app                      = new App(svgLowLevelMock, null);

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

// Create a figure by mousedown then mouseup on an empy place -- you can drag a mouse meanwhile, but you must end up on empty space, not on an existing figure @TODO change this last part behavior
AppBehavior.prototype.shouldCreateFigIfClickingOnEmptyWhileDraggingButEndingUpAtEmpty = function ()
{
	var polygonChildToBeCreated0  = {};
	var polygonChildToBeCreated1  = {};
	var svgLowLevelMock          = new SvgLowLevelMock(polygonChildToBeCreated0);
	var app                      = new App(svgLowLevelMock, null);

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


// Try to create a figure by mousedown on empty then mouseup on an existing figure -- it will fail, and this is a bug! @TODO change this last part behavior
AppBehavior.prototype.shouldCreateFigIfClickingOnEmptyWhileDraggingButEndingUpAtEmpty = function ()
{
	var polygonChildToBeCreated0    = {};
	var alreadyExistingPolygonChild = {};
	var polygonChildToBeCreated1    = {};
	var svgLowLevelMock             = new SvgLowLevelMock(polygonChildToBeCreated0);
	var app                         = new App(svgLowLevelMock, null);

	var flag_virgin = svgLowLevelMock.communication.length == 0;
	app.run();
	var flag_run = svgLowLevelMock.communication.length == 4 && svgLowLevelMock.communication[3].name == 'createPolygonChild' && svgLowLevelMock.communication[3].result == polygonChildToBeCreated0;

	svgLowLevelMock.set_return_for_createPolygonChild(polygonChildToBeCreated1);
	svgLowLevelMock.communication[0].args[1].call(svgLowLevelMock, [1, 2]); // prevEl = prevPos = null
	var flag_mousedownAtEmpty = svgLowLevelMock.communication.length == 4;

	svgLowLevelMock.communication[2].args[2].call(svgLowLevelMock, alreadyExistingPolygonChild, [11, 12]);
	var flag_mouseupSamePlaceEffectsNewFigCreat = svgLowLevelMock.communication.length == 4; // fail to create a new figure, nor any method call at all

	return flag_virgin && flag_run && flag_mousedownAtEmpty && flag_mouseupSamePlaceEffectsNewFigCreat;
};
