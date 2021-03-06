<?php use function viewHelper\abbreviate; ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<link rel="shortcut icon" href="/assets/favicon.ico"/>
		<link rel="stylesheet" href="/assets/CRUD-table.css"/>
		<title>ERP: DB CRUD</title>
	</head>
	<body>
		<form method="POST" action="/logout?token=<?php echo $token; ?>"><button type="submit">Kilépés</button></form>
		<h1>ERP: DB CRUD &mdash; A vállalatirányitási rendszer DB-admin felülete</h1>
		<h2>Alaprajzszerkesztő üres vagy &bdquo;előre beégetett&rdquo; mintaszobás megnyitása</h2>
		<ul>
			<li>
				<a href="http://localhost:8000?token=<?php echo $token; ?>">&bdquo;Üres&rdquo; megnyitás</a>
				(<a href="http://localhost:8000?token=<?php echo $token; ?>" target="_blank">+</a>)
			</li>
			<li>
				<a href="http://localhost:8000/-1?token=<?php echo $token; ?>">Mintaszobák 1</a>
				(<a href="http://localhost:8000/-1?token=<?php echo $token; ?>" target="_blank">+</a>)
			</li>
			<li>
				<a href="http://localhost:8000/-2?token=<?php echo $token; ?>">Mintaszobák 2</a>
				(<a href="http://localhost:8000/-2?token=<?php echo $token; ?>" target="_blank">+</a>)
			</li>
			<li>
				<a href="http://localhost:8000/-3?token=<?php echo $token; ?>">Mintaszobák 3</a>
				(<a href="http://localhost:8000/-3?token=<?php echo $token; ?>" target="_blank">+</a>)
			</li>
		</ul>
		<h2>Táblák</h2>
		<h3>Felhasználók</h3>
		<table>
			<caption>user</caption>
			<tr>
				<th colspan="3">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>name</th>
				<th>password</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($usersViewModel['records'] as $userRecordViewModel): ?>
			<tr>
				<td><?php echo $userRecordViewModel['data']['id']; ?></td>
				<td>
					<input form="updaterform-user-<?php echo $userRecordViewModel['data']['id']; ?>" type="text" name="name" value="<?php echo $userRecordViewModel['data']['name']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<input form="updaterform-user-<?php echo $userRecordViewModel['data']['id']; ?>" type="text" name="password" value="<?php echo $userRecordViewModel['data']['password']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="updaterform-user-<?php echo $userRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/user/update/<?php echo $userRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/user/del/<?php echo $userRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $userRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input type="text" form="insertorform-user" name="name" value="<?php echo $usersViewModel['newRecord']['data']['name']; ?>" /></td>
				<td><input type="text" form="insertorform-user" name="password" value="<?php echo $usersViewModel['newRecord']['data']['password']; ?>" /></td>
				<td><form id="insertorform-user" method="POST" action="/index.php/user/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $usersViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<h3>Munkamenetek</h3>
		<table>
			<caption>session2</caption>
			<tr>
				<th colspan="3">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>user_id</th>
				<th>token</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($sessionsViewModel['records'] as $sessionRecordViewModel): ?>
			<tr>
				<td><?php echo $sessionRecordViewModel['data']['id']; ?></td>
				<td>
					<select form="updaterform-session-<?php echo $sessionRecordViewModel['data']['id']; ?>" name="user_id">
<?php foreach ($usersViewModel['records'] as $userRecordViewModel): ?>
						<option value="<?php echo $userRecordViewModel['data']['id']; ?>"<?php if($userRecordViewModel['data']['id'] == $sessionRecordViewModel['data']['user_id']): ?> selected<?php endif; ?>>
							#<?php echo $userRecordViewModel['data']['id']; ?>:
							<?php echo $userRecordViewModel['data']['name']; ?>

						</option>
<?php endforeach; ?>
					</select>
				</td>
				<td>
					<input form="updaterform-session-<?php echo $sessionRecordViewModel['data']['id']; ?>" type="number" min="1" step="1" name="token" value="<?php echo $sessionRecordViewModel['data']['token']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="updaterform-session-<?php echo $sessionRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/session/update/<?php echo $sessionRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/session/del/<?php echo $sessionRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $sessionRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td>
					<select form="insertorform-session" name="user_id">
						<option>&mdash;VÁLASSZ&mdash;</option>
<?php foreach ($usersViewModel['records'] as $userRecordViewModel): ?>
						<option value="<?php echo $userRecordViewModel['data']['id']; ?>">
							#<?php echo $userRecordViewModel['data']['id']; ?>:
							<?php echo $userRecordViewModel['data']['name']; ?>

						</option>
<?php endforeach; ?>
					</select>
				</td>
				<td><input type="number" min="1" step="1" form="insertorform-session" name="token" value="<?php echo $sessionsViewModel['newRecord']['data']['token']; ?>" /></td>
				<td><form id="insertorform-session" method="POST" action="/index.php/session/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $sessionsViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<h3>Lakások</h3>
		<table>
			<caption>flat</caption>
			<tr>
				<th colspan="2">Attribútumok</th>
				<th colspan="5">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>address</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
				<th>Alaprajztervező megnyitása</th>
			</tr>
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
			<tr>
				<td><?php echo $flatRecordViewModel['data']['id']; ?></td>
				<td>
					<input form="updaterform-flat-<?php echo $flatRecordViewModel['data']['id']; ?>" type="text" name="address" value="<?php echo $flatRecordViewModel['data']['address']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="updaterform-flat-<?php echo $flatRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/flat/update/<?php echo $flatRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/flat/del/<?php echo $flatRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $flatRecordViewModel['error'] ?></td>
				<td class="<?php if ($flatRecordViewModel['data']['rooms'] > 0): ?>nonempty<?php else: ?>empty<?php endif; ?>">
					<a href="http://localhost:8000/<?php echo $flatRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><?php if ($flatRecordViewModel['data']['rooms'] > 0): ?><?php echo $flatRecordViewModel['data']['rooms']; ?>-szobás<?php else: ?>Még üres<?php endif; ?></a>
					(<a href="http://localhost:8000/<?php echo $flatRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>" target="_blank">+</a>)
				</td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input form="insertorform-flat" type="text" name="address" value="<?php echo $flatsViewModel['newRecord']['data']['address']; ?>"/></td>
				<td><form id="insertorform-flat" method="POST" action="/index.php/flat/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $flatsViewModel['newRecord']['error']; ?></td>
				<td></td>
			</tr>
		</table>
		<h3>Szoba-prototípusok</h3>
		<table>
			<caption>room_prototype</caption>
			<tr>
				<th colspan="2">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>name</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
			<tr>
				<td><?php echo $roomPrototypeRecordViewModel['data']['id']; ?></td>
				<td>
					<input form="updaterform-roomPrototype-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" type="text" name="name" value="<?php echo $roomPrototypeRecordViewModel['data']['name']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="updaterform-roomPrototype-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/room-prototype/update/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/room-prototype/del/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $roomPrototypeRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input type="text" form="insertorform-roomPrototype" name="name" value="<?php echo $roomPrototypesViewModel['newRecord']['data']['name']; ?>" /></td>
				<td><form id="insertorform-roomPrototype" method="POST" action="/index.php/room-prototype/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $roomPrototypesViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<h3>Szobaalakzatok</h3>
		<table>
			<caption>room_shape</caption>
			<tr>
				<th colspan="8">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>symbol</th>
				<th>name</th>
				<th>arity</th>
				<th>interpr_1</th>
				<th>interpr_2</th>
				<th>interpr_3</th>
				<th>interpr_4</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($roomShapesViewModel['records'] as $roomShapeRecordViewModel): ?>
			<tr>
				<td><?php echo $roomShapeRecordViewModel['data']['id']; ?></td>
				<td>
					<input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="symbol" value="<?php echo $roomShapeRecordViewModel['data']['symbol']; ?>" size="1" maxLength="1"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="name" value="<?php echo $roomShapeRecordViewModel['data']['name']; ?>" size="8"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<select form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" name="arity">
<?php foreach (range(0, 4) as $possibleArity): ?>
						<option value="<?php echo $possibleArity; ?>"<?php if ($roomShapeRecordViewModel['data']['arity'] == $possibleArity): ?> selected<?php endif; ?>><?php echo $possibleArity; ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td><input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="interpret_argument_1" value="<?php echo $roomShapeRecordViewModel['data']['interpret_argument_1']; ?>" size="9"/></td>
				<td><input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="interpret_argument_2" value="<?php echo $roomShapeRecordViewModel['data']['interpret_argument_2']; ?>" size="9"/></td>
				<td><input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="interpret_argument_3" value="<?php echo $roomShapeRecordViewModel['data']['interpret_argument_3']; ?>" size="9"/></td>
				<td><input form="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" type="text" name="interpret_argument_4" value="<?php echo $roomShapeRecordViewModel['data']['interpret_argument_4']; ?>" size="9"/></td>
				<td>
					<form id="updaterform-roomShape-<?php echo $roomShapeRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/room-shape/update/<?php echo $roomShapeRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/room-shape/del/<?php echo $roomShapeRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $roomShapeRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input form="insertorform-roomShape" type="text" name="symbol" value="<?php echo $roomShapesViewModel['newRecord']['data']['symbol']; ?>" size="1" maxLength="1"/></td>
				<td><input form="insertorform-roomShape" type="text" name="name" value="<?php echo $roomShapesViewModel['newRecord']['data']['name']; ?>" size="8"/></td>
				<td>
					<select form="insertorform-roomShape" name="arity">
<?php foreach (array_merge(['?'], range(0, 4)) as $possibleArity): ?>
						<option value="<?php echo $possibleArity; ?>"<?php if (is_numeric($roomShapesViewModel['newRecord']['data']['arity']) && is_numeric($possibleArity) && $possibleArity == $roomShapesViewModel['newRecord']['data']['arity'] || !is_numeric($roomShapesViewModel['newRecord']['data']['arity']) && !is_numeric($possibleArity)): ?> selected<?php endif; ?>><?php echo $possibleArity; ?></option>
<?php endforeach; ?>
					</select>
				</td>
				<td><input form="insertorform-roomShape" type="text" name="interpret_argument_1" value="<?php echo $roomShapesViewModel['newRecord']['data']['interpret_argument_1']; ?>" size="9"/></td>
				<td><input form="insertorform-roomShape" type="text" name="interpret_argument_2" value="<?php echo $roomShapesViewModel['newRecord']['data']['interpret_argument_2']; ?>" size="9"/></td>
				<td><input form="insertorform-roomShape" type="text" name="interpret_argument_3" value="<?php echo $roomShapesViewModel['newRecord']['data']['interpret_argument_3']; ?>" size="9"/></td>
				<td><input form="insertorform-roomShape" type="text" name="interpret_argument_4" value="<?php echo $roomShapesViewModel['newRecord']['data']['interpret_argument_4']; ?>" size="9"/></td>
				<td><form id="insertorform-roomShape" method="POST" action="/index.php/room-shape/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $roomShapesViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<h3>Szobák</h3>
<?php if ($flatsViewModel['records'] && $roomPrototypesViewModel['records']): ?>
		<table>
			<caption>room</caption>
			<tr>
				<th colspan="10">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>flat_id</th>
				<th>prototype_id</th>
				<th>area</th>
				<th>autocorr</th>
				<th>shape_id</th>
				<th>arg_1</th>
				<th>arg_2</th>
				<th>arg_3</th>
				<th>arg_4</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($roomsViewModel['records'] as $roomRecordViewModel): ?>
			<tr>
				<td><?php echo $roomRecordViewModel['data']['id']; ?></td>
				<td>
					<select form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" name="flat_id">
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
						<option value="<?php echo $flatRecordViewModel['data']['id']; ?>"<?php if ($roomRecordViewModel['data']['flat_id'] == $flatRecordViewModel['data']['id']): ?> selected<?php endif; ?>><?php echo '#' . $flatRecordViewModel['data']['id'] . ': ' . abbreviate($flatRecordViewModel['data']['address'], 16); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<select form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" name="prototype_id">
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
						<option value="<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"<?php if ($roomPrototypeRecordViewModel['data']['id'] == $roomRecordViewModel['data']['prototype_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomPrototypeRecordViewModel['data']['id'] . ': ' . abbreviate($roomPrototypeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="text" name="area" value="<?php echo $roomRecordViewModel['data']['area']; ?>" size="4"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="radio" id="autocorr-1-<?php echo $roomRecordViewModel['data']['id']; ?>" name="autocorr_dir_fwd" value="1"<?php if ($roomRecordViewModel['data']['autocorr_dir_fwd']): ?>checked<?php endif; ?>/><label for="autocorr-1-<?php echo $roomRecordViewModel['data']['id']; ?>">1</label> | <input type="radio" id="autocorr-0-<?php echo $roomRecordViewModel['data']['id']; ?>" form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" name="autocorr_dir_fwd" value="0"<?php if (!$roomRecordViewModel['data']['autocorr_dir_fwd']): ?>checked<?php endif; ?>/><label for="autocorr-0-<?php echo $roomRecordViewModel['data']['id']; ?>">0</label>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<select form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" name="shape_id">
<?php foreach ($roomShapesViewModel['records'] as $roomShapeRecordViewModel): ?>
						<option value="<?php echo $roomShapeRecordViewModel['data']['id']; ?>"<?php if ($roomShapeRecordViewModel['data']['id'] == $roomRecordViewModel['data']['shape_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomShapeRecordViewModel['data']['id'] . ' [' . $roomShapeRecordViewModel['data']['symbol'] . ']: ' . abbreviate($roomShapeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td><input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="text" name="shape_argument_1" value="<?php echo $roomRecordViewModel['data']['shape_argument_1']; ?>" size="4"/></td>
				<td><input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="text" name="shape_argument_2" value="<?php echo $roomRecordViewModel['data']['shape_argument_2']; ?>" size="4"/></td>
				<td><input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="text" name="shape_argument_3" value="<?php echo $roomRecordViewModel['data']['shape_argument_3']; ?>" size="4"/></td>
				<td><input form="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" type="text" name="shape_argument_4" value="<?php echo $roomRecordViewModel['data']['shape_argument_4']; ?>" size="4"/></td>
				<td>
					<form id="updaterform-room-<?php echo $roomRecordViewModel['data']['id']; ?>" method="POST" action="/index.php/room/update/<?php echo $roomRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/index.php/room/del/<?php echo $roomRecordViewModel['data']['id']; ?>?token=<?php echo $token; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $roomRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td>
					<select form="insertorform-room" name="flat_id">
						<option class="choose" value="">&mdash; VÁLASSZ! &mdash;</option>
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
						<option value="<?php echo $flatRecordViewModel['data']['id']; ?>"<?php if ($flatRecordViewModel['data']['id'] == $roomsViewModel['newRecord']['data']['flat_id']): ?> selected<?php endif; ?>><?php echo '#' . $flatRecordViewModel['data']['id'] . ': ' . abbreviate($flatRecordViewModel['data']['address'], 16); ?></option>
<?php endforeach; ?>
					</select>
				</td>
				<td>
					<select form="insertorform-room" name="prototype_id">
						<option class="choose" value="">&mdash; VÁLASSZ! &mdash;</option>
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
						<option value="<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"<?php if ($roomPrototypeRecordViewModel['data']['id'] == $roomsViewModel['newRecord']['data']['prototype_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomPrototypeRecordViewModel['data']['id'] . ': ' . abbreviate($roomPrototypeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
				</td>
				<td><input form="insertorform-room" type="text" name="area" value="<?php echo $roomsViewModel['newRecord']['data']['area']; ?>" size="4"/></td>
				<td><input form="insertorform-room" type="radio" id="autocorr-1-new" name="autocorr_dir_fwd" value="1"<?php if (isset($roomsViewModel['newRecord']['data']['autocorr_dir_fwd']) && $roomsViewModel['newRecord']['data']['autocorr_dir_fwd'] === "1"): ?>checked<?php endif; ?>/><label for="autocorr-1-new">1</label> | <input type="radio" id="autocorr-0-new" form="insertorform-room" name="autocorr_dir_fwd" value="0"<?php if (isset($roomsViewModel['newRecord']['data']['autocorr_dir_fwd']) && $roomsViewModel['newRecord']['data']['autocorr_dir_fwd'] === "0"): ?>checked<?php endif; ?>/><label for="autocorr-0-new">0</label></td>
				<td>
					<select form="insertorform-room" name="shape_id">
						<option class="choose" value=""<?php if (!$roomsViewModel['newRecord']['data']['shape_id']): ?> selected<?php endif; ?>>&mdash; VÁLASSZ! &mdash;</option>
<?php foreach ($roomShapesViewModel['records'] as $roomShapeRecordViewModel): ?>
						<option value="<?php echo $roomShapeRecordViewModel['data']['id']; ?>"<?php if ($roomShapeRecordViewModel['data']['id'] == $roomsViewModel['newRecord']['data']['shape_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomShapeRecordViewModel['data']['id'] . ' [' . $roomShapeRecordViewModel['data']['symbol'] . ']: ' . abbreviate($roomShapeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td><input form="insertorform-room" type="text" name="shape_argument_1" value="<?php echo $roomsViewModel['newRecord']['data']['shape_argument_1']; ?>" size="4"/></td>
				<td><input form="insertorform-room" type="text" name="shape_argument_2" value="<?php echo $roomsViewModel['newRecord']['data']['shape_argument_2']; ?>" size="4"/></td>
				<td><input form="insertorform-room" type="text" name="shape_argument_3" value="<?php echo $roomsViewModel['newRecord']['data']['shape_argument_3']; ?>" size="4"/></td>
				<td><input form="insertorform-room" type="text" name="shape_argument_4" value="<?php echo $roomsViewModel['newRecord']['data']['shape_argument_4']; ?>" size="4"/></td>
				<td><form id="insertorform-room" method="POST" action="/index.php/room/add?token=<?php echo $token; ?>"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/index.php/show-all?token=<?php echo $token; ?>" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $roomsViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
<?php else: ?>
		<p>A Szoba tábla (room) kezelése csak akkor lehetséges, ha a Lakás (flat) és a Szobaprototípus (room_prototype) tábla már tartalmaz felvitt rekordot!</p>
<?php endif; ?>
	</body>
</html>
