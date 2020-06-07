<?php

namespace controllers;

use models\{FlatRelation, RoomPrototypeRelation, RoomShapeRelation, RoomRelation};
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

class AllController // @TODO wrong approach, turn it upside-down
{
	use TFlat, TRoomPrototype, TRoomShape, TRoom {
		TFlat::add    insteadof TRoomPrototype, TRoomShape, TRoom;
		TFlat::update insteadof TRoomPrototype, TRoomShape, TRoom;
		TFlat::delete insteadof TRoomPrototype, TRoomShape, TRoom;

		TFlat::add    as addFlat;
		TFlat::update as updateFlat;
		TFlat::delete as deleteFlat;

		TRoomPrototype::add    as addRoomPrototype   ;
		TRoomPrototype::update as updateRoomPrototype;
		TRoomPrototype::delete as deleteRoomPrototype;

		TRoomShape::add    as addRoomShape   ;
		TRoomShape::update as updateRoomShape;
		TRoomShape::delete as deleteRoomShape;

		TRoom::add    as addRoom   ;
		TRoom::update as updateRoom;
		TRoom::delete as deleteRoom;
	}

	public $flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation;

	public function __construct(FlatRelation $flatRelation, RoomPrototypeRelation $roomPrototypeRelation, RoomShapeRelation $roomShapeRelation, RoomRelation $roomRelation)
	{
		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomShapeRelation     = $roomShapeRelation;
		$this->roomRelation          = $roomRelation;
	}

	public function showAll(): void
	{
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->showAll();
		$this->render('view.php', $viewModel);
	}

	private function render(string $viewFile, array $viewModel): void
	{
		extract($viewModel);
		require $viewFile;
	}
}
