<?php

namespace models;

class RoomPrototypeRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room_prototype` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(RoomPrototypeEntity $entity): bool // @TODO `RoomPrototypeEntity $rec`
	{
		if ($entity->name) {
			$st = $this->dbh->prepare('INSERT INTO `room_prototype` (`name`) values (:name)');
			$st->bindValue('name', $entity->name, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomPrototypeEntity $entity): bool // @TODO `RoomPrototypeEntity $rec`
	{
		if ($entity->name) {
			$st = $this->dbh->prepare('UPDATE `room_prototype` SET `name` = :name WHERE `id` = :id');
			$st->bindValue('id'  , $id          , \PDO::PARAM_INT);
			$st->bindValue('name', $entity->name, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room_prototype` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
