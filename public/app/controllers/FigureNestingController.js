function FigureNestingController(state, widgetFactories, statusBarDriver)
{
	this.state = state;

	this.widgetFactories = widgetFactories; // @TODO widgetFactories has also a drive-like nature
	this.statusBarDriver = statusBarDriver;
}

FigureNestingController.prototype = Object.create(Controller.prototype);

FigureNestingController.prototype.constructor = FigureNestingController;

FigureNestingController.prototype.onInsteadOfOff = function (currentWEPos, eitherTarget, isOn)
{
	const widgetFactory = this.widgetFactoryForEitherTarget(eitherTarget);
	const errors = [];
	const notes = [];
	if (!this.state.focus) errors.push('Nincs fókuszalakzat kijelölve, így a &bdquo;mit mibe&rdquo; alakzat-argumentumok közül hiányzik a &bdquo;mibe&rdquo;.');
	either(
		canvas => {errors.push('Vászonra nem elég kattintani, itt nincs közelségi heurisztika');},
		widget => {
			const widget_ = this.widgetDirectlyOrViaTitle(widget);
			notes.push('&bdquo;mit mibe&rdquo; alakzat-argumentumok közül a &bdquo;mibe&rdquo; észlelve.');
			if (this.state.focus) {
				if (this.state.focus.high != widget_.high) {
					maybe_exec(
						() => {throw('Inkonzisztens üzleti objektum');},
						room => {
							const chair = fromJust(widget_.maybeDomainObject);
							const i = room.furniture.indexOf(chair);
							if (isOn) {
								if (i < 0) {
									room.furniture.push(chair);
									notes.push(`&bdquo;${chair.title.name}&rdquo; gazdája immár &bdquo;${room.title.name}&rdquo;`);
								} else {
									notes.push(`&bdquo;${chair.title.name}&rdquo; ismerős már &bdquo;${room.title.name}&rdquo; számára, többszörösen ne adjuk hozzá.`);
								}
							} else {
								if (i >= 0) {
									const [chairCheck] = room.furniture.splice(i, 1); //@TODO make it a ListX method @TODO do more throw assertions
									notes.push(`&bdquo;${chairCheck.title.name}&rdquo; gazdája immár nem &bdquo;${room.title.name}&rdquo;`);
								} else {
									notes.push(`&bdquo;${chair.title.name}&rdquo; ismeretlen &bdquo;${room.title.name}&rdquo; számára, nincs mit törölni.`);
								}
							}
						},
						this.state.focus.maybeDomainObject
					);
				} else {
					console.log('>>>', this.state.focus.figure, widget_.figure);
					errors.push(`&bdquo;${fromJust(widget_.maybeDomainObject).title.name}&rdquo; nem lehet és nem is lehetett saját maga része!`)
				}
			}
		},
		/*maybe_exec(
			() => {
				notes.push('Címre kattinthattál, vagy valami hasonló &bdquo; tárgyiasulatlan&rdquo; dologra');
				widgetFactory.createFigureWidgetFromMedium(widget.high.host.figure);
			},
			chair => {
				notes.push('&bdquo;mit mibe&rdquo; alakzat-argumentumok közül a &bdquo;mibe&rdquo; észlelve.');
				if (this.state.focus) {console.log('++++++++++++++', this.state.focus.maybeDomainObject)
					maybe_exec(
						() => {throw('Inkonzisztens üzleti objektum');},
						room => notes.push(`${chair.title.name} -> ${room.title.name}`),
						this.state.focus.maybeDomainObject
					);
				}
			},
			widget.maybeDomainObject
		)*/
		eitherTarget
	);
	this.statusBarDriver.report(errors.concat(notes).join('</br> &bullet; '));
};
