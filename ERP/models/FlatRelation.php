<?php

namespace models;

class FlatRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `flat` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(FlatEntity $entity): bool // @TODO `FlatEntity $rec`
	{
		if ($entity->address) {
			$st = $this->dbh->prepare('INSERT INTO `flat` (`address`) values (:address)');
			$st->bindValue('address', $entity->address, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, FlatEntity $entity): bool  // @TODO `FlatEntity $rec`
	{
		if ($entity->address) {
			$st = $this->dbh->prepare('UPDATE `flat` SET `address` = :address WHERE `id` = :id');
			$st->bindValue('id'     , $id             , \PDO::PARAM_INT);
			$st->bindValue('address', $entity->address, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `flat` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
