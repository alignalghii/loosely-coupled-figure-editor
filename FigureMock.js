function FigureMock(vertices, return_of_translation)
{
	Mock.call(this);
	this.vertices              = vertices;
	this.return_of_translation = return_of_translation;
}

FigureMock.prototype = Object.create(Mock.prototype);

FigureMock.prototype.constructor = FigureMock;

FigureMock.prototype.translation = function (displacement)
{
	this.track('translation', [displacement]), this.return_of_translation;
	return this.return_of_translation;
};
