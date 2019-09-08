const interpretationFigureCommandName = {
	doScale: [
		['doScale', 'doScale'],
		['doScale', 'doScale']
	],
	doScaleX: [
		['doScaleX'   , 'doScaleXYArealInvariant'   ],
		['doScaleXRef', 'doScaleXYArealInvariantRef']
	],
	doScaleY: [
		['doScaleY'   , 'doUnscaleXYArealInvariant'   ],
		['doScaleYRef', 'doUnscaleXYArealInvariantRef']
	],
	doReflectVertically: [
		['doReflectVertically'   , 'doReflectVertically'   ],
		['doReflectVerticallyRef', 'doReflectVerticallyRef']
	],
	doReflectHorizontally: [
		['doReflectHorizontally'   , 'doReflectHorizontally'   ],
		['doReflectHorizontallyRef', 'doReflectHorizontallyRef']
	],
};

const interpretationWidgetCommandName = {
	scale: [
		['scale', 'scale'],
		['scale', 'scale']
	],
	scaleX: [
		['scaleX'   , 'scaleXYArealInvariant'   ],
		['scaleXRef', 'scaleXYArealInvariantRef']
	],
	scaleY: [
		['scaleY'   , 'unscaleXYArealInvariant'   ],
		['scaleYRef', 'unscaleXYArealInvariantRef']
	],
	reflectVertically: [
		['reflectVertically'   , 'reflectVertically'   ],
		['reflectVerticallyRef', 'reflectVerticallyRef']
	],
	reflectHorizontally: [
		['reflectHorizontally'   , 'reflectHorizontally'   ],
		['reflectHorizontallyRef', 'reflectHorizontallyRef']
	]
};

// @TODO: extremely nasty design
State.prototype.interpret = function ([figureAbstractCommandName, widgetAbstractCommandName])
{
	return [
		interpretationFigureCommandName[figureAbstractCommandName][Number(this.isRelative)][Number(this.areaInvariance)],
		interpretationWidgetCommandName[widgetAbstractCommandName][Number(this.isRelative)][Number(this.areaInvariance)]
	];
};
