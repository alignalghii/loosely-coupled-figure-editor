// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

// @TODO common ancestor with `WigetEventPosition`. Note also the formal sameness of the constructors (only the typing differs)
// @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!

/** Widget is an abstract class (unlike WidgetFactory?) */

function Widget(canvasPseudoWidget,   low, high)
{
	this.canvasPseudoWidget = canvasPseudoWidget; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically. 

	this.low  = low;
	this.high = high;
}

Widget.prototype.factory = function () {throw 'Abstract method';};

Widget.prototype.eq = function (otherWidget) {return this.high == otherWidget.high;};
const widgetEq = (w1, w2) => w1.eq(w2); // @TODO


Widget.prototype.translateTo = function (endPos) // @TODO OOP polymorhism
{
	if (this.high.position) {
		const displacement = fromTo(this.high.position, endPos);
		this.translate(displacement);
	} else {
		throw '`translateTo` not implemented';
	}
};



Widget.prototype.rawDelete = function () {this.factory().rawDelete(this);};

Widget.prototype.delete = function () {throw 'Abstract method';};

Widget.prototype.updateDisplacement = function (prevWEPos, currentWEPos)
{
	var geomDisplacement  = fromTo(prevWEPos, currentWEPos);
	this.high.doTranslation(geomDisplacement);
	this.updateDownward();
};

Widget.prototype.updateDownward    = function () {throw 'This is an abstract method';}; // abstract method
Widget.prototype.updateDownwardAll = function () {throw 'This is an abstract method';}; // abstract method

Widget.prototype.addSvgAttribute = function (name, value)
{
	this.high.svgAttributes[name] = value; // @TODO should appear on an abstracter level of the widget @TODO modularize out to Widget class
	this.low.setAttribute(name, value);
};

Widget.prototype.removeSvgAttribute = function (name)
{
	delete this.high.svgAttributes[name]; // @TODO modularize out to Widget class
	this.low.removeAttribute(name);
};


Widget.prototype.q = function () {return this.factory().coordSysTransformer.scalingFactor_hl;};


// Jump over between two canvasses

// @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!

Widget.prototype.jumpTo = function (targetCanvasPseudoWidget) {throw 'Abstract method';};

Widget.prototype.isHostless     = function () {throw 'This is an abstract method';}; // abstract method


Widget.prototype.allowable_ = function (infinitezimalDisplacement)
{
	const bodiesToBeIgnoredInCollisionDetection = this.withEscortWidgets ? this.withEscortWidgets(escortWidget => escortWidget.high) : [];
	return maybe(
		[just(infinitezimalDisplacement), []],
		mbVectorTransformationForAllowance_ => { // @TODO: !!!!
			return mbVectorTransformationForAllowance_.call(this.high, this.factory().bijectionSvgToGeom, bodiesToBeIgnoredInCollisionDetection)(infinitezimalDisplacement); // @TODO
		},
		this.high.isCollidable_()
	);
};


Widget.prototype.changeBoardsFor = function (targetCanvasPseudoWidget) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
{
	const [targetBoard, targetBusinessBoard, targetCoordSysTransformer] = [targetCanvasPseudoWidget.board(), targetCanvasPseudoWidget.businessBoard(), targetCanvasPseudoWidget.coordSysTransformer()];

	// Subscribe for new boards:
	targetBoard        .set(this.low , this.high        );
	if (this.businessObject) targetBusinessBoard.set(this.high, this.businessObject);

	// Unsubscribe from own (collaborator) boards:
	this.factory().bijectionSvgToGeom   .delete(this.low ); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	if (this.factory().partialFunctionGeomToBusiness) this.factory().partialFunctionGeomToBusiness.get(this.high) ? this.factory().partialFunctionGeomToBusiness.delete(this.high) : (() => {throw 'Inconsistence-2';})(); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	// Update collaborators:
	this.canvasPseudoWidget = targetCanvasPseudoWidget;
	//this.canvasPseudoWidget.set_coordSysTransformer          (targetCoordSysTransformer); // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
	//this.canvasPseudoWidget.set_bijectionSvgToGeom           (targetBoard              ); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	//this.canvasPseudoWidget.set_partialFunctionGeomToBusiness(targetBusinessBoard      ); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
};


Widget.prototype.directlyOrViaTitle = function () {throw 'This is an abstract method';};

Widget.prototype.beDescribedOnOpeningForm = function () {throw 'This is an abstract method';};

Widget.prototype.updateAndReport = (currentWEPos, nearestFigure, template1, template2) => 'Csak szoba falazata szerkeszthető csúcsokra-élekre lebontva!';


Widget.prototype.collisionActionSpecialty = function (controller, canvasPseudoWidget, minFallTargetFigure, currentWEPos) {console.log('General collision');};
Widget.prototype.loseWall_                = function (controller, batteringRamWidget) {};
Widget.prototype.regainWall_              = function () {};

Widget.prototype.restoreOn = canvasPseudoWidget => {throw '@TODO: make immediate inheritance chain (Widget > ActorWidget), and let it be an abstract class there';}; // @TODO: make immediate inheritance chain (Widget > ActorWidget), and let it be an abstract class there

Widget.prototype.scale = function (q) {throw 'Abstract method!';};


/*********
 * AttachmentsHub:
 *********/

Widget.prototype.isToBeAttached = function () {return this.hasSomeAttachmentLinks() && this.hasBeenDetached();};
Widget.prototype.isToBeDetached = function () {return this.hasNoAttachmentLinks  () && this.hasBeenAttached();};

Widget.prototype.hasSomeAttachmentLinks = function () {return this.high.attachmentBackRefing && this.high.attachmentBackRefing.size() >  0;};
Widget.prototype.hasNoAttachmentLinks   = function () {return this.high.attachmentBackRefing && this.high.attachmentBackRefing.size() == 0;};

Widget.prototype.hasBeenAttached = function () {return false;}; // overloaded in `WindowWidget` and `DoorWidget` // @TODO
Widget.prototype.hasBeenDetached = function () {return false;}; // overloaded in `WindowWidget` and `DoorWidget` // @TODO


Widget.prototype.isActor        = function () {return false;};
Widget.prototype.isShapeshifter = function () {return false;};
Widget.prototype.emphasizeForMouseScopeOn = (sprite) => sprite.mouse('pointer');


Widget.prototype.shapeshift = function (wallsBackRefSet)
{
	if (this.isToBeAttached()) { // @TODO OOP polymorphism
		this.attachToWall(wallsBackRefSet);
	}
	if (this.isToBeDetached()) { // @TODO OOP polymorphism
		this.detachFromWall();
	}
};

Widget.prototype.shapeshifterSlide = function (displacement, currentWEPos)
{
	if (this.high.position && this.high.size && this.high.attachmentBackRefing) { // @TODO!! OOP-poly: it belongs to Shapeshifter widgets, make a class for them, put Window + Door under it, and move this method there
		const point = this.high.position;
		const size = this.high.size;
		const modifiers = [];
		for (let [room, _] of this.high.attachmentBackRefing.mapStraight) {
			for (let edge of tour(room.figure.vertices)) {
				const dep = distanceSegmentHence(edge, point);
				const dew = distanceSegmentHence(edge, currentWEPos);
				const touching = ccEq(dep, 0);
				const loose = dew < size;
				if (touching && loose) {
					const ev = edgeVector(edge);
					const angle = absoluteConvexAngleOfSegment(edge);
					return {
						displacement: slideProject(displacement, ev),
						maybeAngle  : Maybe.just(angle)
					}; // @TODO design a standalone class for it, and delegete tasks to it @TODO it is a Monad
				}
			}
		}
		return {displacement: displacement, maybeAngle: Maybe.nothing()}; // @TODO design a standalone class for it, and delegete tasks to it @TODO use >>= as for a Maybe-monad
	} else {
		return {displacement: displacement, maybeAngle: Maybe.nothing()}; // @TODO design a standalone class for it, and delegete tasks to it @TODO use >>= as for a Maybe-monad
	}
};


Widget.prototype.manageAttachments = function (controller) // @TODO factor out controller dependent parts
{
	const {roomsBackRefSet: roomsBackRefSet, wallsBackRefSet: wallsBackRefSet} = this.detectNearRoomsAndWalls(); // @TODO do not use currentWEPos, use AttHub
	this.linkAttachmentsMutually(roomsBackRefSet, controller);
	this.followAttachmentMovements();
	this.shapeshift(wallsBackRefSet); // @TODO factor out controller dependent parts
};


Widget.prototype.linkAttachmentsMutually = function (roomsBackRefSet, controller) // @TODO factor out controller dependent parts
{
	if (!this.high.attachmentBackRefing) {
		this.high.attachmentBackRefing = new Bijection;
	}
	this.linkAttachmentsMutually_plus (roomsBackRefSet, controller);
	this.linkAttachmentsMutually_minus(roomsBackRefSet, controller);
};

Widget.prototype.linkAttachmentsMutually_plus = function (roomsBackRefSet, controller)
{
	for (let plusRoom of roomsBackRefSet.domain()) {
		if (!this.high.attachmentBackRefing.has(plusRoom)) {
			const plusFigureWidget = this.canvasPseudoWidget.figureWidgetFactory.composeFromBusiness(plusRoom);
			const maybeCircularSlit = plusFigureWidget.loseWall_(controller, this, true);
			maybeMap(
				circularSlit => {
					this.high.attachmentBackRefing.set(plusRoom, circularSlit);
					touchProp(plusRoom, 'openings', []);
					beMemberIfNotYetByEq(this, plusRoom.openings, widgetEq); // @TODO very nasty that we store a widget in a business level object
					controller.statusBarDriver.report(`${plusRoom.title.name} gaining ${this.constructor.name}: there are now ${plusRoom.openings.filter(w => w.constructor.name == 'WindowWidget').length} windows and ${plusRoom.openings.filter(w => w.constructor.name == 'DoorWidget').length} doors.`);
				},
				maybeCircularSlit
			);
		}
	}
};

Widget.prototype.linkAttachmentsMutually_minus = function (roomsBackRefSet, controller)
{
	for (let memMinusRoom of this.high.attachmentBackRefing.domain()) {
		if (!roomsBackRefSet.has(memMinusRoom)) {
			const minusFigureWidget = this.canvasPseudoWidget.figureWidgetFactory.composeFromBusiness(memMinusRoom);
			const slit = this.high.attachmentBackRefing.get(memMinusRoom);

			deleteItem(slit, minusFigureWidget.businessObject.slitsRepresentationCircular.circularSlits);
			touchProp(memMinusRoom, 'openings', []);
			deleteItemByEq(this, memMinusRoom.openings, widgetEq); // @TODO
			controller.statusBarDriver.report(`${memMinusRoom.title.name} losing ${this.constructor.name}: there remain ${memMinusRoom.openings.filter(w => w.constructor.name == 'WindowWidget').length} windows and ${memMinusRoom.openings.filter(w => w.constructor.name == 'DoorWidget').length} doors.`);

			minusFigureWidget.updateSlitStructure();
			minusFigureWidget.updateDasharray();
			minusFigureWidget.updateDownward();

			this.high.attachmentBackRefing.delete(memMinusRoom);

			/* @TODO DRY, copypasted from `FigureWidget.prototype.regainWall_` method */
			controller.audioDriver.rebuildWall();
		}
	}
};

Widget.prototype.followAttachmentMovements = function ()
{
	for (let [room, slit] of this.high.attachmentBackRefing.mapStraight) {
		/* @TODO DRY: also copypasted to: `GeomTransformationController.prototype.sustainScaleStressSpan` */
		const figureWidget = this.canvasPseudoWidget.figureWidgetFactory.composeFromBusiness(room);
		maybeMap(
			till => {
				slit.center = till;
				figureWidget.updateSlitStructure();
				figureWidget.updateDasharray();
				figureWidget.updateDownward();
			},
			figureWidget.maybeTill(this.high.position)
		);
	}
};

Widget.prototype.detectNearRoomsAndWalls = function ()
{
	const box = this.high;
	const roomsBackRefSet  = new Bijection,
	      wallsBackRefSet = new Bijection;
	for (let figureWidget of this.canvasPseudoWidget.figureWidgets()) {
		for (let edge of tour(figureWidget.high.vertices)) {
			if (distanceSegmentHence(edge, box.position) < box.size / 2) { /* @TODO delegate */
				roomsBackRefSet .set(figureWidget.businessObject, {});
				wallsBackRefSet.set(edge, {});
			}
		}
	}
	return {roomsBackRefSet: roomsBackRefSet, wallsBackRefSet: wallsBackRefSet};
};


Widget.prototype.replenishOnFwdButDiscardOnBwd = function (canvasPseudoWidgets, [menuIndices, workIndices], [sourceCanvasPseudoWidget, targetCanvasPseudoWidget])
{
	const nth = i => canvasPseudoWidgets[i];
	const menuCanvasPseudoWidgets = menuIndices.map(nth),
	      workCanvasPseudoWidgets = workIndices.map(nth);
	if (isMember(sourceCanvasPseudoWidget, menuCanvasPseudoWidgets) && isMember(targetCanvasPseudoWidget, workCanvasPseudoWidgets)) {
		const i = menuCanvasPseudoWidgets.findIndex(cpw => cpw == sourceCanvasPseudoWidget);
		this.restore2On(sourceCanvasPseudoWidget, i); // @TODO nincs igazán értelme itt a Widget-polimorfizmusnak, mert az i határozza meg, nem pedig a Widget-alosztály
		return false; // do not release drag
	}
	if (isMember(sourceCanvasPseudoWidget, workCanvasPseudoWidgets) && isMember(targetCanvasPseudoWidget, menuCanvasPseudoWidgets)) {
		this.delete();
		return true; // release drag
	}
};

// @TODO: it is a burntin, static solution, make it dynamic, for example by deleting the complete canvasPseudoWidget at redrawing it
// @TODO DRY: even in the later approach, contract it with `App.prototype.populate`, modularize out the commmon part.
// @TODO maybe OOP polymorhism somehow? Put in as method of `CanvasPseudoWidget`, having a (real) main class, and 4 subclasses: `CanvasPseudoWidgetṀenuDB`, `CanvasPseudoWidgetMenuSample`, `CanvasPseudoWidgetMenuFurniture`, `CanvasPseudoWidgetMenuOpening`.
Widget.prototype.restore2On = function (canvasPseudoWidget, i)
{
	canvasPseudoWidget.hackFoolSafeClear(); // @TODO ez is jó, meg a `canvasPseudoWidget.clearHostlessWidgetsOtherThan(this)` is, a kipontozás valszeg nem számít;
	switch (i) {
		case 0:
			const cellarFig = (new Figure(poly1_concave_ccw,                        {fill: 'url(#padlo1_dark)'})).translation([  4  , -7  ]);
			const cellarBsn = new Room (
				'Pince', cellarFig,
				[], ['nothing'],
				[new CircularSlit(10, 0.5), new CircularSlit(17, 0.8), new CircularSlit(24.6, 0.7), new CircularSlit(38.5, 1)]
			);
			cellarBsn.title.doTranslation([-1, 4.5]);
			const cellarWdg = canvasPseudoWidget.figureWidgetFactory.createFromBusiness0(cellarBsn);

			const lamp0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Állólámpa', '/img-vendor/allolampa.png', [2, 2], [7.3, -5.7]);
			const bed0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Ágy', '/img-vendor/agy.png', [2, 2], [5.5, -6.1]);

			cellarBsn.escorts.push(bed0Wdg.businessObject, lamp0Wdg.businessObject);
			bed0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO
			lamp0Wdg.businessObject.maybeHost = ['just', cellarBsn]; // @TODO

			cellarWdg.translate([0, 15]);

			cellarWdg.updateSlitStructure();
			cellarWdg.updateDasharray();

			cellarWdg.updateDownwardAll();


			////////

			//nst transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '125 10 84 35 110 30'})).translation([  -3  , 3  ]);
			//const transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)', 'stroke-dasharray': '62 5 42 18 55 15'})).translation([  -3  , 3  ]);
			const transitFig = (new Figure([[0, 0], [5, 0], [5, 1], [1, 1], [1, 5], [0, 5]], {fill: 'url(#padlo1_light)'})).translation([  -3  , 3  ]);
			const transitBsn = new Room (
				'Közlekedő', transitFig,
				[], ['nothing'],
				[new CircularSlit(5.5, 0.5), new CircularSlit(12, 0.4), new CircularSlit(14.5, 0.5), new CircularSlit(17, 0.4)]
			);
			transitBsn.title.doTranslation([0, -1.5]);
			const transitWdg = canvasPseudoWidget.figureWidgetFactory.createFromBusiness0(transitBsn);
			transitWdg.scale(2); // infers transitWdg.updateSlitStructure(); transitWdg.updateDasharray();

			////

			//nst diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -7  ]);
			//const diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -7  ]);
			const diningFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#keramia_light)'})).translation([  -3  , -7  ]);
			const diningBsn = new Room (
				'Ebédlő', diningFig,
				[], ['nothing'],
				[new CircularSlit(1, 0.35), new CircularSlit(3.5, 0.7), new CircularSlit(10.5, 1)]
			);
			diningBsn.title.doTranslation([0, -2.3]);
			const diningWdg = canvasPseudoWidget.figureWidgetFactory.createFromBusiness0(diningBsn);
			diningWdg.scale(2); // infers diningWdg.updateSlitStructure(); diningWdg.updateDasharray();

			const tableChairs0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png', [4, 3], [-1, -5.1]);
			const green0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

			diningBsn.escorts.push(tableChairs0Wdg.businessObject, green0Wdg.businessObject);
			tableChairs0Wdg.businessObject.maybeHost = ['just', diningBsn];
			green0Wdg.businessObject.maybeHost = ['just', diningBsn];

			/////

			//nst bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '10 20 57 10 15 10 1000'})).translation([  -3  , -15  ]);
			//nst bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)', 'stroke-dasharray': '5 10 28 5 8 5 500'})).translation([  -3  , -15  ]);
			const bathFig = (new Figure([[0, 0], [5, 0], [5, 3], [0, 3]], {fill: 'url(#csempe1_dark_small)'})).translation([  -3  , -15  ]);
			const bathBsn = new Room (
				'Fürdő', bathFig,
				[], ['nothing'],
				[new CircularSlit(1, 0.35), new CircularSlit(3.5, 0.7), new CircularSlit(10.5, 1)]
			);
			bathBsn.title.doTranslation([0, -4.1]);
			const bathWdg = canvasPseudoWidget.figureWidgetFactory.createFromBusiness0(bathBsn);
			bathWdg.scale(2); // infers bathWdg.updateSlitStructure(); bathWdg.updateDasharray();

			const tap0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Csap', '/img-vendor/csap_small.png', [2, 2], [3.4, -13.3]);
			const tube0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Kád', '/img-vendor/kad.png', [5, 4], [-2, -12.5]);
			//const green0Wdg = canvasPseudoWidget.imageWidgetFactory.create('Zöldség', '/img-vendor/zoldseg.png', [2, 2], [3, -5.2]);

			bathBsn.escorts.push(tap0Wdg.businessObject, tube0Wdg.businessObject);
			tap0Wdg.businessObject.maybeHost = ['just', bathBsn];
			tube0Wdg.businessObject.maybeHost = ['just', bathBsn];

			break;
		case 1:
			const fotelWdg        = canvasPseudoWidget.imageWidgetFactory.create('Fotel'        , '/img-vendor/fotel.png'                , [3, 3], [-3,  5  ]);
			const bed1Wdg         = canvasPseudoWidget.imageWidgetFactory.create('Ágy'          , '/img-vendor/agy.png'                  , [3, 3], [-3,  1.5]);
			const carpet11Wdg     = canvasPseudoWidget.imageWidgetFactory.create('Szőnyeg 1'    , '/img-vendor/szonyeg1_normal_small.png', [3, 3], [-3, -3  ]);
			const carpet12Wdg     = canvasPseudoWidget.imageWidgetFactory.create('Szőnyeg 2'    , '/img-vendor/szonyeg1_dark.png'        , [3, 3], [ 1, -3  ]);
			const tableChairs1Wdg = canvasPseudoWidget.imageWidgetFactory.create('Asztal+székek', '/img-vendor/asztalszekek.png'         , [4, 3], [-3,  9  ]);
			const green1Wdg       = canvasPseudoWidget.imageWidgetFactory.create('Zöldség'      , '/img-vendor/zoldseg.png'              , [2, 2], [ 1,  9  ]);

			break;
		case 2:
			const batteringRamWidget1 = BatteringRamWidget.prototype.restoreOn(canvasPseudoWidget);
			const brickWidget1        = BrickWidget       .prototype.restoreOn(canvasPseudoWidget);
			const pickaxeWidget1      = PickaxeWidget     .prototype.restoreOn(canvasPseudoWidget);
			const bucketWidget1       = BucketWidget      .prototype.restoreOn(canvasPseudoWidget);
			const windowWidget1       = WindowWidget      .prototype.restoreOn(canvasPseudoWidget);
			const doorWidget1         = DoorWidget        .prototype.restoreOn(canvasPseudoWidget);
			break;
		default:
			throw `Ismeretlen vászonhivatkozási sorszám: ${i}`;
	}
};


Widget.prototype.contextMenu = () => new ContextMenu('Kontextusmenü'); // @TODO
