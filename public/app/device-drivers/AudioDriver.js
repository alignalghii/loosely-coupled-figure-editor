function AudioDriver(bangAudioFileName, ouchAudioFileName)
{
	this.bangAudio = this.access(bangAudioFileName);
	this.ouchAudio = this.access(ouchAudioFileName);
}

AudioDriver.prototype.bang = function () {this.bangAudio.play();};
AudioDriver.prototype.ouch = function () {this.ouchAudio.play();};

AudioDriver.prototype.access = fileName => new Audio(`assets-proper/${fileName}`);
