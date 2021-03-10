<?php

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		`if ! test -f work.png; then cp image-to-load-upon-x-greater-than-y.png work.png; fi`;
		require 'view.php';
		break;
	case 'POST':
		$model = json_decode(
			file_get_contents('php://input')
		);
		$flag = $model->x > $model->y;
		if ($flag) {
			`cp image-to-load-upon-x-greater-than-y.png work.png`;
		} else {
			`cp image-to-load-upon-y-greater-than-x.png work.png`;
		}
		echo $flag ? 'x-greater-than-y' : 'y-greater-than-x';
		break;
}
