<?php

namespace controllers;

use ADT\Maybe;
use models\RoomShapeEntity;
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

trait TRoomShape
{
	function add(array $post): void
	{
		$maybeShowback = RoomShapeEntity::maybePostback(
			$post,
			[$this->roomShapeRelation, 'add']
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('roomShapesViewModel', $maybeShowback);
		$this->render('view.php', $viewModel);
	}

	function update(int $id, array $post): void
	{
		$maybeShowback = RoomShapeEntity::maybePostback(
			$post,
			function (RoomShapeEntity $entity) use ($id): bool {return $this->roomShapeRelation->update($id, $entity);}
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('roomShapesViewModel', $id, $maybeShowback);
		$this->render('view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomShapeRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('roomShapesViewModel', $maybeShowbackId);
		$this->render('view.php', $viewModel);
	}
}
