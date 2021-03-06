<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Alakzatszerkesztő</title>
		<link rel="shortcut icon" href="/assets-proper/favicon.ico"/>

		<link rel="stylesheet" href="assets-proper/holy-grail.css"/>
		<link rel="stylesheet" href="assets-proper/graphics.css"/>
		<link rel="stylesheet" href="help/doc.css"/>

		<script src="app/entry-point/injectorMain.js"></script>
		<script src="app/entry-point/App.js"></script>
		<script src="app/entry-point/Router.js"></script>
		<script src="app/entry-point/WidgetCollision.js"></script>

		<script src="app/state/State.js"></script>
		<script src="app/state/State.config-mixin.js"></script>

		<script src="app/controllers/CanvasMultiplicityComponent.js"></script>
		<script src="app/controllers/Controller.js"></script>
		<script src="app/controllers/CompactModeController.js"></script>
		<script src="app/controllers/NormalModeController.js"></script>
		<script src="app/controllers/RoomController.js"></script>
		<script src="app/controllers/FigureEditorController.js"></script>
		<script src="app/controllers/GeomTransformationController.js"></script>
		<script src="app/controllers/FigurePropertyEditorController.js"></script>
		<script src="app/controllers/ConfigController.js"></script>

		<script src="app/physics/MathematicalObject.js"></script>
		<script src="app/physics/Figure.js"></script>
		<script src="app/physics/Title.js"></script>

		<script src="app/physics/Hypothetical.js"></script>
		<script src="app/physics/AlgebraicCollision.js"></script>

		<script src="app/device-drivers/RoomStampDriver.js"></script>
		<script src="app/device-drivers/ModeDriver.js"></script>
		<script src="app/device-drivers/OperationDriver.js"></script>
		<script src="app/device-drivers/KeyboardDriver.js"></script>
		<script src="app/device-drivers/FigurePropertyEditorDriver.js"></script>
		<script src="app/device-drivers/ConfigDriver.js"></script>
		<script src="app/device-drivers/StatusBarDriver.js"></script>

		<script src="app/widget-pillar/WidgetFactory.js"></script>
		<script src="app/widget-pillar/WidgetEventPillar.js"></script>
		<script src="app/widget-pillar/Widget.js"></script>
		<script src="app/widget-pillar/FigureWidget.js"></script>
		<script src="app/widget-pillar/TitleWidget.js"></script>
		<script src="app/widget-pillar/CoordSysTransformer.js"></script>
		<script src="app/widget-pillar/Bijection.js"></script>

		<script src="app/business/BusinessObject.js"></script>
		<script src="app/business/RoomFactory.js"></script>
		<script src="app/business/Room.js"></script>
		<script src="app/business/MassPoint1Factory.js"></script>
		<script src="app/business/MassPoint1.js"></script>
		<script src="app/business/MassPoint2Factory.js"></script>
		<script src="app/business/MassPoint2.js"></script>

		<script src="app/low-level-system/DOM-manipulation.js"></script>
		<script src="app/low-level-system/SvgLowLevel.js"></script>
		<script src="app/low-level-system/MyAudio.js"></script>

		<script src="app/math/geometry.js"></script>
		<script src="app/math/geometry-vector.js"></script>
		<script src="app/math/geometry-polygon.js"></script>
		<script src="app/math/linear-transformation.js"></script>
		<script src="app/math/data-list.js"></script>
		<script src="app/math/data-maybe.js"></script>
		<script src="app/math/Eq.js"></script>
		<script src="app/math/data-hash.js"></script>
		<script src="app/math/graph.js"></script>
		<script src="app/math/math.js"></script>
		<script src="app/math/collision-common.js"></script>
		<script src="app/math/fall-collision.js"></script>
		<script src="app/math/contour-collision.js"></script>
		<script src="app/math/haskell/app/collision-as-vector-transformation.js"></script>
		<script src="app/math/collision-as-orthogonal-nearness.js"></script>

		<script src="app/math/collision/equation-system-solver.js"></script>
		<script src="app/math/collision/ray-intersection.js"></script>
		<script src="app/math/collision/fall-orientation.js"></script>
		<script src="app/math/collision/fall-vector.js"></script>
		<script src="app/math/ccSubtree.js"></script>

		<script src="spec/BehaviorRunner.js"></script>
		<script src="spec/Mock.js"></script>
		<script src="spec/SvgLowLevelMock.js"></script>
		<script src="spec/CoordSysTransformerMock.js"></script>
		<script src="spec/BijectionMock.js"></script>
		<script src="spec/FigureMock.js"></script>
		<script src="spec/Behavior.js"></script>
		<script src="spec/AppBehavior.js"></script>
		<script src="spec/FigureBehavior.js"></script>
		<script src="spec/BijectionBehavior.js"></script>
		<script src="spec/CollisionBehavior.js"></script>
		<script src="spec/ContourCollisionBehavior.js"></script>
		<script src="spec/CollisionAsVectorFieldTransformationBehavior.js"></script>
		<script src="spec/CollisionAsOrthogonalNearnessBehavior.js"></script>
		<script src="spec/GeometryVectorBehavior.js"></script>
		<script src="spec/CcSubtreeBehavior.js"></script>

		<script src="spec/collision/EquationSystemSolverBehavior.js"></script>
		<script src="spec/collision/RayIntersectionBehavior.js"></script>
		<script src="spec/collision/FallOrientationBehavior.js"></script>
		<script src="spec/collision/FallVectorBehavior.js"></script>


		<script src="app/math/haskell/app/Board.js"></script>
		<script src="app/math/haskell/app/FiguresBoard.js"></script>
		<script src="app/math/haskell/app/Polygon.js"></script>
		<script src="app/math/haskell/app/PolygonReverseDeduction.js"></script>
		<script src="app/math/haskell/app/FourierMotzkinElimination.js"></script>
		<script src="app/math/haskell/app/TourRotation.js"></script>
		<script src="app/math/haskell/app/Orientation.js"></script>
		<script src="app/math/haskell/app/Vector.js"></script>
		<script src="app/math/haskell/app/HilbertGeometry.js"></script>
		<script src="app/math/haskell/app/Geometry.js"></script>
		<script src="app/math/haskell/app/TangentDetector.js"></script>
		<script src="app/math/haskell/app/Echolocation.js"></script>
		<script src="app/math/haskell/app/DistanceHence.js"></script>
		<script src="app/math/haskell/app/LineRepresentationForms.js"></script>
		<script src="app/math/haskell/app/VerticePathClickAlgebra.js"></script>
		<script src="app/math/haskell/app/FigureEditorByProximityHeuristic.js"></script>
		<script src="app/math/haskell/app/polygon-property-algebra.js"></script>
		<script src="app/math/haskell/app/RotationArcSpan.js"></script>
		<script src="app/math/haskell/app/RotationArcSpanLog.js"></script>
		<script src="app/math/haskell/app/ScaleStressSpan.js"></script>
		<script src="app/math/haskell/app/ScaleStressSpanLog.js"></script>
		<script src="app/math/haskell/app/ReflectionFlip.js"></script>
		<script src="app/math/haskell/app/LogicalForms.js"></script>
		<script src="app/math/haskell/app/Logic.js"></script>
		<script src="app/math/haskell/app/MaybeX.js"></script>
		<script src="app/math/haskell/app/ListX.js"></script>
		<script src="app/math/haskell/app/Either.js"></script>
		<script src="app/math/haskell/app/TupleX.js"></script>
		<script src="app/math/haskell/app/MonadX.js"></script>
		<script src="app/math/haskell/app/NonEmptyFootList.js"></script>
		<script src="app/math/haskell/app/Infinitesimal.js"></script>
		<script src="app/math/haskell/app/LogicalForms.js"></script>
		<script src="app/math/haskell/app/Combinator.js"></script>
		<script src="app/math/haskell/app/Infinity.js"></script>
		<script src="app/math/haskell/app/RealModulus.js"></script>
		<script src="app/math/haskell/app/Sign.js"></script>
		<script src="app/math/haskell/app/Polynomial.js"></script>
		<script src="app/math/haskell/app/Ratio.js"></script>

		<script src="app/math/haskell/testRunner.js"></script>

		<script src="app/math/haskell/spec/PolygonBehavior.js"></script>
		<script src="app/math/haskell/spec/PolygonReverseDeductionBehavior.js"></script>
		<script src="app/math/haskell/spec/FourierMotzkinEliminationBehavior.js"></script>
		<script src="app/math/haskell/spec/VectorBehavior.js"></script>
		<script src="app/math/haskell/spec/LogicalFormsBehavior.js"></script>
		<script src="app/math/haskell/spec/LogicBehavior.js"></script>
		<script src="app/math/haskell/spec/CollisionAsVectorTransformationBehavior.js"></script>
		<script src="app/math/haskell/spec/HilbertGeometryBehavior.js"></script>
		<script src="app/math/haskell/spec/GeometryBehavior.js"></script>
		<script src="app/math/haskell/spec/TangentDetectorBehavior.js"></script>
		<script src="app/math/haskell/spec/EcholocationBehavior.js"></script>
		<script src="app/math/haskell/spec/DistanceHenceBehavior.js"></script>
		<script src="app/math/haskell/spec/VerticePathClickAlgebraBehavior.js"></script>
		<script src="app/math/haskell/spec/NonEmptyFootListBehavior.js"></script>
		<script src="app/math/haskell/spec/FigureEditorByProximityHeuristicBehavior.js"></script>
		<script src="app/math/haskell/spec/PolygonPropertyAlgebraBehavior.js"></script>
		<script src="app/math/haskell/spec/RotationArcSpanLogBehavior.js"></script>
		<script src="app/math/haskell/spec/ListXBehavior.js"></script>
		<script src="app/math/haskell/spec/MaybeXBehavior.js"></script>
		<script src="app/math/haskell/spec/EitherBehavior.js"></script>
		<script src="app/math/haskell/spec/MonadXBehavior.js"></script>
		<script src="app/math/haskell/spec/InfinityBehavior.js"></script>
		<script src="app/math/haskell/spec/InfinitesimalBehavior.js"></script>
		<script src="app/math/haskell/spec/SignBehavior.js"></script>
		<script src="app/math/haskell/spec/BoardBehavior.js"></script>
		<script src="app/math/haskell/spec/PolynomialBehavior.js"></script>
		<script src="app/math/haskell/spec/RatioBehavior.js"></script>
	</head>
	<body>
		<div id="appContainer">
			<div id="HolyGrail_header">
				<a href="help/help.html">Súgó</a>
				<h1>Alakzatszerkesztő (refaktorizált változat)</h1>
			</div>
			<div id="HolyGrail_left">
				<div id="config">
					<input type="checkbox" id="config_areainvariance" name="areainvariance"/>
					<label for="config_areainvariance">Területtartás</label>
					<br/>
					<input type="checkbox" id="config_relativeinsteadofabsolute" name="relativeinsteadofabsolute"/>
					<label for="config_relativeinsteadofabsolute">Relatív (abszolút helyett)</label>
				</div>
				<em>Egérértelmezési módok:</em>
				<ul id="modes">
					<li>
						Mozgatás<sup>&lrarr;</sup> és fókusz<sup>&ofcir;</sup>:<br/><!-- circled bullet http://www.amp-what.com/unicode/search/circle -->
						<input id="modeNormal"  name="mode" value="normal"  type="radio"/><label title="Normál mód"for="modeNormal" >&lrarr;&ofcir;</label>
						<!-- normál mód -->
						|
						<input id="modeCompact" name="mode" value="compact" type="radio"/><label title="Kompakt mód (gyorsteszt)"for="modeCompact">&lrarr;+-</label>
						<!-- kompakt (gyorsteszt) -->
					</li>
					<li>
						Csúcs- és élszerkesztés:
						<ul>
							<li>
								<input id="modeFigureeditoradd" name="mode" value="figureeditoradd"    type="radio"/><label title="Hozzáad" for="modeFigureeditoradd">+</label>
								<!-- hozzáad -->
								|
								<input id="modeFigureeditordelete" name="mode" value="figureeditordelete" type="radio"/><label title="Töröl" for="modeFigureeditordelete">-</label>
								|
								<input id="modeFigureeditormove"   name="mode" value="figureeditormove"   type="radio"/><label title="Mozgat" for="modeFigureeditormove">&Equilibrium;</label>
							</li>
							<li>
								<label title="Élnyújtás/kurtítás">&Rarr;</label>
								|
								<label title="Él oldalrahúzása">&#8614;</label>
							</li>
						</ul>
					</li>
					<li>
						<span>Geometriai transzformációk:</span>
						<table>
							<tr>
								<td>
									<input id="modeGeomtransformationrotation" name="mode" value="geomtransformationrotation" type="radio"/><label title="Forgat" for="modeGeomtransformationrotation">&#10226;</label>
									<!-- ANTICLOCKWISE GAPPED CIRCLE ARROW toptal.com/designers/htmlarrows/ -->
								</td>
								<td colspan="2"></td>
							</tr>
							<tr>
								<td>
									<input id="modeGeomtransformationscale" name="mode" value="geomtransformationscale" type="radio"/><label title="Átméretez" for="modeGeomtransformationscale">&#10530;</label>
								</td>
								<td>
									<input id="modeGeomtransformationscaleX" name="mode" value="geomtransformationscalex" type="radio"/><label title="Átméretezés vízszintes aránytorzítással, területtorzító, abszolút viszonyítás" for="modeGeomtransformationscaleX">&hArr;</label>
									<!-- left right double arrow -->
								</td>
								<td>
									<input id="modeGeomtransformationscaleY" name="mode" value="geomtransformationscaley" type="radio"/><label title="Átméretezés függőleges aránytorzítással, területtorzító, abszolút viszonyítás" for="modeGeomtransformationscaleY">&DoubleUpDownArrow;</label>
									<!-- up down double arrow -->
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<input id="modeGeomtransformationreflectionvertically" name="mode" value="geomtransformationreflectionvertically" type="radio"/><label title="Tükrözés - függőleges, abszolút (rajzvászonhoz viszonyított)" for="modeGeomtransformationreflectionvertically">&#8697;</label>
									<!-- LEFT RIGHT ARROW WITH VERTICAL STROKE -->
								</td>
								<td>
									<input id="modeGeomtransformationreflectionhorizontally" name="mode" value="geomtransformationreflectionhorizontally" type="radio"/><label title="Tükrözés - vízszintes, abszolút (rajzvászonhoz viszonyított)" for="modeGeomtransformationreflectionhorizontally">&#10505;</label>
									<!-- UP ARROW WITH HORIZONTAL STROKE -->
								</td>
							</tr>
						</table>
					</li>

					<li><input id="modeFigurepropertyeditor" name="mode" value="figurepropertyeditor" type="radio"/> <label for="modeFigurepropertyeditor">Alakzatalapadatok szöveges szerkeszthetősége + tulajdonságinfók</label></li>
				</ul>
				<div><em>Alakzattulajdonság-szerkesztés</em></div>
				<form id="figurepropertyeditor"></form>
			</div>
			<div id="HolyGrail_main">
				<h2>Vásznak</h2>
				A forrásvászonról a célvászonra az alakzatok egyszerűen áthúzhatóak (és visszafelé is). Mindkét vásznon értelemszerűen működik az összes egyéb művelet (alakzatszerkesztés csúcsok hozzáadásával, törlésével, mozgatásával, geometriai transzformációk, alakzat hozzáadása vagy törlése listából kiválalasztott sablonalak alapján).
				<div><em>Célvászon:</em></div>
				<svg id="svgRoot_workCanvas" width="600" height="400">
			</svg>
			</div>
			<div id="HolyGrail_right">
				<label for="sampleRoomBank">A következő beszúrható szobasablon:</label>
				<select id="sampleRoomBank">
				</select>
				<br/>
				<div id="section-operations">
					<div><em>Fókuszált alakzathoz kötődő gomb- és gyorsbilentyűparancsok (kattints a dobozkára, vagy alternatívaként nyomd meg a megadott billentyű-gyorsparancsot a billentyűzeten):</em></div>
					<ul id="operations">
						<li><button id="operationCreate">Új alakzat beszúrása</button> (vagy &bdquo;<span class="keystroke">+</span>&rdquo;-billentyű)</li>
						<li><button id="operationDelete">Fókuszált alakzat törlése</button> (vagy &bdquo;<span class="keystroke">-</span>&rdquo;, vagy &bdquo;<span class="keystroke">DEL</span>&rdquo;-billentyű)</li>
						<li><button id="operationUnfigfocus">Alakzatfókusz levétele</button> (vagy &bdquo;<span class="keystroke">ESC</span>&rdquo;-billentyű)</li>
					</ul>
				</div>
				<div><em>Forrásvászon:</em></div>
				<!-- Credit to https://www.w3schools.com/graphics/svg_feoffset.asp -->
				<svg id="svgRoot_menuCanvas" width="250" height="400">
					<defs>
						<filter id="shadow" x="-0.2" y="-0.2" width="200%" height="200%">
							<feOffset result="offOut" in="SourceGraphic" dx="8" dy="8" />
							<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
							<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
							<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
						</filter>
					</defs>
				</svg>
			</div>
			<div id="HolyGrail_footer"><em>Rendszerüzenetek:</em> <span id="msgConsole"></span></div>
		</div>
	</body>
</html>
