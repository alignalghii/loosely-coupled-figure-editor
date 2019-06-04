function MassPoint(figure) {DomainObject.call(this, figure);}

MassPoint.prototype = Object.create(DomainObject.prototype);

MassPoint.prototype.constructor = MassPoint;
MassPoint.prototype.copy        = function () {return new MassPoint(this.figure.translation([0,0]));};

DomainObject.prototype.vectorTransfomationForAllowance = function (board) {return (displacement) => [0, 0];};


