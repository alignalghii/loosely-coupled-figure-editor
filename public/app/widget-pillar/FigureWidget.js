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
	if (this.businessObject.openings) {
		this.businessObject.openings.map(opening => opening.delete());
	}
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
			/** Az éltologatások során a falrések elheyezkedése  torzul (ezen komolyan el kell gondolkodni, reprezentációs probléma),
			sőt akár új falrések is nyílhatnak. Ez utóbbi hiba viszont könnyen javíthtó, és imme épp itt már meg is lett oldva:
			a FigureWidget vásznak közti átugrása során arra kell figyelni, hogy az SVG-attributomok firssítésénél
			ha a szoba mint üzleti objektum nemrendelkezik slit-reprezentációval (vagyis az üres),
			akkor a stroke-dasharray attribútumot eleve ne is adjuk meg, ill. töröljük az alaocsonyszintű SVG DOM-objektumból! */
			if (svgAttributeName == 'stroke-dasharray' && this.businessObject.slitsRepresentationCircular.circularSlits.length == 0) {
				this.low.removeAttribute(svgAttributeName);
			} else {
				this.low.setAttribute(svgAttributeName, this.high.svgAttributes[svgAttributeName]);
			}
		} else {
			this.low.removeAttribute(svgAttributeName);
		}
	}
};


FigureWidget.prototype.loseWall_ = function (controller, actorWidget, isModern = false) // @TODO actorWidget is a better, more general arg name: also door and window will break wall
{
	const maybeTill = this.maybeTill(actorWidget.high.position);
	return maybe_exec(
		() => {
			controller.statusBarDriver.report(`Falbontás kudarc: sikertelen ütéspont-detektálás!`);
			return nothing;
		},
		till => {
			const radius = actorWidget.high.size/2;
			if (ccLeq(till - radius, 0) || ccGeq(till + radius, this.high.perimeter())) {
				controller.statusBarDriver.report(`Programhiányosság miatt az ún.vonalhúzásindulópont nem eshetik falrésre!`);
				return nothing;
			} else {
				const circularSlit = new CircularSlit(till, radius);
				this.addCircularSlit(circularSlit);

				if (!isModern) {
					actorWidget.delete();
					actorWidget.restoreOn(controller.canvasPseudoWidgets[2]);
					controller.state.forgetDrag(); // `this.state.prevWidget = null` is not enough, the drag (mouseMove) state must be quitted in the state machine. An alternative solution: `this.state.prevWidget = eitherTarget = null`.
				}

				controller.statusBarDriver.report(`Falbontás: faltörő kos munkában!`);
				controller.audioDriver.breakWall();
				return just(circularSlit);
			}
		},
		maybeTill
	);
};
FigureWidget.prototype.maybeTill  = function (actorPosition)
{
	const edges = tour(this.high.vertices);
	const records = edges.map( // @TODO consider: make the `record` type into a standalone class?
		edge => {
			const hit = nearestPointOnSegment(edge, actorPosition);
			return {
				edge: edge,
				hit: hit,
				distance: distancePointHence(hit, actorPosition)
			}
		}
	);
	const maybeMinRecord = records.reduce(
		(maybeMinRecord_, currentRecord) => maybe(
			just(currentRecord),
			minRecord_ => currentRecord.distance < minRecord_.distance ? just(currentRecord) : maybeMinRecord_,
			maybeMinRecord_
		),
		nothing
	);
	return maybe(
		nothing,
		minRecord => {
			let till = 0;
			for (let edge of edges) {
				if (edge == minRecord.edge) {
					till += segmentLength([edge[0], minRecord.hit]);
					break;
				} else {
					till += segmentLength(edge);
				}
			}
			return just(till);
		},
		maybeMinRecord
	);
};

FigureWidget.prototype.regainWall_ = function (controller, actorWidget)
{
	console.log('Special collision: bricks and mortar in action');
	maybe_exec(
		() => controller.statusBarDriver.report(`Falvisszaépítés hiba: nem detektálható egértelműen, mely falrést kellene visszaépíthető`),
		({minSlit: nearestSlit}) => {
			deleteItem(nearestSlit, this.businessObject.slitsRepresentationCircular.circularSlits);
			this.updateSlitStructure();
			this.updateDasharray();
			this.updateDownward();

			actorWidget.delete(); // `this.state.prevWidget = null` is not enough, the drag (mouseMove) state must be quitted in the state machine.  An alternative solution: `this.state.prevWidget = eitherTarget = null`.
			actorWidget.restoreOn(controller.canvasPseudoWidgets[2]);

			controller.state.forgetDrag();
			controller.statusBarDriver.report(`Falvisszaépítés: Téglák és habarcs munkában!`);
			controller.audioDriver.rebuildWall();
		},
		this.maybeNearestSlitInfo(actorWidget.high.position)
	);
};
FigureWidget.prototype.maybeNearestSlitInfo = function (position)
{
	if (this.high.vertices.length < 1) throw 'Polygon without vertices';
	const startVertex = this.high.vertices[0],
	      edgeVectors = tour(this.high.vertices).map(edgeVector);
	const positionInfos = this.businessObject.slitsRepresentationCircular.slitCalculationsAbbrev(startVertex, edgeVectors);
	return positionInfos.reduce(
		(maybeMinimumInfo, {slit: currentSlit, position: currentPosition}) => {
			const currentDist = distance(currentPosition, position);
			const candidateMinimumInfo = {minDist: currentDist, minSlit: currentSlit};
			return maybe(
				just(candidateMinimumInfo),
				minimumInfo => {
					const {minDist: minDist, minCenter: minCenter} = minimumInfo;
					return just(currentDist < minDist ? candidateMinimumInfo : minimumInfo);
				},
				maybeMinimumInfo
			);
		},
		nothing
	);
};

FigureWidget.prototype.addCircularSlit = function (cs) {this.businessObject.addCircularSlit(cs); this.updateSlitStructure(); this.updateDasharray(); this.updateDownward();};


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

FigureWidget.prototype.contextMenu = () => new ContextMenu('Szoba', [[CMO('Mozgatás', 'move', 'Mozgatás és fókusz')], [CMO('Csúcs +', 'vertexAdd', 'Csúcs hozzáadása'), CMO('Csúcs -', 'vertexDel', 'Csúcs törlése'), CMO('Csúcs ⇌', 'vertexMove', 'Csúcs mozgatása')], [CMO('Él ↠', 'edgeSpan', 'Élnyújtás/kurtítás'), CMO('Él ≠', 'edgePushRail', 'Él „sínes” oldalrahúzása'), CMO('Él ↦', 'edgePushOrth', 'Él magára merőleges oldalrahúzása')], [CMO('Forgatás', 'rotate'), CMO('Átskálázás ⤢', 'scale', 'Aránytartó átméretezés'), CMO('Átskálázás ⇔', 'scaleX', 'Aránytorzítás - vízszintes'), CMO('Átskálázás ⇕', 'scaleY', 'Aránytorzítás - függőleges'), CMO('Tükrözés ⇹', 'flipY', 'Tükrözés - függőleges tengely körül'), CMO('Tükrözés ⤉', 'flipX', 'Tükrözés - vízszintes tengely körül')], [CMO('Űrlap', 'form', 'Objektumtulajdonságok űrlapja'), CMO('Követés', 'follow', 'Együttmozgó objektumok csatolása')]]);
