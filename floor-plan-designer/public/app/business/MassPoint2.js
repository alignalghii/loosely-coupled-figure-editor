function MassPoint2(figure) {BusinessObject.call(this, figure);}

MassPoint2.prototype = Object.create(BusinessObject.prototype);

MassPoint2.prototype.constructor = MassPoint2;
MassPoint2.prototype.copy        = function () {return new MassPoint2(this.figure.translation([0,0]));};

MassPoint2.prototype.mbVectorTransfomationForAllowance = function (board) {return (displacement) => just([0, 0]);};


