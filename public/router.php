<?php

/** Main dependency injector */

$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);

$flatRelation          = new FlatRelation($dbh);
$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
$roomRelation          = new RoomRelation($dbh);

$allController = new AllController($flatRelation, $roomPrototypeRelation, $roomRelation);

$router = new Router($allController);
$router->run();

/** Router */

class Router
{
	function __construct(AllController $allController) {$this->allController = $allController;}

	function run(): void
	{
		$request = "{$_SERVER['REQUEST_METHOD']} {$_SERVER['REQUEST_URI']}";
		switch (true) {
			case preg_match('!GET /router.php/show-all!', $request, $matches): $this->allController->showAll(); break;

			case preg_match('!POST /router.php/flat/add!', $request, $matches): $this->allController->addFlat($_POST['address']); break;
			case preg_match('!POST /router.php/flat/update/(\d+)!', $request, $matches): $this->allController->updateFlat($matches[1], $_POST['address']); break;
			case preg_match('!POST /router.php/flat/del/(\d+)!', $request, $matches): $this->allController->deleteFlat($matches[1]); break;

			// @TODO parametrize out superglobal @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /router.php/room-prototype/add!', $request, $matches): $this->allController->addRoomPrototype($_POST['name']); break;
			case preg_match('!POST /router.php/room-prototype/update/(\d+)!', $request, $matches): $this->allController->updateRoomPrototype($matches[1], $_POST['name']); break;
			case preg_match('!POST /router.php/room-prototype/del/(\d+)!', $request, $matches): $this->allController->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /router.php/room/add!', $request, $matches): $this->allController->addRoom($_POST['flat_id'], $_POST['room_prototype_id']); break;
			case preg_match('!POST /router.php/room/update/(\d+)!', $request, $matches): $this->allController->updateRoom($matches[1], $_POST['flat_id'], $_POST['room_prototype_id']); break;
			case preg_match('!POST /router.php/room/del/(\d+)!', $request, $matches): $this->allController->deleteRoom($matches[1]); break;

			default:
				echo 'Router error';
				break;
		}
	}
}

/** Controller */

class AllController // @TODO split it via mixins?
{
	function __construct($flatRelation, $roomPrototypeRelation, $roomRelation)
	{
		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomRelation          = $roomRelation;
	}

	function showAll(): void
	{
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				]
			]
		);
	}


	// Flat:

	function addFlat(string $address): void // @TODO FlatEntity
	{
		$flag = $this->flatRelation->add($address);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' =>
						$flag ?
						[
							'data' => ['address' => ''],
							'error' => ''
						] :
						[
							'data' => ['address' => $address],
							'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
						]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				]
			]
		);
	}

	function updateFlat(int $id, string $address): void // @TODO FlatEntity
	{
		$flag = $this->flatRelation->update($id, $address);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id, $address) {
							if ($record['id'] == $id && !$flag) {
								return [
									'data' => ['id' => $id, 'address' => $address],
									'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
								];
							} else {
								return ['data' => $record, 'error' => ''];
							}
						},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				],
			]
		);
	}

	function deleteFlat(int $id): void
	{
		$flag = $this->flatRelation->delete($id);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id) {
							return [
								'data' => $record,
								'error' => $record['id'] == $id && !$flag ? 'Függőségi hiba!' : '' // dependency validation (deleting from a parent table)
							];
						},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				],
			]
		);
	}



	// Room prototype:

	function addRoomPrototype(string $name): void // @TODO FlatEntity
	{
		$flag = $this->roomPrototypeRelation->add($name);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' =>
						$flag ?
						[
							'data' => ['name' => ''],
							'error' => ''
						] :
						[
							'data' => ['name' => $name],
							'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
						]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				]
			]
		);
	}

	function updateRoomPrototype(int $id, string $name): void // @TODO FlatEntity
	{
		$flag = $this->roomPrototypeRelation->update($id, $name);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id, $name) {
							if ($record['id'] == $id && !$flag) {
								return [
									'data' => ['id' => $id, 'name' => $name],
									'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
								];
							} else {
								return ['data' => $record, 'error' => ''];
							}
						},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				],
			]
		);
	}

	function deleteRoomPrototype(int $id): void
	{
		$flag = $this->roomPrototypeRelation->delete($id);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id) {
							return [
								'data' => $record,
								'error' => $record['id'] == $id && !$flag ? 'Függőségi hiba!' : '' // dependency validation (deleting from a parent table)
							];
						},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				],
			]
		);
	}


	// Room:

	function addRoom(string $flatId, string $roomPrototypeId): void // @TODO RoomEntity
	{
		$flag = preg_match('/^\d+$/', $flatId) && preg_match('/^\d+$/', $roomPrototypeId) && $this->roomRelation->add($flatId, $roomPrototypeId);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomRelation->getAll()
					),
					'newRecord' =>
						$flag ?
						[
							'data' => ['flat_id' => '', 'room_prototype_id' => ''],
							'error' => ''
						] :
						[
							'data' => ['flat_id' => $flatId, 'room_prototype_id' => $roomPrototypeId],
							'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
						]
				]
			]
		);
	}

	function updateRoom(int $id, string $flatId, string $roomPrototypeId): void // @TODO RoomEntity
	{
		$flag = preg_match('/^\d+$/', $flatId) && $this->roomRelation->update($id, $flatId, $roomPrototypeId);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id, $flatId, $roomPrototypeId) {
							if ($record['id'] == $id && !$flag) {
								return [
									'data' => ['id' => $id, 'flat_id' => $flatId, 'room_prototype_id' => $roomPrototypeId],
									'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
								];
							} else {
								return ['data' => $record, 'error' => ''];
							}
						},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				]
			]
		);
	}

	function deleteRoom(int $id): void
	{
		$flag = $this->roomRelation->delete($id);
		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->flatRelation->getAll()
					),
					'newRecord' => [
						'data' => ['address' => ''],
						'error' => ''
					]
				],
				'roomPrototypesViewModel' => [
					'records' => array_map(
						function ($record) {return ['data' => $record, 'error' => ''];},
						$this->roomPrototypeRelation->getAll()
					),
					'newRecord' => [
						'data' => ['name' => ''],
						'error' => ''
					]
				],
				'roomsViewModel' => [
					'records' => array_map(
						function ($record) use ($flag, $id) {
							return [
								'data' => $record,
								'error' => $record['id'] == $id && !$flag ? 'Függőségi hiba!' : '' // dependency validation (deleting from a parent table)
							];
						},
						$this->roomRelation->getAll()
					),
					'newRecord' => [
						'data' => ['flat_id' => '', 'room_prototype_id' => ''],
						'error' => ''
					]
				],
			]
		);
	}


	// Auxiliary:

	function render(string $viewFile, array $viewModel): void
	{
		extract($viewModel);
		require $viewFile;
	}
}

/** Model */

class FlatRelation
{
	function __construct(PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `flat` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(string $address): bool
	{
		$address = trim($address);
		if ($address) {
			$st = $this->dbh->prepare('INSERT INTO `flat` (`address`) values (:address)');
			$st->bindValue('address', $address, PDO::PARAM_STR);
		return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, string $address): bool
	{
		$address = trim($address);
		if ($address) {
			$st = $this->dbh->prepare('UPDATE `flat` SET `address` = :address WHERE `id` = :id');
			$st->bindValue('id'  , $id  , PDO::PARAM_INT);
			$st->bindValue('address', $address, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
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
		$st = $this->dbh->prepare('SELECT * FROM `room_prototype` ORDER BY `id`');
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
		$st = $this->dbh->prepare('SELECT * FROM `room` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(int $flatId, int $roomPrototypeId): bool // @TODO RoomEntity
	{
		$st = $this->dbh->prepare('INSERT INTO `room` (`flat_id`, `room_prototype_id`) values (:flat_id, :room_prototype_id)');
		$st->bindValue('flat_id', $flatId, PDO::PARAM_INT);
		$st->bindValue('room_prototype_id', $roomPrototypeId, PDO::PARAM_INT);
		return $st->execute();
	}

	function update(int $id, int $flatId, int $roomPrototypeId): bool
	{
		$st = $this->dbh->prepare('UPDATE `room` SET `flat_id` = :flat_id, `room_prototype_id` = :room_prototype_id WHERE `id` = :id');
		$st->bindValue('id'  , $id  , PDO::PARAM_INT);
		$st->bindValue('flat_id', $flatId, PDO::PARAM_INT);
		$st->bindValue('room_prototype_id', $roomPrototypeId, PDO::PARAM_INT);
		return $st->execute();
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room` WHERE `id` = :id');
		$st->bindValue('id', $id, PDO::PARAM_INT);
		return $st->execute();
	}
}

/** View helper? General? */

function abbreviate(string $text, int $maxLength) {return strlen($text) <= $maxLength ? $text : mb_substr($text, 0, $maxLength, 'utf8') . '&hellip;';}
