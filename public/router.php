<?php

/** Main dependency injector */

require 'router2.php';

$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);

$flatRelation          = new FlatRelation($dbh);
$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
$roomShapeRelation     = new RoomShapeRelation($dbh);
$roomRelation          = new RoomRelation($dbh);

$allController = new AllController($flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation);

$router = new Router($allController, $_SERVER, $_POST);
$router->run();
