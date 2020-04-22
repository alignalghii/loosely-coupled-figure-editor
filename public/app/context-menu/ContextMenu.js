function ContextMenu(caption, optionSectioning = [])
{
	this.caption = caption;
	this.optionSectioning = optionSectioning;
}

// @TODO another solution without metaprogramming?
// Temporal soution: use `./console.bash contextmenu-universe` and `console.aux/CMO-constructoralias-2nd-arg.sed`
ContextMenu.paramedHash = isRelative => // @TODO too tightly coupled to Router and ContextMenuDriver by id and state names
	({  // @TODO made with `./console.bash contextmenu-universe | sed "s/'\([^']*\)'\(,\s*\)\?/\t\1: '',\n/g"`
		move        : 'normal',
		vertexAdd   : 'figureeditoradd',
		vertexDel   : 'figureeditordelete',
		vertexMove  : 'figureeditormove',
		edgeSpan    : 'figureeditorspan',
		edgePushRail: 'figureeditorpush',
		edgePushOrth: 'figureeditorpushnormal',
		rotate      : 'geomtransformationrotation',
		scale       : 'geomtransformationscale',
		scaleX      : 'geomtransformationscalex',
		scaleY      : 'geomtransformationscaley',
		flipX       : isRelative ? 'geomtransformationreflectionhorizontallyref' : 'geomtransformationreflectionhorizontally',
		flipY       : isRelative ? 'geomtransformationreflectionverticallyref'   : 'geomtransformationreflectionvertically'  ,
		form        : 'figurepropertyeditor',
		follow      : 'figurenesting'
	});

ContextMenu.associatedStateMode = isRelative => idTag => {
	const hash = ContextMenu.paramedHash(isRelative);
	return Maybe.at(hash, idTag).fromJustWith('Invalid contextMenu id');
};
