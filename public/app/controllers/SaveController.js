function SaveController(state, canvasPseudoWidgets, saveIODriver, statusBarODriver, audioODriver)
{
	this.state               = state;
	this.canvasPseudoWidgets = canvasPseudoWidgets;
 	this.saveIODriver        = saveIODriver;
 	this.statusBarODriver    = statusBarODriver;
 	this.audioODriver        = audioODriver;

	this.counter = 0;

	this.canvasPseudoWidget_work = this.canvasPseudoWidgets[4]; // @TODO
}

SaveController.prototype.save = function () {this[this.state.isJPEG ? 'prepareJPEG' : 'saveNative']();};

SaveController.prototype.saveNative = function ()
{
	const businessPF_work = this.canvasPseudoWidget_work.arbitrary.partialFunctionGeomToBusiness;
	let businessExports = [];
	for (const [high, business] of businessPF_work) {
		if (business && isNothing(business.maybeHost)) {
			this.hack(business.openings); // @TODO nasty
			businessExports.push(business.exportToSerializableObject());
		}
	}
	const ser = JSON.stringify(businessExports, null, "\t");
	const tab = open('', '_blank');
	tab.document.write(`<html><head><meta charset="UTF-8"/><title>Save-${++this.counter}</title></head><body><pre>${ser}</pre></body></html>`);
};

SaveController.prototype.setIsJPEG = function (flag)
{
	this.saveIODriver.showDownloadJpegLink(flag);
	this.saveIODriver.retitleSaveButton   (flag);
};

SaveController.prototype.prepareJPEG = function ()
{
	this.statusBarODriver.report('Munkavászon JPEG-változatának naprakésszé előkészítése');


	const svg    = this.canvasPseudoWidget_work.arbitrary.svgLowLevel.svgRootElement,
	      a      = this.saveIODriver.jpegDownloadLink,
	      svgString = new XMLSerializer().serializeToString(svg);

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/router.php/update-jpeg");
	xhr.responseType = 'json';
	xhr.setRequestHeader("Content-Type", "image/svg+xml;charset=UTF-8");
	xhr.onload = e => {
		switch (xhr.status) {
			case 200:
				if (xhr.response.downloadLink) {
					a.setAttribute('href', xhr.response.downloadLink);
				} else {
					throw 'No download link sent back by AJAX';
				}
				break;
			default:
				throw 'Ajax wrong';
		}
	};
	xhr.send(svgString);
}

/*SaveController.prototype.saveJPEG = function ()
{
	console.log('Save JPEG');
	const svgEl = this.canvasPseudoWidgets[4].arbitrary.svgLowLevel.svgRootElement;
	const {width, height} = svgEl.getBBox();
	console.log(`Width: ${width}, height: ${height}`);
	const svgEl2 = svgEl.cloneNode(true);
	const rawSvg = svgEl2.outerHTML;
	console.log('rawSvg', rawSvg);
	const rawSvg0 = '<svg viewBox="0 0 480 150" style="background-color:#ffffff00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="480" height="150"><path d="M 0 35.5 L 6.5 22.5 L 16 37 L 23 24 L 34.8 43.7 L 42.5 30 L 50.3 47 L 59.7 27.7 L 69 47 L 85 17.7 L 98.3 39 L 113 9.7 L 127.7 42.3 L 136.3 23.7 L 147 44.3 L 158.3 20.3 L 170.3 40.3 L 177.7 25.7 L 189.7 43 L 199.7 21 L 207.7 35 L 219 11 L 233 37 L 240.3 23.7 L 251 43 L 263 18.3 L 272.7 33.3 L 283 10 L 295 32.3 L 301.3 23 L 311.7 37 L 323.7 7.7 L 339.3 39 L 346.3 25.7 L 356.3 42.3 L 369.7 15 L 376.3 25.7 L 384 9 L 393 28.3 L 400.3 19 L 411.7 38.3 L 421 21 L 434.3 43 L 445 25 L 453 36.3 L 464.3 18.3 L 476.2 40.3 L 480 33.5 L 480 215 L 0 215 L 0 35.5 Z" fill="#175720"/></svg>';
	const rawSvg1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svgRoot_menuCanvas_4" width="125" height="374"></svg>';
	const blob = new Blob([rawSvg], {type: 'image/svg+xml;charset=utf-8'});
	const URL = self.URL || self.webkitURL || self;
	const blobURL = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.innerHTML = 'JPEG Letölt';
	a.setAttribute('href', blobURL);
	document.body.append(a);

	console.log(`BlobURL: ${blobURL}`);
	const image = new Image;

	//image.src = blobURL;
	image.onload = () => {
		console.log('Image loaded');
		let canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		document.body.append(canvas);
		let context = canvas.getContext('2d');
		// draw image in canvas starting left-0 , top - 0
		context.drawImage(image, 0, 0, width, height);
		console.log('Image', image);

		let png = canvas.toDataURL(); // default png
		let jpeg = canvas.toDataURL('image/jpg');
		let webp = canvas.toDataURL('image/webp');
		var download = function(href, name) {
			var link = document.createElement('a');
			link.download = name;
			link.style.opacity = "0";
			document.body.append(link);
			link.href = href;
			link.click();
			link.remove();
		}
		download(png, "image.png");
	}
	image.src = blobURL;
	document.body.appendChild(image);
};*/

SaveController.prototype.hack = function (openingWidgetsOrNull) // @TODO should contain the high-level parts, not widgets
{
	// const elemBj_work = this.canvasPseudoWidget_work.arbitrary.bijectionSvgToGeom; // @TODO
	if (openingWidgetsOrNull) {
		openingWidgetsOrNull.map(
			({high: high, low: low}) => { // @TODO should be only the high
				// const low = elemBj_work.getInverse(high); // @TODO
				const transform = low.getAttribute('transform');
				if (transform) {
					high.transform = transform;
				}
			}
		);
	}
};
