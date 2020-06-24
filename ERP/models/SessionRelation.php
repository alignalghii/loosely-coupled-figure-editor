<?php

namespace models;

class SessionRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT `id`, `user_id`, `token` FROM `session` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(SessionEntity $entity): bool // @TODO `SessionEntity $rec`
	{
		if ($entity->userId && $entity->token) {
			$st = $this->dbh->prepare('INSERT INTO `session` (`user_id`, `token`) values (:user_id, :token)');
			$st->bindValue('user_id', $entity->userId, \PDO::PARAM_INT);
			$st->bindValue('token'  , $entity->token , \PDO::PARAM_INT);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, SessionEntity $entity): bool  // @TODO `SessionEntity $rec`
	{
		if ($entity->userId && $entity->token) {
			$st = $this->dbh->prepare('UPDATE `session` SET `user_id` = :user_id, `token` = :token WHERE `id` = :id');
			$st->bindValue('id'     , $id            , \PDO::PARAM_INT);
			$st->bindValue('user_id', $entity->userId, \PDO::PARAM_INT);
			$st->bindValue('token'  , $entity->token , \PDO::PARAM_INT);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `session` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
