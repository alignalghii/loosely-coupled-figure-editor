Reflect.suchOwnKeys = (object, mf) => Reflect.ownKeys(object).mapMaybe(mf);

Reflect.matchingOwnKeys = (object, regexp) =>
	Reflect.suchOwnKeys(
		object,
		key => Maybe.asTruey(
			regexp.exec(key)
		)
	);

Reflect.matchingOwnMethodNames = (classObject, regexp) => Reflect.matchingOwnKeys(classObject.prototype, regexp);

Reflect.smartizeMatchingOwnMethods = (classObject, regexp, updater) =>
	Reflect.matchingOwnMethodNames(classObject, regexp).map(
		([roughMethodName, smartMethodName]) => {
			classObject.prototype[smartMethodName || `${roughMethodName}__SMART`] = updater(classObject.prototype[roughMethodName]);
		}
	);
