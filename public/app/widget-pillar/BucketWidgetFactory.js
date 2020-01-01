function BucketWidgetFactory (canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom) {WidgetFactory.call(this, canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom);}

BucketWidgetFactory.prototype = Object.create(WidgetFactory.prototype);

BucketWidgetFactory.prototype.constructor = BucketWidgetFactory;


BucketWidgetFactory.prototype.createFromBusiness = function (businessObject) {throw 'Disabled inheritance';}; // @TODO ,,Néma kacsa'' öröklődési probléma

BucketWidgetFactory.prototype.create = function (size, position) // @TODO DRY: same as in ImageWidgetFactory
{
	const info = this.calculate([size, size], position);//console.log(info);
	const bucket = new Bucket(size, position), // @TODO
	      imageElem = this.svgLowLevel.createImage('/assets-proper/bucket.png', info.sizes_low, info.point_lowcorner);
	const bucketWidget = new BucketWidget(this.canvasPseudoWidget, imageElem, bucket);
	this.bijectionSvgToGeom.set(imageElem, bucket);
	//console.log('bucketWidget object: ', bucketWidget);
	return bucketWidget;
};

BucketWidgetFactory.prototype.calculate = function ([width, height], [x, y]) // @TODO DRY: same as in ImageWidgetFactory
{
	const quotient                   = this.coordSysTransformer.scalingFactor_hl,
	      [x_low      , y_low      ] = this.coordSysTransformer.highToLow([x, y]),
	      [x_corner   , y_corner   ] = [x-width/2, y+height/2],
	      [x_lowcorner, y_lowcorner] = this.coordSysTransformer.highToLow([x_corner, y_corner]);
	return {
		quotient       : quotient,
		point_low      : [x_low      , y_low      ],
		point_corner   : [x_corner   , y_corner   ],
		point_lowcorner: [x_lowcorner, y_lowcorner],
		vertices       : [[x-width/2, y-height/2], [x+width/2, y-height/2], [x+width/2, y+height/2], [x-width/2, y+height/2]],
		sizes_low      : [quotient * width, quotient * height]
	};
};

/*
BucketWidgetFactory.prototype.composeFromHigh = function (high) {};

BucketWidgetFactory.prototype.composeFromLow  = function (low) {};



TitleWidgetFactory.prototype.createFromHigh = function (title) // @TODO: 1) not necessarily all figs have a title 2) there'll be also other businessobs than rooms with titles 3) backref to host
{
	const textElem = this.svgLowLevel.createText(title.name, this.coordSysTransformer.highToLow(title.position));
	this.bijectionSvgToGeom.set(textElem, title);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};


// @TODO back-reference to title host // @TODO this should be an inheritable (also abstract?) method of ancestor `WidgetFactory`. Moreover, ancestor `WidgetFactory` already does have a `createFromLow` method, with excellent type-detection!
TitleWidgetFactory.prototype.composeFromHigh = function (title)
{
	const [textElem] = this.queryFromHigh(title);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};

TitleWidgetFactory.prototype.composeFromLow = function (textElem)
{
	const [title] = this.queryFromLow(textElem);
	return new TitleWidget(this.canvasPseudoWidget, textElem, title);
};
*/
