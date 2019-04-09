function SvgLowLevelMock(polygonChildToBeCreated)
{
	Mock.call(this);
	this.set_return_for_createPolygonChild(polygonChildToBeCreated);
}

SvgLowLevelMock.prototype = Object.create(Mock.prototype);

SvgLowLevelMock.prototype.constructor = SvgLowLevelMock;

SvgLowLevelMock.prototype.set_return_for_createPolygonChild = function (polygonChildToBeCreated) {this.polygonChildToBeCreated = polygonChildToBeCreated;};

SvgLowLevelMock.prototype.subscribe = function(typeName, rootCase, otherCase) {this.track('subscribe', [typeName, rootCase, otherCase], undefined);};

SvgLowLevelMock.prototype.createPolygonChild = function(              svgVertices) {this.track('createPolygonChild', [              svgVertices], this.polygonChildToBeCreated);};

SvgLowLevelMock.prototype.updatePolygonChild = function(polygonChild, svgVertices) {this.track('updatePolygonChild', [polygonChild, svgVertices], undefined                   );};

SvgLowLevelMock.prototype.deletePolygonChild = function(polygonChild             ) {this.track('deletePolygonChild', [polygonChild             ], undefined                   );};
