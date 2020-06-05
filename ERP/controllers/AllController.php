<?php

namespace controllers;

use ADT\Maybe;

use models\FlatRelation;
use models\RoomPrototypeRelation;
use models\RoomShapeRelation;
use models\RoomRelation;

use models\FlatEntity;
use models\RoomPrototypeEntity;
use models\RoomShapeEntity;
use models\RoomEntity;

use viewModels\FlatsViewModel;
use viewModels\RoomPrototypesViewModel;
use viewModels\RoomShapesViewModel;
use viewModels\RoomsViewModel;

class AllController // @TODO split it via mixins?
{
	function __construct(FlatRelation $flatRelation, RoomPrototypeRelation $roomPrototypeRelation, RoomShapeRelation $roomShapeRelation, RoomRelation $roomRelation)
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
