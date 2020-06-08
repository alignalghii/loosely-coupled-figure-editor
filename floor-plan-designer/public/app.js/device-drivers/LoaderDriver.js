function LoaderDriver (aDocument)
{
	this.loaderForm     = aDocument.getElementById('loader-form'); // @TODO better namings
	this.loaderIdField  = aDocument.getElementById('loader-id');
	this.idvalid        = aDocument.getElementById('loader-error');
	this.loaderIdEntry  = aDocument.getElementById('loader-id-enter');
	this.loaderIdCancel = aDocument.getElementById('loader-id-cancel');

	this.workCanvas     = aDocument.getElementById('svgRoot_workCanvas'); // @TODO refactory?

	this.document = aDocument;
}

Object.assign(LoaderDriver.prototype, DriverMixinProgress);

LoaderDriver.prototype.pipeToSM = function (dispatch)
{
	const idFormSubmit = event => {
		event.preventDefault();
		const idStr = this.loaderIdField.value.trim(); // @TODO should validation, and Str -> Maybe<Either<Str, Nat>> come here into the driver, instead of the controller?
		dispatch('submit', ['IdString'], {loaderIdStr: idStr});
	};
	this.loaderForm.addEventListener('submit', idFormSubmit);

	const dispatchCancelAction = () => dispatch('click', ['void'], {loaderAction: 'cancel'});
		if (!this.loaderIdField.value) dispatchCancelAction();
		const clickCancel = event => dispatchCancelAction();
		this.loaderIdCancel.addEventListener('click', clickCancel);
		const loaderIdEmpty = event => {if (this.loaderIdField === this.document.activeElement && !this.loaderIdField.value) dispatchCancelAction();};
		this.document.addEventListener('keyup', loaderIdEmpty);
};

LoaderDriver.prototype.message = function (str) {this.idvalid.innerHTML = str;};

// @TODO: the  below functions are hardcoded and tangled-level, refactor them as soon as possible
/*LoaderDriver.prototype.clear = function ()
{
	console.log('Clear these children:');
	for (let child of this.workCanvas.children) {
		console.log(child);
	}
};*/

LoaderDriver.prototype.focus = function (loaderName) {this[loaderName].focus();};

LoaderDriver.prototype.indicateProgress = function () {console.log('progresss...');};
