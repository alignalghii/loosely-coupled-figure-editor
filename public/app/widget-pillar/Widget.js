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
	return maybe(
		[just(infinitezimalDisplacement), []],
		mbVectorTransformationForAllowance_ => { // @TODO: !!!!
			return mbVectorTransformationForAllowance_.call(this.high, this.factory().bijectionSvgToGeom)(infinitezimalDisplacement); // @TODO
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
Widget.prototype.loseWall_                = function () {};
Widget.prototype.regainWall_              = function () {};
Widget.prototype.loseWall                 = function () {};
Widget.prototype.regainWall               = function () {};
