<?php

namespace controllers;

use algebraicDataTypes\Maybe;
use models\FlatEntity;
use viewModels\{
	FlatsViewModel, RoomPrototypesViewModel, RoomShapesViewModel, RoomsViewModel,
	ViewModelMeta
};

trait TFlat
{
	function add(array $post): void // @TODO FlatEntity
	{
		$maybeShowback = FlatEntity::maybePostback($post, [$this->flatRelation, 'add']);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('flatsViewModel', $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO FlatEntity
	{
		$maybeShowback = FlatEntity::maybePostback(
			$post,
			function (FlatEntity $entity) use ($id): bool {return $this->flatRelation->update($id, $entity);} //$this->flatRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('flatsViewModel', $id, $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->flatRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('flatsViewModel', $maybeShowbackId);
		$this->render('main-view.php', $viewModel);
	}
}
