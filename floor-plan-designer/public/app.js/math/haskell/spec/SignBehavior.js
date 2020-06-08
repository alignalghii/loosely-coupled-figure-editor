function SignBehavior () {}

SignBehavior.prototype.shouldStatSignPartition = function () {return vecEq(statSignPartition(x=>x+1, [10, 20, 30]), [11, 21, 31]);}
