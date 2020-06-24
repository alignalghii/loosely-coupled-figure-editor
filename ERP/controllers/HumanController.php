<?php

namespace controllers;

use models\{UserRelation, SessionRelation, FlatRelation, RoomPrototypeRelation, RoomShapeRelation, RoomRelation};
use viewModels\{
	UsersViewModel, SessionsViewModel,
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

class HumanController // @TODO wrong approach, turn it upside-down
{
	use TUser, TSession, TFlat, TRoomPrototype, TRoomShape, TRoom {
		TUser::add    insteadof TSession, TFlat, TRoomPrototype, TRoomShape, TRoom;
		TUser::update insteadof TSession, TFlat, TRoomPrototype, TRoomShape, TRoom;
		TUser::delete insteadof TSession, TFlat, TRoomPrototype, TRoomShape, TRoom;

		TUser::add    as addUser   ;
		TUser::update as updateUser;
		TUser::delete as deleteUser;

		TSession::add    as addSession   ;
		TSession::update as updateSession;
		TSession::delete as deleteSession;

		TFlat::add    as addFlat   ;
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

	public $userRelation, $sessionRelation, $flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation; // @TODO encapsulation
	private $token;

	public function __construct(UserRelation $userRelation, SessionRelation $sessionRelation, FlatRelation $flatRelation, RoomPrototypeRelation $roomPrototypeRelation, RoomShapeRelation $roomShapeRelation, RoomRelation $roomRelation, int $token)
	{
		$this->userRelation          = $userRelation;
		$this->sessionRelation       = $sessionRelation;
		$this->flatRelation          = $flatRelation;
		$this->roomPrototypeRelation = $roomPrototypeRelation;
		$this->roomShapeRelation     = $roomShapeRelation;
		$this->roomRelation          = $roomRelation;

		$this->token = $token;
	}

	public function showAll(): void
	{
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->showAll();
		$this->render('main-view.php', $viewModel);
	}

	private function render(string $viewFile, array $viewModel): void
	{
		extract($viewModel);
		$token = $this->token;
		require $viewFile;
	}
}
