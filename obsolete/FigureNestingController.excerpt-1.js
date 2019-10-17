
					/*//if (motherWidget.high != escortCandidateWidget.high) {
						if (motherWidget.businessObject && escortCandidateWidget.businessObject) {
							const mother   = motherWidget.businessObject;
							//const info = motherWidget.;
							const found    = isMember(escortCandiadate, mother.escorts),
							      refsBack = vecEq(escortCandidate.maybeHost, ['just', mother]);
							if (found != refsBack) throw 'Inconsistence';

							if (motherWidget) { // add
								escortCandidate.setOrChangeHost(mother)
							} else { // delete
								escortCandidate.liberate();
							}
							if (isOn) {
								if (!found) {
									escortCandidate.setOrChangeHost(
										mother,
										oldHost => notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; kísérettagot előbb fölszabadítja régi gazdája: &bdquo;${oldHost.queryName()}&rdquo;.`)
									);
									maybeMap(
										oldHost => {
											deleteItem(escortCandidate, oldHost.escorts);
											return oldHost;
										},
										escortCandidate.maybeHost
									);
									mother.escorts.push(escortCandidate);
									escortCandidate.maybeHost = ['just', mother]; // @TODO
									notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; gazdája immár &bdquo;${mother.queryName()}&rdquo;`);
								} else {
									notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; ismerős már &bdquo;${mother.queryName()}&rdquo; számára, többszörösen ne adjuk hozzá.`);
								}
							} else {
								if (found) {
									if (!vecEq(escortCandidate.maybeHost, ['just', mother])) throw 'Inconsistence';
									const [escortCheck] = mother.escorts.splice(i, 1); //@TODO make it a ListX method @TODO do more throw assertions
									escortCandidate.maybeHost = ['nothing'];
									notes.push(`&bdquo;${escortCheck.queryName()}&rdquo; gazdája immár nem &bdquo;${mother.queryName()}&rdquo;`);
								} else {
									notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; ismeretlen &bdquo;${mother.queryName()}&rdquo; számára, nincs mit törölni.`);
								}
							}*/
						}
						/*switch (escortCandidateWidget.constructor.name) { // @TODO polymorphism
							case 'TitleWidget':
								throw 'Inconsistence';
							case 'FigureWidget':
							case 'ImageWidget':
								const mother = motherWidget.businessObject;
								const i = mother.escorts.indexOf(escortCandidate);
								if (isOn) {
									if (i < 0) {
										mother.escorts.push(escortCandidate);
										escortCandidate.maybeHost = ['just', mother]; // @TODO
										notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; gazdája immár &bdquo;${mother.queryName()}&rdquo;`);
									} else {
										notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; ismerős már &bdquo;${mother.queryName()}&rdquo; számára, többszörösen ne adjuk hozzá.`);
									}
								} else {
									if (i >= 0) {
										const [escortCheck] = mother.escorts.splice(i, 1); //@TODO make it a ListX method @TODO do more throw assertions
										escortCandidate.maybeHost = ['nothing'];
										notes.push(`&bdquo;${escortCheck.queryName()}&rdquo; gazdája immár nem &bdquo;${mother.queryName()}&rdquo;`);
									} else {
										notes.push(`&bdquo;${escortCandidate.queryName()}&rdquo; ismeretlen &bdquo;${mother.queryName()}&rdquo; számára, nincs mit törölni.`);
									}
								}
						}*/
						/*maybe_exec(
							() => {throw('Inkonzisztens üzleti objektum');},
							room => {
								const chair = fromJust(widget_.maybeDomainObject);
								const i = room.furniture.indexOf(chair);
								if (isOn) {
									if (i < 0) {
										room.furniture.push(chair);
										chair.maybeHost = ['just', room]; // @TODO
										notes.push(`&bdquo;${chair.title.name}&rdquo; gazdája immár &bdquo;${room.title.name}&rdquo;`);
									} else {
										notes.push(`&bdquo;${chair.title.name}&rdquo; ismerős már &bdquo;${room.title.name}&rdquo; számára, többszörösen ne adjuk hozzá.`);
									}
								} else {
									if (i >= 0) {
										const [chairCheck] = room.furniture.splice(i, 1); //@TODO make it a ListX method @TODO do more throw assertions
										chair.maybeHost = ['nothing'];
										notes.push(`&bdquo;${chairCheck.title.name}&rdquo; gazdája immár nem &bdquo;${room.title.name}&rdquo;`);
									} else {
										notes.push(`&bdquo;${chair.title.name}&rdquo; ismeretlen &bdquo;${room.title.name}&rdquo; számára, nincs mit törölni.`);
									}
								}
							},
							this.state.focus.maybeDomainObject
						);*/

					//} else {
					//	console.log('>>>', this.state.focus.figure, escortCandidateWidget.figure);
					//	errors.push(`&bdquo;${escortCandidate.queryName()}&rdquo; nem lehet és nem is lehetett saját maga része!`)
					//}
