<!DOCTYPE html>
<html>
	<head>
		<link rel="shortcut icon" href="/assets-proper/favicon.ico"/>
		<link rel="stylesheet" href="/dummy-db-crud.css"/>
		<meta charset="UTF-8"/>
		<title>Dummy DB CRUD</title>
	</head>
	<body>
		<a href="/">[Vissza az alkalmazáshoz]</a><a href="/" target="_blank">[+]</a>
		<h1>Dummy DB CRUD</h1>
		<h2>Táblák</h2>
		<h3>Lakások</h3>
		<table>
			<caption>flat</caption>
			<tr>
				<th colspan="2">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>address</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
			<tr>
				<td><?php echo $flatRecordViewModel['data']['id']; ?></td>
				<td>
					<input form="flatUpdateForm-<?php echo $flatRecordViewModel['data']['id']; ?>" type="text" name="address" value="<?php echo $flatRecordViewModel['data']['address']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="flatUpdateForm-<?php echo $flatRecordViewModel['data']['id']; ?>" method="POST" action="/router.php/flat/update/<?php echo $flatRecordViewModel['data']['id']; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/router.php/show-all" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/router.php/flat/del/<?php echo $flatRecordViewModel['data']['id']; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $flatRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input type="text" form="insertorform-flat" name="address" value="<?php echo $flatsViewModel['newRecord']['data']['address']; ?>" /></td>
				<td><form id="insertorform-flat" method="POST" action="/router.php/flat/add"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/router.php/show-all" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $flatsViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<!-- table>
			<caption>flat</caption>
			<tr>
				<th>ID</th>
				<th></th>
			</tr>
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
			<tr>
				<td><?php echo $flatRecordViewModel['data']['id']; ?></td>
				<td><form method="POST" action="/router.php/flat/del/<?php echo $flatRecordViewModel['data']['id']; ?>"><input type="submit" value="-" title="Töröl"/></form></th>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><form method="POST" action="/router.php/flat/add"><input type="submit" value="+" title="Beszúr"/></form></th>
			</tr>
		</table -->
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
					<input form="roomPrototypeUpdateForm-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" type="text" name="name" value="<?php echo $roomPrototypeRecordViewModel['data']['name']; ?>"/>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="roomPrototypeUpdateForm-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" method="POST" action="/router.php/room-prototype/update/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/router.php/show-all" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/router.php/room-prototype/del/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $roomPrototypeRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><input type="text" form="insertorform-roomPrototype" name="name" value="<?php echo $roomPrototypesViewModel['newRecord']['data']['name']; ?>" /></td>
				<td><form id="insertorform-roomPrototype" method="POST" action="/router.php/room-prototype/add"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/router.php/show-all" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $roomPrototypesViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
		<!-- table>
			<caption>room_prototype</caption>
			<tr>
				<th colspan="2">Attribútumok</th>
				<th colspan="3">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>name</th>
				<th colspan="2">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
			<tr>
				<td><?php echo $roomPrototypeRecordViewModel['data']['id']; ?></td>
				<td><input form="updaterform-room-prototype-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" type="text" name="name" value="<?php echo $roomPrototypeRecordViewModel['data']['name']; ?>"/></td>
				<td><form id="updaterform-room-prototype-<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>" method="POST" action="/router.php/room-prototype/update/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"><input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/></form></th>
				<td><form method="POST" action="/router.php/room-prototype/del/<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"><input type="submit" value="-" title="Töröl"/></form></th>
				<td class="error"><?php echo $roomPrototypeRecordViewModel['error']; ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<th><input type="text" form="insertorform-room-prototype" name="name"/></th>
				<td colspan="2"><form id="insertorform-room-prototype" method="POST" action="/router.php/room-prototype/add"><input type="submit" value="+" title="Beszúr"/></form></th>
				<td class="error"><?php echo $roomPrototypesViewModel['newRecord']['error']; ?></td>
			</tr>
		</table -->
		<h3>Szobák</h3>
<?php if ($flatsViewModel['records'] && $roomPrototypesViewModel['records']): ?>
		<table>
			<caption>room</caption>
			<tr>
				<th colspan="3">Attribútumok</th>
				<th colspan="4">Kommunikáció</th>
			</tr>
			<tr>
				<th>ID</th>
				<th>flat_id</th>
				<th>room_prototype_id</th>
				<th colspan="3">Parancs</th>
				<th>Üzenet</th>
			</tr>
<?php foreach ($roomsViewModel['records'] as $roomRecordViewModel): ?>
			<tr>
				<td><?php echo $roomRecordViewModel['data']['id']; ?></td>
				<td>
					<select form="roomUpdateForm-<?php echo $roomRecordViewModel['data']['id']; ?>" name="flat_id">
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
						<option value="<?php echo $flatRecordViewModel['data']['id']; ?>"<?php if ($roomRecordViewModel['data']['flat_id'] == $flatRecordViewModel['data']['id']): ?> selected<?php endif; ?>><?php echo '#' . $flatRecordViewModel['data']['id'] . ': ' . abbreviate($flatRecordViewModel['data']['address'], 16); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<select form="roomUpdateForm-<?php echo $roomRecordViewModel['data']['id']; ?>" name="room_prototype_id">
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
						<option value="<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"<?php if ($roomPrototypeRecordViewModel['data']['id'] == $roomRecordViewModel['data']['room_prototype_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomPrototypeRecordViewModel['data']['id'] . ': ' . abbreviate($roomPrototypeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
					<input type="submit" value="↻" disabled/>
				</td>
				<td>
					<form id="roomUpdateForm-<?php echo $roomRecordViewModel['data']['id']; ?>" method="POST" action="/router.php/room/update/<?php echo $roomRecordViewModel['data']['id']; ?>">
						<input type="submit" value="✍" title="Szerkeszt (változások érvényesítése)"/>
					</form>
				</td>
				<td>
					<a href="/router.php/show-all" title="Újratölt (változások elvetése)">↻</a>
				</td>
				<td>
					<form method="POST" action="/router.php/room/del/<?php echo $roomRecordViewModel['data']['id']; ?>"><input type="submit" value="-" title="Töröl"/></form>
				</td>
				<td class="error"><?php echo $roomRecordViewModel['error'] ?></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td>
					<select form="insertorform-room" name="flat_id">
<?php foreach ($flatsViewModel['records'] as $flatRecordViewModel): ?>
						<option value="<?php echo $flatRecordViewModel['data']['id']; ?>"<?php if ($flatRecordViewModel['data']['id'] == $roomsViewModel['newRecord']['data']['flat_id']): ?> selected<?php endif; ?>><?php echo '#' . $flatRecordViewModel['data']['id'] . ': ' . abbreviate($flatRecordViewModel['data']['address'], 16); ?></option>
<?php endforeach; ?>
					</select>
				</td>
				<td>
					<select form="insertorform-room" name="room_prototype_id">
<?php foreach ($roomPrototypesViewModel['records'] as $roomPrototypeRecordViewModel): ?>
						<option value="<?php echo $roomPrototypeRecordViewModel['data']['id']; ?>"<?php if ($roomPrototypeRecordViewModel['data']['id'] == $roomsViewModel['newRecord']['data']['room_prototype_id']): ?> selected<?php endif; ?>><?php echo '#' . $roomPrototypeRecordViewModel['data']['id'] . ': ' . abbreviate($roomPrototypeRecordViewModel['data']['name'], 20); ?></option>
<?php endforeach; ?>
					</select>
				</td>
				<td><form id="insertorform-room" method="POST" action="/router.php/room/add"><input type="submit" value="+" title="Beszúr"/></form></td>
				<td><a href="/router.php/show-all" title="Újratölt (új adatok elvetése)">↻</a></td>
				<td></td>
				<td class="error"><?php echo $roomsViewModel['newRecord']['error']; ?></td>
			</tr>
		</table>
<?php else: ?>
		<p>A Szoba tábla (room) kezelése csak akkor lehetséges, ha a Lakás (flat) és a Szobaprototípus (room_prototype) tábla már tartalmaz felvitt rekordot!</p>
<?php endif; ?>
	</body>
</html>
