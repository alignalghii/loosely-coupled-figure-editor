function GridSpriteWidget(grid, sprite)
{
	this.grid      = grid;
	this.sprite    = sprite;
	this.maybeSVGs = Maybe.nothing();
}

GridSpriteWidget.prototype.show   = function ()
{
	this.maybeSVGs.maybe_exec(
		() => {
			this.maybeSVGs = Maybe.just(
				this.grid.sections().map(
					edge => this.sprite.auxSection(edge)
				)
			);
		},
		_  => Logger.write('It is discouraged to repeat a `SpriteWidget` `show`')
	);
};

GridSpriteWidget.prototype.unshow = function ()
{
	this.maybeSVGs.map(
		SVGs => SVGs.map(deletePolygonChild)
	);
	this.maybeSVGs = Maybe.nothing();
};

GridSpriteWidget.prototype.isShown = function ()
{
	return this.maybeSVGs.maybe_val(
		false,
		SVGs => true
	);
};
