function AudioDriver(bangAudioFileName, ouchAudioFileName, errorAudioFileName)
{
	this.bangAudio  = this.access(bangAudioFileName);
	this.ouchAudio  = this.access(ouchAudioFileName);
	this.errorAudio = this.access(errorAudioFileName);
}

AudioDriver.prototype.bang  = function () {this.bangAudio.play();};
AudioDriver.prototype.ouch  = function () {this.ouchAudio.play();};
AudioDriver.prototype.error = function () {this.errorAudio.play();};

AudioDriver.prototype.access = fileName => new Audio(`assets-proper/${fileName}`);
