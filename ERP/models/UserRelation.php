<?php

namespace models;

class UserRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT `id`, `name`, `password` FROM `user` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(UserEntity $entity): bool // @TODO `UserEntity $rec`
	{
		if ($entity->name && $entity->password) {
			$st = $this->dbh->prepare('INSERT INTO `user` (`name`, `password`) values (:name, :password)');
			$st->bindValue('name'    , $entity->name    , \PDO::PARAM_STR);
			$st->bindValue('password', $entity->password, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, UserEntity $entity): bool  // @TODO `UserEntity $rec`
	{
		if ($entity->name && $entity->password) {
			$st = $this->dbh->prepare('UPDATE `user` SET `name` = :name, `password` = :password WHERE `id` = :id');
			$st->bindValue('id'      , $id              , \PDO::PARAM_INT);
			$st->bindValue('name'    , $entity->name    , \PDO::PARAM_STR);
			$st->bindValue('password', $entity->password, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `user` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
