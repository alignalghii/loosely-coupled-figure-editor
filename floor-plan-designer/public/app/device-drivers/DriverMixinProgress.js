const DriverMixinProgress = {
	hourglass: function (flag) {this.document.body.style.cursor = flag ? 'wait' : 'default';} // @credit to https://stackoverflow.com/a/25207986 and https://stackoverflow.com/a/48873802
};
