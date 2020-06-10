<?php

namespace controllers;

use PDO;

class MachineController
{
	public function getNontrivialFlatIds(): void
	{
		header('Content-type: application/json');
		header('Access-Control-Allow-Origin: *'); // @TODO

		$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
		$st = $dbh->prepare('
			SELECT
				`r`.`flat_id`, `r`.`id`,
				`rp`.`name`,
				`rs`.`symbol` AS `shape_symbol`, `rs`.`name` AS `shape_name`, `rs`.`arity`,
				`r`.`shape_argument_1`, `r`.`shape_argument_2`, `r`.`shape_argument_3`, `r`.`shape_argument_4`
			FROM `room`           AS `r`
			JOIN `room_prototype` AS `rp` ON `rp`.`id` = `r`.`prototype_id`
			JOIN `room_shape`     AS `rs` ON `rs`.`id` = `r`.`shape_id`
			ORDER BY `r`.`flat_id`, `r`.`id`
		');
		$st->execute();
		$records = $st->fetchAll(PDO::FETCH_ASSOC);
		$flatIds = array_values(
			array_unique(
				array_map(
					function ($rec) {return $rec['flat_id'];},
					$records
				)
			)
		);
		//$flatIdsSequenceString = implode(', ', $flatIds);
		//echo []
		echo json_encode($flatIds);
	}

	public function getFlatRecordOnId(int $flatID): void
	{
		header('Content-type: application/json');
		header('Access-Control-Allow-Origin: *'); // @TODO

		$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
		$st = $dbh->prepare('
			SELECT
				`r`.`flat_id`, `r`.`id`,
				`rp`.`name`,
				`rs`.`symbol` AS `shape_symbol`, `rs`.`name` AS `shape_name`, `rs`.`arity`,
				`r`.`shape_argument_1`, `r`.`shape_argument_2`, `r`.`shape_argument_3`, `r`.`shape_argument_4`
			FROM `room`           AS `r`
			JOIN `room_prototype` AS `rp` ON `rp`.`id` = `r`.`prototype_id`
			JOIN `room_shape`     AS `rs` ON `rs`.`id` = `r`.`shape_id`
			ORDER BY `r`.`flat_id`, `r`.`id`
		');
		$st->execute();
		$records = $st->fetchAll(PDO::FETCH_ASSOC);
		$flatIds = array_values(
			array_unique(
				array_map(
					function ($rec) {return $rec['flat_id'];},
					$records
				)
			)
		);
		echo json_encode(compact('flatIds', 'records'));
	}
}
