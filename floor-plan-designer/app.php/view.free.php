<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Alakzatszerkesztő</title>
		<link rel="shortcut icon" href="/assets-proper/favicon.ico"/>

		<link rel="stylesheet" href="/assets-proper/holy-grail.css"/>
		<link rel="stylesheet" href="/assets-proper/graphics.css"/>
		<link rel="stylesheet" href="/assets-proper/info.css"/>
		<link rel="stylesheet" href="/assets-proper/context-menu.css"/>
		<link rel="stylesheet" href="/help/doc.css"/>

		<script src="/app.js/entry-point/injectorMain.js"></script>
		<script src="/app.js/entry-point/App.js"></script>
		<script src="/app.js/entry-point/Router.js"></script>
		<script src="/app.js/entry-point/WidgetCollision.js"></script>
		<script src="/app.js/entry-point/Global.js"></script>

		<script src="/app.js/helpers-validators/NumberHelperAndValidator.js"></script>
		<script src="/app.js/helpers-validators/QuoteHelper.js"></script>
		<script src="/app.js/helpers-validators/DomHelper.js"></script>

		<script src="/app.js/network/UnfailableProgressingAjaj.js"></script>
		<script src="/app.js/network/UnfailableProgressingAjax.js"></script>

		<script src="/app.js/context-menu/ContextMenu.js"></script>
		<script src="/app.js/context-menu/ContextMenuOption.js"></script>

		<script src="/app.js/state/State.js"></script>
		<script src="/app.js/state/State.config-mixin.js"></script>
		<script src="/app.js/state/JumpStatus.js"></script>

		<script src="/app.js/history/History.js"></script><!-- @TODO Put into `app/state` -->
		<script src="/app.js/history/ShiftableLimitedStack.js"></script><!-- @TODO Put into `app/algebraic-data-types` -->
		<script src="/app.js/history/RouterFlagBasedLocker.js"></script>

		<script src="/app.js/controllers/ControllerMixinHistoryFollowable.js"></script>
		<script src="/app.js/controllers/ControllerMixinCanvasWidgetable.js"></script>

		<script src="/app.js/controllers/CompactModeController.js"></script>
		<script src="/app.js/controllers/NormalModeController.js"></script>
		<script src="/app.js/controllers/RoomController.js"></script>
		<script src="/app.js/controllers/FigureEditorController.js"></script>
		<script src="/app.js/controllers/GeomTransformationController.js"></script>
		<script src="/app.js/controllers/FigurePropertyEditorController.js"></script>
		<script src="/app.js/controllers/FigureNestingController.js"></script>
		<script src="/app.js/controllers/ConfigController.js"></script>
		<script src="/app.js/controllers/TabSelectorController.js"></script>
		<script src="/app.js/controllers/LoaderController.js"></script>
		<script src="/app.js/controllers/SaveController.js"></script>
		<script src="/app.js/controllers/NativeLoaderController.js"></script>
		<script src="/app.js/controllers/ZoomController.js"></script>
		<script src="/app.js/controllers/ContextMenuController.js"></script>
		<script src="/app.js/controllers/HistoryController.js"></script>

		<script src="/app.js/physics/MathematicalObject.js"></script>
		<script src="/app.js/physics/Figure.js"></script>
		<script src="/app.js/physics/Title.js"></script>
		<script src="/app.js/physics/BatteringRam.js"></script>
		<script src="/app.js/physics/Brick.js"></script>
		<script src="/app.js/physics/Pickaxe.js"></script>
		<script src="/app.js/physics/Bucket.js"></script>
		<script src="/app.js/physics/Window.js"></script>
		<script src="/app.js/physics/Door.js"></script>

		<script src="/app.js/physics/Hypothetical.js"></script>
		<script src="/app.js/physics/AlgebraicCollision.js"></script>

		<script src="/app.js/device-drivers/RoomStampDriver.js"></script>
		<script src="/app.js/device-drivers/ModeDriver.js"></script>
		<script src="/app.js/device-drivers/OperationDriver.js"></script>
		<script src="/app.js/device-drivers/KeyboardDriver.js"></script>
		<script src="/app.js/device-drivers/FigurePropertyEditorDriver.js"></script>
		<script src="/app.js/device-drivers/ConfigDriver.js"></script>
		<script src="/app.js/device-drivers/StatusBarDriver.js"></script>
		<script src="/app.js/device-drivers/TabSelectorDriver.js"></script>
		<script src="/app.js/device-drivers/DriverMixinProgress.js"></script>
		<script src="/app.js/device-drivers/LoaderDriver.js"></script>
		<script src="/app.js/device-drivers/SaveDriver.js"></script>
		<script src="/app.js/device-drivers/NativeLoaderDriver.js"></script>
		<script src="/app.js/device-drivers/AudioDriver.js"></script>
		<script src="/app.js/device-drivers/ZoomDriver.js"></script>
		<script src="/app.js/device-drivers/ContextMenuDriver.js"></script>
		<script src="/app.js/device-drivers/HistoryDriver.js"></script>
		<script src="/app.js/device-drivers/UrlPartDriver.js"></script>

		<script src="/app.js/widget-pillar/CanvasPseudoWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/CanvasPseudoWidget.js"></script>
		<script src="/app.js/widget-pillar/WidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/FigureWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/ImageWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/TitleWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/BatteringRamWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/BrickWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/PickaxeWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/BucketWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/WindowWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/DoorWidgetFactory.js"></script>
		<script src="/app.js/widget-pillar/WidgetEventPillar.js"></script>
		<script src="/app.js/widget-pillar/Widget.js"></script>
		<script src="/app.js/widget-pillar/FigureWidget.js"></script>
		<script src="/app.js/widget-pillar/ImageWidget.js"></script>
		<script src="/app.js/widget-pillar/TitleWidget.js"></script>
		<script src="/app.js/widget-pillar/BatteringRamWidget.js"></script>
		<script src="/app.js/widget-pillar/BrickWidget.js"></script>
		<script src="/app.js/widget-pillar/PickaxeWidget.js"></script>
		<script src="/app.js/widget-pillar/BucketWidget.js"></script>
		<script src="/app.js/widget-pillar/WindowWidget.js"></script>
		<script src="/app.js/widget-pillar/DoorWidget.js"></script>
		<script src="/app.js/widget-pillar/CoordSysTransformer.js"></script>
		<script src="/app.js/widget-pillar/Bijection.js"></script>

		<script src="/app.js/business/BusinessObject.js"></script>
		<script src="/app.js/business/RoomFactory.js"></script>
		<script src="/app.js/business/Room.js"></script>
		<script src="/app.js/business/Furniture.js"></script>
		<script src="/app.js/business/MassPoint1Factory.js"></script>
		<script src="/app.js/business/MassPoint1.js"></script>
		<script src="/app.js/business/MassPoint2Factory.js"></script>
		<script src="/app.js/business/MassPoint2.js"></script>

		<script src="/app.js/low-level-system/DOM-manipulation.js"></script>
		<script src="/app.js/low-level-system/SvgLowLevel.js"></script>
		<script src="/app.js/low-level-system/TransformRewriter.js"></script>

		<script src="/app.js/math/geometry.js"></script>
		<script src="/app.js/math/geometry-vector.js"></script>
		<script src="/app.js/math/vector-sequence.js"></script>
		<script src="/app.js/math/geometry-polygon.js"></script>
		<script src="/app.js/math/linear-transformation.js"></script>
		<script src="/app.js/math/data-list.js"></script>
		<script src="/app.js/math/data-maybe.js"></script>
		<script src="/app.js/math/Eq.js"></script>
		<script src="/app.js/math/data-hash.js"></script>
		<script src="/app.js/math/graph.js"></script>
		<script src="/app.js/math/math.js"></script>
		<script src="/app.js/math/collision-common.js"></script>
		<script src="/app.js/math/fall-collision.js"></script>
		<script src="/app.js/math/contour-collision.js"></script>
		<script src="/app.js/math/haskell/app/collision-as-vector-transformation.js"></script>
		<script src="/app.js/math/collision-as-orthogonal-nearness.js"></script>

		<script src="/app.js/math/collision/equation-system-solver.js"></script>
		<script src="/app.js/math/collision/ray-intersection.js"></script>
		<script src="/app.js/math/collision/fall-orientation.js"></script>
		<script src="/app.js/math/collision/fall-vector.js"></script>
		<script src="/app.js/math/ccSubtree.js"></script>

		<script src="/app.js/algebraic-data-types/Maybe.js"></script>
		<script src="/app.js/algebraic-data-types/Either.js"></script>
		<script src="/app.js/algebraic-data-types/EqOrDiff.js"></script>

		<script src="/app.js/slits/SlitsRepresentationCircular.js"></script>
		<script src="/app.js/slits/CircularSlit.js"></script>
		<script src="/app.js/slits/Interval.js"></script>


		<script src="/spec/BehaviorRunner.js"></script>
		<script src="/spec/Mock.js"></script>
		<script src="/spec/SvgLowLevelMock.js"></script>
		<script src="/spec/CoordSysTransformerMock.js"></script>
		<script src="/spec/BijectionMock.js"></script>
		<script src="/spec/FigureMock.js"></script>
		<script src="/spec/Behavior.js"></script>
		<script src="/spec/AppBehavior.js"></script>
		<script src="/spec/FigureBehavior.js"></script>
		<script src="/spec/BijectionBehavior.js"></script>
		<script src="/spec/CollisionBehavior.js"></script>
		<script src="/spec/ContourCollisionBehavior.js"></script>
		<script src="/spec/CollisionAsVectorFieldTransformationBehavior.js"></script>
		<script src="/spec/CollisionAsOrthogonalNearnessBehavior.js"></script>
		<script src="/spec/GeometryVectorBehavior.js"></script>
		<script src="/spec/CcSubtreeBehavior.js"></script>

		<script src="/spec/collision/EquationSystemSolverBehavior.js"></script>
		<script src="/spec/collision/RayIntersectionBehavior.js"></script>
		<script src="/spec/collision/FallOrientationBehavior.js"></script>
		<script src="/spec/collision/FallVectorBehavior.js"></script>

		<script src="/spec/slits/SlitsRepresentationCircularBehavior.js"></script>
		<script src="/spec/slits/CircularSlitBehavior.js"></script>
		<script src="/spec/slits/IntervalBehavior.js"></script>

		<script src="/spec/math/VectorSequenceBehavior.js"></script>


		<script src="/app.js/math/haskell/app/Board.js"></script>
		<script src="/app.js/math/haskell/app/FiguresBoard.js"></script>
		<script src="/app.js/math/haskell/app/Polygon.js"></script>
		<script src="/app.js/math/haskell/app/PolygonReverseDeduction.js"></script>
		<script src="/app.js/math/haskell/app/FourierMotzkinElimination.js"></script>
		<script src="/app.js/math/haskell/app/TourRotation.js"></script>
		<script src="/app.js/math/haskell/app/Orientation.js"></script>
		<script src="/app.js/math/haskell/app/Vector.js"></script>
		<script src="/app.js/math/haskell/app/HilbertGeometry.js"></script>
		<script src="/app.js/math/haskell/app/Geometry.js"></script>
		<script src="/app.js/math/haskell/app/EdgePush.js"></script>
		<script src="/app.js/math/haskell/app/EdgePushnormal.js"></script>
		<script src="/app.js/math/haskell/app/EdgeSpan.js"></script>
		<script src="/app.js/math/haskell/app/TangentDetector.js"></script>
		<script src="/app.js/math/haskell/app/Echolocation.js"></script>
		<script src="/app.js/math/haskell/app/DistanceHence.js"></script>
		<script src="/app.js/math/haskell/app/LineRepresentationForms.js"></script>
		<script src="/app.js/math/haskell/app/VerticePathClickAlgebra.js"></script>
		<script src="/app.js/math/haskell/app/FigureEditorByProximityHeuristic.js"></script>
		<script src="/app.js/math/haskell/app/polygon-property-algebra.js"></script>
		<script src="/app.js/math/haskell/app/RotationArcSpan.js"></script>
		<script src="/app.js/math/haskell/app/RotationArcSpanLog.js"></script>
		<script src="/app.js/math/haskell/app/ScaleStressSpan.js"></script>
		<script src="/app.js/math/haskell/app/ScaleStressSpanLog.js"></script>
		<script src="/app.js/math/haskell/app/ReflectionFlip.js"></script>
		<script src="/app.js/math/haskell/app/LogicalForms.js"></script>
		<script src="/app.js/math/haskell/app/Logic.js"></script>
		<script src="/app.js/math/haskell/app/MaybeX.js"></script>
		<script src="/app.js/math/haskell/app/ListX.js"></script>
		<script src="/app.js/math/haskell/app/Flagging.js"></script>
		<script src="/app.js/math/haskell/app/Either.js"></script>
		<script src="/app.js/math/haskell/app/TupleX.js"></script>
		<script src="/app.js/math/haskell/app/MonadX.js"></script>
		<script src="/app.js/math/haskell/app/NonEmptyFootList.js"></script>
		<script src="/app.js/math/haskell/app/Infinitesimal.js"></script>
		<script src="/app.js/math/haskell/app/LogicalForms.js"></script>
		<script src="/app.js/math/haskell/app/Combinator.js"></script>
		<script src="/app.js/math/haskell/app/Infinity.js"></script>
		<script src="/app.js/math/haskell/app/RealModulus.js"></script>
		<script src="/app.js/math/haskell/app/Sign.js"></script>
		<script src="/app.js/math/haskell/app/Polynomial.js"></script>
		<script src="/app.js/math/haskell/app/Ratio.js"></script>

		<script src="/app.js/math/haskell/testRunner.js"></script>

		<script src="/app.js/math/haskell/spec/PolygonBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/PolygonReverseDeductionBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/FourierMotzkinEliminationBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/VectorBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/LogicalFormsBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/LogicBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/CollisionAsVectorTransformationBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/HilbertGeometryBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/GeometryBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/EdgePushBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/TangentDetectorBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/EcholocationBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/DistanceHenceBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/VerticePathClickAlgebraBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/NonEmptyFootListBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/FigureEditorByProximityHeuristicBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/PolygonPropertyAlgebraBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/RotationArcSpanLogBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/ListXBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/MaybeXBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/EitherBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/MonadXBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/InfinityBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/InfinitesimalBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/SignBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/BoardBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/PolynomialBehavior.js"></script>
		<script src="/app.js/math/haskell/spec/RatioBehavior.js"></script>

		<script src="/spec/algebraic-data-types/MaybeBehavior.js"></script>
		<script src="/spec/algebraic-data-types/EitherBehavior.js"></script>
		<script src="/spec/algebraic-data-types/EqOrDiffBehavior.js"></script>
	</head>
	<body>
		<div class="panel" id="meta">
			<a id="llogo" href="http://floor-plan-designer.curlgrep-phantom-funspec.hu:8012/"><img class="logo" src="/assets-proper/logo--transparent--hack.png"/></a>
			<span id="dummy-db">[<a href="<?php echo ViewHelper::maybeQuery('http://localhost:8011', ['token' => $maybeToken]); ?>">ERP-rendszer</a>][<a href="<?php echo ViewHelper::maybeQuery('http://localhost:8011', ['token' => $maybeToken]); ?>" target="_blank">+</a>]</span>
			<div id="info-cell"><a id="info-icon" href="help/help.html" target="_blank"><img id="bulb" title="Súgó" src="/assets-proper/info-icon-bulb-recut-recolor.png"/></a></div>
			<span id="history" title="Munkatörténet">
				<button id="undo" title="Munkatörténet: Visszavonás">&lt;</button>
				<button id="redo" title="Munkatörténet: Mégis újra">&gt;</button>
			</span>
			<div class="panel" id="global-cfg">
				<div id="config">
					<input type="checkbox" id="config_areainvariance" name="areainvariance"/>
					<label for="config_areainvariance" title="Területtartás (invariancia)">Inv.</label>
					|
					<input type="checkbox" id="config_relativeinsteadofabsolute" name="relativeinsteadofabsolute"/>
					<label for="config_relativeinsteadofabsolute" title="Relatív (abszolút helyett)">Rel(/absz)</label>
					|
					<input type="checkbox" id="config_corner" name="corner" disabled/>
					<label for="config_corner" title="Nevezetes szögek">Nev. szög</label>
					|
					<input type="checkbox" id="config_autonesting" name="autonesting" disabled/>
					<label for="config_autonesting" title="Önbeágyazás (&bdquo;súly&rdquo;)">Súly</label>
					|
					<input type="checkbox" id="config_admin" name="admin"/>
					<label for="config_admin" title="Különleges jogok, pl. szobatípus kézi szerkesztése">Admin</label>
				</div>
			</div>
		</div>
		<div class="panel" id="tabbed-canvasses-left">
			<svg id="svgRoot_menuCanvas_4" width="125" height="374" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			</svg>
			<!-- Credit to https://www.w3schools.com/graphics/svg_feoffset.asp -->
			<svg id="svgRoot_menuCanvas" width="125" height="374" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<!-- defs>
					<filter id="shadow" x="-0.2" y="-0.2" width="200%" height="200%">
						<feOffset result="offOut" in="SourceGraphic" dx="8" dy="8" />
						<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
						<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
						<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
					</filter>
				</defs -->
			</svg>
		</div>
		<div class="panel" id="tabbed-canvasses-right">
			<svg id="svgRoot_menuCanvas_2" width="125" height="374" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			</svg>
			<svg id="svgRoot_menuCanvas_3" width="125" height="374" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			</svg>
		</div>
		<div class="panel" id="mouse-interpretation-modes">
			<div class="panel" id="loader">
				<label for="loader-id" id="loader-idlb">ID.</label>
				<span id="loader-did"><form id="loader-form"><input type="text" id="loader-id" placeholder="-1, -2, -3;" value="<?php echo $prefilledFlatIdField; ?>"/></form><button id="loader-id-cancel">&cross;</button><button type="submit" form="loader-form" id="loader-id-enter">&check;</button></span>
				<span class="error" id="loader-error"></span>
				<button id="loader-new">Új</button>
				<button id="loader-save">Natív mentés</button>
				<div id="jpeg-update-or-link">
					<button id="loader-jpeg">JPEG-export</button>
					<a id="jpeg-download-link" download hidden>JPEG</a>
				</div>
				<button id="loader-db">DB-ről frissít</button>
				<button id="native-loading">Natív betöltés</button>
			</div>
			<div class="panel" id="native-load-panel">
				<div class="popup-title">Natív formátum (korábbi mentési szerializáció) visszatöltése</div>
				<div class="popup-body"><textarea id="native-load-area"></textarea></div>
				<div class="popup-cntrl"><button id="interpret-native-load">Értelmez</button></div>
				<div class="popup-statusbar" id="native-load-statusbar"></div>
			</div>
			<div>
				<em>Zoom:</em>
				<button class="zoom" id="zoom_plus">🔍<sup>+</sup></button><button class="zoom" id="zoom_minus">🔍<sup>-</sup></button><button  class="zoom" id="zoom_zero">🔍<sup>0</sup></button>
				<br/>
				<input type="range" disabled/>
			</div>
			<div id="modes">
				<em>Egérértelmezési módok:</em>
				<table>
					<tr>
						<td colspan="2" title="Mozgatás&lrarr; és fókusz&starf;">Mozg<sup>&lrarr;</sup><br/>Fókusz<sup>&starf;</sup></td>
					</tr>
					<tr>
						<td><input id="modeNormal"  name="mode" value="normal"  type="radio"/><label title="Normál mód"for="modeNormal" >&starf;</label></td>
						<td><input id="modeCompact" name="mode" value="compact" type="radio"/><label title="Kompakt mód (gyorsteszt)"for="modeCompact">&plusmn;</label></td>
					<tr>
				</table>
				<table>
					<tr>
						<th colspan="6">Szerkeszt:</th>
					</tr>
					<tr>
						<td colspan="3">Csúcs</td>
						<td colspan="3">Él</td>
					</tr>
					<tr>
						<td><input id="modeFigureeditoradd" name="mode" value="figureeditoradd"    type="radio"/><label title="Csúcsot hozzáad" for="modeFigureeditoradd">+</label></td>
						<td><input id="modeFigureeditordelete" name="mode" value="figureeditordelete" type="radio"/><label title="Csúcsot töröl" for="modeFigureeditordelete">-</label></td>
						<td><input id="modeFigureeditormove"   name="mode" value="figureeditormove"   type="radio"/><label title="Csúcsot mozgat" for="modeFigureeditormove">&Equilibrium;</label></td>
						<td><input id="modeFigureeditorspan"   name="mode" value="figureeditorspan" type="radio"/>
						<label title="Élnyújtás/kurtítás" for="modeFigureeditorspan">&Rarr;</label></td>
						<td><input id="modeFigureeditorpush"   name="mode" value="figureeditorpush" type="radio"/>
						<label title="Él &bdquo;sínes&rdquo; oldalrahúzása" for="modeFigureeditorpush">&ne;</label></td>
						<td><input id="modeFigureeditorpushnormal"   name="mode" value="figureeditorpushnormal" type="radio"/>
						<label title="Él magára merőleges oldalrahúzása" for="modeFigureeditorpushnormal">&#8614;</label></td>
					</tr>
				</table>
				<table>
					<tr>
						<th colspan="6">Geom. transzf.:</th>
					</tr>
					<tr>
						<td><label for="modeGeomtransformationrotation">Forg</label></td>
						<td colspan="3">Átskál</td>
						<td colspan="2">Tükr</td>
					</tr>
					<tr>
						<td>
							<input id="modeGeomtransformationrotation" name="mode" value="geomtransformationrotation" type="radio"/><label title="Forgat" for="modeGeomtransformationrotation">&#10226;</label>
							<!-- ANTICLOCKWISE GAPPED CIRCLE ARROW toptal.com/designers/htmlarrows/ -->
						</td>
						<td>
							<input id="modeGeomtransformationscale" name="mode" value="geomtransformationscale" type="radio"/><label title="Aránytartó átméretezés" for="modeGeomtransformationscale">&#10530;</label>
						</td>
						<td>
							<input id="modeGeomtransformationscaleX" name="mode" value="geomtransformationscalex" type="radio"/><label title="Aránytorzítás - vízszintes" for="modeGeomtransformationscaleX">&hArr;</label>
							<!-- left right double arrow -->
						</td>
						<td>
							<input id="modeGeomtransformationscaleY" name="mode" value="geomtransformationscaley" type="radio"/><label title="Aaránytorzítás - függőleges" for="modeGeomtransformationscaleY">&DoubleUpDownArrow;</label>
							<!-- up down double arrow -->
						</td>
						<td>
							<input id="modeGeomtransformationreflectionvertically" name="mode" value="geomtransformationreflectionvertically" type="radio"/><label title="Tükrözés - függőleges tengely körül" for="modeGeomtransformationreflectionvertically">&#8697;</label>
							<!-- LEFT RIGHT ARROW WITH VERTICAL STROKE -->
						</td>
						<td>
							<input id="modeGeomtransformationreflectionhorizontally" name="mode" value="geomtransformationreflectionhorizontally" type="radio"/><label title="Tükrözés - vízszintes tengely körül" for="modeGeomtransformationreflectionhorizontally">&#10505;</label>
							<!-- UP ARROW WITH HORIZONTAL STROKE -->
						</td>
					</tr>
				</table>
				<table>
					<tr>
						<th colspan="2">Egyéb:</th>
					</tr>
					<tr>
						<td><label for="modeFigurepropertyeditor" title="📎🗎: Ld. az alakzatra kattintva megnyíló űrlapot">Űrlap</label></td>
						<td><input id="modeFigurepropertyeditor" name="mode" value="figurepropertyeditor" type="radio"/><label for="modeFigurepropertyeditor">🗎</label></td>
					</tr>
					<tr>
						<td><label for="modeFigurenesting"  title="±⌂👁: Követés be/ki. Ld. még: &bdquo;önbeágyazás/súly&rdquo;">Követ</label></td>
						<td><input id="modeFigurenesting"  name="mode" value="figurenesting"  type="radio"/><label for="modeFigurenesting">👁</label></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="panel" id="work">
			<svg id="svgRoot_workCanvas" width="1175" height="692" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<defs>
					<pattern id="padlo1" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/padlo1.png"/>
					</pattern>
					<pattern id="padlo1_dark" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/padlo1_dark.png"/>
					</pattern>
					<pattern id="padlo1_light" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/padlo1_light.png"/>
					</pattern>
					<pattern id="csempe1_dark_small" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/csempe1_dark_small.png"/>
					</pattern>
					<pattern id="keramia" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/keramia.png"/>
					</pattern>
					<pattern id="keramia_dark" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/keramia_dark.png"/>
					</pattern>
					<pattern id="keramia_light" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/keramia_light.png"/>
					</pattern>
					<pattern id="keramia_normal" width="25" height="25" patternUnits="userSpaceOnUse">
						<image xlink:href="/img-vendor/keramia_normal.png"/>
					</pattern>
				</defs>
			</svg>
		</div>
		<div class="panel" id="floats">
			<div class="context-menu" id="sample-context-menu"><!--@credit to https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p for the underlying HTML menu and its CSS, and the main logic of the JavaScript -->
				<div class="context-menu-caption" id="sample-context-menu-caption">Kontextusmenü</div>
				<ul class="context-menu-options" id="sample-context-menu-options">
				</ul>
			</div>
			<div class="panel" id="figure-property-editor-panel">
				<div><em>Alakzattulajdonság-űrlap</em></div>
				<form id="figurepropertyeditor"></form>
			</div>
		</div>
		<div class="panel" id="strange">
			<ul class="panel" id="canvasTabSelector">
				<button id="tab_DB">Adatbázis</button>
				<button id="tab_schema">Szobatípus</button>
				<button id="tab_furniture">Bútor</button>
				<button id="tab_slit">Nyílászáró</button>
			</ul>
			<div class="panel" id="pool">
				<span>Sablon (pecsét):</span>
				<select id="sampleRoomBank">
				</select>
				<br/>
				<div id="section-operations">
					<div><em>Fókuszált alakzat:</em></div>
					<div id="operations">
						<button class="keystroke" id="operationCreate" title="Beszúrása (&bdquo;+&rdquo;)">+</button>
						<button class="keystroke" id="operationDelete" title="Törlése (&bdquo;-&rdquo;, vagy &bdquo;DEL&rdquo;)">-</button>
						<button class="keystroke" id="operationUnfigfocus" title="Defókuszál (&bdquo;ESC&rdquo;)">ESC</button>
					</div>
				</div>
				<div class="panel" id="populator">
					<button disabled>Letelepít</button>
					<button disabled>Újratelepít</button>
				</div>
			</div>
		</div>
		<div class="panel" id="HolyGrail_footer"><em>Rendszerüzenetek:</em> <span id="msgConsole"></span></div>
	</body>
</html>
