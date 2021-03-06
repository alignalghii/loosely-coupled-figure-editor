function SaveDriver(aDocument)
{
	this.saveNativeButton = aDocument.getElementById('loader-save');
	this.updateJpegButton = aDocument.getElementById('loader-jpeg');
	this.jpegDownloadLink = aDocument.getElementById('jpeg-download-link');
	this.jpegContainer = aDocument.getElementById('jpeg-update-or-link');

	this.document = aDocument; // for mouse pointer (hourglass)
}

Object.assign(SaveDriver.prototype, DriverMixinProgress);

SaveDriver.prototype.pipeToSM = function (dispatch)
{
	const clickSaveNative = event => dispatch('click', ['void'], {saveAction: 'save'});
	this.saveNativeButton.addEventListener('click', clickSaveNative);

	const clickUpdateJpeg = event => dispatch('click', ['void'], {saveAction: 'update-JPEG'});
	this.updateJpegButton.addEventListener('click', clickUpdateJpeg);

	const linkLeaving = event => dispatch('mouseout', ['void'], {saveAction: 'leave-JPEG'});
	this.jpegDownloadLink.addEventListener('mouseout', linkLeaving);
};

SaveDriver.prototype.showDownloadJpegLink   = function (flag)
{
	this.jpegDownloadLink.style.display =  flag ? 'inline' : 'none';
	this.updateJpegButton.style.display = !flag ? 'inline' : 'none';
	this.jpegContainer.style['align-self'] = flag ? 'center' : 'stretch';
	if (flag) {
		this.jpegContainer.style.padding = '15px';
	} else {
		this.jpegContainer.style.padding = '';
	}
};

SaveDriver.prototype.mbLinkDownloadJpegLink = function (maybeHref)
{
	maybeHref.maybe_exec(
		()   => this.jpegDownloadLink.removeAttribute('href'      ),
		href => this.jpegDownloadLink.setAttribute   ('href', href)
	);
};

SaveDriver.prototype.  linkDownloadJpegLink = function (href) {this.mbLinkDownloadJpegLink(Maybe.just(href));};
SaveDriver.prototype.unlinkDownloadJpegLink = function (    ) {this.mbLinkDownloadJpegLink(Maybe.nothing( ));};

SaveDriver.prototype.stubLinkProgress = function ()
{
	this.showDownloadJpegLink(true);
	this.jpegDownloadLink.innerHTML += '...';
	this.hourglass(true);
};

SaveDriver.prototype.unsuffixLink = function () {this.jpegDownloadLink.innerHTML = this.jpegDownloadLink.innerHTML.replace(/[^a-zA-Z0-9_]*$/, '');};

SaveDriver.prototype.virginTitlingUpdateJpegButton = function (flag) {this.updateJpegButton.innerHTML = flag ? 'JPEG-export' : '⟲ JPEG-csere';}; // @TODO DRY with frontend
