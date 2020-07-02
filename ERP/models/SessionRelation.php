<?php

namespace models;

use algebraicDataTypes\{Pair, Maybe, Maybe2};

class SessionRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}


	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT `id`, `user_id`, `token` FROM `session` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC); // @TODO array_map(function (array $rec) {return SessionEntity::fromDBRecord($rec);}, ...)
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


	public function maybeOpenNewSessionForUserId(int $userId): Maybe/*SessionEntity*/
	{
		$sessionEntity = SessionEntity::fromUserId($userId);
		$flag = $this->add($sessionEntity);
		return Maybe::yesVal($flag, $sessionEntity);
	}

	public function openNewOrFindOldSessionForUserId(int $userId): Maybe2/*bool, SessionEntity*/
	{
		return Maybe2::fromMaybePair(
			$this->maybeOpenNewSessionForUserId($userId)->map(
					function (SessionEntity $sessionEntity): Pair/*bool, SessionEntity*/ {return new Pair(true , $sessionEntity);}
			)->mplus(
				$this->maybeFindByUserId($userId)->map(
					function (SessionEntity $sessionEntity): Pair/*bool, SessionEntity*/ {return new Pair(false, $sessionEntity);}
				)
			)
		);
	}

	public function maybeFindByToken(int $token): Maybe/*SessionEntity*/
	{
		$st = $this->dbh->prepare('SELECT `id`, `user_id`, `token` FROM `session` WHERE `token` = :token');
		$st->bindValue('token', $token, \PDO::PARAM_INT);
		$flag = $st->execute();
		$recOrFalse = $st->fetch(\PDO::FETCH_ASSOC);
		return Maybe::yesExec(
			$flag && $recOrFalse,
			function () use ($recOrFalse) {return SessionEntity::fromDBRecord($recOrFalse);}
		);
	}

	public function maybeFindByUserId(int $userId): Maybe/*SessionEntity*/
	{
		$st = $this->dbh->prepare('SELECT `id`, `user_id`, `token` FROM `session` WHERE `user_id` = :user_id');
		$st->bindValue('user_id', $userId, \PDO::PARAM_INT);
		$flag = $st->execute();
		$recOrFalse = $st->fetch(\PDO::FETCH_ASSOC);
		return Maybe::yesExec(
			$flag && $recOrFalse,
			function () use ($recOrFalse) {return SessionEntity::fromDBRecord($recOrFalse);}
		);
	}
}
