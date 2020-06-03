function AudioDriver(bangAudioFileName, ouchAudioFileName, errorAudioFileName, breachAudioFileName, mortarAudioFileName)
{
	this.bangAudio  = this.access(bangAudioFileName);
	this.ouchAudio  = this.access(ouchAudioFileName);
	this.errorAudio = this.access(errorAudioFileName);
	this.breachAudio = this.access(breachAudioFileName);
	this.mortarAudio = this.access(mortarAudioFileName);
}

AudioDriver.prototype.bang  = function () {this.bangAudio.play();};
AudioDriver.prototype.ouch  = function () {this.ouchAudio.play();};
AudioDriver.prototype.error = function () {this.errorAudio.play();};
AudioDriver.prototype.breakWall = function () {this.breachAudio.play();};
AudioDriver.prototype.rebuildWall = function () {this.mortarAudio.play();};

AudioDriver.prototype.access = fileName => new Audio(`assets-proper/${fileName}`);
