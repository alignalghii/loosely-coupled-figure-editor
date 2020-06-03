function RotationArcSpanLogBehavior () {}

RotationArcSpanLogBehavior.prototype.shouldTestRotationArcSpanLogBehavior = function () {return this.shouldFormatVectorsAndConverseToDegree();};

RotationArcSpanLogBehavior.prototype.shouldFormatVectorsAndConverseToDegree = () => formatVectorsAndConverseToDegree`apple ${[12, 3]}, pear` == 'apple [12,3], pear';
