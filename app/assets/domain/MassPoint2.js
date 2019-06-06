function MassPoint2(figure) {DomainObject.call(this, figure);}

MassPoint2.prototype = Object.create(DomainObject.prototype);

MassPoint2.prototype.constructor = MassPoint2;
MassPoint2.prototype.copy        = function () {return new MassPoint2(this.figure.translation([0,0]));};

MassPoint2.prototype.vectorTransfomationForAllowance = function (board) {return (displacement) => [0, 0];};


