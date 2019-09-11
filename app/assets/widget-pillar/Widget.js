// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

// @TODO common ancestor with `WigetEventPosition`. Note also the formal sameness of the constructors (only the typing differs)
function Widget(bijectionGeomToDomain, coordSysTransformer, bijectionSvgToGeom,    domainObject, high, low)
{
	this.bijectionGeomToDomain = bijectionGeomToDomain; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.coordSysTransformer = coordSysTransformer;
	this.bijectionSvgToGeom         = bijectionSvgToGeom; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	this.domainObject = domainObject;
	this.high = high;
	this.low  = low;
}

Widget.prototype.showGlittering = function ()
{
	this.high.svgAttributes[GLITTERING_ATTR_NAME] = GLITTERING_VALUE; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.setAttribute(GLITTERING_ATTR_NAME, GLITTERING_VALUE);
};

Widget.prototype.unshowGlittering = function ()
{
	delete this.high.svgAttributes[GLITTERING_ATTR_NAME]; // @TODO fainting should appear on an abstracter level on Figure (e.g. a boolean flag for a special kind of focus)
	this.low.removeAttribute(GLITTERING_ATTR_NAME);
};

Widget.prototype.showFocus = function ()
{
	var widget = this;
	function loop (attr)
	{
		widget.high.svgAttributes[attr.name] = attr.value;// widget.updateDownward();
		widget.low.setAttribute(attr.name, attr.value);
	}
	FOCUS.map(loop);
};

Widget.prototype.unshowFocus = function ()
{
	var widget = this;
	function loop (attr)
	{
		delete widget.high.svgAttributes[attr.name];
		widget.low.removeAttribute(attr.name);
	}
	FOCUS.map(loop);
};

Widget.prototype.update = function (prevWEPos, currentWEPos)
{
	var geomDisplacement  = fromTo(prevWEPos, currentWEPos);
	this.high.doTranslation(geomDisplacement);
	this.updateDownward();
};

Widget.prototype.updateDownward = function ()
{
	var svgVertices = this.high.vertices.map((p) => this.coordSysTransformer.highToLow(p));
	updatePolygonChild(this.low, svgVertices);
};

Widget.prototype.delete = function ()
{
	this.bijectionSvgToGeom.delete(this.low); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	deletePolygonChild(this.low);
};

// Jump over between two canvasses

Widget.prototype.jumpTo = function (targetCanvas, targetBoard, targetBusinessBoard)
{
	targetCanvas.appendChild(this.low);
	this.changeBoardsFor(targetBoard, targetBusinessBoard);
};

Widget.prototype.changeBoardsFor = function (targetBoard, targetBusinessBoard)
{
	// Subscribe for new boards:
	targetBoard        .set(this.low , this.high        );
	targetBusinessBoard.set(this.high, this.domainObject);

	// Unsubscribe from own (collaborator) boards:
	this.bijectionSvgToGeom   .delete(this.low ); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.bijectionGeomToDomain.delete(this.high); // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.

	// Update collaborators:
	this.bijectionSvgToGeom    = targetBoard;         // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
	this.bijectionGeomToDomain = targetBusinessBoard; // @TODO: debated whether the bijection collaborators should be contained at all. A widget should see only vertically.
};

// Geometrical transforamtions

Widget.prototype.translate = function (displacement) {this.high.doTranslation(displacement); this.updateDownward();};
Widget.prototype.rotate    = function (phi) {this.high.doRotation(phi); this.updateDownward();};
Widget.prototype.reflectHorizontally = function () {this.high.doReflectHorizontally(); this.updateDownward();};
Widget.prototype.reflectVertically   = function () {this.high.doReflectVertically();   this.updateDownward();};
Widget.prototype.scale  = function (q) {this.high.doScale (q); this.updateDownward();};
Widget.prototype.scaleX = function (q) {this.high.doScaleX(q); this.updateDownward();};
Widget.prototype.scaleY = function (q) {this.high.doScaleY(q); this.updateDownward();};
Widget.prototype.scaleXYArealInvariant = function (q) {this.high.doScaleXYArealInvariant(q); this.updateDownward();};
Widget.prototype.unscaleXYArealInvariant = function (q) {this.high.doUnscaleXYArealInvariant(q); this.updateDownward();};

Widget.prototype.reflectHorizontallyRef = function () {this.high.doReflectHorizontallyRef(); this.updateDownward();};
Widget.prototype.reflectVerticallyRef   = function () {this.high.doReflectVerticallyRef  (); this.updateDownward();};

Widget.prototype.scaleXRef = function (q) {this.high.doScaleXRef(q); this.updateDownward();};
Widget.prototype.scaleYRef = function (q) {this.high.doScaleYRef(q); this.updateDownward();};
Widget.prototype.scaleXYArealInvariantRef = function (q) {this.high.doScaleXYArealInvariantRef(q); this.updateDownward();};
Widget.prototype.unscaleXYArealInvariantRef = function (q) {this.high.doUnscaleXYArealInvariantRef(q); this.updateDownward();};

// Figure property editor

Widget.prototype.editEdge               = function (i, a) {this.high.editEdge              (i, a); this.updateDownward();};
Widget.prototype.editEdge_areaInvariant = function (i, a) {this.high.editEdge_areaInvariant(i, a); this.updateDownward();};
