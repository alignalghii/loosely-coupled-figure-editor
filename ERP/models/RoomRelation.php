<?php

namespace models;

class RoomRelation
{
	function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	function getAll(): array
	{
		$st = $this->dbh->prepare('SELECT * FROM `room` ORDER BY `id`');
		$st->execute();
		return $st->fetchAll(\PDO::FETCH_ASSOC);
	}

	function add(RoomEntity $entity): bool // @TODO `RoomEntity $entity`
	{
		if ($entity->area >= 0) {
			$st = $this->dbh->prepare('
				INSERT INTO `room`
					(`flat_id`, `prototype_id`, `area`, `autocorr_dir_fwd`, `shape_id`, `shape_argument_1`, `shape_argument_2`, `shape_argument_3`, `shape_argument_4`) VALUES
					(:flat_id , :prototype_id , :area , :autocorr_dir_fwd , :shape_id , :shape_argument_1 , :shape_argument_2 , :shape_argument_3 , :shape_argument_4 )
			');
			$st->bindValue('flat_id'         , $entity->flat_id          , \PDO::PARAM_INT );
			$st->bindValue('prototype_id'    , $entity->prototype_id     , \PDO::PARAM_INT );
			$st->bindValue('area'            , $entity->area             , \PDO::PARAM_STR );
			$st->bindValue('autocorr_dir_fwd', $entity->autocorr_dir_fwd , \PDO::PARAM_BOOL);
			$st->bindValue('shape_id'        , $entity->shape_id         , \PDO::PARAM_INT );
			$st->bindValue('shape_argument_1', $entity->shape_argument_1 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_2', $entity->shape_argument_2 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_3', $entity->shape_argument_3 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_4', $entity->shape_argument_4 , \PDO::PARAM_STR );
			return $st->execute();
		} else {
			return false;
		}
	}

	function update(int $id, RoomEntity $entity): bool // @TODO `RoomEntity $rec`
	{
		if ($entity->area >= 0) {
			$st = $this->dbh->prepare('
				UPDATE `room` SET
					`flat_id`          = :flat_id,
					`prototype_id`     = :prototype_id,
					`area`             = :area,
					`autocorr_dir_fwd` = :autocorr_dir_fwd,
					`shape_id`         = :shape_id,
					`shape_argument_1` = :shape_argument_1,
					`shape_argument_2` = :shape_argument_2,
					`shape_argument_3` = :shape_argument_3,
					`shape_argument_4` = :shape_argument_4
				WHERE `id` = :id
			');
			$st->bindValue('id'              , $id                       , \PDO::PARAM_INT );
			$st->bindValue('flat_id'         , $entity->flat_id          , \PDO::PARAM_INT );
			$st->bindValue('prototype_id'    , $entity->prototype_id     , \PDO::PARAM_INT );
			$st->bindValue('area'            , $entity->area             , \PDO::PARAM_STR );
			$st->bindValue('autocorr_dir_fwd', $entity->autocorr_dir_fwd , \PDO::PARAM_BOOL);
			$st->bindValue('shape_id'        , $entity->shape_id         , \PDO::PARAM_INT );
			$st->bindValue('shape_argument_1', $entity->shape_argument_1 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_2', $entity->shape_argument_2 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_3', $entity->shape_argument_3 , \PDO::PARAM_STR );
			$st->bindValue('shape_argument_4', $entity->shape_argument_4 , \PDO::PARAM_STR );
			return $st->execute();
		} else {
			return false;
		}
	}

	function delete(int $id): bool
	{
		$st = $this->dbh->prepare('DELETE FROM `room` WHERE `id` = :id');
		$st->bindValue('id', $id, \PDO::PARAM_INT);
		return $st->execute();
	}
}
