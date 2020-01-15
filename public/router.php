<?php

/** Main dependency injector */

$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password');

$flatRelation          = new FlatRelation($dbh);
$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
$roomRelation          = new RoomRelation($dbh);

$allController = new AllController($flatRelation, $roomPrototypeRelation, $roomRelation);

$router = new Router($allController, $flatRelation, $roomPrototypeRelation, $roomRelation);
$router->run();

/** Router */

class Router
{
	function __construct(AllController $allController, FlatRelation $flatRelation, RoomPrototypeRelation $roomPrototypeRelation, RoomRelation $roomRelation)
	{
		$this->allController = $allController;

		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomRelation          = $roomRelation;
	}

	function run(): void
	{
		$request = "{$_SERVER['REQUEST_METHOD']} {$_SERVER['REQUEST_URI']}";
		switch (true) {
			case preg_match('!GET /router.php/show-all!', $request, $matches):
				$this->allController->renderTables();
				break;

			case preg_match('!POST /router.php/flat/add!', $request, $matches):
				$this->flatRelation->add();
				$this->allController->renderTables();
				break;
			case preg_match('!POST /router.php/flat/del/(\d+)!', $request, $matches):
				$this->flatRelation->delete($matches[1]);
				$this->allController->renderTables();
				break;

			case preg_match('!POST /router.php/room-prototype/add!', $request, $matches):
				$this->roomPrototypeRelation->add($_POST['name']);
				$this->allController->renderTables();
				break;
			case preg_match('!POST /router.php/room-prototype/update/(\d+)!', $request, $matches):
				$this->roomPrototypeRelation->update($matches[1], $_POST['name']);
				$this->allController->renderTables();
				break;
			case preg_match('!POST /router.php/room-prototype/del/(\d+)!', $request, $matches):
				$this->roomPrototypeRelation->delete($matches[1]);
				$this->allController->renderTables();
				break;

			case preg_match('!POST /router.php/room/add!', $request, $matches):
				$this->roomRelation->add($_POST['name']);
				$this->allController->renderTables();
				break;
			case preg_match('!POST /router.php/room/del/(\d+)!', $request, $matches):
				$this->roomRelation->delete($matches[1]);
				$this->allController->renderTables();
				break;

			default:
				echo 'Router error';
				break;
		}
	}
}

/** Controller */

class AllController
{
	function __construct($flatRelation, $roomPrototypeRelation, $roomRelation)
	{
		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomRelation          = $roomRelation;
	}

	function renderTables(): void
	{
		$flats           = $this->flatRelation->getAll();
		$room_prototypes = $this->roomPrototypeRelation->getAll();
		$rooms           = $this->roomRelation->getAll();
		require 'dummy-db-crud.php';
	}
}

/** Model */

class FlatRelation
{
	function __construct(PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `flat`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(): bool
	{
		$st = $this->dbh->prepare('INSERT INTO `flat` () values ()');
		return $st->execute();
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `flat` WHERE `id` = :id');
		$st->bindValue('id', $id, PDO::PARAM_INT);
		return $st->execute();
	}
}

class RoomPrototypeRelation
{
	function __construct(PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room_prototype`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(string $name): bool
	{
		$name = trim($name);
		if ($name) {
			$st = $this->dbh->prepare('INSERT INTO `room_prototype` (`name`) values (:name)');
			$st->bindValue('name', $name, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, string $name): bool
	{
		$name = trim($name);
		if ($name) {
			$st = $this->dbh->prepare('UPDATE `room_prototype` SET `name` = :name WHERE `id` = :id');
			$st->bindValue('id'  , $id  , PDO::PARAM_INT);
			$st->bindValue('name', $name, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room_prototype` WHERE `id` = :id');
		$st->bindValue('id', $id, PDO::PARAM_INT);
		return $st->execute();
	}
}

class RoomRelation
{
	function __construct(PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(string $name): bool
	{
		$st = $this->dbh->prepare('INSERT INTO `room` (`name`) values (:name)');
		$st->bindValue('name', $name, PDO::PARAM_STR);
		return $st->execute();
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room` WHERE `id` = :id');
		$st->bindValue('id', $id, PDO::PARAM_INT);
		return $st->execute();
	}
}
