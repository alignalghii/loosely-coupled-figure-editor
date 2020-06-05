<?php

/** Main dependency injector */

use models\FlatRelation;
use models\RoomPrototypeRelation;
use models\RoomShapeRelation;
use models\RoomRelation;

use controllers\AppProperController;
use controllers\AllController;

require 'autoload.php';

$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);

$flatRelation          = new FlatRelation($dbh);
$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
$roomShapeRelation     = new RoomShapeRelation($dbh);
$roomRelation          = new RoomRelation($dbh);

$appProperController = new AppProperController();
$allController       = new AllController($flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation);

$router = new Router($appProperController, $allController, $_SERVER, $_POST, file_get_contents('php://input'));
$router->run();
