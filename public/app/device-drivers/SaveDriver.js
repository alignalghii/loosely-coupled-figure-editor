function SaveDriver(aDocument)
{
	this.saveButton       = aDocument.getElementById('loader-save');
	this.jpegDownloadLink = aDocument.getElementById('jpeg-download-link');
}

SaveDriver.prototype.pipeToSM = function (dispatch)
{
	const clickSave = event => dispatch('click', ['void'], {saveAction: 'save'});
	this.saveButton.addEventListener('click', clickSave);
};

SaveDriver.prototype.showDownloadJpegLink   = function (flag) {this.jpegDownloadLink.style.display = flag ? 'inline' : 'none';};

SaveDriver.prototype.mbLinkDownloadJpegLink = function (maybeHref)
{
	maybeHref.maybe_exec(
		()   => this.jpegDownloadLink.removeAttribute('href'      ),
		href => this.jpegDownloadLink.setAttribute   ('href', href)
	);
};

SaveDriver.prototype.  linkDownloadJpegLink = function (href) {this.mbLinkDownloadJpegLink(Maybe.just(href));};
SaveDriver.prototype.unlinkDownloadJpegLink = function (    ) {this.mbLinkDownloadJpegLink(Maybe.nothing( ));};

SaveDriver.prototype.retitleSaveButton    = function (flag) {this.saveButton      .innerHTML     = flag ? '⟲ JPEG-frissítés' : 'Ment';}; // @TODO DRY with frontend
