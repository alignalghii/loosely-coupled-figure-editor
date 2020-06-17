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

$router = new Router($_SERVER, $_GET, $_POST, file_get_contents('php://input'));
$router->run();
