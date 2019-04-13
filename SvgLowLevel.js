const svgNS = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';

function SvgLowLevel(aDocument)
{
	this.document       = aDocument;
	this.svgRootElement = aDocument.getElementById('svgRoot');//createElementWithAttributes('svg' , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint       = this.svgRootElement.createSVGPoint();
	this.conversor      = this.svgRootElement.getScreenCTM().inverse();
};

SvgLowLevel.prototype.eventPosition = function (event)
{
	this.svgPoint.x = event.clientX;
	this.svgPoint.y = event.clientY;
	var showPoint   = this.svgPoint.matrixTransform(this.conversor);
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


SvgLowLevel.prototype.subscribe = function (typeName, rootCase, otherCase)
{
	var that = this;
	function handler(event)
	{
		var target = event.target;
		var point  = that.eventPosition(event);
		if (target == that.svgRootElement) rootCase (point);
		else                               otherCase(target, point);
	}
	this.svgRootElement.addEventListener(typeName, handler);
};

function pointsArgValue(svgVertices) {return svgVertices.map(stringifyPositionWithComma).join(' ');}
/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}
