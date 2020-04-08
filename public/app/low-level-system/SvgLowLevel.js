const svgNS = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';

function SvgLowLevel(aDocument, id)
{
	this.document       = aDocument;
	this.svgRootElement = aDocument.getElementById(id);//createElementWithAttributes('svg' , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
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
	this.svgRootElement.appendChild(polygonChild); // @TODO: in case of more canvases, an svg-polynomelement should be able to be added to more canvases (drag a furniture to be copied to the  floorplan canvas)
	updatePolygonChild(polygonChild, svgVertices);
	return polygonChild;
};

SvgLowLevel.prototype.createImage = function (filePath, [width, height], [x, y])
{
	const imageElement = createElementWithAttributes('image', {width: width, height: height, x: x, y: y}, svgNS);
	imageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', filePath);
	this.svgRootElement.appendChild(imageElement);
	return imageElement;
};

function updatePolygonChild(polygonChild, svgVertices)
{
	var points   = pointsArgValue(svgVertices);
	polygonChild.setAttribute('points', points);
};

const deletePolygonChild = polygonChild => polygonChild.parentNode.removeChild(polygonChild);  // childNode.remove() is easier, nicer, but not so portable @TODO better function name

SvgLowLevel.prototype.deleteAllPolygonChildren = function () // @TODO better function name
{
	if (this.svgRootElement.children.length) {
		//(new Audio('assets-proper/drip.ogg')).play();
		//document.getElementById('assets-proper/glass.ogg').play();
		//setTimeout(() => alert("A művelet törli a munkavásznat, azon meg már van munkád. Biztosan akarod?"), 200);
	}
	// @TODO Vajon, amikor végigmegyünk az <svg> elem gyerekein, a <defs> miért nem számít annak? persze ez pont jól jön, mert kivételt dobna, ha `<image>`  `<polygon>` `<text>` -től különböző gyerekre futna rá (sőt tulajdonképp ezt szűrni is kellene!). Íme ld. alább:
	while (this.svgRootElement.lastChild) { //@TODO for .. of and for .. i++ not working (probably deletion in an active running iteration loop is prone to error)
		this.svgRootElement.removeChild(this.svgRootElement.lastChild);
	}
};

function pointsArgValue(svgVertices) {return svgVertices.map(stringifyPositionWithComma).join(' ');}
/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}


/** @TODO: This is something very similar to what the `devices/*Device.js` (`textual-widgets/*UI.js`) modules do: */

SvgLowLevel.prototype.subscribe = function (typeName, emptyCase, polygonCase) // @TODO a `return` valószínűleg fölösleges itt is, és az ezt használó  hivatkozott WidgetEventPillar.subscribe-on is
{
	const svgRootElement = this.svgRootElement;
	const handler = event =>
	{
		const target = event.target;
		const svgPosition  = this.eventPosition(event);
		const runCase = target == svgRootElement ? emptyCase : polygonCase;
		return runCase(target, svgPosition);  // @TODO: use `Either` at the code parts that will call this
	};
	svgRootElement.addEventListener(typeName, handler);
};

SvgLowLevel.prototype.createText = function (name, [x, y])
{
	const textChild = createElementWithAttributes('text', {x: x, y: y}, svgNS);
	textChild.textContent = name;
	this.svgRootElement.appendChild(textChild);
	const w = name.length*8;//textChild.getComputedTextLength(); // @TODO: no magical numbers
	textChild.setAttribute('x', x -  w/2);
	textChild.setAttribute('y', y +  4);
	return textChild;
};


function updateTextName(textChild, name) {textChild.textContent = name;}  // @TODO: !!!!!!!!!!!!

function updateTextPosition(textChild, [x, y]) // @TODO: !!!!!!!!!!!!
{
	const w = textChild.getComputedTextLength();
	textChild.setAttribute('x', x -  w/2);
	textChild.setAttribute('y', y +  4);
}
