<?php

namespace controllers;

use ADT\Maybe;
use models\RoomPrototypeEntity;
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

trait TRoomPrototype
{
	function add(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback( //Maybe::no([$this->roomPrototypeRelation, 'add'], $post);
			$post,
			[$this->roomPrototypeRelation, 'add']
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('roomPrototypesViewModel', $maybeShowback);
		$this->render('view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback(
			$post,
			function (RoomPrototypeEntity $entity) use ($id): bool {return $this->roomPrototypeRelation->update($id, $entity);}
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('roomPrototypesViewModel', $id, $maybeShowback);
		$this->render('view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->roomPrototypeRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('roomPrototypesViewModel', $maybeShowbackId);
		$this->render('view.php', $viewModel);
	}
}
