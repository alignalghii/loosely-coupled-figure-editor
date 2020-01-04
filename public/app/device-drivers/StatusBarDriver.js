function StatusBarDriver(aDocument) {this.msgConsole = document.getElementById('msgConsole');}

StatusBarDriver.prototype.   report = function (message) {this.msgConsole.innerHTML = message;};
StatusBarDriver.prototype.addReport = function (message) {this.msgConsole.innerHTML += ' ' + message;};

StatusBarDriver.prototype.greet  = function ()        {this.report('Üdvözlet! Jó munkát!');};
