<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<link rel="shortcut icon" href="/assets/favicon.ico"/>
		<title>Bejelentkezés</title>
	</head>
	<body>
		<h1>Bejelentkezés</h1>
		<form id="login-form" method="POST" action="/login-human">
			<label for="password-field">Jelszavad</label>
			<input type="text" id="password-field" name="password" placeholder="Csak szókarakterek 1-20 leütés"/>
			<button type="submit">Mehet!</button>
			<span class="error"><?php echo $error; ?></span>
		</form>
	</body>
</html>
