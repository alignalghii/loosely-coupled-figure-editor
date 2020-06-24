<?php

namespace controllers;

use algebraicDataTypes\Maybe;
use models\SessionEntity;
use viewModels\ViewModelMeta;

trait TSession
{
	function add(array $post): void // @TODO SessionEntity
	{
		$maybeShowback = SessionEntity::maybePostback($post, [$this->sessionRelation, 'add']);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->add('sessionsViewModel', $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function update(int $id, array $post): void // @TODO SessionEntity
	{
		$maybeShowback = SessionEntity::maybePostback(
			$post,
			function (SessionEntity $entity) use ($id): bool {return $this->sessionRelation->update($id, $entity);} //$this->sessionRelation->update($id, $post) ? Maybe::nothing() : Maybe::just($post);
		);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->update('sessionsViewModel', $id, $maybeShowback);
		$this->render('main-view.php', $viewModel);
	}

	function delete(int $id): void
	{
		$maybeShowbackId = Maybe::no([$this->sessionRelation, 'delete'], $id);
		$viewModelMeta = new ViewModelMeta($this);
		$viewModel = $viewModelMeta->delete('sessionsViewModel', $maybeShowbackId);
		$this->render('main-view.php', $viewModel);
	}
}
