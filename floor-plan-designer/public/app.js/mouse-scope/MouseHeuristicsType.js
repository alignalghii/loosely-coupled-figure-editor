function MouseHeuristicsType() {Logger.write('Abstract class');}
MouseHeuristicsType.Interior = ()     => new MouseHeuristicsType_Interior();
MouseHeuristicsType.Vertex   = vertex => new MouseHeuristicsType_Vertex(vertex);
MouseHeuristicsType.Edge     = edge   => new MouseHeuristicsType_Edge(edge);
MouseHeuristicsType.Canvas   = ()     => new MouseHeuristicsType_Canvas();
MouseHeuristicsType.prototype.mouseHeuristicsType_exec = (interior, vertex, edge, canvas) => Logger.write('Abstract method');
MouseHeuristicsType.prototype.mouseHeuristicsType_val = function (interior, vertex, edge, canvas)
{
	return this.mouseHeuristicsType_exec(
		() => interior,
		vertex, edge,
		() => canvas
	);
};

function MouseHeuristicsType_Interior() {}
MouseHeuristicsType_Interior.prototype = Object.create(MouseHeuristicsType_Interior.prototype);
MouseHeuristicsType_Interior.prototype.constructor = MouseHeuristicsType_Interior;
MouseHeuristicsType_Interior.prototype.mouseHeuristicsType_exec = (interior, vertex, edge, canvas) => interior();

function MouseHeuristicsType_Vertex(vertex) {this.vertex = vertex;}
MouseHeuristicsType_Vertex.prototype = Object.create(MouseHeuristicsType.prototype);
MouseHeuristicsType_Vertex.prototype.constructor = MouseHeuristicsType_Vertex;
MouseHeuristicsType_Vertex.prototype.mouseHeuristicsType_exec = function (interior, vertex, edge, canvas) {return vertex(this.vertex);};

function MouseHeuristicsType_Edge(edge) {this.edge = edge;}
MouseHeuristicsType_Edge.prototype = Object.create(MouseHeuristicsType.prototype);
MouseHeuristicsType_Edge.prototype.constructor = MouseHeuristicsType_Edge;
MouseHeuristicsType_Edge.prototype.mouseHeuristicsType_exec = function (interior, vertex, edge, canvas) {return edge(this.edge);};

function MouseHeuristicsType_Canvas() {}
MouseHeuristicsType_Canvas.prototype = Object.create(MouseHeuristicsType.prototype);
MouseHeuristicsType_Canvas.prototype.constructor = MouseHeuristicsType_Canvas;
MouseHeuristicsType_Canvas.prototype.mouseHeuristicsType_exec = (interior, vertex, edge, canvas) => canvas();
