/*********************** @TODO: Concrete Widget-subclasses? **************************************/

function FigureWidget(canvasPseudoWidget,    low, high, businessObject)
{
	Widget.call(this, canvasPseudoWidget,    low, high);
	this.businessObject = businessObject;
}

FigureWidget.prototype = Object.create(Widget.prototype);

FigureWidget.prototype.constructor = FigureWidget;

FigureWidget.prototype.factory = function () {return this.canvasPseudoWidget.figureWidgetFactory;};

FigureWidget.prototype.titleWidget = function () {return this.canvasPseudoWidget.titleWidgetFactory.composeFromHigh(this.businessObject.title);};
FigureWidget.prototype.withEscortWidgets = function (doWith)
{
	return this.businessObject.escorts.map(
		escort => doWith(this.factory().detectTypeAndComposeFromBusiness(escort)) // @TODO factory() select well, but it is rather arbitrary, works but is smelly architecture
	);
};
FigureWidget.prototype.withDependentWidgets = function (doWith) {this.withDependentWidgets_unsafe(doWith, doWith);}; // @TODO raise to parent
FigureWidget.prototype.withDependentWidgets_unsafe = function (doWith, doWith_unsafe) // @TODO redefines abstract method of parent class
{
	this.withEscortWidgets(doWith);
	doWith_unsafe(this.titleWidget());
};

FigureWidget.prototype.whileExistDependentWidgets_unsafe = function (doWith, doWith_unsafe) // @TODO redefines abstract method of parent class
{
	this.whileExistEscortWidgets(doWith);
	doWith_unsafe(this.titleWidget());
};
FigureWidget.prototype.whileExistEscortWidgets = function (doWith) // @TODO factor out to Set/Array module
{
	while (this.businessObject.escorts.length > 0) {
		const widget = this.factory().detectTypeAndComposeFromBusiness(this.businessObject.escorts.pop());
		doWith(widget);
	}
};

FigureWidget.prototype.delete = function ()
{
	this.businessObject.liberate();
	this.whileExistDependentWidgets_unsafe(
		escortWidget => escortWidget.delete(),
		titleWidget  => titleWidget.delete_unsafe()
	); // @TODO a címwidget törlése érdekes kérdés, hisz a címwidget saját delete metódusa hibaüzenetet kell adjon egy elkézelés szerint
	this.rawDelete(); // low+high detached from bijection + low removed from SVG-DOM. Also high+business detached from partialFunction (OOP-smelly solution! @TODO debate)
};

// Abstract methods of super concretized here:
// @TODO: consider - this function alone justifies inheriting
FigureWidget.prototype.updateDownward = function ()
{
	const svgVertices = this.high.vertices.map(
		p => this.factory().coordSysTransformer.highToLow(p)
	);
	updatePolygonChild(this.low, svgVertices);
};


FigureWidget.prototype.updateDownwardAll = function ()
{
	this.withDependentWidgets(subwidget => subwidget.updateDownwardAll());
	this.updateDownward();
};

FigureWidget.prototype.dasharray = function ()
{
	if (this.businessObject.slitsRepresentationCircular) {
		return this.businessObject.slitsRepresentationCircular.dasharrayWith(this.q());
	} else {
		return [];//throw 'Room without slit structure representation';
	}
};

FigureWidget.prototype.updateSlitStructure = function ()
{
	this.high.svgAttributes['stroke-dasharray'] = this.dasharray().join(' ');
}

FigureWidget.prototype.isHostless = function () {return isNothing(this.businessObject.maybeHost);};

FigureWidget.prototype.jumpTo = function (targetCanvasPseudoWidget) // targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer
{
	const targetCanvasElem = targetCanvasPseudoWidget.low();
	targetCanvasElem.appendChild(this.low);

	this.withDependentWidgets(widget => widget.jumpTo(targetCanvasPseudoWidget)); // targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
	//targetCanvasElem.appendChild(titleWidget().low);
	//titleWidget().changeBoardsFor(targetBoard, targetBusinessBoard, targetCoordSysTransfomer);


	/*this.businessObject.escorts.map(
		escort => { // @TODO
			const chFig  = chair.figure;
			const chPoly = this.bijectionSvgToGeom.getInverse(chFig);
			const chWidg = new FigureWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, ['just', chair], chFig, chPoly);
			chWidg.jumpTo(targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
		}
	)*/

	this.changeBoardsFor(targetCanvasPseudoWidget);

	this.updateSlitStructure();
	this.updateDasharray();
};



// @TODO: can be raised to abstract Widget class?
FigureWidget.prototype.updateUpAndDownward = function ()
{
	this.businessObject.goUpdatedByOwnFigure(); // figure updates title
	this.titleWidget().updateDownward(); // @TODO: DRY: try to reuse widgetfactory.createTitleWidgetFromMedium
	this.updateDownward();
};

FigureWidget.prototype.updateDasharray = function () {['stroke-dasharray', 'stroke-dashoffset'].map(attrName => this.updateSvgAttribute(attrName));};

FigureWidget.prototype.updateSvgAttribute = function (svgAttributeName)
{
	if (this.high && this.high.svgAttributes) { // @TODO this.high should always exist, this condition is superfluous
		if (svgAttributeName in this.high.svgAttributes) {
			this.low.setAttribute(svgAttributeName, this.high.svgAttributes[svgAttributeName]);
		} else {
			this.low.removeAttribute(svgAttributeName);
		}
	}
};


FigureWidget.prototype.loseWall_ = function (controller, actorWidget)
{
	console.log('Special collision: battering ram in action');
	this.loseWall(actorWidget.high.size, actorWidget.high.position);
	actorWidget.delete();

	controller.state.forgetDrag(); // `this.state.prevWidget = null` is not enough, the drag (mouseMove) state must be quitted in the state machine. An alternative solution: `this.state.prevWidget = eitherTarget = null`.
	controller.statusBarDriver.report(`Falbontás: faltörő kos munkában!`);
	controller.audioDriver.breakWall();
};
FigureWidget.prototype.regainWall_ = function (controller, actorWidget)
{
	console.log('Special collision: bricks and mortar in action');
	this.regainWall(actorWidget.high.size, actorWidget.high.position);
	actorWidget.delete(); // `this.state.prevWidget = null` is not enough, the drag (mouseMove) state must be quitted in the state machine.  An alternative solution: `this.state.prevWidget = eitherTarget = null`.

	controller.state.forgetDrag();
	controller.statusBarDriver.report(`Falvisszaépítés: Téglák és habarcs munkában!`);
	controller.audioDriver.rebuildWall();
};

FigureWidget.prototype.loseWall  = function (size, position)
{
	delete this.high.svgAttributes['stroke'];
	this.updateSvgAttribute('stroke');
};
FigureWidget.prototype.regainWall = function (size, position)
{
	this.high.svgAttributes['stroke'] = 'gray';
	this.updateSvgAttribute('stroke');
};


FigureWidget.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

FigureWidget.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};

FigureWidget.prototype.showFocus = function ()
{
	FOCUS[1].map(attr => this.delAttr(attr));
	FOCUS[0].map(attr => this.addAttr(attr));
};

FigureWidget.prototype.unshowFocus = function ()
{
	UNFOCUS[1].map(attr => this.delAttr(attr));
	UNFOCUS[0].map(attr => this.addAttr(attr));
};

FigureWidget.prototype.addAttr = function (attr)
{
	this.high.svgAttributes[attr.name] = attr.value; // widget.updateDownward();
	this.low.setAttribute(attr.name, attr.value);
};

FigureWidget.prototype.delAttr = function (attr)
{
	delete this.high.svgAttributes[attr.name];
	this.low.removeAttribute(attr.name);
};


// Geometrical transforamtions

FigureWidget.prototype.translate = function (displacement) // @TODO: DRY
{
	this.businessObject.doTranslation(displacement); // businessObject will update `figure` and `title` mathobjects silently
	this.updateDownwardAll();
};

FigureWidget.prototype.rotate = function (phi) // @TODO: DRY
{
	this.businessObject.doRotation(phi); // businessObject will update `figure` and `title` mathobjects silently
	this.updateDownwardAll(); // updates it for the the changed title
};

FigureWidget.prototype.reflectHorizontally = function () {this.high.doReflectHorizontally(); this.updateDownward();};
FigureWidget.prototype.reflectVertically   = function () {this.high.doReflectVertically();   this.updateDownward();};
FigureWidget.prototype.scale  = function (q)
{
	this.high.doScale (q);
	this.businessObject.doScale(q);
	this.updateSlitStructure();
	this.updateDasharray();
	this.updateDownward();
};
FigureWidget.prototype.scaleX = function (q) {this.high.doScaleX(q); this.updateDownward();};
FigureWidget.prototype.scaleY = function (q) {this.high.doScaleY(q); this.updateDownward();};
FigureWidget.prototype.scaleXYArealInvariant = function (q) {this.high.doScaleXYArealInvariant(q); this.updateDownward();};
FigureWidget.prototype.unscaleXYArealInvariant = function (q) {this.high.doUnscaleXYArealInvariant(q); this.updateDownward();};

FigureWidget.prototype.reflectHorizontallyRef = function () {this.high.doReflectHorizontallyRef(); this.updateDownward();};
FigureWidget.prototype.reflectVerticallyRef   = function () {this.high.doReflectVerticallyRef  (); this.updateDownward();};

FigureWidget.prototype.scaleXRef = function (q) {this.high.doScaleXRef(q); this.updateDownward();};
FigureWidget.prototype.scaleYRef = function (q) {this.high.doScaleYRef(q); this.updateDownward();};
FigureWidget.prototype.scaleXYArealInvariantRef = function (q) {this.high.doScaleXYArealInvariantRef(q); this.updateDownward();};
FigureWidget.prototype.unscaleXYArealInvariantRef = function (q) {this.high.doUnscaleXYArealInvariantRef(q); this.updateDownward();};

// Figure property editor

FigureWidget.prototype.editEdge               = function (i, a) {this.high.editEdge              (i, a); this.updateDownward();};
FigureWidget.prototype.editEdge_areaInvariant = function (i, a) {this.high.editEdge_areaInvariant(i, a); this.updateDownward();};

FigureWidget.prototype.directlyOrViaTitle = function ()
{
	return {
		widget : this,
		message: 'Közvetlenül magára a szobára kattintottál, minden világos.'
	};
};

FigureWidget.prototype.beDescribedOnOpeningForm = function (figPropEdController)
{
	const room = this.businessObject;
	const [name, subnames] = [room.queryName(), room.escorts.map(escort => escort.queryName())];
	const [vertices, svgAttributes] = [this.high.vertices, this.high.svgAttributes]; // @TODO nasty design. In case of furniture, it probably becomes `undefined`
	figPropEdController.openDriverWithCalculations(name, vertices, subnames, svgAttributes); // @TODO furniture shouldbe partly editable from the form directly
	figPropEdController.state.maybeWidgetActualOnFigurePropertyEditor = ['just', this];
};

FigureWidget.prototype.updateAndReport = function (currentWEPos, nearestFigure, template1, template2)
{
	const oldVertices = JSON.stringify(nearestFigure.vertices);
	this.updateUpAndDownward();
	return 'Alakzatszerkesztő. ' + template1 + ' a ' + JSON.stringify(currentWEPos) + ' pontot a legközelebbi ' + template2 + '. Ennek változása: ' + oldVertices + ' --> ' + JSON.stringify(nearestFigure.vertices) + '.';
};
