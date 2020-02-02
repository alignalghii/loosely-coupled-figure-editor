<?php

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
	protected $records;

	public function __construct(array $records) {$this->records = $records;}

	abstract public function fields();

	public function showAll(): array
	{
		return [
			'records' => $this->packRecords(),
			'newRecord' => $this->blank()
		];
	}

	// Add:

	public function add(Maybe $maybeShowback): array
	{
		return [
			'records' => $this->packRecords(),
			'newRecord' => $maybeShowback->maybe(
				$this->blank(),
				[$this, 'showBack'] // @TODO: `showBack` must be public, because called in Maybe context
			)
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

	public function showBack(array $postedRecord): array // @TODO: must be public, because called in Maybe context
	{
		return [
			'data' => $postedRecord,
			'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
		];
	}

	protected function pack(array $record): array {return ['data' => $record, 'error' => ''];}
	protected function packRecords(): array {return array_map([$this, 'pack'], $this->records);}

	// Update:

	public function update(int $id, Maybe $maybeShowback): array
	{
		return [
			'records' => $this->allPackOrShowBackHere($id, $maybeShowback),
			'newRecord' => $this->blank()
		];
	}


	protected function allPackOrShowBackHere(int $id, Maybe $maybeShowback): array
	{
		return $maybeShowback->maybe(
			$this->packRecords(),
			function ($showback) use ($id) {
				return array_map(
					function (array $dbRecord) use ($id, $showback): array  {return $this->showBackHere($dbRecord, $id, $showback);},
					$this->records
				);
			}
		);
	}

	protected function showBackHere(array $dbRecord, int $id, array $showback) {return $dbRecord['id'] == $id ? $this->showBack(compact('id') + $showback) : $this->pack($dbRecord);}


	// Delete:

	public function delete(Maybe $maybeShowbackId): array
	{
		return [
			'records' => $maybeShowbackId->maybe(
				$this->packRecords(),
				function ($showbackId) {
					return array_map(
						function ($record) use ($showbackId) {
							return [
								'data' => $record,
								'error' => $record['id'] == $showbackId ? 'Függőségi hiba!' : ''
							];
						},
						$this->records
					);
				}
			),
			'newRecord' => $this->blank()
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
	function fields(): array {return ['id' => PDO::PARAM_INT, 'flat_id' => PDO::PARAM_INT, 'prototype_id' => PDO::PARAM_INT];}
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
		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

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

	function addFlat(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = Maybe::no([$this->flatRelation, 'add'], $post);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->add($maybeShowback),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateFlat(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = $this->flatRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->update($id, $maybeShowback),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteFlat(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->flatRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->delete($maybeShowbackId),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}



	// Room prototype:

	function addRoomPrototype(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = Maybe::no([$this->roomPrototypeRelation, 'add'], $post);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->add($maybeShowback),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateRoomPrototype(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = $this->roomPrototypeRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->update($id, $maybeShowback),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteRoomPrototype(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomPrototypeRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->delete($maybeShowbackId),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}


	// Room:

	function addRoom(array $post): void // @TODO RoomEntity
	{
		$maybePostback = RoomEntity::maybePostback(
			$post,
			[$this->roomRelation, 'add']
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->add($maybePostback)
			]
		);
	}

	function updateRoom(int $id, array $post): void // @TODO RoomEntity
	{
		$maybePostback = RoomEntity::maybePostback(
			$post,
			function ($entity) use ($id) {return $this->roomRelation->update($id, $entity);}
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->update($id, $maybePostback)
			]
		);
	}

	function deleteRoom(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'dummy-db-crud.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->delete($maybeShowbackId)
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

	function add(array $post): bool // @TODO `FlatEntity $rec`
	{
		$address = trim($post['address']);
		if ($address) {
			$st = $this->dbh->prepare('INSERT INTO `flat` (`address`) values (:address)');
			$st->bindValue('address', $address, PDO::PARAM_STR);
		return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, array $post): bool  // @TODO `FlatEntity $rec`
	{
		$address = trim($post['address']);
		if ($address) {
			$st = $this->dbh->prepare('UPDATE `flat` SET `address` = :address WHERE `id` = :id');
			$st->bindValue('id'     , $id     , PDO::PARAM_INT);
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

	function add(array $post): bool // @TODO `RoomPrototypeEntity $rec`
	{
		$name = trim($post['name']);
		if ($name) {
			$st = $this->dbh->prepare('INSERT INTO `room_prototype` (`name`) values (:name)');
			$st->bindValue('name', $name, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, array $post): bool // @TODO `RoomPrototypeEntity $rec`
	{
		$name = trim($post['name']);
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

	function add(RoomEntity $entity): bool // @TODO `RoomEntity $entity`
	{
		$st = $this->dbh->prepare('INSERT INTO `room` (`flat_id`, `prototype_id`) values (:flat_id, :prototype_id)');
		$st->bindValue('flat_id'          , $entity->flat_id          , PDO::PARAM_INT);
		$st->bindValue('prototype_id', $entity->prototype_id, PDO::PARAM_INT);
		return $st->execute();
	}

	function update(int $id, RoomEntity $entity): bool // @TODO `RoomEntity $rec`
	{
		$st = $this->dbh->prepare('UPDATE `room` SET `flat_id` = :flat_id, `prototype_id` = :prototype_id WHERE `id` = :id');
		$st->bindValue('id'               , $id                       , PDO::PARAM_INT);
		$st->bindValue('flat_id'          , $entity->flat_id          , PDO::PARAM_INT);
		$st->bindValue('prototype_id', $entity->prototype_id, PDO::PARAM_INT);
		return $st->execute();
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room` WHERE `id` = :id');
		$st->bindValue('id', $id, PDO::PARAM_INT);
		return $st->execute();
	}
}


/** Entity */

abstract class Entity
{
	/*public static function load(array $record): Entity
	{
		return static::maybeImport($record)->maybe_exec(
			function () {throw new Exception('Load error');},
			function ($entity) {return $entity;}
		);
	}

	public static function loadAll(array $records): array//Entity
	{
		return array_map(
			function ($record) {return static::load($record);},
			$records
		);
	}*/

	public abstract static function maybeImport(array $post): Maybe/*Entity*/;

	public static function maybePostback(array $post, $entityPredicate): Maybe//postback
	{
		return static::maybeImport($post)->maybe(
			Maybe::just($post), // Maybe::just(static::comb($post))
			function ($entity) use ($entityPredicate, $post) {return $entityPredicate($entity) ? Maybe::nothing() : Maybe::just($post);} // Maybe::just(static::comb($post))
		);
	}
}

class RoomEntity extends Entity
{
	public $id, $flat_id, $prototype_id;

	public function __construct(?int $id, int $flatId, int $roomPrototypeId)
	{
		$this->id                = $id;
		$this->flat_id           = $flatId;
		$this->prototype_id = $roomPrototypeId;
	}

	public static function maybeImport(array $post): Maybe/*Entity*/
	{
		$id                = $post['id'] ?? null;
		$flat_id           = $post['flat_id'];
		$prototype_id = $post['prototype_id'];
		$flag = preg_match('/^\d+$/', $flat_id) && preg_match('/^\d+$/', $prototype_id);
		return $flag
			? Maybe::just(new RoomEntity($id, $flat_id, $prototype_id))
			: Maybe::nothing();
	}
}

/** View helper? General? */

function abbreviate(string $text, int $maxLength) {return strlen($text) <= $maxLength ? $text : mb_substr($text, 0, $maxLength, 'utf8') . '&hellip;';}

/** Algebraic data types */

class Maybe
{
	protected $representation;

	private function __construct(array $representation) {$this->representation = $representation;}

	public static function just($a) : Maybe {return new Maybe(['just', $a]);}
	public static function nothing(): Maybe {return new Maybe(['nothing' ]);}

	function maybe($nothingCase, $justCase)
	{
		switch ($this->representation[0]) {
			case 'just'   : return $justCase($this->representation[1]);
			case 'nothing': return $nothingCase;
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}

	public static function yes($predicate, $arg) {return  $predicate($arg) ? self::just($arg) : self::nothing();}
	public static function no ($predicate, $arg) {return !$predicate($arg) ? self::just($arg) : self::nothing();}

	/*function maybe_exec($nothingCase, $justCase)
	{
		list($label, $arg) = $this->representation;
		switch ($label) {
			case 'just'   : return $justCase($arg);
			case 'nothing': return $nothingCase();
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}*/
}


/*class Either
{
	protected $representation;

	private function __construct(array $representation) {$this->representation = $representation;}

	public static function left($a) : Either {return new Either(['left' , $a]);}
	public static function right($b): Either {return new Either(['right', $b]);}

	public function either($leftProcessor, $rightProcessor)
	{
		list($label, $arg) = $this->representation;
		switch ($label) {
			case 'left' : return $leftProcessor ($arg);
			case 'right': return $rightProcessor($arg);
			default     : throw new Exception('`Either` internal label bug');
		}
	}

	public function map($rightProcessor): Either
	{
		return $this->either(
			[self::class, 'fail'],
			function ($rightContent) {return self::ret($rightProcessor($rightContent));}
		);
	}

	public function bind($inject): Either
	{
		return $this->either(
			[self::class, 'fail'],
			$inject
		);
	}

	public function ret($rightContent): Either {return self::right($rightContent);}
	public function fail($leftContent): Either {return self::left ($leftContent );}

	public function andPredicate($predicate, $leftContent): Either
	{
		return $this->bind(
			function ($rightContent) use ($predicate, $leftContent) {
				return $predicate($rightContent)
					? self::ret ($rightContent)
					: self::fail($leftContent );
			}
		);
	}

	//public function andMaybe(Maybe $leftContent)
	//{
	//	return $leftContent->maybe...
	//}
}*/
