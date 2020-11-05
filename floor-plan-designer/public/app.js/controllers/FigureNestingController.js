function FigureNestingController(state, canvasPseudoWidgets, statusBarDriver)
{
	this.state = state;

	this.canvasPseudoWidgets = canvasPseudoWidgets; // @TODO canvasPseudoWidgets has also a drive-like nature
	this.statusBarDriver     = statusBarDriver;
}

Object.assign(FigureNestingController.prototype, ControllerMixinCanvasWidgetable);
Object.assign(FigureNestingController.prototype, ControllerMixinHistoryFollowable);

FigureNestingController.prototype.onOrOff = function (currentWEPos, eitherTarget)
{
	const canvasPseudoWidget = this.canvasPseudoWidgetForEitherTarget(eitherTarget);
	const errors = [];
	const notes = [];
	const motherWidget = this.state.focus; // @TODO A `this.state.focus` ne `Widget | null` típusú legyen legyen, hanem `Maybe<Widget>`
	either(
		canvas => {errors.push('Vászonra nem elég kattintani, itt nincs közelségi heurisztika');},
		clickedWidget => {
			const escortCandidateWidget = this.widgetDirectlyOrViaTitle(clickedWidget);
			if (!escortCandidateWidget.businessObject) throw 'Inconsistence';
			const escortCandidate = escortCandidateWidget.businessObject;
			escortCandidate.assertContainmentValidity();
			if (motherWidget) { // @TODO A `this.state.focus` ne `Widget | null` típusú legyen legyen, hanem `Maybe<Widget>`
				if (!motherWidget.businessObject) throw 'Inconsistence';
				const mother = motherWidget.businessObject;
				mother.assertContainmentValidity();
				notes.push('Követéscsatlakoztatás hozzáadása:');
				maybe_exec(
					() => errors.push(`&bdquo;${mother.queryName()}&rdquo; bennevan &bdquo;${escortCandidate.queryName()}&rdquo; kíséretében, így &bdquo;${escortCandidate.queryName()}&rdquo; nem kísérheti &bdquo;${mother.queryName()}&rdquo; objektumot (körkörösség tilalma).`),
					maybeOldHost => notes.push(
						maybe(
							`A korábban szabad, semmiféle kíséretbe nem tartozó &bdquo;${escortCandidate.queryName()}&rdquo; immár &bdquo;${mother.queryName()}&rdquo; objektumot kíséri.`,
							oldHost => oldHost != mother ? `Az előzőleg &bdquo;${oldHost.queryName()}&rdquo; objektum kíséretébe tartozott &bdquo;${escortCandidate.queryName()}&rdquo; immár &bdquo;${mother.queryName()}&rdquo; objektumot kíséri.` : `Az előzőleg is &bdquo;${oldHost.queryName()}&rdquo; objektum kíséretébe tartozott &bdquo;${escortCandidate.queryName()}&rdquo; most is ugyanazt az objektumot kíséri.`,
							maybeOldHost
						)
					),
					escortCandidate.setOrChangeHost(mother)
				);
			} else {
				notes.push('Követéscsatlakoztatás törlése:');
				notes.push(
					maybe(
						`&bdquo;${escortCandidate.queryName()}&rdquo; objektumot nem kell és nem is lehet felszabadítani: eddig sem tartozott semmiféle kíséretbe.`,
						oldHost => `&bdquo;${escortCandidate.queryName()}&rdquo; kísérettagot fölszabadítja régi gazdája: &bdquo;${oldHost.queryName()}&rdquo; kíséretéből.`,
						escortCandidate.liberate()
					)
				);
			}
		},
		eitherTarget
	);
	this.statusBarDriver.report(errors.concat(notes).join('</br> &bullet; '));
};
