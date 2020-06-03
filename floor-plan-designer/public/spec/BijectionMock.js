function BijectionMock () {Mock.call(this);}

BijectionMock.prototype = Object.create(Mock.prototype);

BijectionMock.prototype.constructor = BijectionMock;

BijectionMock.prototype.set = function (ob1, ob2) {this.track('set', [ob1, ob2], undefined);};

BijectionMock.prototype.delete = function (lowElem) {this.track('delete', [lowElem], undefined);};
