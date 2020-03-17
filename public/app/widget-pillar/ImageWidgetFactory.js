function ImageWidgetFactory(canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom, partialFunctionGeomToBusiness)
{
	WidgetFactory.call(this, canvasPseudoWidget, svgLowLevel, coordSysTransformer, bijectionSvgToGeom);
	this.partialFunctionGeomToBusiness = partialFunctionGeomToBusiness;
}

ImageWidgetFactory.prototype = Object.create(WidgetFactory.prototype);

ImageWidgetFactory.prototype.constructor = ImageWidgetFactory;


ImageWidgetFactory.prototype.create = function (name, fileName, [width, height], [x, y])
{
	const info = this.calculate([width, height], [x, y]);
	const figure    = new Figure(info.vertices)
              furniture = new Furniture(name, figure, fileName, [], ['nothing']), // @TODO
	      imageElem = this.svgLowLevel.createImage(fileName, info.sizes_low, info.point_lowcorner);
	const imageWidget = new ImageWidget(this.canvasPesudoWidget, imageElem, figure, furniture);
	this.bijectionSvgToGeom.set(imageElem, figure);
	this.partialFunctionGeomToBusiness.set(figure, furniture);
	return imageWidget;
};

ImageWidgetFactory.prototype.createFromBusiness = function (business)
{
	const figure = business.figure;
	const name = business.name;
	const fileName = business.imageFileName;
	const [A, B, C, D] = figure.vertices;
	const [width, height] = [distance(A, B), distance(B, C)];
	const [x, y] = figure.grasp;
	const info = this.calculate([width, height], [x, y]);
	const imageElem = this.svgLowLevel.createImage(fileName, info.sizes_low, info.point_lowcorner);
	const imageWidget = new ImageWidget(this.canvasPesudoWidget, imageElem, figure, business);
	this.bijectionSvgToGeom.set(imageElem, figure);
	this.partialFunctionGeomToBusiness.set(figure, furniture);
	return imageWidget;
};


ImageWidgetFactory.prototype.calculate = function ([width, height], [x, y])
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
