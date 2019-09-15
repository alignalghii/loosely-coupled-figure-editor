function MassPoint1(figure) {DomainObject.call(this, figure);}

MassPoint1.prototype = Object.create(DomainObject.prototype);

MassPoint1.prototype.constructor = MassPoint1;
MassPoint1.prototype.copy        = function () {return new MassPoint1(this.figure.translation([0,0]));};

MassPoint1.prototype.mbVectorTransfomationForAllowance = function (board) {return just;};


