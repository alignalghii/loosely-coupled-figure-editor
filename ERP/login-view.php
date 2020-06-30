<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<link rel="shortcut icon" href="/assets/favicon.ico"/>
		<link rel="stylesheet" href="/assets/login.css"/>
		<title>Bejelentkezés</title>
	</head>
	<body>
		<h1>Bejelentkezés</h1>
		<p>A kísérlet verzió jelenlegi szakaszában tetszőleges jelszóval beléphetsz (és sajnos a generált token is statikus még).
		A jelszó elvárt formátuma: angol abc betűi és számjegyek nemüres sorozata</p>
		<form id="login-form" method="POST" action="/login-human">
			<label for="name-field">Neved</label>
			<input type="text" id="name-field" name="name" value="<?php echo $name; ?>" placeholder="Csak szókarakterek 1-20 leütés"/>
			<span class="error"><?php echo $error['name']; ?></span>
			<label for="password-field">Jelszavad</label>
			<input type="text" id="password-field" name="password" value="<?php echo $password; ?>" placeholder="Csak szókarakterek 1-20 leütés"/>
			<span class="error"><?php echo $error['password']; ?></span>
			<button type="submit">Mehet!</button>
			<span class="error"><?php echo $error['global']; ?></span>
		</form>
	</body>
</html>
