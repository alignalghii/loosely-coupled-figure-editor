function deleteElementsWithTagNames(names) {names.forEach(deleteElementsWithTagName);}
function deleteElementsWithTagName(name)
{
	var elementCollection = document.getElementsByTagName(name);
	for (var i = 0; i < elementCollection.length; i++) {
		deleteElement(elementCollection.item(i));
	}
}

function deleteElement(element) {element.parentNode.removeChild(element);} // childNode.remove() is easier, nicer, but not so portable

function createElementWithAttributes(tagName, attrs, namespaceURI = null)
{
	var element = namespaceURI ? document.createElementNS(namespaceURI, tagName)
	                           : document.createElement  (              tagName);
	for (var attrName in attrs) element.setAttribute(attrName, attrs[attrName]);
	return element;
}

function createAndAppendChildWithAttrs(parent, tagName, attrs, namespaceURI = null)
{
	var childElement = createElementWithAttributes(tagName, attrs, namespaceURI);
	parent.appendChild(childElement);
	return childElement;
}


function insertAfter(what, afterWhat) {afterWhat.parentNode.insertBefore(what, afterWhat.nextSibling);}

// @TODO: This is an unused function!
function updateElementWithAttributes(domElement, plusAttributes = {}, minusAttributes = [])
{
	for (let attrName in plusAttributes ) domElement.setAttribute    (attrName, plusAttributes[attrName]);
	for (let i        in minusAttributes) domElement.removetAttribute(attrName, plusAttributes[i       ]);
}
