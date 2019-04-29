function StateMachine(widgetCollision, stampFigure, coordSysTransformer, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.widgetCollision = widgetCollision;
	this.stampFigure = stampFigure; // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
	this.forgetDrag();
	this.mode = 'normal';
	this.focus = null;
	this.spaceFocus = null;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();
}

StateMachine.prototype.forgetDrag = function ()
{
	this.prevWidget          = null ; this.prevWEPos   = null ;
	this.dragHasAlreadyBegun = false; this.hasCollided = false;
};

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{

	if (eventType == 'change' && Eq.eq(inputSignature, ['string', 'string'])) this.mode = ird.mode;
	if (this.mode == 'compact') {
		switch (eventType) {
			case 'mousedown':
				this.forgetDrag();
				if (this.onAWidget(inputSignature)) {
					this.rememberWidget(ird);
					this.rememberPosition(ird);
					ird.currentWidget.showGlittering();
				}
			break;
			case 'mousemove':
				if (this.prevWidgetHasNotCollidedYet()) {
					if (this.followWhileCheckCollision(ird)) this.prevWidget.unshowGlittering(); // @TODO
					this.rememberPosition(ird);
					this.dragHasAlreadyBegun = true;
				}
			break;
			case 'mouseup':
				if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.dragHasAlreadyBegun)
					ird.currentWidget.delete();
				if (this.prevWidgetHasNotCollidedYet() && this.dragHasAlreadyBegun) {
					this.prevWidget.update(this.prevWEPos, ird.currentWEPos);
					this.prevWidget.unshowGlittering(this.prevWidget);
				}
				if (!this.prevWidget)
					ird.currentWEPos.create(this.stampFigure);
				this.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) this.setStampFigureFrom(ird.selectedFigure);
			break;
		}
	}
	if (this.mode == 'normal') {
		switch (eventType) {
			case 'mousedown':
				this.forgetDrag();
				if (this.onAWidget(inputSignature)) {
					this.rememberWidget(ird);
					this.rememberPosition(ird);
					ird.currentWidget.showGlittering();
					this.msgConsole.innerHTML = 'Adott alakzaton vagy vonszolás, vagy egyéb művelet várható...';
				} else this.msgConsole.innerHTML = 'Üres helyhez vagy helypozícióhoz kötődő művelet várható...';
			break;
			case 'mousemove':
				if (this.prevWidgetHasNotCollidedYet()) {
					if (this.followWhileCheckCollision(ird)) {
						this.prevWidget.unshowGlittering(); // @TODO
						this.msgConsole.innerHTML = 'Ütközés!';
					}
					this.rememberPosition(ird);
					this.dragHasAlreadyBegun = true;
				}
			break;
			case 'mouseup':
				if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.dragHasAlreadyBegun) {
					if (this.focus && ird.currentWidget.high != this.focus.high) this.focus.unshowFocus();
					this.focus = ird.currentWidget; this.spaceFocus = null;
					this.focus.showFocus();
					ird.currentWidget.unshowGlittering();
					this.msgConsole.innerHTML = 'Alakzatfókusz megjegyezve, üreshelyfókusz levéve.';
				}
				if (this.prevWidgetHasNotCollidedYet() && this.dragHasAlreadyBegun) {
					this.prevWidget.update(this.prevWEPos, ird.currentWEPos);
					this.prevWidget.unshowGlittering(this.prevWidget);
					this.msgConsole.innerHTML = 'Vonszolás vége.';
				}
				if (this.onEmptySpace(inputSignature)) {
					this.spaceFocus = ird.currentWEPos;
					if (this.focus) {
						this.focus.unshowFocus();
						this.focus = null;
						this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, alakzatfókusz levéve.';
					}
					else this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, leveendő alakzatfókusz nem volt.';
				}
				this.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) {
					this.setStampFigureFrom(ird.selectedFigure);
					this.msgConsole.innerHTML = 'Módváltozás.';
				}
			break;
			case 'click':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.operation) {
						case 'create':
							if (this.spaceFocus) {
								this.spaceFocus.create(this.stampFigure);
								this.spaceFocus = null;
								this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
							} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
						break;
						case 'delete':
							if (this.focus) {this.focus.delete(); this.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
						break;
						case 'unfigfocus':
							if (this.focus) {
								this.focus.unshowFocus();
								this.focus = null;
								this.msgConsole.innerHTML = 'Alakzatfókusz levétele.';
							}
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.';
						break;
					}
				}
			break;
			case 'keydown':
				var epsilon      = this.epsilonDistance;
				var epsilonAngle = this.epsilonAngle;
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.key) {
						case '+':
							if (this.spaceFocus) {
								this.spaceFocus.create(this.stampFigure);
								this.spaceFocus = null;
								this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
							} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
						break;
						case 'Delete': case '-':
							if (this.focus) {this.focus.delete(); this.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
						break;
						case 'Escape':
							if (this.focus) {this.focus.unshowFocus(); this.focus = null; this.msgConsole.innerHTML = 'Alakzatfókusz levétele';}
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.';
						break;
						case 'ArrowLeft':
							if (this.focus) {this.focus.translate([-epsilon,  0]);}
						break;
						case 'ArrowRight':
							if (this.focus) {this.focus.translate([ epsilon,  0]);}
						break;
						case 'ArrowUp':
							if (this.focus) {this.focus.translate([ 0,  epsilon]);}
						break;
						case 'ArrowDown':
							if (this.focus) {this.focus.translate([ 0, -epsilon]);}
						break;
						case '(':
							if (this.focus) {this.focus.rotate( epsilonAngle);}
						break;
						case ')':
							if (this.focus) {this.focus.rotate(-epsilonAngle);}
						break;
						case '{':
							if (this.focus) {this.focus.rotate( epsilonAngle*100);}
						break;
						case '}':
							if (this.focus) {this.focus.rotate(-epsilonAngle*100);}
						break;
						case '|':
							if (this.focus) {this.focus.reflectVertically();}
						break;
						case '=':
							if (this.focus) {this.focus.reflectHorizontally();}
						break;
					}
				}
			break;
		}
	}
};

/** Actions */

StateMachine.prototype.rememberWidget            = function (ird) {this.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition          = function (ird) {this.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.followWhileCheckCollision = function (ird) {return this.hasCollided = this.widgetCollision.checkAndHandleCollision(this.prevWidget, this.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};
StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.prevWidget && !this.hasCollided;};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.prevWidget.high;};

/** MenuUI */

StateMachine.prototype.setStampFigureFrom = function (figure) {this.stampFigure = figure.centering();};
