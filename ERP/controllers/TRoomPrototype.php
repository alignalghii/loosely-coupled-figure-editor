<?php

namespace controllers;

use ADT\Maybe;
use models\RoomPrototypeEntity;
use viewModels\{FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel};

trait TRoomPrototype
{
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
}
