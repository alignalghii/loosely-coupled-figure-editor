function GridSpriteWidget(grid, sprite)
{
	this.grid       = grid;
	this.sprite     = sprite;
}

// Safe and public:

GridSpriteWidget.prototype.toggle = function (maybeSVGs)
{
	return maybeSVGs.maybe_exec(
		() => Maybe.just(
			this.forceFill()
		),
		SVGs => {
			SVGs.map(deletePolygonChild);
			return Maybe.nothing();
		}
	);
};

GridSpriteWidget.prototype.show   = function (maybeSVGs)
{
	return maybeSVGs.isNothing() ? this.toggle(maybeSVGs)
                                     : Logger.warning('It is discouraged to repeat a `SpriteWidget` `show`');
};

GridSpriteWidget.prototype.unshow = function (maybeSVGs)
{
	return maybeSVGs.isJust() ? this.toggle(maybeSVGs)
	                          : Logger.warning('It is discouraged to repeat a `SpriteWidget` `hide`');
};

// Unsafe (but also public):

GridSpriteWidget.prototype.forceFill = function ()
{
	return this.grid.bars(
		this.sprite.samplingBrick()
	).map(
		bar => this.sprite.auxSection(bar)
	);
};

GridSpriteWidget.prototype.forceFillIf = function (flag)
{
	return Maybe.ifTrue_lazy(
		flag,
		() => this.forceFill()
	);
};
