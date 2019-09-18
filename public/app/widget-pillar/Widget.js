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

Widget.prototype.jumpTo = function (targetCanvas, targetBoard, targetBusinessBoard, targetCoordSysTransfomer) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
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
		},
		this.maybeDomainObject
	);
	this.changeBoardsFor(targetBoard, targetBusinessBoard, targetCoordSysTransfomer);
};

Widget.prototype.changeBoardsFor = function (targetBoard, targetBusinessBoard, targetCoordSysTransfomer) // @TODO: use widgetfactory as a component/collaborator instead of coordSysTransformer!
{
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

// Abstract function: Widget.prototype.updateDownward
