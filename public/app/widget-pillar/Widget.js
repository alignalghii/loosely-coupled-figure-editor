// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

// @TODO common ancestor with `WigetEventPosition`. Note also the formal sameness of the constructors (only the typing differs)
// @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
function Widget(partialFunctionGeomToBusiness, coordSysTransformer, bijectionSvgToGeom,    maybeDomainObject, high, low)
{
	this.partialFunctionGeomToBusiness = partialFunctionGeomToBusiness; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionSvgToGeom         = bijectionSvgToGeom; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	this.maybeDomainObject = maybeDomainObject;
	this.high = high;
	this.low  = low;
}

Widget.prototype.update = function (prevWEPos, currentWEPos)
{
	var geomDisplacement  = fromTo(prevWEPos, currentWEPos);
	this.high.doTranslation(geomDisplacement);
	this.updateDownward();
};

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


Widget.prototype.delete = function ()
{
	this.bijectionSvgToGeom.delete(this.low); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	if (this.partialFunctionGeomToBusiness.get(this.high)) this.partialFunctionGeomToBusiness.delete(this.high);

	deletePolygonChild(this.low);             // @TODO: why do we not delete the high-level connection as well (the business object)?

	// Use a better, more general soulution (OOP, polymorphism), and raise it in abstraction level
	maybeMap(
		domainObject => {
			if ('title' in domainObject) {
				// @TODO: widget should use widgetfactory as collaborator, and the folowwing lines should be substituted by: this.widgetFactory.createTitleWidget(...).delete();
				const textElem = this.bijectionSvgToGeom.getInverse(domainObject.title);
				this.bijectionSvgToGeom.delete(textElem);
				deletePolygonChild(textElem);
			}
		},
		this.maybeDomainObject
	);
};

// Jump over between two canvasses

// @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
Widget.prototype.jumpTo = function (targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer)
{
	targetCanvas.appendChild(this.low);
	maybeMap(
		domainObject => {
			if (domainObject.title) { // TODO nemcsak szoba lehet a domainobject, lehet akár más, title nélküli is
				// @TODO use WidgetFactory.prototype.createTitleWidgetFromMedium
				const titleWidget = new TitleWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, ['nothing'], domainObject.title, this.bijectionSvgToGeom.getInverse(domainObject.title));
				targetCanvas.appendChild(titleWidget.low);
				titleWidget.changeBoardsFor(targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
			}
			if (domainObject.furniture) {
				domainObject.furniture.map(
					chair => {
						// @TODO
						const chFig  = chair.figure;
						const chPoly = this.bijectionSvgToGeom.getInverse(chFig);
						const chWidg = new FigureWidget(this.partialFunctionGeomToBusiness, this.coordSysTransformer, this.bijectionSvgToGeom, ['just', chair], chFig, chPoly);
						chWidg.jumpTo(targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
					}
				)
			}
		},
		this.maybeDomainObject
	);
	this.changeBoardsFor(targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
};

Widget.prototype.changeBoardsFor = function (targetBoard, targetBusinessBoard, targetCoordSysTransfomer) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
{
	// Dasharray must be taken special care of:
	const q = targetCoordSysTransfomer.scalingFactor_hl / this.coordSysTransformer.scalingFactor_hl;
	if (this.high && this.high.svgAttributes) { // @TODO modularize out
		if (this.high.svgAttributes['stroke-dasharray']) {
			this.addSvgAttribute(
				'stroke-dasharray',
				attributeListMap(
					n => n * q,
					this.high.svgAttributes['stroke-dasharray']
				)
			);
		}
		if (this.high.svgAttributes['stroke-dashoffset']) {
			this.addSvgAttribute(
				'stroke-dashoffset',
				calcWithAttr(
					n => n * q,
					this.high.svgAttributes['stroke-dashoffset']
				)
			);
		}
	}

	// Subscribe for new boards:
	targetBoard        .set(this.low , this.high        );
	maybeMap(
		domainObject => targetBusinessBoard.set(this.high, domainObject),
		this.maybeDomainObject
	);

	// Unsubscribe from own (collaborator) boards:
	this.bijectionSvgToGeom   .delete(this.low ); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	if (this.partialFunctionGeomToBusiness.get(this.high)) this.partialFunctionGeomToBusiness.delete(this.high); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	// Update collaborators:
	this.coordSysTransformer           = targetCoordSysTransfomer; // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
	this.bijectionSvgToGeom            = targetBoard;              // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.partialFunctionGeomToBusiness = targetBusinessBoard;      // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
};

// Abstract methods:
Widget.prototype.updateDownward = function () {throw 'This is an abstract method';};
Widget.prototype.isHostless     = function () {throw 'This is an abstract method';};


Widget.prototype.allowable = function (infinitezimalDisplacement)
{
       return maybe(
               infinitezimalDisplacement,
               mbVectorTransformationForAllowance => { // @TODO: !!!!
                       const mbAllowable = mbVectorTransformationForAllowance.call(this.high, this.bijectionSvgToGeom)(infinitezimalDisplacement); // @TODO
                       return fromMaybe_exec(
                               () => {throw 'Tiltott zóna!';/*this.statusBarDriver.report('Tiltott zóna!'); return [0, 0];*/}, // @TODO: an axception should be thrown rather
                               mbAllowable
                       );
               },
               this.high.isCollidable()
       );
};
