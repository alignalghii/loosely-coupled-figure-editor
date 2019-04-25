const svgNS = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';

function SvgLowLevel(aDocument)
{
	this.document       = aDocument;
	this.svgRootElement = aDocument.getElementById('svgRoot');//createElementWithAttributes('svg' , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint       = this.svgRootElement.createSVGPoint();
};

SvgLowLevel.prototype.eventPosition = function (event)
{
	this.svgPoint.x = event.clientX;
	this.svgPoint.y = event.clientY;
	var showPoint   = this.svgPoint.matrixTransform(this.svgRootElement.getScreenCTM().inverse());
	return [showPoint.x, showPoint.y];
};


SvgLowLevel.prototype.createPolygonChild = function (svgVertices, svgAttributes)
{
	var polygonChild = createElementWithAttributes('polygon', svgAttributes, svgNS); //this.document.createElementNS(svgNS, 'polygon');
	this.svgRootElement.appendChild(polygonChild);
	this.updatePolygonChild(polygonChild, svgVertices);
	return polygonChild;
};

SvgLowLevel.prototype.updatePolygonChild = function (polygonChild, svgVertices)
{
	var points   = pointsArgValue(svgVertices);
	polygonChild.setAttribute('points', points);
};

SvgLowLevel.prototype.deletePolygonChild = function (polygonChild) {polygonChild.parentNode.removeChild(polygonChild);};  // childNode.remove() is easier, nicer, but not so portable

function pointsArgValue(svgVertices) {return svgVertices.map(stringifyPositionWithComma).join(' ');}
/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}

SvgLowLevel.prototype.subscribe = function (typeName, emptyCase, polygonCase) // @TODO a `return` valószínűleg fölösleges itt is, és az ezt használó  hivatkozott WidgetEventPillar.subscribe-on is
{
	var svgLowLevel = this;
	function handler(event)
	{
		var target = event.target;
		var svgPosition  = svgLowLevel.eventPosition(event);
		return target == svgLowLevel.svgRootElement ? emptyCase(svgPosition) : polygonCase(target, svgPosition);
	}
	this.svgRootElement.addEventListener(typeName, handler);
};
