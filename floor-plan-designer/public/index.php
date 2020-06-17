<?php

/** Main dependency injector */

require '../app.php/autoload.php';

$fileController = new FileController();

$router = new Router($fileController, $_SERVER, $_GET, $_POST, file_get_contents('php://input'));
$router->run();
