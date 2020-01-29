<?php

/** Main dependency injector */

$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);

$flatRelation          = new FlatRelation($dbh);
$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
$roomRelation          = new RoomRelation($dbh);

$allController = new AllController($flatRelation, $roomPrototypeRelation, $roomRelation);

$router = new Router($allController, $_SERVER, $_POST);
$router->run();

/** Router */

class Router
{
	function __construct(AllController $allController, array $server, array $post)
	{
		$this->allController = $allController;
		$this->server        = $server;
		$this->post          = $post;
	}

	function run(): void
	{
		$request = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}";
		switch (true) {
			case preg_match('!GET /router.php/show-all!', $request, $matches): $this->allController->showAll(); break;

			case preg_match('!POST /router.php/flat/add!', $request, $matches): $this->allController->addFlat($this->post); break;
			case preg_match('!POST /router.php/flat/update/(\d+)!', $request, $matches): $this->allController->updateFlat($matches[1], $this->post); break;
			case preg_match('!POST /router.php/flat/del/(\d+)!', $request, $matches): $this->allController->deleteFlat($matches[1]); break;

			// @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /router.php/room-prototype/add!', $request, $matches): $this->allController->addRoomPrototype($this->post); break;
			case preg_match('!POST /router.php/room-prototype/update/(\d+)!', $request, $matches): $this->allController->updateRoomPrototype($matches[1], $this->post); break;
			case preg_match('!POST /router.php/room-prototype/del/(\d+)!', $request, $matches): $this->allController->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /router.php/room/add!', $request, $matches): $this->allController->addRoom($this->post); break;
			case preg_match('!POST /router.php/room/update/(\d+)!', $request, $matches): $this->allController->updateRoom($matches[1], $this->post); break;
			case preg_match('!POST /router.php/room/del/(\d+)!', $request, $matches): $this->allController->deleteRoom($matches[1]); break;

			default: echo 'Router error'; break; // @TODO: `throw 'Router error'`?
		}
	}
}

abstract class ViewModel
{
	protected $entities;

	public function __construct(array $entities) {$this->entities = $entities;}

	abstract public function fields();

	public function showAll(): array
	{
		return [
			'records' => $this->packEntities(),
			'newRecord' => $this->blank()
		];
	}

	// Add:

	public function add(bool $flag, array $postedRecord): array
	{
		return [
			'records' => $this->packEntities(),
			'newRecord' => $flag ? $this->blank() : $this->showBack($postedRecord)
		];
	}

	protected function blank(): array {return ['data' => $this->blankRecord(), 'error' => ''];}

	protected function blankRecord()
	{
		return array_map(
			function ($fieldType) {return '';},
			$this->fields()
		);
	}

	protected function showBack(array $postedRecord): array
	{
		return [
			'data' => $postedRecord,
			'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
		];
	}

	protected function pack(array $entity): array {return ['data' => $entity, 'error' => ''];}
	protected function packEntities(): array {return array_map([$this, 'pack'], $this->entities);}

	// Update:

	public function update(bool $isOK, array $dbRecords, int $id, array $showBackRecord): array
	{
		return [
			'records' => $this->allPackOrShowBackHere($isOK, $dbRecords, $id, $showBackRecord),
			'newRecord' => $this->blank()
		];
	}

	protected function allPackOrShowBackHere(bool $isOK, array $dbRecords, int $id, array $showBackRecord): array
	{
		return array_map(
			function ($dbRecord) use ($isOK, $id, $showBackRecord) {
				return $this->packOrShowBackHere($isOK, $dbRecord, $id, $showBackRecord);
			},
			$dbRecords
		);
	}

	protected function packOrShowBackHere(bool $isOK, array $dbRecord, int $id, array $showBackRecord): array
	{
		return $this->showBackOrPack(
			$dbRecord['id'] == $id && !$isOK,
			compact('id') + $showBackRecord,
			$dbRecord
		);
	}

	protected function showBackOrPack(bool $isError, array $showBackRecord, array $dbRecord): array {return $isError ? $this->showBack($showBackRecord) : $this->pack($dbRecord);}


	// Delete:

	public function delete(bool $isOK, int $id, array $records): array
	{
		return [
			'records' => array_map(
				function ($record) use ($isOK, $id) {
					return $this->packPossiblyErrorHere($isOK, $id, $record);
				},
				$records
			),
			'newRecord' => $this->blank()
		];
	}

	protected function allPackPossiblyErrorHere(bool $isOK, int $id, array $records): array
	{
		return array_map(
			function ($record) use ($isOK, $id) {
				return $this->packPossiblyErrorHere($isOK, $id, $record);
			},
			$records
		);
	}

	protected function packPossiblyErrorHere(bool $isOK, int $id, array $record): array {return $this->packPossiblyError(!$isOK && $record['id'] == $id, $record);}

	protected function packPossiblyError(bool $isError, array $record): array
	{
		return [
			'data' => $record,
			'error' => $isError ? 'Függőségi hiba!' : '' // dependency validation (deleting from a parent table)
		];
	}
}

class FlatsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => PDO::PARAM_INT, 'address' => PDO::PARAM_STR];}
}

class RoomPrototypesViewModel extends ViewModel
{
	public function fields(): array {return ['id' => PDO::PARAM_INT, 'name' => PDO::PARAM_STR];}
}

class RoomsViewModel extends ViewModel
{
	function fields(): array {return ['id' => PDO::PARAM_INT, 'flat_id' => PDO::PARAM_INT, 'room_prototype_id' => PDO::PARAM_INT];}
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
		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}


	// Flat:

	function addFlat(array $rec): void // @TODO FlatEntity
	{
		$flag = $this->flatRelation->add($rec);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->add($flag, $rec),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateFlat(int $id, array $rec): void // @TODO FlatEntity
	{
		$flag = $this->flatRelation->update($id, $rec);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->update($flag, $flatEntities, $id, $rec),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteFlat(int $id): void
	{
		$flag = $this->flatRelation->delete($id);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->delete($flag, $id, $flatEntities),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}



	// Room prototype:

	function addRoomPrototype(array $rec): void // @TODO FlatEntity
	{
		$flag = $this->roomPrototypeRelation->add($rec);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->add($flag, $rec),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateRoomPrototype(int $id, array $rec): void // @TODO FlatEntity
	{
		$flag = $this->roomPrototypeRelation->update($id, $rec);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->update($flag, $roomPrototypeEntities, $id, $rec),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteRoomPrototype(int $id): void
	{
		$flag = $this->roomPrototypeRelation->delete($id);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->delete($flag, $id, $roomPrototypeEntities),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}


	// Room:

	function addRoom(array $rec): void // @TODO RoomEntity
	{
		// @TODO: `$eitherShowbackOrEntity = RoomEntity::importE($rec)`
		$flat_id           = $rec['flat_id'];
		$room_prototype_id = $rec['room_prototype_id'];
		$flag = preg_match('/^\d+$/', $flat_id) && preg_match('/^\d+$/', $room_prototype_id);
		if ($flag) {
			$flat_id           = (int) $flat_id;
			$room_prototype_id = (int) $room_prototype_id;
			$entity = compact('flat_id', 'room_prototype_id');
		} else $entity = $rec;
		$flag = $flag && $this->roomRelation->add($rec);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->add($flag, $entity) // @TODO: `$roomsViewModel->add($eitherShowbackOrEntity)`
			]
		);
	}

	function updateRoom(int $id, array $rec): void // @TODO RoomEntity
	{
		// @TODO: `$eitherShowbackOrEntity = RoomEntity::importE($rec)`
		$flat_id           = $rec['flat_id'];
		$room_prototype_id = $rec['room_prototype_id'];
		$flag = preg_match('/^\d+$/', $flat_id) && preg_match('/^\d+$/', $room_prototype_id);
		if ($flag) {
			$flat_id           = (int) $flat_id;
			$room_prototype_id = (int) $room_prototype_id;
			$entity = compact('flat_id', 'room_prototype_id');
		} else $entity = $rec;
		$flag = $flag && $this->roomRelation->update($id, $entity);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->update($flag, $roomEntities, $id, $entity) // @TODO `$roomsViewModel->update($roomEntities, $id, $eitherShowbackOrEntity)`
			]
		);
	}

	function deleteRoom(int $id): void
	{
		$flag = $this->roomRelation->delete($id);

		$flatEntities          = $this->flatRelation->getAll();
		$roomPrototypeEntities = $this->roomPrototypeRelation->getAll();
		$roomEntities          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatEntities);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeEntities);
		$roomsViewModel          = new RoomsViewModel($roomEntities);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->delete($flag, $id, $roomEntities)
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

	function add(array $rec): bool // @TODO `FlatEntity $rec`
	{
		$address = trim($rec['address']);
		if ($address) {
			$st = $this->dbh->prepare('INSERT INTO `flat` (`address`) values (:address)');
			$st->bindValue('address', $address, PDO::PARAM_STR);
		return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, array $rec): bool  // @TODO `FlatEntity $rec`
	{
		$address = trim($rec['address']);
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

	function add(array $rec): bool // @TODO `RoomPrototypeEntity $rec`
	{
		$name = trim($rec['name']);
		if ($name) {
			$st = $this->dbh->prepare('INSERT INTO `room_prototype` (`name`) values (:name)');
			$st->bindValue('name', $name, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, array $rec): bool // @TODO `RoomPrototypeEntity $rec`
	{
		$name = trim($rec['name']);
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

	function add(array $entity): bool // @TODO `RoomEntity $entity`
	{
		$st = $this->dbh->prepare('INSERT INTO `room` (`flat_id`, `room_prototype_id`) values (:flat_id, :room_prototype_id)');
		$st->bindValue('flat_id'          , $entity['flat_id']          , PDO::PARAM_INT);
		$st->bindValue('room_prototype_id', $entity['room_prototype_id'], PDO::PARAM_INT);
		return $st->execute();
	}

	function update(int $id, array $entity): bool // @TODO `RoomEntity $rec`
	{
		$st = $this->dbh->prepare('UPDATE `room` SET `flat_id` = :flat_id, `room_prototype_id` = :room_prototype_id WHERE `id` = :id');
		$st->bindValue('id'               , $id                         , PDO::PARAM_INT);
		$st->bindValue('flat_id'          , $entity['flat_id']          , PDO::PARAM_INT);
		$st->bindValue('room_prototype_id', $entity['room_prototype_id'], PDO::PARAM_INT);
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
