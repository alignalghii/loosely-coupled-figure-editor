function ZoomDriver (aDocument)
{
	this.plusButton  = aDocument.getElementById('zoom_plus' );
	this.minusButton = aDocument.getElementById('zoom_minus');
	this.zeroButton  = aDocument.getElementById('zoom_zero' );
}

ZoomDriver.prototype.pipeToSM = function (dispatch)
{
	const zoomUp = event => dispatch('click', ['void'], {zoomAction: 'up'});
	this.plusButton.addEventListener('click', zoomUp);

	const zoomDown = event => dispatch('click', ['void'], {zoomAction: 'down'});
	this.minusButton.addEventListener('click', zoomDown);

	const zoomDefault = event => dispatch('click', ['void'], {zoomAction: 'default'});
	this.zeroButton.addEventListener('click', zoomDefault);
};


