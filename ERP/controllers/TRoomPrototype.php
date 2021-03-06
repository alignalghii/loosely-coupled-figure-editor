<?php

namespace controllers;

use algebraicDataTypes\Maybe;
use models\RoomPrototypeEntity;
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

trait TRoomPrototype
{
	function add(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback( //Maybe::noPred([$this->roomPrototypeRelation, 'add'], $post);
			$post,
			[$this->roomPrototypeRelation, 'add']
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('roomPrototypesViewModel', $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = RoomPrototypeEntity::maybePostback(
			$post,
			function (RoomPrototypeEntity $entity) use ($id): bool {return $this->roomPrototypeRelation->update($id, $entity);}
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('roomPrototypesViewModel', $id, $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::noPred([$this->roomPrototypeRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('roomPrototypesViewModel', $maybeShowbackId);
		$this->render('main-view.php', $viewModel);
	}
}
