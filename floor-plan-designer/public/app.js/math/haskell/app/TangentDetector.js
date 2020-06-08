const polygonSlideDirection = (slidingPolygon, targetPolygon) =>
	combineSlides(
		append(
			slideVerticesOnEdges(slidingPolygon, tour(targetPolygon)),
			slideEdgesOnVertices(tour(slidingPolygon), targetPolygon)
		)
	);

const slideVerticesOnEdges = (slidingVertices, targetEdges) => descartesWith(maybeConvexDirectionOfIncidenceVertexOnEdge, slidingVertices, targetEdges),
      slideEdgesOnVertices = (slidingEdges, targetVertices) => descartesWith(maybeConvexDirectionOfIncidenceEdgeOnVertex, slidingEdges, targetVertices);

const maybeConvexDirectionOfIncidenceVertexOnEdge = (vertex, edge) => incidenceVertexOnEdge(vertex, edge) ? ['just', absoluteConvexAngleOfSegment(edge)] : ['nothing'],
      maybeConvexDirectionOfIncidenceEdgeOnVertex = (edge, vertex) => incidenceEdgeOnVertex(edge, vertex) ? ['just', absoluteConvexAngleOfSegment(edge)] : ['nothing'];

const combineSlides          = slides => maybeUnambiguityByCcEq(catMaybes(slides));
      maybeUnambiguityByCcEq = convexDirections => maybeUnambiguityByEq(ccEq, convexDirections);

const absoluteConvexAngleOfLine    = ([a, b, c]) => mod_0_180(Math.atan2(a, -b) * 180 / Math.PI),
      absoluteConvexAngleOfSegment = segment     => absoluteConvexAngleOfLine(lineOfSegment(segment));
