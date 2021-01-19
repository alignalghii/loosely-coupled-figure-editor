function PinBoard(/*width, height, step*/ loc)
{
	/*this.width  = width;
	this.height = height;
	this.step   = step;*/
	this.loc = loc;
}

PinBoard.prototype.points = function ()
{
	const domain = Array.base0(5).map(i => 10*(i - 2));
	return domain.descartesSquare().map(pin => addVec(pin, this.loc));
};
