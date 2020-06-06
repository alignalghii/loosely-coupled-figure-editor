<?php

namespace controllers;

use ADT\Maybe;
use models\RoomEntity;
use viewModels\{FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel};

trait TRoom
{
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
}
