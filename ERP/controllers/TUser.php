<?php

namespace controllers;

use algebraicDataTypes\Maybe;
use models\UserEntity;
use viewModels\ViewModelMeta;

trait TUser
{
	function add(array $post): void // @TODO UserEntity
	{
		$maybeShowback = UserEntity::maybePostback($post, [$this->userRelation, 'add']);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('usersViewModel', $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO UserEntity
	{
		$maybeShowback = UserEntity::maybePostback(
			$post,
			function (UserEntity $entity) use ($id): bool {return $this->userRelation->update($id, $entity);} //$this->userRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('usersViewModel', $id, $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::noPred([$this->userRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('usersViewModel', $maybeShowbackId);
		$this->render('main-view.php', $viewModel);
	}
}
