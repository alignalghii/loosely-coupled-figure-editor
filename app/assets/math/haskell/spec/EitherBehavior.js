function EitherBehavior () {}

EitherBehavior.prototype.shouldEither = function ()
{
	var exceptionFlag = false;
	try {either(x => x+1, x => x-1, ['foo' , 10]);} catch (msg) {if (msg == 'Invalid `Either` tag') exceptionFlag = true;}
	return true &&
	exceptionFlag &&
	either(x => x+1, x => x-1, ['left' , 10]) == 11 &&
	either(x => x+1, x => x-1, ['right', 10]) ==  9 &&
	true;
}
