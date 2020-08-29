const ControllerMixinIntensionalityTransducible =
{

	/*obsolete @TODO*/ transduceActualFormWidgetIntensionality: function (widgetsRepStr, kernelCallback)
	{
		const maybeActualWidgetRepresentationStr = this.extensionalizeActualWidgetOnForm();
			kernelCallback(widgetsRepStr, maybeActualWidgetRepresentationStr);
		this.reintensionalizeActualWidget(widgetsRepStr, maybeActualWidgetRepresentationStr);
	},

	extensionalizeActualWidgetOnForm: function ()
	{
		return this.state.maybeWidgetActualOnFigurePropertyEditor.bind( // @TODO consider edge case warning logging instead of `bind`
			actualWidget => Maybe.ifTrue_lazy(
				actualWidget.businessObject && actualWidget.businessObject.serialize,
				() => actualWidget.businessObject.serialize()
			)
		);
	},

	/*obsolete @TODO*/ reintensionalizeActualWidget: function (widgetsRepStr, maybeActualWidgetRepresentationStr)
	{
		maybeActualWidgetRepresentationStr.map(
			actualWidgetRepresentationStr => JSON.parse(widgetsRepStr).map( // @TODO ne a holt widgetsRepStr-en menjünk végig, hanem az élő aktuáiis work widgeteken
			/*A munkavásznt törlő és újratöltöő (vagyis a widgetek identitását újraszabó műveleteknél gondoskodni kell a state.focus és a state.actualFormWidget kezeléséről: ha képes detektálni, akkor frissüljön az ő identitásuk is, ha nem, akkor állíttasanak Nothingra (ill null-ra). teszt: fókuszba rakunk egy alakzatot, apróságokat csinálunk másutt, undo-zunk, majd megpróbáljuk a fókuszalkzatot törölni. Hibat vet, ha nin cs rendesen megoldva. És tényleg: `WidgetFactory.js:74 Uncaught Event on orphan (unregistered) MathematicalObject triggers widget creation, but the low-level component is lacking`.

			Ha a detektáláskor nem tudjuk kinyomzni az új megfeleő identitást, akkor Nothing/ nullra kell állítani őket. A törött identitást nem szabad ott hagyni */
				widgetRepOb => {
					const widgetRepStr = JSON.stringify(widgetRepOb);
					const flag = this.versions(widgetRepStr, actualWidgetRepresentationStr);
					console.log(typeof widgetRepStr);
					console.log(widgetRepStr);
					console.log(actualWidgetRepresentationStr);
					console.log(flag);
					if (flag) {
						this.state.maybeWidgetActualOnFigurePropertyEditor = Maybe.just(widgetRepOb);
					}
				}
			)
		);
	},

	versions: function (jsonStr1, jsonStr2)
	{
		const red1 = this.reduce(jsonStr1);
		const red2 = this.reduce(jsonStr2);
		//console.log('!!1>', red1);
		//console.log('!!2>', red2);
		return red1 == red2;
	},

	reduce: function (jsonStr) {console.log('>', jsonStr); return jsonStr.replace(/url\(#[a-zA-Z0-9_\-]*\)/, 'url(#__ID_REMPLATE__)');}

};
