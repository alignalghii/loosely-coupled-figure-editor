<?php

/** Main dependency injector */

use models\FlatRelation;
use models\RoomPrototypeRelation;
use models\RoomShapeRelation;
use models\RoomRelation;

use controllers\LoginController;
use controllers\MachineController;
use controllers\HumanController;

require 'autoload.php';



$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
$rawPost = file_get_contents('php://input');

$router = new Router($dbh, $_SERVER, $_GET, $_POST, $rawPost);
$router->run();
