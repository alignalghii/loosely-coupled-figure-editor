<?php

namespace controllers;

use ADT\Maybe;
use models\RoomShapeEntity;
use viewModels\{FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel};

trait TRoomShape
{
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
}
