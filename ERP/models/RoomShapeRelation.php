<?php

namespace models;

class RoomShapeRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room_shape` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(RoomShapeEntity $entity): bool // @TODO `RoomShapeEntity $rec`
	{
		if (strlen($entity->symbol) == 1 && $entity->name && $entity->arity >= 0) {
			$st = $this->dbh->prepare('
				INSERT INTO `room_shape`
					(`symbol`, `name`, `arity`, `interpret_argument_1`, `interpret_argument_2`, `interpret_argument_3`, `interpret_argument_4`) VALUES
					(:symbol , :name , :arity , :interpret_argument_1 , :interpret_argument_2 , :interpret_argument_3 , :interpret_argument_4 )
			');
			$st->bindValue('symbol'              , $entity->symbol              , \PDO::PARAM_STR);
			$st->bindValue('name'                , $entity->name                , \PDO::PARAM_STR);
			$st->bindValue('arity'               , $entity->arity               , \PDO::PARAM_INT);
			$st->bindValue('interpret_argument_1', $entity->interpret_argument_1, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_2', $entity->interpret_argument_2, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_3', $entity->interpret_argument_3, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_4', $entity->interpret_argument_4, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomShapeEntity $entity): bool // @TODO `RoomShapeEntity $rec`
	{
		if (strlen($entity->symbol) == 1 && $entity->name && $entity->arity >= 0) {
			$st = $this->dbh->prepare('
				UPDATE `room_shape`
				SET
					`symbol`               = :symbol,
					`name`                 = :name,
					`arity`                = :arity,
					`interpret_argument_1` = :interpret_argument_1,
					`interpret_argument_2` = :interpret_argument_2,
					`interpret_argument_3` = :interpret_argument_3,
					`interpret_argument_4` = :interpret_argument_4
				WHERE `id` = :id
			');
			$st->bindValue('id'                  , $id                          , \PDO::PARAM_INT);
			$st->bindValue('symbol'              , $entity->symbol              , \PDO::PARAM_STR);
			$st->bindValue('name'                , $entity->name                , \PDO::PARAM_STR);
			$st->bindValue('arity'               , $entity->arity               , \PDO::PARAM_INT);
			$st->bindValue('interpret_argument_1', $entity->interpret_argument_1, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_2', $entity->interpret_argument_2, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_3', $entity->interpret_argument_3, \PDO::PARAM_STR);
			$st->bindValue('interpret_argument_4', $entity->interpret_argument_4, \PDO::PARAM_STR);
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room_shape` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
