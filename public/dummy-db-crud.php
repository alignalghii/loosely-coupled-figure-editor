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
		<table>
			<caption>Lakások</caption>
			<tr>
				<th>ID</th>
				<th></th>
			</tr>
<?php foreach ($flats as $flat): ?>
			<tr>
				<td><?php echo $flat['id']; ?></td>
				<td><form method="POST" action="/router.php/flat/del/<?php echo $flat['id']; ?>"><input type="submit" value="-"/></form></th>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><form method="POST" action="/router.php/flat/add"><input type="submit" value="+"/></form></th>
			</tr>
		</table>
		<table>
			<caption>Szobatípusok</caption>
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
<?php foreach ($room_prototypes as $room_prototype): ?>
			<tr>
				<td><?php echo $room_prototype['id']; ?></td>
				<td><input form="updaterform-room-prototype-<?php echo $room_prototype['id']; ?>" type="text" name="name" value="<?php echo $room_prototype['name']; ?>"/></td>
				<td><form id="updaterform-room-prototype-<?php echo $room_prototype['id']; ?>" method="POST" action="/router.php/room-prototype/update/<?php echo $room_prototype['id']; ?>"><input type="submit" value="✍"/></form></th>
				<td><form method="POST" action="/router.php/room-prototype/del/<?php echo $room_prototype['id']; ?>"><input type="submit" value="-"/></form></th>
				<td></td>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<th><input type="text" form="insertorform-room-prototype-<?php echo $room_prototype['id']; ?>" name="name"/></th>
				<td colspan="2"><form id="insertorform-room-prototype-<?php echo $room_prototype['id']; ?>" method="POST" action="/router.php/room-prototype/add"><input type="submit" value="+"/></form></th>
				<td></td>
			</tr>
		</table>
		<table>
			<caption>Szobák</caption>
			<tr>
				<th>ID</th>
				<th></th>
			</tr>
<?php foreach ($rooms as $room): ?>
			<tr>
				<td><?php echo $room['id']; ?></td>
				<td><form method="POST" action="/router.php/room/del/<?php echo $room['id']; ?>"><input type="submit" value="-"/></form></th>
			</tr>
<?php endforeach; ?>
			<tr>
				<th>NEW-ID</th>
				<td><form method="POST" action="/router.php/room/add"><input type="submit" value="+"/></form></th>
			</tr>
		</table>
	</body>
</html>
