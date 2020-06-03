function JumpStatus(widgetToBeStayedOrJumpedOrDenied, eqOrDiffCanvasPseudoWidget)
{
	this.widgetToBeStayedOrJumpedOrDenied = widgetToBeStayedOrJumpedOrDenied;
	this.eqOrDiffCanvasPseudoWidget       = eqOrDiffCanvasPseudoWidget;
	this.maybeTime();
};

JumpStatus.detect = function (prevWidget, targetCanvasPseudoWidget)
{
	return new JumpStatus(
		prevWidget,
		EqOrDiff.compare(prevWidget.canvasPseudoWidget, targetCanvasPseudoWidget)
	);
};

JumpStatus.prototype.allow = function () {return this.widgetToBeStayedOrJumpedOrDenied.isHostless();};
JumpStatus.prototype.explicitAllow = function () {return this.trans() &&  this.allow();};
JumpStatus.prototype.explicitDeny  = function () {return this.trans() && !this.allow();};
JumpStatus.prototype.trans         = function () {return this.eqOrDiffCanvasPseudoWidget.eqOrDiff(CPW => false, (srcCPW, tgtCPW) => true);};

JumpStatus.prototype.maybeTime = function ()
{
	const widgetCPW = this.widgetToBeStayedOrJumpedOrDenied.canvasPseudoWidget;
	let maybeTime;
	this.eqOrDiffCanvasPseudoWidget.eqOrDiff(
		CPW => {
			if (widgetCPW != CPW) throw 'Jumpless timing inconsistence';
			maybeTime = Maybe.nothing();
		},
		(srcCPW, tgtCPW) => {
			if (widgetCPW != srcCPW && widgetCPW != tgtCPW) throw 'Jumpful timing inconsistence';
			if (widgetCPW == srcCPW) maybeTime = Maybe.just('before');
			if (widgetCPW == tgtCPW) maybeTime = Maybe.just('after');
		}
	);
	return maybeTime;
};

JumpStatus.prototype.executeIfSo = function (canvasPseudoWidgets, menuAndWorkIndexing)
{
	return this.eqOrDiffCanvasPseudoWidget.eqOrDiff(
		CPW => ({maybeAllow: Maybe.nothing(), releaseDrag: false}),
		(srcCPW, tgtCPW) => {
			if (this.allow()) {
				this.widgetToBeStayedOrJumpedOrDenied.jumpTo(tgtCPW);
				return {
					maybeAllow : Maybe.just(true),
					releaseDrag: this.widgetToBeStayedOrJumpedOrDenied.replenishOnFwdButDiscardOnBwd(canvasPseudoWidgets, menuAndWorkIndexing, [srcCPW, tgtCPW]) // delegate drag decision
				};
			} else {
				return {
					maybeAllow: Maybe.just(false),
					releaseDrag: false
				};
			}
		}
	);
};
