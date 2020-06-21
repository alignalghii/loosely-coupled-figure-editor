<?php

namespace controllers;

use algebraicDataTypes\Maybe;
use models\RoomEntity;
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

trait TRoom
{
	function add(array $post): void // @TODO RoomEntity
	{
		$maybeShowback = RoomEntity::maybePostback(
			$post,
			[$this->roomRelation, 'add']
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('roomsViewModel', $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO RoomEntity
	{
		$maybeShowback = RoomEntity::maybePostback(
			$post,
			function (RoomEntity $entity) use ($id): bool {return $this->roomRelation->update($id, $entity);}
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('roomsViewModel', $id, $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('roomsViewModel', $maybeShowbackId);
		$this->render('main-view.php', $viewModel);
	}
}
