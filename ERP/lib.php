<?php

/** Router */

class Router
{
	function __construct(AppProperController $appProperController, AllController $allController, array $server, array $post, string $rawPost)
	{
		$this->appProperController = $appProperController;
		$this->allController       = $allController;

		$this->server  = $server;
		$this->post    = $post;
		$this->rawPost = $rawPost;
	}

	function run(): void
	{
		$request = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}";
		$request = preg_replace('!/.*\.php!', '', $request);
		switch (true) {
			/** Application proper: **/

			case preg_match('!POST /update-jpeg!', $request, $matches): $this->appProperController->updateJPEG($this->rawPost); break;

			/** DB-admin: **/

			case preg_match('!GET /!', $request, $matches):
			case preg_match('!GET /show-all!', $request, $matches): $this->allController->showAll(); break;

			case preg_match('!POST /flat/add!', $request, $matches): $this->allController->addFlat($this->post); break;
			case preg_match('!POST /flat/update/(\d+)!', $request, $matches): $this->allController->updateFlat($matches[1], $this->post); break;
			case preg_match('!POST /flat/del/(\d+)!', $request, $matches): $this->allController->deleteFlat($matches[1]); break;

			// @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /room-prototype/add!', $request, $matches): $this->allController->addRoomPrototype($this->post); break;
			case preg_match('!POST /room-prototype/update/(\d+)!', $request, $matches): $this->allController->updateRoomPrototype($matches[1], $this->post); break;
			case preg_match('!POST /room-prototype/del/(\d+)!', $request, $matches): $this->allController->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /room-shape/add!', $request, $matches): $this->allController->addRoomShape($this->post); break;
			case preg_match('!POST /room-shape/update/(\d+)!', $request, $matches): $this->allController->updateRoomShape($matches[1], $this->post); break;
			case preg_match('!POST /room-shape/del/(\d+)!', $request, $matches): $this->allController->deleteRoomShape($matches[1]); break;

			case preg_match('!POST /room/add!', $request, $matches): $this->allController->addRoom($this->post); break;
			case preg_match('!POST /room/update/(\d+)!', $request, $matches): $this->allController->updateRoom($matches[1], $this->post); break;
			case preg_match('!POST /room/del/(\d+)!', $request, $matches): $this->allController->deleteRoom($matches[1]); break;


			default: echo "Router error [$request]"; break; // @TODO: `throw 'Router error'`?
		}
	}
}

abstract class ViewModel
{
	const PARAM_FLOAT = 100;

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
	public function fields(): array {return ['id' => Either::right(PDO::PARAM_INT), 'address' => Either::right(PDO::PARAM_STR)];}
}

class RoomPrototypesViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(PDO::PARAM_INT), 'name' => Either::right(PDO::PARAM_STR)];}
}

class RoomShapesViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(PDO::PARAM_INT), 'symbol' => Either::right(PDO::PARAM_STR), 'name' => Either::right(PDO::PARAM_STR), 'arity' => Either::right(PDO::PARAM_INT), 'interpret_argument_1' => Either::right(PDO::PARAM_STR), 'interpret_argument_2' => Either::right(PDO::PARAM_STR), 'interpret_argument_3' => Either::right(PDO::PARAM_STR), 'interpret_argument_4' => Either::right(PDO::PARAM_STR)];}
}

class RoomsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(PDO::PARAM_INT), 'flat_id' => Either::right(PDO::PARAM_INT), 'prototype_id' => Either::right(PDO::PARAM_INT), 'area' => Either::left(self::PARAM_FLOAT), 'autocorr_dir_fwd' => Either::right(PDO::PARAM_BOOL), 'shape_id' => Either::right(PDO::PARAM_INT), 'shape_argument_1' => Either::left(self::PARAM_FLOAT), 'shape_argument_2' => Either::left(self::PARAM_FLOAT), 'shape_argument_3' => Either::left(self::PARAM_FLOAT), 'shape_argument_4' => Either::left(self::PARAM_FLOAT)];}
}

/** Controllers: */

class AppProperController
{
	function updateJPEG(string $svgString)
	{
		`find var -name 'work--*-*.*' -mmin +1 -delete`; // Deleting too old temporary files @TODO reconsider

		$stamp = time() . '-' . rand();
		$extlessPath = "var/work--$stamp";
		$svgFile = fopen("$extlessPath.svg", 'w');
			fwrite($svgFile, $svgString);
		fclose($svgFile);
		`sed -i 's!\<href="/!href="!g' $extlessPath.svg`;
		`inkscape -z -e $extlessPath.png -w 1175 -h 692 $extlessPath.svg`; // credit to https://www.systutorials.com/how-to-convert-svg-to-png-in-linux/
		`convert $extlessPath.png -background "rgb(255,255,255)" -flatten $extlessPath-bg.png`; // credit to https://stackoverflow.com/questions/25208116/imagemagick-how-to-change-transparent-background-to-a-color
		`convert $extlessPath-bg.png $extlessPath.jpeg`;
		header('Content-Type: application/json');
		echo json_encode(['downloadLink' => "$extlessPath.jpeg"]);
	}
}

class AllController // @TODO split it via mixins?
{
	function __construct($flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation)
	{
		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomShapeRelation     = $roomShapeRelation;
		$this->roomRelation          = $roomRelation;
	}


	function showAll(): void
	{
		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}


	// Flat:

	function addFlat(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = FlatEntity::maybePostback($post, [$this->flatRelation, 'add']);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->add($maybeShowback),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateFlat(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = FlatEntity::maybePostback(
			$post,
			function (FlatEntity $entity) use ($id): bool {return $this->flatRelation->update($id, $entity);} //$this->flatRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->update($id, $maybeShowback),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteFlat(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->flatRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->delete($maybeShowbackId),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}



	// Room prototype:

	function addRoomPrototype(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback( //Maybe::no([$this->roomPrototypeRelation, 'add'], $post);
			$post,
			[$this->roomPrototypeRelation, 'add']
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->add($maybeShowback),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateRoomPrototype(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback(
			$post,
			function (RoomPrototypeEntity $entity) use ($id): bool {return $this->roomPrototypeRelation->update($id, $entity);}
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->update($id, $maybeShowback),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteRoomPrototype(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomPrototypeRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->delete($maybeShowbackId),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	// RoomShape:

	function addRoomShape(array $post): void
	{
		$maybePostback = RoomShapeEntity::maybePostback(
			$post,
			[$this->roomShapeRelation, 'add']
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->add($maybePostback),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function updateRoomShape(int $id, array $post): void
	{
		$maybePostback = RoomShapeEntity::maybePostback(
			$post,
			function (RoomShapeEntity $entity) use ($id): bool {return $this->roomShapeRelation->update($id, $entity);}
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->update($id, $maybePostback),
				'roomsViewModel'          => $roomsViewModel->showAll()
			]
		);
	}

	function deleteRoomShape(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomShapeRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->delete($maybeShowbackId),
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
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->add($maybePostback)
			]
		);
	}

	function updateRoom(int $id, array $post): void // @TODO RoomEntity
	{
		$maybePostback = RoomEntity::maybePostback(
			$post,
			function (RoomEntity $entity) use ($id): bool {return $this->roomRelation->update($id, $entity);}
		);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
				'roomsViewModel'          => $roomsViewModel->update($id, $maybePostback)
			]
		);
	}

	function deleteRoom(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomRelation, 'delete'], $id);

		$flatRecords          = $this->flatRelation->getAll();
		$roomPrototypeRecords = $this->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $this->roomShapeRelation->getAll();
		$roomRecords          = $this->roomRelation->getAll();

		$flatsViewModel          = new FlatsViewModel($flatRecords);
		$roomPrototypesViewModel = new RoomPrototypesViewModel($roomPrototypeRecords);
		$roomShapesViewModel     = new RoomShapesViewModel($roomShapeRecords);
		$roomsViewModel          = new RoomsViewModel($roomRecords);

		$this->render(
			'view.php',
			[
				'flatsViewModel'          => $flatsViewModel->showAll(),
				'roomPrototypesViewModel' => $roomPrototypesViewModel->showAll(),
				'roomShapesViewModel'     => $roomShapesViewModel->showAll(),
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

	function add(FlatEntity $entity): bool // @TODO `FlatEntity $rec`
	{
		if ($entity->address) {
			$st = $this->dbh->prepare('INSERT INTO `flat` (`address`) values (:address)');
			$st->bindValue('address', $entity->address, PDO::PARAM_STR);
		return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, FlatEntity $entity): bool  // @TODO `FlatEntity $rec`
	{
		if ($entity->address) {
			$st = $this->dbh->prepare('UPDATE `flat` SET `address` = :address WHERE `id` = :id');
			$st->bindValue('id'     , $id             , PDO::PARAM_INT);
			$st->bindValue('address', $entity->address, PDO::PARAM_STR);
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

	function add(RoomPrototypeEntity $entity): bool // @TODO `RoomPrototypeEntity $rec`
	{
		if ($entity->name) {
			$st = $this->dbh->prepare('INSERT INTO `room_prototype` (`name`) values (:name)');
			$st->bindValue('name', $entity->name, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomPrototypeEntity $entity): bool // @TODO `RoomPrototypeEntity $rec`
	{
		if ($entity->name) {
			$st = $this->dbh->prepare('UPDATE `room_prototype` SET `name` = :name WHERE `id` = :id');
			$st->bindValue('id'  , $id          , PDO::PARAM_INT);
			$st->bindValue('name', $entity->name, PDO::PARAM_STR);
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

class RoomShapeRelation
{
	function __construct(PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room_shape` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(PDO::FETCH_ASSOC);
	}

	function add(RoomShapeEntity $entity): bool // @TODO `RoomShapeEntity $rec`
	{
		if (strlen($entity->symbol) == 1 && $entity->name && $entity->arity >= 0) {
			$st = $this->dbh->prepare('
				INSERT INTO `room_shape`
					(`symbol`, `name`, `arity`, `interpret_argument_1`, `interpret_argument_2`, `interpret_argument_3`, `interpret_argument_4`) VALUES
					(:symbol , :name , :arity , :interpret_argument_1 , :interpret_argument_2 , :interpret_argument_3 , :interpret_argument_4 )
			');
			$st->bindValue('symbol'              , $entity->symbol              , PDO::PARAM_STR);
			$st->bindValue('name'                , $entity->name                , PDO::PARAM_STR);
			$st->bindValue('arity'               , $entity->arity               , PDO::PARAM_INT);
			$st->bindValue('interpret_argument_1', $entity->interpret_argument_1, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_2', $entity->interpret_argument_2, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_3', $entity->interpret_argument_3, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_4', $entity->interpret_argument_4, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomShapeEntity $entity): bool // @TODO `RoomShapeEntity $rec`
	{
		if (strlen($entity->symbol) == 1 && $entity->name && $entity->arity >= 0) {
			$st = $this->dbh->prepare('
				UPDATE `room_shape`
				SET
					`symbol`               = :symbol,
					`name`                 = :name,
					`arity`                = :arity,
					`interpret_argument_1` = :interpret_argument_1,
					`interpret_argument_2` = :interpret_argument_2,
					`interpret_argument_3` = :interpret_argument_3,
					`interpret_argument_4` = :interpret_argument_4
				WHERE `id` = :id
			');
			$st->bindValue('id'                  , $id                          , PDO::PARAM_INT);
			$st->bindValue('symbol'              , $entity->symbol              , PDO::PARAM_STR);
			$st->bindValue('name'                , $entity->name                , PDO::PARAM_STR);
			$st->bindValue('arity'               , $entity->arity               , PDO::PARAM_INT);
			$st->bindValue('interpret_argument_1', $entity->interpret_argument_1, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_2', $entity->interpret_argument_2, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_3', $entity->interpret_argument_3, PDO::PARAM_STR);
			$st->bindValue('interpret_argument_4', $entity->interpret_argument_4, PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room_shape` WHERE `id` = :id');
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
		if ($entity->area >= 0) {
			$st = $this->dbh->prepare('
				INSERT INTO `room`
					(`flat_id`, `prototype_id`, `area`, `autocorr_dir_fwd`, `shape_id`, `shape_argument_1`, `shape_argument_2`, `shape_argument_3`, `shape_argument_4`) VALUES
					(:flat_id , :prototype_id , :area , :autocorr_dir_fwd , :shape_id , :shape_argument_1 , :shape_argument_2 , :shape_argument_3 , :shape_argument_4 )
			');
			$st->bindValue('flat_id'         , $entity->flat_id          , PDO::PARAM_INT );
			$st->bindValue('prototype_id'    , $entity->prototype_id     , PDO::PARAM_INT );
			$st->bindValue('area'            , $entity->area             , PDO::PARAM_STR );
			$st->bindValue('autocorr_dir_fwd', $entity->autocorr_dir_fwd , PDO::PARAM_BOOL);
			$st->bindValue('shape_id'        , $entity->shape_id         , PDO::PARAM_INT );
			$st->bindValue('shape_argument_1', $entity->shape_argument_1 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_2', $entity->shape_argument_2 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_3', $entity->shape_argument_3 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_4', $entity->shape_argument_4 , PDO::PARAM_STR );
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomEntity $entity): bool // @TODO `RoomEntity $rec`
	{
		if ($entity->area >= 0) {
			$st = $this->dbh->prepare('
				UPDATE `room` SET
					`flat_id`          = :flat_id,
					`prototype_id`     = :prototype_id,
					`area`             = :area,
					`autocorr_dir_fwd` = :autocorr_dir_fwd,
					`shape_id`         = :shape_id,
					`shape_argument_1` = :shape_argument_1,
					`shape_argument_2` = :shape_argument_2,
					`shape_argument_3` = :shape_argument_3,
					`shape_argument_4` = :shape_argument_4
				WHERE `id` = :id
			');
			$st->bindValue('id'              , $id                       , PDO::PARAM_INT );
			$st->bindValue('flat_id'         , $entity->flat_id          , PDO::PARAM_INT );
			$st->bindValue('prototype_id'    , $entity->prototype_id     , PDO::PARAM_INT );
			$st->bindValue('area'            , $entity->area             , PDO::PARAM_STR );
			$st->bindValue('autocorr_dir_fwd', $entity->autocorr_dir_fwd , PDO::PARAM_BOOL);
			$st->bindValue('shape_id'        , $entity->shape_id         , PDO::PARAM_INT );
			$st->bindValue('shape_argument_1', $entity->shape_argument_1 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_2', $entity->shape_argument_2 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_3', $entity->shape_argument_3 , PDO::PARAM_STR );
			$st->bindValue('shape_argument_4', $entity->shape_argument_4 , PDO::PARAM_STR );
			return $st->execute();
		} else {
			return false;
		}
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
			function (Entity $entity) use ($entityPredicate, $post): Maybe/*postArr*/ {return $entityPredicate($entity) ? Maybe::nothing() : Maybe::just($post);} // Maybe::just(static::comb($post))
		);
	}
}

class FlatEntity extends Entity
{
	public $id, $address;

	public function __construct(?int $id, string $address)
	{
		$this->id      = $id;
		$this->address = $address;
	}

	public static function maybeImport(array $post): Maybe/*FlatEntity*/
	{
		$id      = $post['id'] ?? null;
		$address = trim($post['address']);
		return Maybe::just(new FlatEntity($id, $address));
	}
}

class RoomPrototypeEntity extends Entity
{
	public $id, $name;

	public function __construct(?int $id, string $name)
	{
		$this->id   = $id;
		$this->name = $name;
	}

	public static function maybeImport(array $post): Maybe/*RoomPrototypeEntity*/
	{
		$id   = $post['id'] ?? null;
		$name = trim($post['name']);
		return Maybe::just(new RoomPrototypeEntity($id, $name));
	}
}

class RoomShapeEntity extends Entity
{
	public $id, $symbol, $name, $arity, $interpret_argument_1, $interpret_argument_2, $interpret_argument_3, $interpret_argument_4;

	public function __construct(?int $id, string $symbol, string $name, int $arity, ?string $interpret_argument_1, ?string $interpret_argument_2, ?string $interpret_argument_3, ?string $interpret_argument_4)
	{
		$this->id                   = $id;
		$this->symbol               = $symbol;
		$this->name                 = $name;
		$this->arity                = $arity;
		$this->interpret_argument_1 = $interpret_argument_1;
		$this->interpret_argument_2 = $interpret_argument_2;
		$this->interpret_argument_3 = $interpret_argument_3;
		$this->interpret_argument_4 = $interpret_argument_4;
	}

	public static function maybeImport(array $post): Maybe/*RoomShapeEntity*/
	{
		$id                   = $post['id'] ?? null;
		$symbol               = trim($post['symbol']);
		$name                 = trim($post['name']);
		$arity                = preg_replace('/\s+/', '', $post['arity']);
		$interpret_argument_1 = $post['interpret_argument_1'] ?? null;
		$interpret_argument_2 = $post['interpret_argument_2'] ?? null;
		$interpret_argument_3 = $post['interpret_argument_3'] ?? null;
		$interpret_argument_4 = $post['interpret_argument_4'] ?? null;

		$flag = preg_match('/^\d+$/', $arity);
		return $flag
			? Maybe::just(new RoomShapeEntity($id, $symbol, $name, $arity, $interpret_argument_1, $interpret_argument_2, $interpret_argument_3, $interpret_argument_4))
			: Maybe::nothing();
	}
}

class RoomEntity extends Entity
{
	public $id, $flat_id, $prototype_id, $area, $autocorr_dir_fwd, $shape_id, $shape_argument_1, $shape_argument_2, $shape_argument_3, $shape_argument_4;

	public function __construct(?int $id, int $flatId, int $roomPrototypeId, ?float $area, bool $autocorr_dir_fwd, int $shape_id, ?string $shape_argument_1, ?string $shape_argument_2, ?string $shape_argument_3, ?string $shape_argument_4)
	{
		$this->id               = $id;
		$this->flat_id          = $flatId;
		$this->prototype_id     = $roomPrototypeId;
		$this->area             = $area;
		$this->autocorr_dir_fwd = $autocorr_dir_fwd;
		$this->shape_id         = $shape_id;
		$this->shape_argument_1 = $shape_argument_1;
		$this->shape_argument_2 = $shape_argument_2;
		$this->shape_argument_3 = $shape_argument_3;
		$this->shape_argument_4 = $shape_argument_4;
	}

	public static function maybeImport(array $post): Maybe/*RoomEntity*/
	{
		$id                = $post['id'] ?? null;
		$flat_id           = $post['flat_id'];
		$prototype_id      = $post['prototype_id'];
		$area              = preg_replace('/\s+/', '', $post['area']);
		$area              = str_replace(',', '.', $area);
		if ($area === '') $area = null;
		$autocorr_dir_fwd  = $post['autocorr_dir_fwd'] ?? '';
		$shape_id          = $post['shape_id'];
		$shape_argument_1  = trim($post['shape_argument_1']) ?: null;
		$shape_argument_2  = trim($post['shape_argument_2']) ?: null;
		$shape_argument_3  = trim($post['shape_argument_3']) ?: null;
		$shape_argument_4  = trim($post['shape_argument_4']) ?: null;

		$flag = preg_match('/^\d+$/', $flat_id) && preg_match('/^\d+$/', $prototype_id) && ($area === null || preg_match('/^[+-]?\d+(\.\d+)?$/', $area)) && in_array($autocorr_dir_fwd, ['0', '1'], true) && preg_match('/^\d+$/', $shape_id);
		return $flag
			? Maybe::just(new RoomEntity($id, $flat_id, $prototype_id, $area, $autocorr_dir_fwd, $shape_id, $shape_argument_1, $shape_argument_2, $shape_argument_3, $shape_argument_4))
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


class Either
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
}
