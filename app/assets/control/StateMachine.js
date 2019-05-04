function StateMachine(state, widgetCollision, stampFigure, coordSysTransformer, msgConsole) // @TODO at other places in source code, it may be still colled by obsolete name `originFigure`
{
	this.state = state;

	this.widgetCollision = widgetCollision;
	this.msgConsole = msgConsole;
	this.msgConsole.innerHTML = 'Üdvözlet! Jó munkát!';
	this.epsilonDistance = coordSysTransformer.epsilonDistance();
	this.epsilonAngle    = coordSysTransformer.epsilonAngle();
}

StateMachine.prototype.transition = function (eventType, inputSignature, ird) // ird: inputRoledData
{

	if (eventType == 'change' && Eq.eq(inputSignature, ['string', 'string'])) this.state.mode = ird.mode;
	if (this.state.mode == 'compact') {
		switch (eventType) {
			case 'mousedown':
				this.state.forgetDrag();
				if (this.onAWidget(inputSignature)) {
					this.rememberWidget(ird);
					this.rememberPosition(ird);
					ird.currentWidget.showGlittering();
				}
			break;
			case 'mousemove':
				if (this.prevWidgetHasNotCollidedYet()) {
					if (this.followWhileCheckCollision(ird)) this.state.prevWidget.unshowGlittering(); // @TODO
					this.rememberPosition(ird);
					this.state.dragHasAlreadyBegun = true;
				}
			break;
			case 'mouseup':
				if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun)
					ird.currentWidget.delete();
				if (this.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
					this.state.prevWidget.update(this.state.prevWEPos, ird.currentWEPos);
					this.state.prevWidget.unshowGlittering();
				}
				if (!this.state.prevWidget)
					ird.currentWEPos.create(this.state.stampFigure);
				this.state.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) this.state.setStampFigureFrom(ird.selectedFigure);
			break;
		}
	}
	if (this.state.mode == 'normal') {
		switch (eventType) {
			case 'mousedown':
				this.state.forgetDrag();
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
						this.state.prevWidget.unshowGlittering(); // @TODO
						this.msgConsole.innerHTML = 'Ütközés!';
					}
					this.rememberPosition(ird);
					this.state.dragHasAlreadyBegun = true;
				}
			break;
			case 'mouseup':
				if (this.onAWidget(inputSignature) && this.prevWidgetHasNotCollidedYet() && !this.state.dragHasAlreadyBegun) {
					if (this.state.focus && ird.currentWidget.high != this.state.focus.high) this.state.focus.unshowFocus();
					this.state.focus = ird.currentWidget; this.state.spaceFocus = null;
					this.state.focus.showFocus();
					ird.currentWidget.unshowGlittering();
					this.msgConsole.innerHTML = 'Alakzatfókusz megjegyezve, üreshelyfókusz levéve.';
				}
				if (this.prevWidgetHasNotCollidedYet() && this.state.dragHasAlreadyBegun) {
					this.state.prevWidget.update(this.state.prevWEPos, ird.currentWEPos);
					this.state.prevWidget.unshowGlittering();
					this.msgConsole.innerHTML = 'Vonszolás vége.';
				}
				if (this.onEmptySpace(inputSignature)) {
					this.state.spaceFocus = ird.currentWEPos;
					if (this.state.focus) {
						this.state.focus.unshowFocus();
						this.state.focus = null;
						this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, alakzatfókusz levéve.';
					}
					else this.msgConsole.innerHTML = 'Helyfókusz megjegyezve, leveendő alakzatfókusz nem volt.';
				}
				this.state.forgetDrag();
			break;

			case 'change':
				if (Eq.eq(inputSignature, ['Figure'])) {
					this.state.setStampFigureFrom(ird.selectedFigure);
					this.msgConsole.innerHTML = 'Módváltozás.';
				}
			break;
			case 'click':
				if (Eq.eq(inputSignature, ['string'])) {
					switch (ird.operation) {
						case 'create':
							if (this.state.spaceFocus) {
								this.state.spaceFocus.create(this.state.stampFigure);
								this.state.spaceFocus = null;
								this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
							} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
						break;
						case 'delete':
							if (this.state.focus) {this.state.focus.delete(); this.state.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
						break;
						case 'unfigfocus':
							if (this.state.focus) {
								this.state.focus.unshowFocus();
								this.state.focus = null;
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
							if (this.state.spaceFocus) {
								this.state.spaceFocus.create(this.state.stampFigure);
								this.state.spaceFocus = null;
								this.msgConsole.innerHTML = 'Új alakzat beszúrása az üreshelyfókusz által mutatott helyre. Üreshelyfókusz levétele.';
							} else this.msgConsole.innerHTML = 'Nincs kijelölve üreshelyfókusz, nincs hova beszúrni új alakzatot.';
						break;
						case 'Delete': case '-':
							if (this.state.focus) {this.state.focus.delete(); this.state.focus = null; this.msgConsole.innerHTML = 'A fókuszált alakat törlése.';} // @TODO code reuse, DRY
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs mit törölni.';
						break;
						case 'Escape':
							if (this.state.focus) {this.state.focus.unshowFocus(); this.state.focus = null; this.msgConsole.innerHTML = 'Alakzatfókusz levétele';}
							else this.msgConsole.innerHTML = 'Nincs kijelölve alakzatfókusz, nincs miről a fókuszt levenni, defókuszálni.';
						break;
						case 'ArrowLeft':
							if (this.state.focus) {this.state.focus.translate([-epsilon,  0]);}
						break;
						case 'ArrowRight':
							if (this.state.focus) {this.state.focus.translate([ epsilon,  0]);}
						break;
						case 'ArrowUp':
							if (this.state.focus) {this.state.focus.translate([ 0,  epsilon]);}
						break;
						case 'ArrowDown':
							if (this.state.focus) {this.state.focus.translate([ 0, -epsilon]);}
						break;
						case '(':
							if (this.state.focus) {this.state.focus.rotate( epsilonAngle);}
						break;
						case ')':
							if (this.state.focus) {this.state.focus.rotate(-epsilonAngle);}
						break;
						case '{':
							if (this.state.focus) {this.state.focus.rotate( epsilonAngle*100);}
						break;
						case '}':
							if (this.state.focus) {this.state.focus.rotate(-epsilonAngle*100);}
						break;
						case '|':
							if (this.state.focus) {this.state.focus.reflectVerticallyRef();}
						break;
						case '=':
							if (this.state.focus) {this.state.focus.reflectHorizontallyRef();}
						break;
						case '<':
							if (this.state.focus) {this.state.focus.scale(1-epsilonAngle);}
						break;
						case '>':
							if (this.state.focus) {this.state.focus.scale(1+epsilonAngle);}
						break;
						case '.':
							if (this.state.focus) {this.state.focus.scaleYRef(1-epsilonAngle);}
						break;
						case ':':
							if (this.state.focus) {this.state.focus.scaleYRef(1+epsilonAngle);}
						break;
						case "'":
							if (this.state.focus) {this.state.focus.scaleXRef(1-epsilonAngle);}
						break;
						case '"':
							if (this.state.focus) {this.state.focus.scaleXRef(1+epsilonAngle);}
						break;
						case '[':
							if (this.state.focus) {this.state.focus.scale(1-epsilonAngle*100);}
						break;
						case ']':
							if (this.state.focus) {this.state.focus.scale(1+epsilonAngle*100);}
						break;
						case 'L': case 'l':
							if (this.state.focus) {this.state.focus.scaleYRef(1-epsilonAngle*100);}
						break;
						case 'Z': case 'z':
							if (this.state.focus) {this.state.focus.scaleYRef(1+epsilonAngle*100);}
						break;
						case "I": case "i":
							if (this.state.focus) {this.state.focus.scaleXRef(1-epsilonAngle*100);}
						break;
						case 'H': case 'h':
							if (this.state.focus) {this.state.focus.scaleXRef(1+epsilonAngle*100);}
						break;
						case "~":
							if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+epsilonAngle);}
						break;
						case '$':
							if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+epsilonAngle);}
						break;
						case "÷":
							if (this.state.focus) {this.state.focus.scaleXYArealInvariantRef(1+epsilonAngle*100);}
						break;
						case '§':
							if (this.state.focus) {this.state.focus.unscaleXYArealInvariantRef(1+epsilonAngle*100);}
						break;
					}
				}
			break;
		}
	}
};

/** Actions */

StateMachine.prototype.rememberWidget            = function (ird) {this.state.prevWidget = ird.currentWidget;};
StateMachine.prototype.rememberPosition          = function (ird) {this.state.prevWEPos = ird.currentWEPos;};
StateMachine.prototype.followWhileCheckCollision = function (ird) {return this.state.hasCollided = this.widgetCollision.checkAndHandleCollision(this.state.prevWidget, this.state.prevWEPos, ird.currentWEPos);};

/** Conditions */

StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
StateMachine.prototype.prevWidgetHasNotCollidedYet = function (   ) {return this.state.prevWidget && !this.state.hasCollided;};
StateMachine.prototype.onAWidget    = function (inputSignature) {return Eq.eq(inputSignature, ['Widget', 'WEPos']);};
StateMachine.prototype.onEmptySpace = function (inputSignature) {return Eq.eq(inputSignature, ['WEPos']);};

/** Not needed */

//StateMachine.prototype.samePlaceUpAsDown           = function (ird) {return ird.currentWidget.high == this.state.prevWidget.high;};
