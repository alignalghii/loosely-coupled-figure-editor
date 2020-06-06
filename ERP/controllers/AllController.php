<?php

namespace controllers;

use models\{FlatRelation, RoomPrototypeRelation, RoomShapeRelation, RoomRelation};
use viewModels\{FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel};

class AllController // @TODO split it via mixins?
{
	use TFlat, TRoomPrototype, TRoomShape, TRoom;

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

	// Auxiliary:
	function render(string $viewFile, array $viewModel): void
	{
		extract($viewModel);
		require $viewFile;
	}
}
