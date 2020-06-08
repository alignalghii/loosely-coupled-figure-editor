function InfinitesimalBehavior () {}

InfinitesimalBehavior.prototype.shouldTestInfinitesimalBehavior = function () {return this.shouldVal_ccCompareCases_pIVal();};

InfinitesimalBehavior.prototype.shouldVal_ccCompareCases_pIVal = () =>
	val_ccCompareCases_pIVal(  1, ['nothing'], 'lt', 'eq', 'gt') == 'lt' &&
	val_ccCompareCases_pIVal(999, ['nothing'], 'lt', 'eq', 'gt') == 'lt' &&
	val_ccCompareCases_pIVal(  1, ['just', 3], 'lt', 'eq', 'gt') == 'lt' &&
	val_ccCompareCases_pIVal(  1, ['just', 2], 'lt', 'eq', 'gt') == 'lt' &&
	val_ccCompareCases_pIVal(  1, ['just', 1.0000001], 'lt', 'eq', 'gt') == 'eq' &&
	val_ccCompareCases_pIVal(  1, ['just', 0.9999999], 'lt', 'eq', 'gt') == 'eq' &&
	val_ccCompareCases_pIVal(  1, ['just', 1], 'lt', 'eq', 'gt') == 'eq' &&
	val_ccCompareCases_pIVal(  1, ['just', 0], 'lt', 'eq', 'gt') == 'gt' &&
	true;
