<?php

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		`if ! test -f work.svg; then cp donkey.svg work.svg; fi`;
		require 'view.php';
		break;
	case 'POST':
		$model = json_decode(
			file_get_contents('php://input')
		);
		$flag = $model->x > $model->y;
		if ($flag) {
			`cp favicon.svg work.svg`;
		} else {
			`cp donkey.svg work.svg`;
		}
		echo $flag ? 'favicon' : 'donkey';
		break;
}
